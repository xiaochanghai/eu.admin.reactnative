# EU Cloud Mobile 设计说明

> 状态：`CURRENT`\
> 适用范围：当前仓库\
> 最后核对：2026-09-09\
> 文档入口：[docs/README.md](docs/README.md)

## 1. 产品与技术定位

EU Cloud Mobile 是一个以 Expo Router 为导航核心的 React Native 应用，同时支持 Android、iOS
和 Web。应用面向多类用户提供 ERP 业务、设备维修和 AI Chat 三套主要工作区，并共享认证、网络、
主题、存储、隐私协议、更新和通知基础能力。

设计目标：

- 一套业务代码覆盖多平台，在确有平台差异时使用文件后缀隔离实现；
- 路由只负责页面编排，领域能力由 API、Feature 和公共组件承担；
- 登录状态、网络入口和持久化各有单一 owner；
- 原生 Binary 与 OTA Bundle 通过 `runtimeVersion` 明确兼容边界；
- Chat 的付费模型访问、密钥和请求限制保持在服务端边界。

## 2. 系统上下文

```text
Android / iOS / Web 用户
          │
          ▼
Expo Router 页面与 Route Groups (`src/app`)
          │
    ┌─────┼──────────────┐
    ▼     ▼              ▼
业务组件  Chat Feature   通用组件/Lib
    │     │              │
    └─────┼──────────────┘
          ▼
API 层 / React Query / Axios
          │
    ┌─────┴──────────────┐
    ▼                    ▼
EU Cloud Backend    Expo Web API `/api/chat`
                             │
                             ▼
                       Anthropic API
```

依赖方向必须保持从页面装配指向领域能力，再指向基础设施；基础设施不得反向依赖具体页面。

## 3. 代码分层

| 层         | 职责                                          | 主要路径               |
| ---------- | --------------------------------------------- | ---------------------- |
| Route      | 路由、页面入口、布局和导航参数                | `src/app/**`           |
| Feature    | 跨页面的完整领域能力                          | `src/features/**`      |
| Components | 可复用展示、交互、业务组件                    | `src/components/**`    |
| API        | HTTP Client、React Query、业务端点和响应类型  | `src/api/**`           |
| Lib        | Auth、Storage、Theme、i18n、平台工具和 Hooks  | `src/lib/**`           |
| Config     | Expo、EAS、环境、Metro、Babel、测试和代码质量 | 仓库根配置文件         |
| Native     | 平台工程和原生定制                            | `android/**`、`ios/**` |

详细拥有关系见 [客户端模块地图](docs/模块/客户端模块地图.md)。

## 4. 路由与工作区

根路由 `src/app/index.tsx` 根据持久化用户的 `UserType` 选择工作区：

- 默认业务用户进入 `/(app)`，包含首页、生产、库存、订单和个人中心；
- `Repair` 用户进入 `/(repair)`，包含首页、设备、维修、分析和个人中心；
- `Chat` 用户进入 `/(chat)`，包含对话、项目、附件、模型选择和 Chat 设置。

路由组用于布局和导航分区，不改变公开 URL 的语义。详情、编辑、通知、设置、协议和测试页面位于
根路由下。页面跳转必须考虑直接 URL/Deep Link 打开、Web 刷新、无历史栈回退和未登录状态。

## 5. 启动生命周期

`src/app/_layout.tsx` 是启动编排 owner：

1. 加载全局样式和中文日期区域；字体配置与实际应用范围见第 11 节；
2. 恢复认证与主题，并阻止原生 Splash 过早隐藏；
3. 初始化推送监听、OTA 检查和设备注册；
4. 装配 Gesture、Keyboard、Theme、React Query、Bottom Sheet、Toast 等 Provider；
5. 首次根布局可见时隐藏 Splash，并通过 `expo-observe` 标记应用可交互；
6. 根据隐私同意状态和当前路径决定是否展示隐私弹窗。

启动任务需要明确“必须阻塞首屏”还是“可后台完成”。只有阻塞首屏的初始化才应参与 ready/TTI；
OTA 查询、版本查询和推送注册当前在页面装配后异步执行，不应让首屏无限等待。

## 6. 状态与持久化

