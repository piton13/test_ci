#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

SOURCE_BRANCH="development" 
TARGET_BRANCH="gh-pages"

# Save some useful information
REPO=`git config remote.origin.url`
SSH_REPO=${REPO/https:\/\/github.com\//git@github.com:}
SHA=`git rev-parse --verify HEAD`

# Configure git user credentials
git config user.name $COMMIT_AUTHOR
git config user.email $COMMIT_AUTHOR_EMAIL

cp index.html build/index.html
git checkout --orphan gh-pages
git rm -rf .
mv build/index.html index.html

# Commit the "changes", i.e. the new version.
# The delta will show diffs between new and old versions.
git add build/ index.html
git commit -m "Deploy to GitHub Pages: ${SHA}"
git reset --hard
git checkout $SOURCE_BRANCH

# Get the deploy key by using Travis's stored variables to decrypt deploy_key.enc
ENCRYPTED_KEY_VAR="encrypted_${ENCRYPTION_LABEL}_key"
ENCRYPTED_IV_VAR="encrypted_${ENCRYPTION_LABEL}_iv"
ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}
openssl aes-256-cbc -K $ENCRYPTED_KEY -iv $ENCRYPTED_IV -in deploy_key.enc -out deploy_key -d
#openssl aes-256-cbc -K $encrypted_3bf8f2b432cb_key -iv $encrypted_3bf8f2b432cb_iv -in deploy_key.enc -out deploy_key -d
chmod 600 deploy_key
eval `ssh-agent -s`
ssh-add deploy_key

# git remote set-url origin https://piton13:0ac2a1e44deeca0b9a7c2452ebc495372794913d@github.com/piton13/test_ci.git
git remote set-url origin $SSH_REPO
git push origin :$TARGET_BRANCH

# Now that we're all set up, we can push.
git push origin $TARGET_BRANCH
