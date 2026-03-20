#!/bin/bash

# 定義 category 對應的 image URL
declare -A CATEGORY_URLS
CATEGORY_URLS["ETF分析"]="https://image.pollinations.ai/prompt/stock%20market%20ETF%20chart%20professional%20infographic%20blue?width=1200&height=630&nologo=true"
CATEGORY_URLS["投資策略"]="https://image.pollinations.ai/prompt/financial%20strategy%20planning%20business%20professional?width=1200&height=630&nologo=true"
CATEGORY_URLS["投資觀念"]="https://image.pollinations.ai/prompt/financial%20mindset%20investment%20philosophy%20illustration?width=1200&height=630&nologo=true"
CATEGORY_URLS["投資入門"]="https://image.pollinations.ai/prompt/investment%20basics%20beginners%20guide%20friendly?width=1200&height=630&nologo=true"
CATEGORY_URLS["退休規劃"]="https://image.pollinations.ai/prompt/retirement%20planning%20peaceful%20financial%20security?width=1200&height=630&nologo=true"
CATEGORY_URLS["投資心法"]="https://image.pollinations.ai/prompt/investment%20wisdom%20financial%20discipline%20elegant?width=1200&height=630&nologo=true"
CATEGORY_URLS["投資規劃"]="https://image.pollinations.ai/prompt/retirement%20planning%20peaceful%20financial%20security?width=1200&height=630&nologo=true"
CATEGORY_URLS["市場分析"]="https://image.pollinations.ai/prompt/stock%20market%20ETF%20chart%20professional%20infographic%20blue?width=1200&height=630&nologo=true"
CATEGORY_URLS["海外投資"]="https://image.pollinations.ai/prompt/financial%20strategy%20planning%20business%20professional?width=1200&height=630&nologo=true"

POSTS_DIR="/home/hongk/.openclaw/workspace/projects/blog-finance/content/posts"
cd "$POSTS_DIR"

count=0
seed=1

for file in *.md; do
    if [ -f "$file" ]; then
        if grep -q "^image:" "$file"; then
            echo "跳過 $file（已有 image 欄位）"
            continue
        fi
        
        category=$(grep "^category:" "$file" | sed 's/category: *//' | tr -d '"')
        
        if [ -n "$category" ] && [ -n "${CATEGORY_URLS[$category]}" ]; then
            base_url="${CATEGORY_URLS[$category]}"
            image_url="${base_url}&seed=${seed}"
            
            if grep -q "^publishedAt:" "$file"; then
                sed -i "/^publishedAt:/a image: \"${image_url}\"" "$file"
            elif grep -q "^seoTitle:" "$file"; then
                sed -i "/^seoTitle:/i image: \"${image_url}\"" "$file"
            fi
            
            echo "已處理: $file (category: $category, seed: $seed)"
            count=$((count + 1))
            seed=$((seed + 1))
        else
            echo "警告: $file 的 category '$category' 沒有對應的 URL"
        fi
    fi
done

echo ""
echo "===================="
echo "總計已加入 image 欄位的文章數: $count"
