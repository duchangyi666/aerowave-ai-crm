/* Fictional fixtures, plus minimized excerpts of committed historical reports. */
(function (root) {
  'use strict';
  const ref = '12749abaa8aa98f7bee988f69fb4aa23e9d5ff29';
  const historicalRef = 'fc80b14dc88406ab6f5e6ec3ed9ca61d632c0674';
  const fixtures = {
    schemaVersion: 1, sourceRef: ref, scenarioId: 'starbridge-policy-v1',
    tenantId: 'demo-org-starbridge',
    customer: { id: 'demo-contact-starbridge', name: 'Apex Retail (北美黑五批采)', leadId: 'demo-lead-standard', product: 'ANC 降噪耳机 Pro 500 件批采包', requestedPriceUsd: 10000, requestedDate: '2026-10-09', status: 'open' },
    goal: '核对北美渠道商 Apex Retail 的 USD 10,000（500 件）压价询盘与 10 月 9 日 DDP 空运交期，准备带引用的英文回复草稿和待审批跟单任务。',
    wiki: [
      { id: 'SRC-PRICE-003', tenantId: 'demo-org-starbridge', revision: 3, title: 'Q4 跨境批采阶梯价 · 当前价格', published: true, active: true, scope: 'organization', terms: ['报价','价格','10000','10,000','批采','折扣','耳机'], content: '2026-10-01 起 Q4 旺季批采价：500 件合计 USD 12,000（$24/台，含多语彩盒与 1 年质保）。销售不能自行折扣；5% 以内须大区经理逐单批准，超过 5% 须跨境商务负责人逐单批准。', section: '当前 Q4 阶梯价与审批红线' },
      { id: 'SRC-DELIVERY-002', tenantId: 'demo-org-starbridge', revision: 2, title: '美西海外仓与 DDP 清关交期规则', published: true, active: true, scope: 'organization', terms: ['交期','交付','DDP','清关','日期','10 月','10月'], content: '跨境空运 DDP 到仓日期须物流与美西海外仓负责人核验舱位与清关排期后方可对买家承诺。买家期望到货日与内部暂定排期不等于已批准交期。', section: '跨境物流承诺边界' },
      { id: 'SRC-PRICE-002', tenantId: 'demo-org-starbridge', revision: 2, title: '淡季批采阶梯价 · 历史价格', published: true, active: false, scope: 'organization', terms: ['报价','价格','10000','10,000'], content: '历史淡季 USD 10,000（$20/台）价格已被 Q4 旺季 v3 替代，不适用于 2026-10-01 起的新增黑五批采单。', section: '已被替代' },
      { id: 'OTHER-TENANT-POLICY', tenantId: 'demo-org-other', revision: 1, title: '其他组织的演示政策', published: true, active: true, scope: 'organization', terms: ['报价','价格'], content: '其他组织的材料不得进入本组织检索结果。', section: '隔离测试' }
    ],
    customerSources: [
      { id: 'SRC-CUSTOMER-017', scope: 'customer', content: 'WhatsApp 原话：Can we lock $10,000 ($20/unit) for 500 units and guarantee DDP delivery to LA before Oct 9?', classification: '海外买家请求，不是批准' },
      { id: 'SRC-REP-019', scope: 'customer', content: '销售已在 WhatsApp 承诺于 2026-10-02 15:00+08:00 前同步 Q4 阶梯价与洛杉矶仓排期确认进展。', classification: '待履行的进展更新承诺' },
      { id: 'SRC-INTERNAL-008', scope: 'customer', content: '物流内部暂定 10 月 12 日空运清关到仓，受旺季舱位影响，严禁先向买家承诺固定交期。', classification: '内部排期意见，不是已批准交期' }
    ],
    capabilities: [
      { name: 'Wiki / RAG', path: 'lib/ai/knowledge/busca.ts', boundary: '生产：受权来源列表 + 组织范围 + embeddings/RPC；这里：执行本地关键词排序与来源过滤，不做向量搜索。' },
      { name: '组织记忆', path: 'lib/agent-engine/agent/org-memory.ts', boundary: '生产：初始/恢复/专家共享已发布母文档与 active entries，恢复重读当前版本；这里：本地 v1/v2 快照。expectedVersion 冲突拒绝是实验室保护，不代表现有发布 API 已实现此契约。' },
      { name: 'Durable runtime', path: 'tests/unit/workbench-durable-queue.test.ts', boundary: '生产：数据库任务队列、checkpoint、恢复；这里：localStorage 恢复，不是服务端持久队列或进程崩溃恢复测试。' },
      { name: 'Eval', path: 'lib/ai/evals/evaluate-run.ts', boundary: '生产：版本化 profile、确定性规则及可选语义 Judge；这里：显式本地断言，不能代替模型质量评估。' },
      { name: 'Golden corpus', path: 'tests/agent-runtime/fixtures/workbench-eval-golden.ts', boundary: '仓库包含真实运行派生的缩减 fixture 和合成回归 fixture。此页不把重建的事件当作原始完整 trace。' }
    ],
    historical: {
      kind: 'committed_report_excerpt', capturedDate: '2026-09-28', provider: 'opencode', model: 'space-bunny-free',
      reportTitle: 'DuoAgent Runtime 与 Eval 真实模型验收', sourcePath: 'docs/testing/multi-agent-eval-real-run-2026-09-28.md',
      reportRunId: '已隐去 · 公开页不显示内部运行标识', mode: 'inspect', sourceRef: historicalRef,
      limitations: '仓库已提交验收报告的最小摘录；本次未重新调用模型、查询原数据库或验证报告所述运行。没有完整原始事件 JSON；不补造逐条工具输入/输出，不展示客户正文或内部推理。',
      specialists: [
        { name: 'customer_evidence', status: 'completed', toolCalls: 3, claims: 29, tools: ['crm_get_contact','crm_list_conversations','crm_get_conversation_history'], outputSummary: '报告记载：历史消息接口为空，客户沟通证据存在缺口。' },
        { name: 'opportunity_diagnosis', status: 'completed', toolCalls: 2, claims: 27, tools: ['crm_get_lead','crm_list_followups / pipeline context'], outputSummary: '报告记载：核对商机、负责人、跟进与 pipeline；没有在这里重建原始 payload。' },
        { name: 'policy_advisor', status: 'partial', toolCalls: 2, claims: 0, tools: ['crm_get_org_memory','crm_search_knowledge'], outputSummary: '报告记载：memory 空，knowledge retrieval unavailable，缺 published_knowledge_sources。' }
      ],
      aggregate: { completedTools: 8, toolErrors: 0, specialists: 3, structuredClaims: 56, groundedWikiEvidence: 0, deterministicRevision: 5, deterministicVerdict: 'needs_review', deterministicScore: 87 },
      judge: { id: 'workbench_semantic_v1:opencode:space-bunny-free', verdict: 'pass', score: 88, durationMs: 19894, inputTokens: 9861, outputTokens: 2114, cacheReadTokens: 5260, costUsd: null, finalVerdict: 'needs_review', finalScore: 87 },
      costNote: '报告未给出货币成本。model 名含 free 不足以证明历史账单为零；此处不估算或伪造成本。'
    }
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = fixtures;
  else root.CRM_LAB_FIXTURES = fixtures;
})(typeof globalThis !== 'undefined' ? globalThis : this);
