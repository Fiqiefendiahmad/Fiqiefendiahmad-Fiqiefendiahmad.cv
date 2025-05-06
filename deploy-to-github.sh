#!/bin/bash

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    git init
    echo "Git repository initialized."
fi

# Check if remote origin exists and remove it
if git remote | grep -q "origin"; then
    echo "Remote 'origin' already exists. Removing it to set the correct one."
    git remote remove origin
fi

# Add the correct remote repository
git remote add origin https://github.com/Fiqiefendiahmad/Fiqiefendiahmad-Fiqiefendiahmad.cv.git
echo "Remote repository added/updated."

# Add all files
git add .
echo "Files added to the staging area."

# Commit changes
read -p "Enter commit message: " commit_message
git commit -m "$commit_message"
echo "Changes committed."

# Push to GitHub
git push -u origin main || git push -u origin master
echo "Changes pushed to GitHub."

echo "Deployment completed successfully!"

# Add message about README
echo "Your README.md has been successfully pushed to GitHub along with other files!"
