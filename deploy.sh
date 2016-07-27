#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

SOURCE_BRANCH="development" 
TARGET_BRANCH="gh-pages"

# function doCompile {
 # ./compile.sh
# }

# Pull requests and commits to other branches shouldn't try to deploy, just build to verify
# if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
    # echo "Skipping deploy; just doing a build."
 #   doCompile
    # exit 0
# fi

# Save some useful information
REPO=`git config remote.origin.url`
SSH_REPO=${REPO/https:\/\/github.com\//git@github.com:}
SHA=`git rev-parse --verify HEAD`
echo $REPO
echo $SSH_REPO


# Clone the existing gh-pages for this repo into out/
# Create a new empty branch if gh-pages doesn't exist yet (should only happen on first deply)
#git clone $REPO out
# cd out
# git checkout $TARGET_BRANCH || git checkout --orphan $TARGET_BRANCH
# cd ..

# Clean out existing contents
# rm -rf out/**/* || exit 0

# Run our compile script
# doCompile

# Now let's go have some fun with the cloned repo
# cd out
git config user.name $COMMIT_AUTHOR
git config user.email $COMMIT_AUTHOR_EMAIL

# If there are no changes to the compiled out (e.g. this is a README update) then just bail.
# if [ -z `git diff --exit-code` ]; then
    # echo "No changes to the output on this push; exiting."
 #   exit 0
# fi

# Commit the "changes", i.e. the new version.
# The delta will show diffs between new and old versions.
cp index.html build/index.html
git checkout --orphan gh-pages
git rm -rf .
mv build/index.html index.html
git add build/ index.html
git commit -m "Deploy to GitHub Pages: ${SHA}"
git reset --hard
git checkout $SOURCE_BRANCH

# Get the deploy key by using Travis's stored variables to decrypt deploy_key.enc
ENCRYPTED_KEY_VAR="encrypted_${ENCRYPTION_LABEL}_key"
ENCRYPTED_IV_VAR="encrypted_${ENCRYPTION_LABEL}_iv"
ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
echo $ENCRYPTED_KEY
ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}
echo $ENCRYPTED_IV
openssl aes-256-cbc -K $ENCRYPTED_KEY -iv $ENCRYPTED_IV -in deploy_key.enc -out deploy_key -d
#openssl aes-256-cbc -K $encrypted_3bf8f2b432cb_key -iv $encrypted_3bf8f2b432cb_iv -in deploy_key.enc -out deploy_key -d
chmod 600 deploy_key
eval `ssh-agent -s`
ssh-add deploy_key


# git remote set-url origin https://piton13:0ac2a1e44deeca0b9a7c2452ebc495372794913d@github.com/piton13/test_ci.git
git remote set-url origin $SSH_REPO
git push origin :$TARGET_BRANCH

# Now that we're all set up, we can push.
# git push $SSH_REPO $SOURCE_BRANCH:$TARGET_BRANCH
git push origin $TARGET_BRANCH
