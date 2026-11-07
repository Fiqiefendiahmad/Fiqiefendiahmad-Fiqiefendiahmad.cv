#!/usr/bin/env python3
"""
scripts/sync_linkedin.py — Automated Monthly LinkedIn Profile Sync
Fetches structured profile data from an enrichment API (Proxycurl / Scrapin / RapidAPI),
normalizes experiences/education/certifications, diffs against cv-data.json,
and automatically updates and commits changes.
"""

import os
import sys
import json
import time
import argparse
import datetime
import subprocess
import requests

PROJECT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DATA_FILE = os.path.join(PROJECT_DIR, "cv-data.json")
CV_HTML_FILE = os.path.join(PROJECT_DIR, "cv.html")
ENV_FILE = os.path.join(PROJECT_DIR, ".env.linkedin")
BACKUP_DIR = os.path.join(PROJECT_DIR, "backups")

def load_env(env_path):
    config = {
        "LINKEDIN_PROVIDER": "proxycurl",
        "LINKEDIN_API_KEY": "",
        "LINKEDIN_PROFILE_URL": "https://www.linkedin.com/in/fiqi-efendi",
        "AUTO_COMMIT": "true"
    }
    if os.path.exists(env_path):
        with open(env_path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    k, v = line.split("=", 1)
                    config[k.strip()] = v.strip().strip("\"'")
    # Allow OS env override
    for k in config:
        if k in os.environ:
            config[k] = os.environ[k]
    return config

def fetch_proxycurl(api_key, profile_url):
    headers = {"Authorization": f"Bearer {api_key}"}
    endpoint = "https://nubela.co/proxycurl/api/v2/linkedin"
    params = {
        "url": profile_url,
        "fallback_to_cache": "on-error",
        "use_cache": "if-present",
        "skills": "include",
    }
    resp = requests.get(endpoint, headers=headers, params=params, timeout=30)
    resp.raise_for_status()
    return resp.json()

def fetch_scrapin(api_key, profile_url):
    endpoint = "https://api.scrapin.io/enrichment/profile"
    params = {"apikey": api_key, "linkedInUrl": profile_url}
    resp = requests.get(endpoint, params=params, timeout=30)
    resp.raise_for_status()
    return resp.json().get("person", {})

def fetch_rapidapi(api_key, profile_url):
    headers = {
        "x-rapidapi-key": api_key,
        "x-rapidapi-host": "fresh-linkedin-profile-data.p.rapidapi.com"
    }
    endpoint = "https://fresh-linkedin-profile-data.p.rapidapi.com/get-linkedin-profile"
    params = {"linkedin_url": profile_url}
    resp = requests.get(endpoint, headers=headers, params=params, timeout=30)
    resp.raise_for_status()
    return resp.json()

def get_mock_data():
    return {
        "occupation": "IT Database Administrator · Android Developer · IT Project Lead",
        "summary": "Enterprise Database Administrator, Mobile Application Engineer, and IT Project Lead with hands-on experience managing 24/7 mission-critical Oracle databases for Maybank, leading end-to-end Android application releases, and building resilient full-stack systems.",
        "experiences": [
            {
                "title": "IT Database Administrator",
                "company": "PT. INFOMEDIA NUSANTARA",
                "starts_at": {"month": 6, "year": 2023},
                "ends_at": None,
                "location": "Jakarta, Indonesia · Client: Maybank",
                "description": "Maintained 99.9%+ availability across 24/7 mission-critical Oracle production databases supporting enterprise banking operations\nDiagnosed and resolved performance bottlenecks via slow/blocking query analysis and comprehensive AWR reporting\nManaged automated backup routines, job scheduling, and high-availability monitoring under strict banking SLAs\nConducted capacity planning and proactive performance tuning to prevent transactional degradation during traffic spikes"
            },
            {
                "title": "IT Project Lead & Mobile Application Developer",
                "company": "PT. TURGA BERKAH KUBRA",
                "starts_at": {"month": 1, "year": 2025},
                "ends_at": {"month": 5, "year": 2026},
                "location": "Jakarta, Indonesia",
                "description": "Spearheaded full lifecycle of Hystory Android app from technical architecture through Google Play production deployment\nCoordinated cross-functional engineering teams across sprint planning, code reviews, and CI/CD pipelines on GCP/Docker\nImplemented offline-first caching and MVVM architecture, ensuring high stability and low crash rates"
            },
            {
                "title": "Android & Full-Stack Developer (Freelance)",
                "company": "Various Clients",
                "starts_at": {"month": 1, "year": 2023},
                "ends_at": {"month": 12, "year": 2024},
                "location": "Indonesia",
                "description": "Engineered Android and Flutter applications for election result tracking, on-demand laundry (iWash), and education\nBuilt robust REST backends and integrated Firebase services with real-time synchronization and offline persistence\nIntegrated multi-channel e-commerce APIs (TikTok Shop & Shopee) with idempotent webhooks and two-way inventory sync"
            }
        ]
    }

def format_date(d_obj):
    if not d_obj:
        return "Present"
    month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    m = d_obj.get("month")
    y = d_obj.get("year")
    if m and y and 1 <= m <= 12:
        return f"{month_names[m-1]} {y}"
    elif y:
        return str(y)
    return "Present"

def normalize_profile(raw_data, provider):
    experiences = []
    
    # Extract experiences based on provider schema
    exp_list = raw_data.get("experiences") or raw_data.get("experience") or raw_data.get("positions") or []
    for item in exp_list:
        role = item.get("title") or item.get("role") or ""
        company = item.get("company") or item.get("company_name") or ""
        
        # Parse period
        if "starts_at" in item:
            start_str = format_date(item.get("starts_at"))
            end_str = format_date(item.get("ends_at"))
            period = f"{start_str} — {end_str}"
        elif "start_date" in item:
            period = f"{item.get('start_date', '')} — {item.get('end_date', 'Present')}"
        else:
            period = item.get("period") or "Present"
            
        location = item.get("location") or "Jakarta, Indonesia"
        
        # Parse highlights / bullets
        desc = item.get("description") or ""
        if isinstance(desc, list):
            highlights = [str(x).strip("-• ") for x in desc if x]
        elif isinstance(desc, str) and desc.strip():
            highlights = [line.strip("-• ") for line in desc.splitlines() if line.strip()]
        else:
            highlights = []
            
        if role and company:
            experiences.append({
                "role": role,
                "company": company,
                "period": period,
                "location": location,
                "highlights": highlights
            })

    # Summary and headline
    role_headline = raw_data.get("occupation") or raw_data.get("headline") or ""
    summary = raw_data.get("summary") or ""
    
    return {
        "role": role_headline,
        "summary": summary,
        "experience": experiences
    }

def update_cv_data(new_profile, dry_run=False):
    if not os.path.exists(DATA_FILE):
        print(f"Error: {DATA_FILE} not found.", file=sys.stderr)
        return False

    with open(DATA_FILE, "r", encoding="utf-8") as f:
        current_data = json.load(f)

    changed = False
    changes_log = []

    # Check headline
    if new_profile.get("role") and new_profile["role"] != current_data.get("role"):
        changes_log.append(f"Headline: '{current_data.get('role')}' -> '{new_profile['role']}'")
        current_data["role"] = new_profile["role"]
        changed = True

    # Check experiences
    if new_profile.get("experience"):
        # Check if experience array has meaningful diff
        cur_exp_simple = [{"role": x["role"], "company": x["company"], "period": x["period"]} for x in current_data.get("experience", [])]
        new_exp_simple = [{"role": x["role"], "company": x["company"], "period": x["period"]} for x in new_profile["experience"]]
        
        if cur_exp_simple != new_exp_simple:
            changes_log.append(f"Experience updated ({len(new_profile['experience'])} positions found).")
            # Merge highlights if existing has better detail
            for new_x in new_profile["experience"]:
                for old_x in current_data.get("experience", []):
                    if new_x["role"].lower() == old_x["role"].lower() and new_x["company"].lower() == old_x["company"].lower():
                        if not new_x.get("highlights") and old_x.get("highlights"):
                            new_x["highlights"] = old_x["highlights"]
            current_data["experience"] = new_profile["experience"]
            changed = True

    if not changed:
        print("[INFO] No profile updates detected. cv-data.json is already up to date.")
        return False

    print("[UPDATE] Detected changes:")
    for c in changes_log:
        print(f"  • {c}")

    if dry_run:
        print("[DRY-RUN] Changes simulated. No files written.")
        return True

    # Backup current cv-data.json
    os.makedirs(BACKUP_DIR, exist_ok=True)
    ts = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"cv-data-{ts}.json")
    with open(backup_file, "w", encoding="utf-8") as f:
        json.dump(current_data, f, indent=2)
    print(f"[BACKUP] Created {backup_file}")

    # Write new cv-data.json
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(current_data, f, indent=2)
    print(f"[SAVED] Successfully updated {DATA_FILE}")

    # Regenerate cv.html experience block if changed
    update_cv_html(current_data)
    return True

