#!/bin/bash

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    git init
    echo "Git repository initialized."
fi

# Add all files
git add .
echo "Files added to the staging area."

# Commit changes
read -p "Enter commit message: " commit_message
git commit -m "$commit_message"
echo "Changes committed."

# Add remote repository if not already added
if ! git remote | grep -q "origin"; then
    git remote add origin https://github.com/Fiqiefendiahmad/Fiqiefendiahmad-Fiqiefendiahmad.cv.git
    echo "Remote repository added."
fi

# Push to GitHub
git push -u origin main || git push -u origin master
echo "Changes pushed to GitHub."

echo "Deployment completed successfully!"
