<h1 align="center">
  优智云 EUCloud
</h1>

<p align="center">
  <strong>企业资源管理（ERP）移动应用</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Expo-57.0.4-000020?style=flat&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/React_Native-0.86.0-61DAFB?style=flat&logo=react&logoColor=white" alt="React Native" />
  <img src="https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-6.0.3-3178C6?style=flat&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/NativeWind-4.1.21-38BDF8?style=flat&logo=tailwindcss&logoColor=white" alt="NativeWind" />
</p>

## 📖 项目简介

优智云（EUCloud）是一款面向制造业的企业资源管理（ERP）移动应用，专注于生产管理、库存管理、订单管理和维修服务等核心业务流程。采用现代化的技术栈和最佳实践，提供流畅的用户体验和高性能表现。

## ✨ 核心特性

- **🏭 生产管理** - 生产计划、任务分配、工序管理、设备监控、生产报表
- **📦 库存管理** - 库存查询、实时监控、库存预警、物料管理
- **📋 订单管理** - 订单列表、状态跟踪、订单详情
- **✅ 质量管理** - 质量概览、质量检验、缺陷管理、质量报表
- **🔧 设备与维修** - 设备档案、维护计划、维修工单、维修分析
- **👤 个人中心** - 用户信息、工作统计、消息通知、系统设置
- **📊 数据分析** - 销售、生产、库存和质量数据展示
- **🔐 安全认证** - JWT Token 认证、自动登录、权限管理
- **📱 原生能力** - 二维码扫描、图片选择、PDF/XLSX 查看、JPush 推送

## 🚀 技术栈

### 核心框架