def update_cv_html(data):
    if not os.path.exists(CV_HTML_FILE):
        return

    with open(CV_HTML_FILE, "r", encoding="utf-8") as f:
        html = f.read()

    # Rebuild experience section in cv.html
    exp_items_html = ""
    for exp in data.get("experience", []):
        bullets = "".join([f"          <li>{h}</li>\n" for h in exp.get("highlights", [])])
        exp_items_html += f"""      <div class="cv-exp">
        <div class="cv-exp__header">
          <div>
            <div class="cv-exp__title">{exp.get('role')}</div>
            <div class="cv-exp__company">{exp.get('company')} &middot; {exp.get('location', '')}</div>
          </div>
          <div class="cv-exp__date">{exp.get('period')}</div>
        </div>
        <ul class="cv-exp__list">
{bullets}        </ul>
      </div>\n\n"""

    import re
    pattern = r"(<!-- Experience -->\s*<section class=\"cv-section\">\s*<h2 class=\"cv-section__title\">Experience</h2>)([\s\S]*?)(</section>)"
    def repl(m):
        return f"{m.group(1)}\n{exp_items_html}    {m.group(3)}"

    new_html, count = re.subn(pattern, repl, html, flags=re.MULTILINE)
    if count:
        with open(CV_HTML_FILE, "w", encoding="utf-8") as f:
            f.write(new_html)
        print(f"[SAVED] Updated experience timeline in {CV_HTML_FILE}")

