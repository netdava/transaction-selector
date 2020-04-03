#!/usr/bin/env bash

set -e

git pull

npm install
npm run build
rm -rf docs
mv build docs

git add docs
git commit -m "Updated website"
git push origin master