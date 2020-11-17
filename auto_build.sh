#! /bin/bash

SITE_PATH='/Users/mac/Desktop/work/demo/testGit/test2'


cd $SITE_PATH
git checkout master
git fetch --all
git reset --hard origin/master
git clean -f
# chown -R $USER:$USERGROUP $SITE_PATH
