# EU Cloud Mobile Agent Index

本文件是当前 Expo / React Native 仓库的渐进式披露入口。先按任务定位事实源，再阅读拥有模块的
文档和源码；不要在开始任务时无差别读取全部页面和长文档。

## 1. 开始任务前

1. 用 `git status --short` 确认用户已有改动，不覆盖、不回滚、不顺手格式化无关文件。
2. 将任务归类为 `APP`、`CHAT`、`API-AUTH`、`NATIVE-RELEASE` 或 `DOCS`；跨范围时同时声明。
3. 阅读根 [设计说明](design.md) 和 [文档索引](docs/README.md)，再按下表继续下钻。
4. 用源码、配置和测试核对文档；文档不是替代源码的第二套实现。
5. 只修改任务拥有路径，并运行与风险匹配的最小验证。

## 2. 任务路由

| 修改范围                                | 必读                                                                                                 | 主要拥有路径                                                                   |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| 根布局、启动、Provider、Splash、Observe | [设计说明](design.md)、[客户端架构总览](docs/架构/客户端架构总览.md)                                 | `src/app/_layout.tsx`                                                          |
| 页面、导航、Tabs、Deep Link             | [客户端模块地图](docs/模块/客户端模块地图.md)、[修改路由与影响矩阵](docs/开发/修改路由与影响矩阵.md) | `src/app/**`、`src/components/tabs/**`                                         |
| 登录、Token、登出、用户分流             | [认证与会话生命周期](docs/架构/认证与会话生命周期.md)                                                | `src/lib/auth/**`、`src/lib/user/**`、`src/app/login.tsx`、`src/app/index.tsx` |
| HTTP、React Query、业务 API             | [客户端架构总览](docs/架构/客户端架构总览.md)                                                        | `src/api/**`                                                                   |
| Chat UI、会话、附件、持久化             | [Chat AI 配置](docs/chat-ai.md)、[客户端模块地图](docs/模块/客户端模块地图.md)                       | `src/features/chat/**`、`src/app/(chat)/**`                                    |
| Chat 模型调用或服务端路由               | [Chat AI 配置](docs/chat-ai.md)                                                                      | `src/app/api/chat+api.ts`                                                      |
| 通用 UI、主题、国际化、平台适配         | [客户端模块地图](docs/模块/客户端模块地图.md)                                                        | `src/components/**`、`src/lib/**`、`src/translations/**`                       |
| 环境变量、原生依赖、EAS Build/Update    | [配置、构建与发布](docs/架构/配置构建与发布.md)                                                      | `env.js`、`.env.*`、`app.config.ts`、`eas.json`、`package.json`、原生目录      |
| 测试、Lint、交付                        | [测试与交付门禁](docs/开发/测试与交付门禁.md)                                                        | 测试文件及相关配置                                                             |
| 文档新增或架构变化                      | [文档维护规范](docs/开发/文档维护规范.md)                                                            | `AGENTS.md`、`design.md`、`docs/**`                                            |

## 3. 固定架构边界

- `src/app/**` 负责 Expo Router 路由和页面装配；可复用业务实现放入 `src/features/**` 或
  `src/components/**`，不得把大型业务状态堆进路由文件。
- `src/api/**` 是业务 HTTP 和 React Query 的统一入口。页面不得另建第二套 Axios 客户端；新领域
  API 应进入 `src/api/modules/**` 或独立领域目录，并从 `src/api/index.tsx` 导出。
- `src/lib/auth/**` 是登录状态及 Token 持久化 owner。登录、登出、401 处理必须保持 Store 与持久化
  数据一致。
- 原生持久化使用 `src/lib/storage.tsx` 的 MMKV，Web 使用 `src/lib/storage.web.tsx` 的
  `localStorage` 适配。调用方从统一模块导入，不直接根据平台复制存储逻辑。
- `src/features/chat/**` 拥有 Chat UI、会话状态、附件和本地历史；`src/app/api/chat+api.ts` 是当前
  模型请求的服务端边界。模型密钥不得进入客户端环境、Expo `extra` 或 `EXPO_PUBLIC_*`。
- `.web.tsx`、`.ios.tsx`、`.android.tsx`、`.swiftui.tsx` 等文件是有意的平台实现。修改共享组件时
  必须核对各平台解析结果，不能只验证当前运行平台。
- 根 Provider 顺序、认证恢复、隐私弹窗、推送注册、OTA 检查、Splash 和 Observe 都属于启动
  生命周期。变更其中任一项时必须检查其余启动行为。

## 4. UI 修改依据（按当前源码汇总）

