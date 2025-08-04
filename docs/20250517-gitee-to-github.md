---
title: "gitee-to-github"
date: "2025-05-17"
tags: ["git", "bash", "automatic"]
description: "昔のgitee倉庫をgithubリポジトリに移り替え"
---

#!/bin/bash

# 🌐 CONFIGURATION | 配置 | 設定

GITEE_USER="lin-shier"    # 替换成你的 Gitee 用户名
GITHUB_USER="rin66-515"   # 替换成你的 GitHub 用户名

# 📦 REPO LIST | 仓库列表 | リポジトリ一覧

REPOS=(
  "birdflyer" "demo-flutter" "resume" "heart"  "verf" "order" 
  "countdown" "go" "pagers" "falls" "carousel" "js-practice"
  "robot-talk" "vue_shop" "test"
)

# 🔐 Test SSH connection to Gitee (only once)

echo "🔐 Testing SSH connection to Gitee..."
output=$(ssh -T git@gitee.com 2>&1)
if echo "$output" | grep -i "authenticated" > /dev/null; then
  echo "✅ SSH to Gitee successful."
else
  echo "❌ SSH to Gitee failed. Check your SSH key."
  echo "Output was: $output"
  exit 1
fi

# 🔁 Process each repo

for repo in "${REPOS[@]}"; do
  echo "==========================================="
  echo "🚀 Processing repository: $repo"

  # 📦 Create GitHub repo

  echo "📦 Creating GitHub repo: $repo"
if ! gh repo create "$GITHUB_USER/$repo" --public 2>error.log; then
  echo "❌ Failed to create GitHub repo: $repo"
  echo "Error details:"
  cat error.log
  continue
fi

  # 📥 Clone from Gitee

  echo "📥 Cloning from Gitee: $repo"
  git clone --mirror git@gitee.com:$GITEE_USER/$repo.git
  if [ ! -d "$repo.git" ]; then
    echo "❌ Clone failed for $repo. Skipping..."
    continue
  fi

  cd "$repo.git" || exit

  # 📤 Push to GitHub

  echo "📤 Pushing to GitHub..."
  git remote add github git@github.com:$GITHUB_USER/$repo.git
  git push github --mirror

  cd ..
  rm -rf "$repo.git"
  echo "✅ Finished: $repo"
done

echo "🎉 All done!"experience.