- 服务端数据：由 TanStack Query 的全局 `QueryClient` 管理；查询 key、失效和错误语义留在领域 API。
- 认证状态：由 Zustand Auth Store 管理，并通过统一 Storage 保存 Token。
- 原生持久化：MMKV，实例 ID 为 `eucloud`。
- Web 持久化：同一模块名的平台实现封装 `localStorage`；服务端渲染阶段使用内存 Map 避免访问
  `window`。
- Chat 历史：由 `src/features/chat/chat-storage.ts` 管理；Base64 附件内容不进入持久历史。
- Theme、首次启动和隐私同意：由 `src/lib/hooks/**` 与统一 Storage 管理。

不得在页面里引入新的裸存储 key 而不说明 owner、清理时点和跨平台行为。登出时必须清理所有与
用户身份绑定的数据，不能只清 Zustand 内存状态。

## 7. 网络、认证与错误边界

`src/api/common/http.tsx` 创建共享 Axios 实例，统一注入 Bearer Token、设备 UUID、平台信息和可选
筛选头，并集中处理超时、网络错误、业务状态及 401 登出。业务 API 从 `src/api/index.tsx` 暴露，
页面优先消费领域方法或 Query Hook。

认证的详细状态和变更检查见
[认证与会话生命周期](docs/架构/认证与会话生命周期.md)。HTTP 层不能把 Toast 文案当作错误恢复；
调用方仍需为重试、空态和取消提供明确行为。

## 8. Chat 与 AI 边界

Chat 由两部分组成：

- 客户端：`src/features/chat/**` 和 `src/app/(chat)/**`，负责 UI、流式状态、附件选择、偏好和历史；
- 服务端：`src/app/api/chat+api.ts`，负责认证、请求校验、模型映射、Anthropic 调用和错误清洗。

原生客户端不能直接执行 Expo Web API Route，必须通过 `EXPO_PUBLIC_CHAT_API_URL` 指向可访问的
部署端点。完整安全与部署约束见 [Chat AI 配置](docs/chat-ai.md)。

## 9. 跨平台策略

- 共享行为优先放在无后缀文件；平台差异通过 `.web`、`.ios`、`.android` 等文件实现。
- Web 不假定存在原生模块；原生不假定存在 DOM、`window` 或 `localStorage`。
- UI 修改至少核对窄屏 Web 与一个原生目标的布局；涉及键盘、手势、Bottom Sheet、状态栏或系统
  UI 时必须做真机/模拟器验证。
- Expo Go 不包含所有自定义原生依赖。涉及 MMKV、推送、Observe 等能力时使用 Development Build
  或 Release Build 验证。

## 10. 配置、构建与发布

`env.js` 负责选择 `.env.development`、`.env.staging` 或 `.env.production`，用 Zod 校验并区分
client/build-time 变量。`app.config.ts` 生成 Expo 配置；`eas.json` 定义 development、staging、
production 和 simulator profile。

新增原生依赖会改变 Binary 的 JS/Native 合同。当前 Observe 接入使用独立 runtime revision，后续
每次原生 ABI 变化仍必须更新兼容边界并先构建 Binary。详见
[配置、构建与发布](docs/架构/配置构建与发布.md)。

## 11. 当前 UI 基线与修改约束

> 状态：`CURRENT`\
> 本节源码核对：2026-09-19。描述当前实现及后续修改约束；未进行运行截图验收。

### 11.1 整体外观与工作区差异

当前产品以白色、中性灰、深色文字和圆角控件组织信息，橙色用于部分业务强调和导航选中态。
业务首页重视数据概览、快捷入口和活动列表；登录页突出表单；Chat 为连续阅读与输入预留空间。
各工作区已有不同的布局和操作色，修改时先沿用目标页面的结构与相邻页面的习惯。

