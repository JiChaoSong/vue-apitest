#!/bin/bash

read -p "提交描述:" desc

git add .
git commit -m $desc
git push
