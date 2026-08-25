import type { ReactNode } from 'react';

type ContextMenuProps = {
  children: ReactNode;
  pinned: boolean;
  onPin: () => void;
  onRename: () => void;
  onShare: () => void;
  onArchive: () => void;
  onDelete: () => void;
};

export function ChatRowContextMenu({ children }: ContextMenuProps) {
  return children;
}

export function RailTooltip({
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return children;
}

export function AccountDropdown({
  children,
}: {
  children: ReactNode;
  onProfile: () => void;
  onSettings: () => void;
  onLogout: () => void;
}) {
  return children;
}
