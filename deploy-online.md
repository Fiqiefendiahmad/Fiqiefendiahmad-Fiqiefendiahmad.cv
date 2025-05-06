    # Deploying Your CV Website Online

This guide provides step-by-step instructions for deploying your CV website online using GitHub Pages (free) or other alternatives.

## Option 1: GitHub Pages (Recommended)

GitHub Pages is completely free and integrates directly with your GitHub repository.

### Prerequisites:
- A GitHub account (sign up at [github.com](https://github.com) if you don't have one)
- Git installed on your computer ([download here](https://git-scm.com/downloads))

### Steps to Deploy:

1. **Create a GitHub repository:**
   - Go to [github.com](https://github.com) and log in
   - Click the "+" icon in the top-right corner and select "New repository"
   - Name your repository `username.github.io` (replace "username" with your GitHub username)
   - Set the repository to "Public"
   - Click "Create repository"

2. **Prepare your local project:**
   - Open terminal/command prompt
   - Navigate to your project directory:
     ```
     cd c:\Users\THE\Documents\Project\single
     ```
   - Initialize Git repository:
     ```
     git init
     ```
   - Add all your files:
     ```
     git add .
     ```
   - Commit the files:
     ```
     git commit -m "Initial commit"
     ```

3. **Connect and push to GitHub:**
   - Add your GitHub repository as remote:
     ```
     git remote add origin https://github.com/username/username.github.io.git
     ```
     (Replace "username" with your actual GitHub username)
   - Push your code:
     ```
     git push -u origin master
     ```

4. **Verify deployment:**
   - Go to `https://username.github.io` (replace "username" with your GitHub username)
   - Your CV website should be live! (May take a few minutes to go live)

## Option 2: Netlify (Easy Drag & Drop)

Netlify offers free hosting with a simple drag-and-drop interface.

1. Go to [netlify.com](https://www.netlify.com/) and sign up/log in
2. On your dashboard, click "Add new site" → "Deploy manually"
3. Drag and drop your entire project folder
4. Your site will be deployed with a random URL (you can customize it in settings)

## Option 3: Vercel

Vercel provides free hosting with excellent GitHub integration.

1. Go to [vercel.com](https://vercel.com/) and sign up/log in (can use GitHub to sign up)
2. Click "New Project"
3. Import your GitHub repository or use their CLI tool
4. Your site will be deployed automatically

## Updating Your Site

When you make changes to your CV website:

1. Make changes to your local files
2. Stage changes: `git add .`
3. Commit changes: `git commit -m "Description of changes"`
4. Push to GitHub: `git push`
5. Your site will update automatically (may take a few minutes)

## Custom Domain (Optional)

To use your own domain name instead of username.github.io:

1. Purchase a domain from a domain registrar (Namecheap, GoDaddy, Google Domains, etc.)
2. Follow the instructions for your chosen hosting platform to connect your custom domain
   - For GitHub Pages: Go to repository settings → Pages → Custom domain

## Setting Proper Paths for Deployment

If you notice missing images or styles after deployment, ensure all your paths are relative:

- Use `src="css/styles.css"` not `src="/css/styles.css"` or `src="C:/path/styles.css"`
- Use `href="asset/image.jpg"` not absolute paths
