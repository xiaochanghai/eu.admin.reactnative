export type MobilePageType = 'list' | 'form';

export type MobileTone =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'neutral';

export interface MobilePageConfigRecord {
  ID: string;
  PageCode: string;
  PageName: string;
  AppScope?: string;
  PageType?: MobilePageType;
  Title?: string;
  Version?: number;
  ConfigJson?: string;
  IsPublished?: boolean;
  Remark?: string;
}

export interface MobilePageConfig {
  type: 'page';
  props: {
    pageCode?: string;
    pageType?: MobilePageType;
    title?: string;
    dataSource?: MobileDataSource;
    statusMap?: Record<string, MobileStatusMapItem>;
    backgroundColor?: string;
    paddingHorizontal?: number | string;
    paddingTop?: number | string;
    paddingBottom?: number | string;
    permission?: string;
  };
  children: MobileNode[];
}

export interface MobileDataSource {
  type?: 'module' | 'api';
  moduleCode?: string;
  api?: string;
  pageSize?: number;
}

export interface MobileNode {
  id?: string;
  type: string;
  displayName?: string;
  props?: Record<string, any>;
  children?: MobileNode[];
}

export interface MobileStatusMapItem {
  label: string;
  tone?: MobileTone;
  icon?: string;
}

export interface MobileAction {
  type?: 'navigate' | 'copy' | 'call' | 'submit' | 'backAndRefresh';
  path?: string;
  params?: Record<string, string>;
}
