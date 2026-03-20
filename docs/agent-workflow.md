# 多 Agent 內容生產系統

## 系統架構

### 參與的 Agents
1. **Agent-Research** - 搜尋參考文章、收集資訊
2. **Agent-Writer** - 以人類風格改寫、創作原創內容
3. **Agent-SEO** - SEO 優化、關鍵字分析、Meta 設定
4. **Agent-Editor** - 最終審核、排版、發布

## 工作流程

```
參考文章 → Agent-Research → Agent-Writer → Agent-SEO → Agent-Editor → 發布
```

## 各 Agent 職責

### Agent-Research
- 搜尋相關主題文章
- 提取關鍵資訊
- 整理大綱

### Agent-Writer
- 根據大綱創作
- 人類化改寫
- 確保原創性

### Agent-SEO
- 關鍵字優化
- Meta 標籤設定
- 內部連結建議

### Agent-Editor
- 內容審核
- 排版調整
- 最終發布

## 使用方式
透過 `sessions_spawn` 呼叫各 Agent，依序執行任務。