| 场景     | 当前实现                                                                                   | 源码依据                                                                                                    |
| -------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| 登录     | 白底／深中性灰底，居中的图标与“欢迎回来”，单列表单；浅色黑底白字、深色白底黑字的登录按钮   | [LoginForm](src/components/login-form.tsx)                                                                  |
| ERP 首页 | 浅灰画布、白色带轻边框卡片；两列数据概览、四列功能入口、活动列表；橙色关键值与多色业务图标 | [ERP 首页](<src/app/(app)/index.tsx>)                                                                       |
| 维修首页 | 双列渐变统计卡、四列快捷入口、带状态色与左侧色条的待办行                                   | [维修首页](<src/app/(repair)/index.tsx>)                                                                    |
| Chat     | 中性灰侧栏、白色／深色会话区；Web 内容居中限宽，底部圆角输入区使用黑白发送操作             | [ChatShell](src/features/chat/chat-ui.tsx)、[Web 输入区](src/features/chat/components/prompt-input.web.tsx) |
| 业务导航 | 居中 Header 标题，底部图标加文字 Tabs；选中态读取 Router Theme 主色                        | [NavHeader](src/components/ui/nav-header.tsx)、[Tabs](src/components/tabs/custom-tab-bar.tsx)               |

这些是现有布局依据，不能据此宣称所有页面已完成视觉统一。维修页的渐变、ERP 的业务图标颜色、
Chat 输入区的轻阴影均为当前实现，调整它们应作为明确的页面或组件变更。

### 11.2 颜色与主题的真实入口

原始色阶由 [colors.js](src/components/ui/colors.js) 提供，包含 `neutral`、`charcoal`、`primary`、
`success`、`warning`、`danger`。主题 Hook 的当前映射如下：

| 属性                  | Light                  | Dark                   | 含义               |
| --------------------- | ---------------------- | ---------------------- | ------------------ |
| `background`          | white                  | charcoal-950           | 主题背景           |
| `card`                | white                  | charcoal-850           | 主题卡片色         |
| `surface`             | neutral-50             | charcoal-900           | 表面色             |
| `text` / `foreground` | charcoal-900           | charcoal-100           | 主要文字           |
| `textSecondary`       | neutral-600            | charcoal-300           | 次要文字           |
| `muted`               | neutral-100            | charcoal-800           | 弱化背景，非文字色 |
| `border`              | neutral-200            | charcoal-500           | 边界色             |
| `accent`              | primary-600（#F28B25） | primary-200（#FFDEA8） | 主题强调色         |

来源：[useAppColorScheme](src/lib/hooks/use-app-color-scheme.tsx)。页面目前同时使用主题 Hook、
NativeWind 色阶与局部样式；上表不代表每个页面都已经使用这些属性。
[Router Theme](src/lib/use-theme-config.tsx) 的深色分支映射多个属性，浅色分支只覆盖 primary 与
background，其余继承 DefaultTheme。

[global.css](global.css) 当前只有 Tailwind 指令，没有 `--action-bg`、`--track` 等 CSS 变量。
新增或修改 UI 应优先复用已有主题属性或色阶，并补齐对应的深色状态。品牌橙不要求覆盖登录、Chat
等现有黑白操作；状态色与业务分类色仍需保留明确语义，不能只靠颜色传达状态。

### 11.3 排版、间距与圆角

[Tailwind 配置](tailwind.config.js) 声明了 `font-inter`，
[Expo 配置](app.config.ts) 通过字体插件注册 `assets/fonts/Inter.ttf`。
共享 [Text](src/components/ui/text.tsx) 默认使用 `text-base`、常规字重及浅深主题文字颜色，
没有全局 Inter、固定字距或标题 variant。共享 Button 标签显式使用 `font-inter`。
根布局当前没有 Web `useFonts` 加载流程，不能把字体资源存在描述成全平台字体已统一。

尺寸以对应页面为参考，以下是源码中的实例，不是全局强制令牌：

- 登录：左右内边距 24、内容最大宽度 420；标题 32 / 40、字距 -0.6；输入框与按钮高 56、
  `rounded-xl`，说明文字使用 `text-sm` 或 `text-xs`。
- ERP 首页：内容内边距 16，底部 32；卡片使用 `rounded-2xl` 和 `p-4`，标题与关键数字有明确
  字重、字号层级，标签和元数据使用 `text-sm` / `text-xs`。
- 维修统计卡：圆角与内边距均为 16；快捷入口和待办使用各自的图标、状态与文字层级。
- Web Chat：会话列表与输入区最大宽度 820；输入容器圆角 26，输入文字 15 / 24。

新增内容优先采用同类组件已有的字号与间距，避免局部引入大量近似值。修改字体需验证中文回退、
长文本和系统字体放大；代码块保留等宽排版。不要将“统一 26px 页面边距”或“所有标题负字距”
当作已落地的项目规则。