- **[Expo SDK](https://expo.dev/) 57.0.4** - React Native 应用开发与构建工具链
- **[React Native](https://reactnative.dev/) 0.86.0** - 跨平台移动开发框架
- **[React](https://react.dev/) 19.2.3** - 使用 React 19 + React Compiler 自动优化
- **[TypeScript](https://www.typescriptlang.org/) 6.0.3** - 严格类型检查
- **[Expo Router](https://docs.expo.dev/router/introduction/) 57.0.4** - 基于文件的路由系统

### 状态管理与数据

- **[Zustand](https://github.com/pmndrs/zustand) 5.0.5** - 轻量级全局状态管理
- **[TanStack Query](https://tanstack.com/query) 5.85.6** - 服务端状态管理和数据同步
- **[React Native MMKV](https://github.com/mrousavy/react-native-mmkv) 4.3.2** - 高性能本地存储
- **[Axios](https://axios-http.com/) 1.18.1** - HTTP 客户端

### UI 与样式

- **[NativeWind](https://www.nativewind.dev/) 4.1.21** - TailwindCSS for React Native
- **[TailwindCSS](https://tailwindcss.com/) 3.4.19** - 实用优先的 CSS 框架
- **[Moti](https://moti.fyi/) 0.29.0** - 声明式动画库
- **[React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) 4.5.0** - 高性能动画引擎
- **[Expo Linear Gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/)** - 渐变效果
- **[Shopify Flash List](https://shopify.github.io/flash-list/)** - 高性能列表组件

### 表单与验证

- **[React Hook Form](https://react-hook-form.com/) 7.67.0** - 高性能表单管理
- **[Zod](https://zod.dev/) 3.23.8** - TypeScript 优先的数据验证

### 国际化

- **[i18next](https://www.i18next.com/) 23.14.0** - 国际化框架
- **[react-i18next](https://react.i18next.com/) 15.0.1** - React 国际化绑定

### 其他核心库

- **[React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/) 2.32.0** - 手势处理
- **[React Native PDF](https://github.com/wonday/react-native-pdf) 7.0.4** - PDF 查看器
- **[JPush React Native](https://github.com/jpush/jpush-react-native) 3.1.9** - 消息推送
- **[Expo Camera](https://docs.expo.dev/versions/latest/sdk/camera/)** - 相机功能
- **[Expo Image Picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)** - 图片选择器

### 开发工具

- **[Husky](https://typicode.github.io/husky/)** - Git Hooks 自动化
- **[Lint-staged](https://github.com/lint-staged/lint-staged)** - Git 暂存文件检查
- **[ESLint](https://eslint.org/)** + **[Prettier](https://prettier.io/)** - 代码规范和格式化
- **[Jest](https://jestjs.io/)** + **[React Testing Library](https://testing-library.com/docs/react-native-testing-library/intro/)** - 单元测试
- **[Maestro](https://maestro.mobile.dev/)** - E2E 测试

## 📁 项目结构

```text
eu.admin.reactnative/
├─ src/
│  ├─ app/
│  │  ├─ (app)/             # 主应用：主页/生产/库存/订单/我的
│  │  ├─ (repair)/          # 维修应用：主页/设备/维修/分析/我的
│  │  ├─ analytics/         # 数据分析
│  │  ├─ equipment/         # 设备详情与新增
│  │  ├─ material/          # 物料列表与详情
│  │  ├─ notification/      # 消息通知
│  │  ├─ production/        # 生产业务详情
│  │  ├─ quality/           # 质量管理
│  │  ├─ repair-order/      # 维修工单
│  │  └─ settings/          # 系统设置与文件查看
│  ├─ api/                  # HTTP 客户端与业务接口
│  ├─ components/           # 通用 UI 与业务组件
│  ├─ lib/                  # 认证、存储、主题、国际化和 Hooks
│  ├─ translations/         # 中英文翻译资源
│  └─ types/                # 共享 TypeScript 类型
├─ assets/                  # 图标、启动图和字体
├─ android/                 # Android 原生工程
├─ ios/                     # iOS 原生工程
├─ app.config.ts            # Expo 应用配置
├─ env.js                   # 环境变量加载与校验
├─ eas.json                 # EAS Build/Submit 配置
└─ package.json             # 依赖与脚本
```

## 🛠️ 快速开始

### 环境要求

- Node.js：项目暂未在 `package.json` 中固定版本，请使用与 Expo SDK 57 兼容的版本
- pnpm 10.12.3
- iOS：macOS、Xcode 和 CocoaPods
- Android：Android Studio、Android SDK、模拟器或真机

### 安装依赖

```bash
# 使用 pnpm 安装依赖
pnpm install

# 生成原生代码
pnpm prebuild
```

### 开发运行

```bash
# 启动开发服务器
pnpm start

# 启动并清除缓存
pnpm start:reset

# 运行 iOS (需要 macOS)
pnpm ios

# 运行 Android
pnpm android
```

### 环境配置

项目支持三个环境：

- **Development** - 开发环境
- **Staging** - 预发布环境
- **Production** - 生产环境

环境变量配置文件：

```bash
.env.development    # 开发环境 (默认)
.env.staging       # 预发布环境
.env.production    # 生产环境
```

各环境文件需要提供以下变量，请勿在文档或日志中暴露真实值：

```dotenv
API_URL=
SECRET_KEY=
VAR_NUMBER=
VAR_BOOL=
LOGIN_REQUIRED=
JPUSH_APPKEY=
JPUSH_CHANNEL=
```

切换环境：

```bash
# 使用项目内置环境脚本
pnpm start:staging
pnpm android:production
pnpm ios:staging
```

未设置 `APP_ENV` 时默认使用 `development`。非生产环境的 Bundle ID 和 Package 会自动追加环境后缀，应用图标也会显示环境与版本角标。

## 🏗️ 构建发布

### 常用构建

```bash
# 生产环境构建
pnpm build:production:ios
pnpm build:production:android

# 预发布环境构建
pnpm build:staging:ios
pnpm build:staging:android
```

### EAS 构建

```bash
# 开发环境
pnpm build:development:ios
pnpm build:development:android

# 预发布环境
pnpm build:staging:ios
pnpm build:staging:android

# 生产环境
pnpm build:production:ios
pnpm build:production:android

# 清除缓存并构建
pnpm build:production:ios --clear-cache
```

### OTA 更新

```bash
# 发布生产环境更新
pnpm update:prod

# 发布开发环境更新
pnpm update:dev

# 发布预发布环境更新
pnpm update:staging
```

更新分别发布到 `production`、`development` 和 `staging` channel。`update:prod` 与 `update:dev` 使用类 Unix `date` 命令生成消息，Windows 用户应在 Git Bash、WSL 或 CI 中运行，或先调整脚本。

## 🧪 测试

```bash
# 运行单元测试
pnpm test

# 运行 CI 测试并生成覆盖率报告
pnpm test:ci

# 类型检查
pnpm type-check

# 代码检查
pnpm lint

# 运行所有检查
pnpm check-all

# E2E 测试
pnpm e2e-test

# Expo 项目诊断
pnpm doctor
```

## 📱 应用信息

- **应用名称**: 优智云 (EUCloud)
- **Bundle ID**: com.eucloud.erp
- **Package**: com.eucloud.erp
- **Scheme**: eucloud
- **版本**: 1.0.0
- **构建号**: 2
- **EAS Project ID**: 9d0f9588-d00f-40cf-a15c-ffd7e8bc7654

## 🎯 主要功能模块

### 1. 首页模块
- 用户欢迎和问候
- 数据概览卡片（今日订单、生产任务、库存预警、质检合格率）
- 功能模块快捷入口（物料、生产、库存、订单、质量、数据分析等）
- 最近活动时间线

### 2. 生产管理模块
- **生产计划** - 计划创建、排期、状态管理
- **生产任务** - 任务分配、进度跟踪、完成报告
- **工序管理** - 工序流程、工序状态、工时统计
- **设备管理** - 设备监控、维护记录、运行状态
- **生产报表** - 生产数据统计、效率分析、质量报表

### 3. 库存管理模块
- 库存实时查询
- 库存预警提醒
- 物料信息管理

### 4. 订单管理模块
- 订单列表展示
- 订单详情查看
- 订单状态跟踪

### 5. 个人中心模块
- 用户信息展示（头像、姓名、角色、部门）
- 工作统计（待处理任务、今日完成、任务完成率）
- 功能菜单（个人资料、账号安全、消息通知、在线客服）
- 工作统计进度条（任务完成率、计划执行率、质检合格率）
- 退出登录

### 6. 维修模块
- 独立的维修业务系统
- 设备列表、详情、新增和维护记录
- 维修工单列表、详情、新增和进度跟踪
- 设备、维修和效率数据分析

### 7. 系统功能
- JWT Token 认证
- 自动登录
- 二维码扫描
- 消息通知
- 多语言支持（i18n）
- PDF 查看器
- XLSX 文件查看
- 浅色、深色和跟随系统主题
- JPush 消息推送

## 🌟 技术亮点

### 性能优化
- ✅ **React 19 + React Compiler** - 自动优化渲染性能
- ✅ **Flash List** - 支持高性能长列表
- ✅ **MMKV** - 提供高性能本地键值存储
- ✅ **React Query** - 智能数据缓存和同步
- ✅ **Reanimated** - GPU 加速动画，60fps 流畅体验

### 开发体验
- ✅ **TypeScript 严格模式** - 完整的类型安全
- ✅ **文件路由** - Expo Router 基于文件的路由系统
- ✅ **自动化工作流** - Husky + Lint-staged 自动检查
- ✅ **多环境支持** - Development / Staging / Production
- ✅ **热更新** - EAS Update OTA 更新机制

### 代码质量
- ✅ **多业务页面** - 覆盖生产、库存、订单、质量、设备和维修场景
- ✅ **通用 UI 组件** - 提供表单、弹窗、列表、导航和文件查看组件
- ✅ **模块化设计** - 清晰的代码结构
- ✅ **组件复用** - 高复用性的组件设计
- ✅ **单元测试** - Jest + React Testing Library
- ✅ **E2E 测试** - Maestro 端到端测试

### 用户体验
- ✅ **自定义 TabBar** - 浮动按钮设计
- ✅ **统一导航** - 一致的页面导航体验
- ✅ **暗色模式** - 支持深色主题切换
- ✅ **流畅动画** - Moti + Reanimated 动画
- ✅ **响应式布局** - 适配不同屏幕尺寸

## 📚 开发规范

### 代码风格
- 使用 ESLint + Prettier 保持代码一致性
- 使用 TypeScript 严格模式
- 遵循 React Hooks 最佳实践
- 使用函数式组件

### 命名规范
- 组件文件：PascalCase (例如: `UserProfile.tsx`)
- 工具函数：camelCase (例如: `formatDate.ts`)
- 常量：UPPER_SNAKE_CASE (例如: `API_BASE_URL`)
- 类型定义：PascalCase (例如: `UserType`)

### Git 提交规范
```bash
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式调整
refactor: 代码重构
test: 测试相关
chore: 构建工具或依赖更新
```

### 目录组织
- 业务页面放在 `src/app/` 目录
- 可复用组件放在 `src/components/` 目录
- API 调用放在 `src/api/` 目录
- 工具函数放在 `src/lib/` 目录
- 类型定义放在 `src/types/` 目录

## 🔧 常见问题

### Q: 如何切换环境？
A: 修改对应的 `.env.*` 文件，或使用 `APP_ENV=production` 环境变量。

### Q: 如何添加新的页面？
A: 在 `src/app/` 目录下创建新的 `.tsx` 文件，Expo Router 会自动识别。

### Q: 如何调试？
A: 使用 `pnpm start` 启动开发服务器，然后在设备或模拟器上按 `j` 打开调试菜单。

### Q: 如何发布更新？
A: 使用 EAS Update 进行 OTA 更新：`pnpm update:prod`，或使用 EAS Build 构建新版本。

### Q: 构建失败怎么办？
A: 尝试清除缓存：`pnpm build:production:ios --clear-cache`

## 🤝 贡献指南

欢迎贡献代码、报告问题或提出建议！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证。

## 📞 联系方式

如有问题或建议，请联系开发团队。

---

<p align="center">
  使用 ❤️ 和 React Native 构建
</p>
