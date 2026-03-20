# Agent 內容生產 Pipeline 配置

## 系統概述

多 Agent 協作系統，用於自動化財經內容生產。

---

## Agent 定義

### Agent-Research（研究型）
- **角色**：資料收集、題材研究、大綱整理
- **輸入**：主題關鍵字
- **輸出**：文章大綱、關鍵字清單、推薦標的

### Agent-Writer（寫作型）
- **角色**：內容創作、人類化改寫
- **輸入**：大綱、關鍵字
- **輸出**：完整文章（800-2000字）

### Agent-SEO（優化型）
- **角色**：SEO分析、關鍵字密度、Meta設定
- **輸入**：文章內容、目標關鍵字
- **輸出**：SEO標題、描述、內部連結建議

### Agent-Editor（審核型）
- **角色**：內容審核、排版調整、最終發布
- **輸入**：文章 + SEO建議
- **輸出**：最終文章、發布狀態

### Agent-Image（圖像型）- 未來
- **角色**：生成配圖、圖表
- **輸入**：文章主題
- **輸出**：特色圖片、資訊圖表

---

## 工作流程

```
┌─────────────┐
│ 主題輸入    │
└──────┬──────┘
       ▼
┌─────────────┐
│Agent-Research│ ──→ 大綱、關鍵字
└──────┬──────┘
       ▼
┌─────────────┐
│Agent-Writer │ ──→ 初稿
└──────┬──────┘
       ▼
┌─────────────┐
│ Agent-SEO   │ ──→ SEO建議
└──────┬──────┘
       ▼
┌─────────────┐
│Agent-Editor │ ──→ 最終文章
└──────┬──────┘
       ▼
┌─────────────┐
│ 發布至Blog  │
└─────────────┘
```

---

## 並行模式

對於獨立任務，可並行執行：

```
               ┌─────────────┐
               │Agent-Research│
               └──────┬──────┘
                      │
       ┌──────────────┼──────────────┐
       ▼              ▼              ▼
┌─────────────┐┌─────────────┐┌─────────────┐
│Agent-Writer ││ Agent-SEO   ││Agent-Image  │
│ (文章A)     ││ (分析A+B)   ││ (圖片A+B)   │
└──────┬──────┘└──────┬──────┘└──────┬──────┘
       │              │              │
       └──────────────┼──────────────┘
                      ▼
               ┌─────────────┐
               │Agent-Editor │
               └──────┬──────┘
                      ▼
               ┌─────────────┐
               │ 發布完成    │
               └─────────────┘
```

---

## 配置範例

### 主題：ETF投資策略
```json
{
  "topic": "ETF投資策略",
  "agents": [
    {
      "id": "agent-research",
      "task": "研究ETF投資題材",
      "timeout": 120
    },
    {
      "id": "agent-writer",
      "task": "撰寫文章",
      "timeout": 180,
      "dependsOn": "agent-research"
    },
    {
      "id": "agent-seo",
      "task": "SEO分析",
      "timeout": 120,
      "parallelWith": "agent-writer"
    },
    {
      "id": "agent-editor",
      "task": "最終審核",
      "timeout": 180,
      "dependsOn": ["agent-writer", "agent-seo"]
    }
  ],
  "output": {
    "path": "/content/posts/",
    "format": "markdown"
  }
}
```

---

## 使用方式

### 1. 啟動單一 Agent
```bash
sessions_spawn(
  task="研究ETF投資策略",
  label="agent-research",
  mode="run",
  timeoutSeconds=120
)
```

### 2. 並行執行多個 Agent
```bash
# 同時啟動 Writer 和 SEO
sessions_spawn(task="...", label="agent-writer", mode="run")
sessions_spawn(task="...", label="agent-seo", mode="run")

# 等待全部完成
sessions_yield(message="等待 Agent 完成...")
```

### 3. 檢查 Agent 狀態
```bash
subagents(action="list")
```

---

## 效能統計

| Agent | 平均執行時間 | Token消耗 |
|-------|-------------|-----------|
| Research | 1-2分鐘 | 30k-35k |
| Writer | 0.5-1分鐘 | 10k-15k |
| SEO | 1-1.5分鐘 | 10k-12k |
| Editor | 2-3分鐘 | 80k-100k |

---

## 未來擴充

1. **Agent-Image**：DALL-E/Midjourney 整合
2. **Agent-FactCheck**：事實查核
3. **Agent-Social**：社群媒體推廣文案
4. **Agent-Analytics**：數據分析報告
