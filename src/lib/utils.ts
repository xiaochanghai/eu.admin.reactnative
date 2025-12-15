import { Linking } from 'react-native';
import type { StoreApi, UseBoundStore } from 'zustand';

export function openLinkInBrowser(url: string) {
  Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url));
}

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  let store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};
// src/lib/utils.ts
export function generateUUID(): string {
  let d = new Date().getTime(); // Timestamp
  let d2 = (performance && performance.now && performance.now() * 1000) || 0; // Time in microseconds since page-load or 0 if unsupported

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16; // Random number between 0 and 16
    if (d > 0) {
      // Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      // Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  const second = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

/**
 * 格式化日期，显示相对时间（今天、昨天、前天）或具体日期
 * @param date - 要格式化的日期
 * @param options - 格式化选项
 * @returns 格式化后的日期字符串
 */
export function formatRelativeDate(
  date: Date | string | number,
  options: {
    showTime?: boolean;
    showYear?: boolean;
    locale?: string;
  } = {}
): string {
  //   import { formatRelativeDate, getRelativeTimeString } from '@/lib/utils';

  // // 基本使用
  // formatRelativeDate(new Date()); // "Today"
  // formatRelativeDate(new Date(Date.now() - 24 * 60 * 60 * 1000)); // "Yesterday"

  // // 显示时间
  // formatRelativeDate(new Date(), { showTime: true }); // "Today 14:30"

  // // 中文支持
  // formatRelativeDate(new Date(), { locale: 'zh' }); // "今天"

  // // 简洁版本
  // getRelativeTimeString(new Date()); // "Just now"
  // getRelativeTimeString(new Date(Date.now() - 30 * 60 * 1000)); // "30 min ago"

  const { showTime = false, showYear = true, locale = 'zh' } = options;

  const targetDate = new Date(date);
  const now = new Date();

  // 重置时间为00:00:00以便比较日期
  const targetDateOnly = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate()
  );
  const todayOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const diffTime = todayOnly.getTime() - targetDateOnly.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // 相对日期标签
  const relativeLabels = {
    en: {
      today: 'Today',
      yesterday: 'Yesterday',
      dayBeforeYesterday: 'Day before yesterday',
    },
    zh: {
      today: '今天',
      yesterday: '昨天',
      dayBeforeYesterday: '前天',
    },
  };

  let dateLabel = '';

  if (diffDays === 0) {
    dateLabel =
      relativeLabels[locale as keyof typeof relativeLabels]?.today ||
      relativeLabels.en.today;
  } else if (diffDays === 1) {
    dateLabel =
      relativeLabels[locale as keyof typeof relativeLabels]?.yesterday ||
      relativeLabels.en.yesterday;
  } else if (diffDays === 2) {
    dateLabel =
      relativeLabels[locale as keyof typeof relativeLabels]
        ?.dayBeforeYesterday || relativeLabels.en.dayBeforeYesterday;
  } else {
    // 超过2天显示具体日期
    const formatOptions: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
    };

    if (showYear) {
      formatOptions.year = 'numeric';
    }

    dateLabel = targetDate.toLocaleDateString(locale, formatOptions);
  }

  // 如果需要显示时间
  if (showTime) {
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
    };
    const timeString = targetDate.toLocaleTimeString(locale, timeOptions);
    return `${dateLabel} ${timeString}`;
  }

  return dateLabel;
}

/**
 * 获取日期的相对时间描述（更简洁的版本）
 * @param date - 要格式化的日期
 * @param locale - 语言代码
 * @returns 相对时间字符串
 */
export function getRelativeTimeString(
  date: Date | string | number,
  locale: string = 'en'
): string {
  const targetDate = new Date(date);
  const now = new Date();

  const diffTime = now.getTime() - targetDate.getTime();
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const labels = {
    en: {
      now: 'Just now',
      minutes: 'min ago',
      hours: 'h ago',
      days: 'd ago',
      today: 'Today',
      yesterday: 'Yesterday',
      dayBeforeYesterday: '2 days ago',
    },
    zh: {
      now: '刚刚',
      minutes: '分钟前',
      hours: '小时前',
      days: '天前',
      today: '今天',
      yesterday: '昨天',
      dayBeforeYesterday: '前天',
    },
  };

  const currentLabels = labels[locale as keyof typeof labels] || labels.en;

  if (diffMinutes < 1) {
    return currentLabels.now;
  } else if (diffMinutes < 60) {
    return `${diffMinutes} ${currentLabels.minutes}`;
  } else if (diffHours < 24) {
    return `${diffHours} ${currentLabels.hours}`;
  } else if (diffDays === 1) {
    return currentLabels.yesterday;
  } else if (diffDays === 2) {
    return currentLabels.dayBeforeYesterday;
  } else if (diffDays < 7) {
    return `${diffDays} ${currentLabels.days}`;
  } else {
    // 超过一周显示具体日期
    return targetDate.toLocaleDateString(locale, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
}

/**
 * 比较两个版本号
 * @param localVersion 本地版本号，如 "1.2.3"
 * @param serverVersion 服务器版本号，如 "1.3.0"
 * @returns -1: local < server, 0: 相等, 1: local > server
 */
export function compareVersions(
  localVersion: string,
  serverVersion: string
): number {
  // 拆分版本号字符串并转换为数字数组
  const aParts = localVersion.split('.').map(Number);
  const bParts = serverVersion.split('.').map(Number);

  // 获取最大长度，以便比较所有部分
  const maxLength = Math.max(aParts.length, bParts.length);

  for (let i = 0; i < maxLength; i++) {
    // 如果某个版本号缺少某部分（如 1.2 vs 1.2.0），则补 0
    const a = i < aParts.length ? aParts[i] : 0;
    const b = i < bParts.length ? bParts[i] : 0;

    if (a > b) return 1;
    if (a < b) return -1;
  }

  return 0; // 完全相等
}

// 根据文件扩展名获取图标信息
export const getFileIconInfo = (fileExt?: string) => {
  const ext = fileExt?.toLowerCase()?.replace('.', '') || '';
  switch (ext) {
    case 'pdf':
      return { icon: 'file-pdf-o', iconColor: '#ef4444', iconBgColor: '#fef2f2' };
    case 'doc':
    case 'docx':
      return { icon: 'file-word-o', iconColor: '#3b82f6', iconBgColor: '#eff6ff' };
    case 'xls':
    case 'xlsx':
      return { icon: 'file-excel-o', iconColor: '#22c55e', iconBgColor: '#f0fdf4' };
    case 'ppt':
    case 'pptx':
      return { icon: 'file-powerpoint-o', iconColor: '#f97316', iconBgColor: '#fff7ed' };
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return { icon: 'file-image-o', iconColor: '#8b5cf6', iconBgColor: '#f5f3ff' };
    case 'zip':
    case 'rar':
    case '7z':
      return { icon: 'file-archive-o', iconColor: '#eab308', iconBgColor: '#fefce8' };
    case 'txt':
      return { icon: 'file-text-o', iconColor: '#6b7280', iconBgColor: '#f9fafb' };
    default:
      return { icon: 'file-o', iconColor: '#6b7280', iconBgColor: '#f9fafb' };
  }
};

// 格式化文件大小
export const formatFileSize = (size?: string) => {
  if (!size) return '';
  const bytes = parseInt(size, 10);
  if (isNaN(bytes)) return size;
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

// 格式化日期（简短格式）
export const formatDateShort = (date?: Date) => {
  if (!date) return '';
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
