# Deploying Your CV Website Using VS Code GitHub Integration

Since you're already logged into GitHub in VS Code, deployment is much easier!

## Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) in your browser
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name it using the format: `Fiqiefendiahmad.github.io`
5. Make it public
6. Click "Create repository" (don't add any files yet)

## Step 2: Publish from VS Code

1. **Open your project in VS Code**
   - Open VS Code
   - Go to File → Open Folder and select `c:\Users\THE\Documents\Project\single`

2. **Access Source Control**
   - Click on the Source Control icon in the left sidebar (looks like a branch)
   - You might see "Initialize Repository" - click it if prompted

   **IMPORTANT: Set up Git configuration first**
   - Before making any commits, you need to configure your Git identity
   - Open a terminal in VS Code (Terminal → New Terminal or press Ctrl+`)
   - Run these commands (replace with your actual information):
     ```
     git config --global user.name "Your Name"
     git config --global user.email "your.email@example.com"
     ```
   - These commands tell Git who you are, which is required for making commits

   **CRITICAL: Fix Repository URL Placeholder**
   - If you see an error message like:
     ```
     remote: Repository not found.
     fatal: repository 'https://github.com/[your-username]/[your-username].github.io.git/' not found
     ```
   - This means VS Code is using placeholders instead of your actual GitHub username
   - Open terminal in VS Code (Terminal → New Terminal)
   - Run these commands to fix it:
     ```
     git remote -v
     ```
     (This will show your current remote URL with the placeholder)
     ```
     git remote remove origin
     git remote add origin https://github.com/Fiqiefendiahmad/Fiqiefendiahmad.github.io.git
     ```
   - Now try pushing your code again:
     ```
     git push -u origin main
     ```

3. **Make Initial Commit**
   - Now you should be able to see your files in the Source Control panel
   - Click the "+" button next to "Changes" to stage all files
   - Enter "Initial commit of CV website" in the message box
   - Click the checkmark (✓) to commit

4. **Publish to GitHub**
   - Look for the "Publish to GitHub" button at the bottom of the VS Code window
   - A dialog will appear at the top of VS Code - select "Publish to GitHub"
   - In the repository name field, enter: `Fiqiefendiahmad.github.io`
   - Ensure "Public" is selected
   - Click "OK" or "Publish"
   - Wait for VS Code to complete the upload (you'll see a progress notification)

## Step 3: Verify Repository Creation

1. After publishing, VS Code will show a notification with a link to your repository
2. Click on the link, or manually go to `https://github.com/Fiqiefendiahmad/Fiqiefendiahmad.github.io`
3. Confirm that all your files are visible in the repository

## Step 4: Configure GitHub Pages

1. On your GitHub repository page:
   - Click the "Settings" tab (near the top-right)
   - In the left sidebar menu, scroll down and click "Pages"
   
2. Under "Build and deployment" section:
   - For "Source", select "Deploy from a branch"
   - For "Branch", select "main" from the dropdown and "/ (root)" for the folder
   - Click the "Save" button
   
3. Wait for deployment:
   - GitHub will show a blue notification: "GitHub Pages source saved"
   - After a few minutes, it will change to a green notification with your site URL
   - This process typically takes 1-3 minutes

## Step 5: Verify Your Website is Live

1. Visit `https://Fiqiefendiahmad.github.io` in your browser
2. If the page doesn't appear immediately:
   - Wait a few more minutes (first deployment can take up to 10 minutes)
   - Press Ctrl+F5 to perform a hard refresh
   
3. If your site still doesn't appear after 10 minutes:
   - Go back to GitHub Pages settings and confirm the correct branch is selected
   - Check if there are any deployment error messages

## Re-Initializing Your Git Repository

If you've encountered issues with your Git setup, you can start fresh by:

1. **Delete the existing Git repository**
   - Open File Explorer
   - Navigate to `c:\Users\THE\Documents\Project\single`
   - Make sure hidden items are visible (View tab → check "Hidden items")
   - Delete the `.git` folder inside your project directory
   
2. **Re-initialize in VS Code**
   - Open VS Code
   - Open your project folder (`c:\Users\THE\Documents\Project\single`)
   - Go to Source Control panel (icon in the sidebar)
   - Click "Initialize Repository"
   
3. **Make a fresh commit**
   - Stage all files by clicking the "+" next to Changes
   - Enter a commit message like "Fresh start - initial commit"
   - Click the checkmark (✓) to commit
   
4. **Publish to GitHub**
   - If your GitHub repository already exists:
     - Delete it first on GitHub.com (Settings → Danger Zone → Delete repository)
     - Create a new repository with the same name
   - Use VS Code to publish to the new repository as described in Step 2 above

This gives you a clean slate for your repository while preserving all your project files.

## Making Future Updates

1. After making changes to your files in VS Code:
   - Click the Source Control icon in the sidebar (branch icon)
   - You'll see your modified files under "Changes"
   
2. Commit your changes:
   - Write a message describing your changes (e.g., "Updated project section")
   - Click the checkmark (✓) icon to commit
   
3. Push to GitHub:
   - Click the "Sync Changes" button (circular arrows icon)
   - VS Code will upload your changes to GitHub
   
4. Your website will automatically update within a few minutes

## Common Issues & Solutions

1. **Missing images or broken styles**
   - Make sure all file paths are using relative paths (e.g., `asset/projects/...`)
   - Check that the case of filenames matches exactly (GitHub is case-sensitive)
   
2. **Website not updating after changes**
   - Ensure you've both committed AND pushed your changes to GitHub
   - Try a hard refresh (Ctrl+F5) in your browser
   - Check browser console (F12) for any errors

3. **Repository publishing fails**
   - If VS Code fails to create the repository, try creating it on GitHub.com first
   - Then in VS Code, use "Add Remote Repository" and enter the URL

## Troubleshooting: Repository Not Found Error

If you see an error like `remote: Repository not found. fatal: repository 'https://github.com/[your-username]/[your-username].github.io.git/' not found`, follow these steps:

1. **Set the correct remote URL manually**:
   - Open terminal in VS Code (Terminal → New Terminal)
   - Run the following command, replacing with your actual GitHub username:
     ```
     git remote set-url origin https://github.com/Fiqiefendiahmad/Fiqiefendiahmad.github.io.git
     ```
   - This fixes the remote URL to point to your actual GitHub repository

2. **Try pushing again**:
   - Click on the "Sync Changes" button in VS Code's Source Control panel
   - Or run this in the terminal:
     ```
     git push -u origin main
     ```

3. **If issues persist**:
   - Verify that the repository exists at GitHub.com/Fiqiefendiahmad/Fiqiefendiahmad.github.io
   - Check your GitHub authentication in VS Code (you might need to re-authenticate)
   - Make sure you've created the repository on GitHub before pushing

4. **Alternative approach**:
   - Go to your GitHub repository page and copy the "Clone URL"
   - In VS Code, click Source Control → ... (three dots) → Remote → Add Remote
   - Paste the URL and name the remote "origin"

The key is to make sure your local repository is connected to the correct GitHub repository URL.
