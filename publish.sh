#!/bin/bash

read -p "提交描述:" desc

git add .
git commit -m $desc

read -p "请输入要提交的分支" branch
git push gitee $branch
