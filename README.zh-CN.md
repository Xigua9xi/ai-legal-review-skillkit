# ai-legal-review-skillkit

[English](README.md) | 简体中文

`ai-legal-review-skillkit` 是一个面向 AI 辅助中文合同审查工作流的公开基座模板。

它适合希望构建企业内部法审 skill、合同风险审查规则、公司审查偏好配置、合成测试合同样例和结构化输出规范的团队使用。本项目不提供最终法律意见、不替代人工法务复核，也不用于自动审批或签署合同。

## 项目能做什么

本项目帮助团队把 AI 法审流程做得更规范、更可复核：

- 引导 AI agent 完成审查范围识别、合同文本整理、规则选择、风险识别和报告生成。
- 提供通用合同、销售合同、EPC/工程类合同的公开审查规则。
- 提供公司审查偏好模板，便于不同企业配置自己的付款偏好、责任边界、风险口径和报告风格。
- 提供合成合同样例，用于测试典型风险，不需要公开真实合同。
- 提供机器可读的风险分类和报告 schema，方便后续做校验器、前端展示、评测或自动化工具。
- 提供敏感内容检查脚本，降低误把公司名称、联系人、地址、密钥、内部案例等信息公开的风险。

## 项目不做什么

- 不提供最终法律意见。
- 不判断合同是否可以签署。
- 不替代企业内部审批流程。
- 不包含真实合同、客户数据、内部法审制度或谈判策略。
- 不建议直接用于生产环境，企业应先 fork 并做内部适配。

## 目录说明

```text
skills/
  contract-review/
```

AI 法审 skill 入口。这里定义什么时候触发法审、输入是什么、工作流怎么走、风险等级如何划分、输出应遵守什么原则。

```text
rules/
```

人类可读的审查规则。

- `general-contract-review.md`：通用合同审查规则。
- `sales-contract-review.md`：销售、采购、供货、设备买卖等合同的扩展规则。
- `epc-engineering-review.md`：EPC、工程、施工、调试、变更、索赔等场景的扩展规则。

```text
profiles/
```

公司审查偏好模板。企业 fork 后，通常应该优先修改这里。

- `company-review-preferences.template.md`：企业内部审查偏好空白模板。
- `buyer-side.profile.md`：买方视角。
- `seller-side.profile.md`：卖方视角。
- `conservative-risk.profile.md`：偏保守风险口径。
- `balanced-risk.profile.md`：平衡型风险口径。
- `fast-business-review.profile.md`：业务快速初审口径。

```text
fixtures/
```

合成合同样例。它们不是实际合同，用于演示和测试 AI 是否能识别典型风险。

```text
taxonomies/
```

机器可读的风险分类库。后续可以用于 validator、审查结果归类、前端展示、统计分析或评测。

```text
schemas/
```

结构化输出规范。`review-report.schema.json` 约束 AI 输出应包含审查范围、总体结论、风险项和人工复核标记。

```text
templates/
```

审查报告模板，用来统一报告结构。

```text
scripts/
```

本地工具脚本。

- `check-sensitive-content.mjs`：检查公开文件中是否出现高风险敏感内容。
- `print-skill-summary.mjs`：打印 skill 摘要和规则文件列表。

```text
test/
```

自动化测试，覆盖 schema、taxonomy、profile 存在性和敏感内容扫描。

## 快速开始

在本项目目录下运行：

```powershell
npm.cmd test
npm.cmd run lint
npm.cmd run demo
```

说明：

- `npm.cmd test`：运行所有测试。
- `npm.cmd run lint`：运行敏感内容检查。
- `npm.cmd run demo`：打印 skill 摘要。

不需要 API key。

## 企业如何基于本项目改造

建议流程：

1. 将本仓库 fork 或复制到企业内部私有仓库。
2. 从 `profiles/company-review-preferences.template.md` 开始，填写企业自己的审查偏好。
3. 根据业务角色选择或复制 `buyer-side.profile.md`、`seller-side.profile.md`、`balanced-risk.profile.md` 等 profile。
4. 修改 `skills/contract-review/SKILL.md`，让工作流加载企业自己的 profile 和规则。
5. 在 `rules/` 中补充企业常见合同类型、谈判口径、升级复核条件和条款修改偏好。
6. 在 `fixtures/` 中添加合成或彻底脱敏后的合同样例。
7. 修改 `templates/report-template.md`，适配企业内部报告格式。
8. 每次准备公开或提交 PR 前运行 `npm.cmd run lint`。

## 哪些文件应该改

企业内部 fork 后，通常会修改：

- `profiles/company-review-preferences.template.md`：填写企业审查偏好。
- `profiles/*.profile.md`：按买方、卖方、业务线、风险口径建立不同 profile。
- `rules/*.md`：补充企业常见风险、审查规则和谈判建议。
- `taxonomies/*.json`：增加机器可读风险分类。
- `templates/report-template.md`：调整报告结构和措辞。
- `fixtures/synthetic-contracts/*.md`：增加合成测试样例。

## 哪些内容不要公开

不要公开：

- 真实客户名、供应商名、项目名、地址、手机号、邮箱、合同编号、银行账号、税号、身份证号、签章信息。
- 企业内部审批阈值、价格政策、风险偏好、谈判底线、升级汇报规则。
- 未经授权的真实合同条款。
- 能够反推出具体交易、客户或项目的信息。

如果需要开源，请把真实内容改写成合成样例。

## 作为公开基座模板的用法

本项目的定位不是直接给出某一家公司的最终法审系统，而是提供一个公开基座。

不同企业可以在私有仓库中演化自己的版本：

- 制造业企业可以强化付款、交付、验收、质保、违约责任。
- EPC/工程企业可以强化承包范围、工期顺延、变更、索赔、分包、工程款支付。
- SaaS 或技术服务企业可以强化数据合规、知识产权、服务等级、保密和开源软件使用。
- 集团型企业可以按业务线维护多个 profile。

## 空白和脱敏字段如何处理

空白、占位符、脱敏字段通常应先归为 `to_confirm`，不要直接认定为高风险。

但如果空缺内容影响主体身份、合同金额、付款条件、验收标准、责任上限、争议解决或签署权限，应提示人工重点确认。

## 后续可贡献方向

适合公开贡献的方向：

- 增加更多合成合同样例。
- 增加 expected findings，用于评测 AI 输出质量。
- 扩展风险 taxonomy。
- 增加 schema validator CLI。
- 增加 profile 选择指南。
- 增强敏感内容检测。
- 增加工作流图。

更多可复制到 GitHub 的 issue 草稿见 `.github/ISSUE_DRAFTS.md`。

## 安全提醒

公开前请检查：

- 是否运行过 `npm.cmd run lint`。
- 是否包含真实公司名、项目名、联系人、地址、合同编号、税号、银行账号等。
- 是否包含内部审批规则、谈判底线或风险偏好。
- 是否把真实合同片段改写成合成样例。

## 当前状态

本项目目前是早期公开基座模板，重点在结构、脱敏、安全边界、通用规则、profile 模板和合成样例。后续可以继续增强校验、评测和垂直合同类型覆盖。
