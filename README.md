<h1 align="center">
  优智云 EUCloud
</h1>

<p align="center">
  <strong>企业资源管理（ERP）移动应用</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Expo-53.0.23-000020?style=flat&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/React_Native-0.79.5-61DAFB?style=flat&logo=react&logoColor=white" alt="React Native" />
  <img src="https://img.shields.io/badge/React-19.0.0-61DAFB?style=flat&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=flat&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/NativeWind-4.1.21-38BDF8?style=flat&logo=tailwindcss&logoColor=white" alt="NativeWind" />
</p>

## 📖 项目简介

优智云（EUCloud）是一款面向制造业的企业资源管理（ERP）移动应用，专注于生产管理、库存管理、订单管理和维修服务等核心业务流程。采用现代化的技术栈和最佳实践，提供流畅的用户体验和高性能表现。

## ✨ 核心特性

- **🏭 生产管理** - 生产计划、任务分配、工序管理、设备监控、生产报表
- **📦 库存管理** - 库存查询、实时监控、库存预警、物料管理
- **📋 订单管理** - 订单列表、状态跟踪、订单详情
- **🔧 维修模块** - 独立的维修业务系统，包含维修生产管理
- **👤 个人中心** - 用户信息、工作统计、消息通知、系统设置
- **📊 数据概览** - 实时数据展示、工作统计、性能指标
- **🔐 安全认证** - JWT Token 认证、自动登录、权限管理

## 🚀 技术栈

### 核心框架