### 11.4 组件复用与表面层级

公共组件以 [UI 导出](src/components/ui/index.tsx) 为准，已有 Text、Button、Input、
InputWithIcon、Checkbox、Select、Modal、NavHeader、Toast 等。当前没有独立共享的 Card、Divider、
Chip 组件；页面中的卡片和分隔大多由 View 与样式组合。

- [Button](src/components/ui/button.tsx)：已有 default、primary、secondary、outline、destructive、
  ghost、link 变体。default 为描边样式；primary/secondary 为橙底白字；登录页通过属性覆盖为
  黑白主操作。复用前检查具体变体和主题状态，不假定所有主按钮使用同一配方。
- [Input](src/components/ui/input.tsx)：已有 label、error、disabled 和 focused 样式，当前 focus
  使用紫色边框与阴影。这是局部实现，不是全站品牌色；若需统一，应明确修改共享组件并回归调用方。
- [InputWithIcon](src/components/ui/input-with-icon.tsx)：登录表单实际使用的输入组件，通过
  focusColor 与 className 定制中性色边框。修改普通 Input 不等于修改了登录输入框。
- 普通业务卡片目前允许轻边框，维修统计卡使用渐变，Web Chat 输入区有轻阴影。
  修改时以分组、可读性和交互状态为依据，不机械移除全部描边、阴影或渐变。

### 11.5 导航、响应式与平台行为

ERP 和维修继续使用 [TabLayout](src/components/tabs/tab-layout.tsx)；当前自定义 Tab 栏基础高度
为 54，并叠加底部安全区。共享 Header 标题居中，背景随浅深主题变化。当前返回按钮直接调用
`router.back()`，无历史栈的安全回退尚不能作为已实现能力描述。

Chat 使用侧栏／抽屉结构，Header、消息、会话列表和输入区有平台变体。
调整前同时核对 [Chat 组件目录](src/features/chat/components) 中对应的默认文件与平台文件，
不得用单一 Web 布局替代原生键盘、菜单、手势和安全区行为。

布局变化应验证窄屏、宽屏、长文案、Safe Area 和键盘展开后的操作可达性。直接 URL、刷新与
无历史栈返回属于验证场景，未验证时不能声称已通过。现有图标体系沿用所在模块的实现，不为了
外观调整增加另一套图标依赖。

### 11.6 修改与验收要求

1. 先定位页面及其组件、主题和平台文件，说明本次调整的范围与依据。
2. 保留工作区的信息顺序与业务入口；对共享组件的调整检查实际调用方。
3. 覆盖浅色、深色、加载、空数据、错误、禁用和按压／焦点状态；保留输入错误说明、提交反馈和
   可访问名称，状态不能仅通过颜色区分。
4. 检查布局、滚动、键盘和返回；Chat 还需检查长回复、附件、流式生成与停止操作。
5. 按 [测试与交付门禁](docs/开发/测试与交付门禁.md) 执行与改动匹配的验证，记录实际检查的平台
   与状态。源码核对、Web 构建、截图和真机交互是不同证据，不可相互替代。
6. 只有实现并验证后才更新“已集成”状态。未来的全局字体、语义变量、基础组件或品牌改造应单独
   标为 `PLANNED`，写明范围，不能覆盖本节的当前事实。

## 12. 设计不变量

- 不新增第二套路由、HTTP、认证或存储基础设施。
- 页面不直接持有跨页面、跨会话的权威状态。
- 认证失败时先阻断受保护操作，再清理会话并导航；不得继续调用付费或敏感服务。
- 密钥不得进入客户端 Bundle。
- 原生 ABI 变化不得通过相同 runtimeVersion OTA 到旧 Binary。
- 平台专用实现必须保有共享的公开接口。
- CURRENT 文档只描述已落地行为；未来方案必须标为 `PLANNED`。

## 13. 变更入口

- 找模块和 owner：[客户端模块地图](docs/模块/客户端模块地图.md)
- 判断需要改哪些层：[修改路由与影响矩阵](docs/开发/修改路由与影响矩阵.md)
- 选择验证命令：[测试与交付门禁](docs/开发/测试与交付门禁.md)
- 更新文档：[文档维护规范](docs/开发/文档维护规范.md)
