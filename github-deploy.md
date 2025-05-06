# Deploying Your CV Website to GitHub Pages

## Repository Details
- GitHub Username: Fiqiefendiahmad
- Repository Name: Fiqiefendiahmad.github.io
- Website URL: https://fiqiefendiahmad.github.io/

## Step 1: Create the GitHub Repository
1. Go to https://github.com/new
2. Name it exactly: `Fiqiefendiahmad.github.io`
3. Make it Public
4. Click "Create repository"

## Step 2: Prepare Your Local Project
Open Command Prompt or Git Bash in your project folder and run:

```bash
cd c:\Users\THE\Documents\Project\single
git init
git add .
git commit -m "Initial CV website commit"
```

## Step 3: Connect and Push to GitHub (FIXED)

You encountered an error because the command contained placeholders. Use these exact commands instead:

```bash
git branch -M main
git remote add origin https://github.com/Fiqiefendiahmad/Fiqiefendiahmad.github.io.git
git push -u origin main
```

If you get an authentication error, you may need to use a GitHub personal access token:
   - Go to GitHub → Settings → Developer settings → Personal access tokens → Generate new token
   - Select "repo" permissions
   - Copy the token and use it as your password when prompted

## Alternative: Direct Upload (RECOMMENDED)
Since you're encountering issues with command line tools, the easiest method is:

1. Go to https://github.com/Fiqiefendiahmad/Fiqiefendiahmad.github.io
2. Click "Add file" → "Upload files"
3. Drag and drop your files (you may need to do this in batches)
   - Upload the HTML file first
   - Then create folders (js, css, asset) and upload those files
4. Add a commit message like "Initial website upload"
5. Click "Commit changes"

## Using GitHub Desktop (Another Alternative)
If you prefer a graphical interface:

1. Download [GitHub Desktop](https://desktop.github.com/)
2. Install and log in with your GitHub account
3. Choose "Add an Existing Repository" and select your local folder
4. Publish the repository to GitHub with the name "Fiqiefendiahmad.github.io"

## Step 4: Enable GitHub Pages
1. Go to https://github.com/Fiqiefendiahmad/Fiqiefendiahmad.github.io/settings/pages
2. Under "Source", select "main" branch
3. Choose folder: "/" (root)
4. Click "Save"

## Step 5: View Your Published Website
Your website will be live at: https://fiqiefendiahmad.github.io/

It may take a few minutes for your site to be published after the initial push.

## Making Updates Later
When you need to update your website:

```bash
git add .
git commit -m "Updated CV content"
git push
```

The changes will automatically be deployed to your GitHub Pages site.