本节描述项目现有实现；UI 任务先读 [当前 UI 基线](design.md#11-当前-ui-基线与修改约束)，
再核对目标页面、共享组件与平台文件。沿用所属工作区的实际样式，不把期望中的统一方案写成现状。

- **工作区布局**：ERP 使用浅灰画布、白色轻边框圆角卡片、数据概览与业务入口；维修首页使用
  双列渐变统计卡、快捷入口和带状态色的任务行；Chat 使用侧栏／抽屉、连续会话与底部输入区。
  登录页为居中限宽单列表单，登录与 Chat 发送操作采用黑白对比。保留各工作区的信息层级。
- **颜色入口**：复用 `src/components/ui/colors.js`、`src/lib/hooks/use-app-color-scheme.tsx`
  和 `src/lib/use-theme-config.tsx`。主题强调色浅色为 primary-600（#F28B25）、深色为
  primary-200（#FFDEA8）；页面还存在紫色强调、多色业务图标和状态色，当前并未全局统一。
  `muted` 表示弱化背景，次要文字使用 `textSecondary`；不能仅改主题 Hook 就认定所有页面已迁移。
- **按钮**：共享 `Button` 的 default 是描边样式，primary/secondary 为橙底白字；登录通过
  属性覆盖为黑白按钮。共享默认圆角为 rounded-md，高度 default/lg/sm 分别为 40/48/32，
  icon 为 36；登录按钮高 56、rounded-xl。修改时核对变体与调用方覆盖，不强制套用单一配方。
- **表单**：普通 `Input`、`NumberInput` 和日期输入分别维护样式，存在紫色焦点边框与阴影；
  `InputWithIcon` 默认为圆角胶囊、橙色焦点，登录通过 `inputClassName` 与 `focusColor`
  定制为中性色圆角矩形。复用实际字段组件，并检查焦点、错误、禁用与键盘行为。
- **排版与尺寸**：共享 `Text` 默认 text-base、常规字重，没有全局标题 variant 或固定行高；
  Button 和 InputWithIcon 显式使用 font-inter，其余组件可使用平台字体。登录标题为 32/40、
  内容最大宽 420、左右留白 24；业务页常见留白 16、卡片 rounded-2xl；Web Chat 内容最大宽
  820、输入容器圆角 26。以上是局部实现，不是全局强制尺寸；新增内容参考同类页面。
- **表面与组件**：公共能力以 `src/components/ui/index.tsx` 的导出为准。当前没有统一的
  field-styles、通用 UI Card/Divider/Chip 或 CSS 语义变量系统；不要假定它们存在。
  普通业务卡片的轻边框、维修统计渐变和 Web Chat 输入区轻阴影均为现有实现。
- **导航与平台**：ERP/维修沿用 Tabs，Chat 保留平台专用 Header、输入区和菜单；核对默认文件与
  .web/.ios/.android 等变体。NavHeader 当前直接调用 router.back()，无历史回退并非已实现保证。
  调整布局时检查浅深主题、窄宽屏、长文本、字体放大、安全区、滚动与键盘。
- **事实与验收**：设置和分析页面仍有演示数据、占位操作或局部状态；必须沿调用链核对，不能
  把可点击外观写成已接入业务能力。源码检查、构建、截图和真机验证分别报告，不宣称已完成
  全项目视觉统一。全局改造需要单独明确范围，文档汇总任务不据此修改应用代码。

## 5. 原生与 OTA 安全

- 安装、升级或移除带原生代码的依赖，或修改原生配置插件时，必须视为 `NATIVE-RELEASE`。
- 任何改变 JS/Native 接口的更新都必须隔离 `runtimeVersion`，并先生成新的 Android/iOS Binary；
  不得把依赖新原生模块的 JS Bundle 推送给旧 Binary。
- `app.config.ts`、`env.js`、`eas.json` 和实际原生工程共同决定发布结果。改动配置后至少运行
  `pnpm exec expo config --type public`；需要原生同步时再运行对应 `prebuild`，且不得无意覆盖用户的
  原生定制。
- EAS Update 只能发布 JS/资源兼容变更。发布命令具有外部影响，除非用户明确要求，不得代为执行。
- `expo-observe` 只在包含该原生模块的新 Binary 中工作；Expo Go 和 Web 不能作为原生采集验收依据。

## 6. 安全与数据

- Token、用户信息和设备标识按敏感数据处理，不写入日志、文档、测试快照或错误响应。
- 客户端输入、附件、路由参数和 API 响应均是不可信输入；跨边界前做大小、类型和状态校验。
- Chat 请求必须先认证再调用付费模型，并保留请求体、附件数量/大小和上游超时限制。
- 真实密钥只存在于服务端或部署平台 Secret；`.env.*` 中可进入客户端的值必须经过 `env.js` 的
  client schema 明确声明。
- 不把仅隐藏 UI 当成授权；业务权限必须由后端验证。

## 7. 修改规则

- 优先采用现有模式和最小直接实现，不为假设中的未来需求增加万能 Store、万能 Hook 或第二套
  网络/路由/存储基础设施。
- 行为变化需要同时覆盖成功、失败、空数据、取消/卸载和平台差异；异步结果不得在失效页面或旧
  会话中继续写回。
- 新增路由时检查根 Stack、所属 route group、入口跳转、回退语义、Web 刷新和类型化路由。
- 新增依赖前确认 Expo SDK 兼容版本，优先使用 `pnpm exec expo install <package>`。
- 使用 `pnpm`；不得用 npm/yarn 改写锁文件。用户已有未提交改动一律保留。
- 行为、路径、环境变量、持久化、发布方式或安全边界改变时，同步更新对应事实源和索引。

## 8. 验证与交付

最低静态检查：

```text
pnpm exec eslint <本次拥有路径>
pnpm exec prettier --check <本次拥有路径>
git diff --check
```

按风险追加：

```text
pnpm run type-check
pnpm run test
pnpm run build:web
pnpm exec expo install --check
pnpm run doctor
```

具体选择见 [测试与交付门禁](docs/开发/测试与交付门禁.md)。纯文档任务不要求运行应用测试或
构建，但必须检查 Markdown 相对链接、路径存在性和 `git diff --check`。若全仓检查存在基线失败，
准确报告，不得修复无关问题后声称全绿。