def git_commit_and_push():
    try:
        status = subprocess.check_output(["git", "-C", PROJECT_DIR, "status", "--porcelain"]).decode().strip()
        if not status:
            print("[GIT] Working tree clean. Nothing to commit.")
            return

        date_str = datetime.date.today().strftime("%Y-%m-%d")
        subprocess.check_call(["git", "-C", PROJECT_DIR, "add", "cv-data.json", "cv.html"])
        commit_msg = f"chore(sync): automated linkedin profile sync [{date_str}] [skip ci]"
        subprocess.check_call(["git", "-C", PROJECT_DIR, "commit", "-m", commit_msg])
        print(f"[GIT] Created commit: '{commit_msg}'")

        subprocess.check_call(["git", "-C", PROJECT_DIR, "push", "origin", "main"])
        print("[GIT] Pushed updates to origin main successfully.")
    except Exception as e:
        print(f"[GIT WARNING] Git commit/push failed: {e}", file=sys.stderr)

def main():
    parser = argparse.ArgumentParser(description="Sync LinkedIn Profile to cv-portfolio")
    parser.add_argument("--dry-run", action="store_true", help="Simulate without writing files")
    parser.add_argument("--test", action="store_true", help="Run with mock payload to test pipeline")
    parser.add_argument("--provider", help="Override provider (proxycurl | scrapin | rapidapi | mock)")
    parser.add_argument("--file", help="Load profile from a local JSON file")
    args = parser.parse_args()

    cfg = load_env(ENV_FILE)
    provider = args.provider or cfg.get("LINKEDIN_PROVIDER", "proxycurl")
    api_key = cfg.get("LINKEDIN_API_KEY", "")
    profile_url = cfg.get("LINKEDIN_PROFILE_URL", "https://www.linkedin.com/in/fiqi-efendi")

    print(f"[{datetime.datetime.now().isoformat()}] Starting LinkedIn Sync...")
    print(f"  Target:   {profile_url}")
    print(f"  Provider: {provider}")

    if args.test or provider == "mock":
        print("[MODE] Using mock profile payload for test run.")
        raw_data = get_mock_data()
    elif args.file:
        print(f"[MODE] Reading local payload from {args.file}")
        with open(args.file, "r", encoding="utf-8") as f:
            raw_data = json.load(f)
    else:
        if not api_key:
            print("[ERROR] LINKEDIN_API_KEY is not set in .env.linkedin.", file=sys.stderr)
            print("To configure, copy .env.linkedin.example to .env.linkedin and add your key.", file=sys.stderr)
            print("Run with '--test' to test pipeline with mock data.", file=sys.stderr)
            sys.exit(1)

        try:
            if provider == "proxycurl":
                raw_data = fetch_proxycurl(api_key, profile_url)
            elif provider == "scrapin":
                raw_data = fetch_scrapin(api_key, profile_url)
            elif provider == "rapidapi":
                raw_data = fetch_rapidapi(api_key, profile_url)
            else:
                print(f"[ERROR] Unknown provider '{provider}'.", file=sys.stderr)
                sys.exit(1)
        except Exception as e:
            print(f"[ERROR] Failed to fetch LinkedIn profile: {e}", file=sys.stderr)
            sys.exit(1)

    normalized = normalize_profile(raw_data, provider)
    updated = update_cv_data(normalized, dry_run=args.dry_run)

    if updated and not args.dry_run and cfg.get("AUTO_COMMIT", "true").lower() == "true":
        git_commit_and_push()

    print(f"[{datetime.datetime.now().isoformat()}] LinkedIn Sync Completed.")

if __name__ == "__main__":
    main()
