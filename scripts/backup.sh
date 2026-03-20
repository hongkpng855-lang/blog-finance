#!/bin/bash
# 網站備份腳本

BACKUP_DIR="/home/hongk/.openclaw/workspace/backups/blog-finance"
DATE=$(date +%Y%m%d_%H%M%S)
SOURCE_DIR="/home/hongk/.openclaw/workspace/projects/blog-finance"

# 建立備份目錄
mkdir -p $BACKUP_DIR

# 備份內容目錄（文章）
tar -czf $BACKUP_DIR/posts_$DATE.tar.gz -C $SOURCE_DIR content/posts/

# 備份配置檔案
tar -czf $BACKUP_DIR/config_$DATE.tar.gz -C $SOURCE_DIR \
    package.json \
    next.config.js \
    tailwind.config.ts \
    tsconfig.json

# 保留最近 7 天備份
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "備份完成: $DATE"
ls -la $BACKUP_DIR | tail -5