- **[Expo SDK](https://expo.dev/) 53.0.23** - 采用最新 Expo 版本，启用新架构
- **[React Native](https://reactnative.dev/) 0.79.5** - 跨平台移动开发框架
- **[React](https://react.dev/) 19.0.0** - 使用 React 19 + React Compiler 自动优化
- **[TypeScript](https://www.typescriptlang.org/) 5.8.3** - 严格类型检查
- **[Expo Router](https://docs.expo.dev/router/introduction/) 5.1.7** - 基于文件的路由系统

### 状态管理与数据

- **[Zustand](https://github.com/pmndrs/zustand) 5.0.5** - 轻量级全局状态管理
- **[TanStack Query](https://tanstack.com/query) 5.52.1** - 服务端状态管理和数据同步
- **[React Native MMKV](https://github.com/mrousavy/react-native-mmkv) 3.1.0** - 高性能本地存储
- **[Axios](https://axios-http.com/) 1.7.5** - HTTP 客户端

### UI 与样式

- **[NativeWind](https://www.nativewind.dev/) 4.1.21** - TailwindCSS for React Native
- **[TailwindCSS](https://tailwindcss.com/) 3.4.4** - 实用优先的 CSS 框架
- **[Moti](https://moti.fyi/) 0.29.0** - 声明式动画库
- **[React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) 3.17.5** - 高性能动画引擎
- **[Expo Linear Gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/)** - 渐变效果
- **[Shopify Flash List](https://shopify.github.io/flash-list/)** - 高性能列表组件

### 表单与验证

- **[React Hook Form](https://react-hook-form.com/) 7.53.0** - 高性能表单管理
- **[Zod](https://zod.dev/) 3.23.8** - TypeScript 优先的数据验证

### 国际化

- **[i18next](https://www.i18next.com/) 23.14.0** - 国际化框架
- **[react-i18next](https://react.i18next.com/) 15.0.1** - React 国际化绑定

### 其他核心库

- **[React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/) 2.24.0** - 手势处理
- **[React Native PDF](https://github.com/wonday/react-native-pdf) 6.7.7** - PDF 查看器
- **[React Native Gifted Chat](https://github.com/FaridSafi/react-native-gifted-chat) 2.8.1** - 聊天组件
- **[Expo Camera](https://docs.expo.dev/versions/latest/sdk/camera/)** - 相机功能
- **[Expo Image Picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)** - 图片选择器

### 开发工具

- **[Husky](https://typicode.github.io/husky/)** - Git Hooks 自动化
- **[Lint-staged](https://github.com/lint-staged/lint-staged)** - Git 暂存文件检查
- **[ESLint](https://eslint.org/)** + **[Prettier](https://prettier.io/)** - 代码规范和格式化
- **[Jest](https://jestjs.io/)** + **[React Testing Library](https://testing-library.com/docs/react-native-testing-library/intro/)** - 单元测试
- **[Maestro](https://maestro.mobile.dev/)** - E2E 测试

## 📁 项目结构

```
eu.admin.rn/
├── src/
│   ├── app/                    # Expo Router 页面（基于文件的路由）
│   │   ├── (app)/             # 主应用 Tab 导航组 (5个Tab)
│   │   │   ├── _layout.tsx    # Tab 布局
│   │   │   ├── index.tsx      # 首页 - 数据概览和快捷入口
│   │   │   ├── production.tsx # 生产管理 - 计划/任务/工序/设备/报表
│   │   │   ├── inventory.tsx  # 库存管理 - 库存查询和预警
│   │   │   ├── order.tsx      # 订单管理 - 订单列表和跟踪
│   │   │   └── profile.tsx    # 个人中心 - 用户信息和设置
│   │   ├── repair/            # 维修模块 (3个Tab)
│   │   │   ├── _layout.tsx    # 维修模块布局
│   │   │   ├── index.tsx      # 维修首页
│   │   │   ├── production.tsx # 维修生产管理
│   │   │   └── profile.tsx    # 维修个人中心
│   │   ├── settings/          # 设置页面
│   │   ├── test/              # 测试页面
│   │   ├── login.tsx          # 登录页面
│   │   ├── onboarding.tsx     # 首次使用引导
│   │   ├── qr-scanner.tsx     # 二维码扫描
│   │   └── _layout.tsx        # 根布局
│   │
│   ├── components/            # 组件库 (105+ 组件)
│   │   ├── ui/               # 通用 UI 组件
│   │   │   ├── icons/        # 图标组件
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── date-picker.tsx
│   │   │   ├── nav-header.tsx
│   │   │   └── ...
│   │   ├── production/       # 生产管理组件
│   │   │   ├── plan.tsx      # 生产计划
│   │   │   ├── task.tsx      # 生产任务
│   │   │   ├── process.tsx   # 工序管理
│   │   │   ├── equipment.tsx # 设备管理
│   │   │   └── report.tsx    # 生产报表
│   │   ├── inventory/        # 库存组件
│   │   ├── modals/          # 模态框组件
│   │   └── settings/        # 设置组件
│   │
│   ├── api/                  # API 层
│   │   ├── common/          # 通用 API 配置
│   │   │   └── http.tsx     # Axios 实例和拦截器
│   │   ├── modules/         # 业务模块 API
│   │   │   ├── login.ts
│   │   │   └── common.ts
│   │   └── types.ts         # API 类型定义
│   │
│   ├── lib/                 # 工具库
│   │   ├── auth/           # 认证相关
│   │   │   ├── index.tsx   # Zustand auth store
│   │   │   └── utils.tsx   # Token 处理
│   │   ├── user/           # 用户信息管理
│   │   ├── hooks/          # 自定义 Hooks
│   │   ├── i18n/           # 国际化配置
│   │   ├── storage.tsx     # MMKV 存储封装
│   │   └── utils.ts        # 通用工具函数
│   │
│   ├── translations/        # 多语言文件
│   └── types/              # TypeScript 类型定义
│
├── assets/                  # 静态资源
├── android/                # Android 原生代码
├── ios/                    # iOS 原生代码
├── .env.development        # 开发环境配置
├── .env.staging           # 预发布环境配置
├── .env.production        # 生产环境配置
├── app.config.ts          # Expo 应用配置
├── env.js                 # 环境变量管理
├── package.json           # 依赖管理
├── tsconfig.json          # TypeScript 配置
├── tailwind.config.js     # TailwindCSS 配置
└── eas.json              # EAS 构建配置
```

## 🛠️ 快速开始

### 环境要求

- Node.js 20.14.0 或更高版本
- PNPM 9.12.3 或更高版本
- iOS: Xcode 15+ (macOS only)
- Android: Android Studio with API 34+

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

切换环境：
```bash
# 使用指定环境构建
APP_ENV=production pnpm build:android
APP_ENV=staging pnpm build:ios
```

## 🏗️ 构建发布

### 本地构建

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

## 🧪 测试

```bash
# 运行单元测试
pnpm test

# 运行测试并生成覆盖率报告
pnpm test:coverage

# 类型检查
pnpm typecheck

# 代码检查
pnpm lint

# 代码格式化
pnpm format

# 运行所有检查
pnpm check-all

# E2E 测试
pnpm e2e-test
```

## 📱 应用信息

- **应用名称**: 优智云 (EUCloud)
- **Bundle ID**: com.eucloud.erp
- **Package**: com.eucloud.erp
- **Scheme**: eucloud
- **版本**: 1.0.0
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
- 维修任务管理
- 维修生产流程
- 维修数据统计

### 7. 系统功能
- JWT Token 认证
- 自动登录
- 二维码扫描
- 消息通知
- 多语言支持（i18n）
- PDF 查看器
- 聊天功能

## 🌟 技术亮点

### 性能优化
- ✅ **React 19 + React Compiler** - 自动优化渲染性能
- ✅ **Expo 新架构** - 启用 New Architecture 提升性能
- ✅ **Flash List** - 替代 FlatList，列表性能提升 10 倍
- ✅ **MMKV** - 替代 AsyncStorage，存储性能提升 30 倍
- ✅ **React Query** - 智能数据缓存和同步
- ✅ **Reanimated** - GPU 加速动画，60fps 流畅体验

### 开发体验
- ✅ **TypeScript 严格模式** - 完整的类型安全
- ✅ **文件路由** - Expo Router 基于文件的路由系统
- ✅ **自动化工作流** - Husky + Lint-staged 自动检查
- ✅ **多环境支持** - Development / Staging / Production
- ✅ **热更新** - EAS Update OTA 更新机制

### 代码质量
- ✅ **35+ 页面组件** - 完整的业务页面
- ✅ **105+ UI 组件** - 丰富的组件库
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
