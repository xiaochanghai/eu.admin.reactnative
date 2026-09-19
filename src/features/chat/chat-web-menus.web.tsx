import * as ContextMenu from '@radix-ui/react-context-menu';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Tooltip from '@radix-ui/react-tooltip';
import {
  Archive,
  Edit3,
  LogOut,
  Pin,
  Settings,
  Share,
  Trash2,
  User,
} from 'lucide-react';
import type { ReactNode } from 'react';

const contentClass =
  'z-[100] min-w-[180px] rounded-xl border border-neutral-200 bg-white p-1.5 shadow-lg outline-none dark:border-neutral-700 dark:bg-neutral-800';
const itemClass =
  'flex cursor-default select-none items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] text-neutral-900 outline-none data-[highlighted]:bg-neutral-100 dark:text-white dark:data-[highlighted]:bg-neutral-700';
const dangerClass = `${itemClass} text-red-500 dark:text-red-400`;

type ContextMenuProps = {
  children: ReactNode;
  pinned: boolean;
  onPin: () => void;
  onRename: () => void;
  onShare: () => void;
  onArchive: () => void;
  onDelete: () => void;
};

export function ChatRowContextMenu({
  children,
  pinned,
  onPin,
  onRename,
  onShare,
  onArchive,
  onDelete,
}: ContextMenuProps) {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>{children}</ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content className={contentClass}>
          <ContextItem
            icon={<Pin size={14} />}
            label={pinned ? 'Unpin chat' : 'Pin chat'}
            onSelect={onPin}
          />
          <ContextItem
            icon={<Edit3 size={14} />}
            label="Rename"
            onSelect={onRename}
          />
          <ContextItem
            icon={<Share size={14} />}
            label="Share"
            onSelect={onShare}
          />
          <ContextItem
            icon={<Archive size={14} />}
            label="Archive"
            onSelect={onArchive}
          />
          <ContextMenu.Separator className="my-1 h-px bg-neutral-200 dark:bg-neutral-700" />
          <ContextItem
            icon={<Trash2 size={14} />}
            label="Delete"
            onSelect={onDelete}
            danger
          />
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}

function ContextItem({
  icon,
  label,
  onSelect,
  danger = false,
}: {
  icon: ReactNode;
  label: string;
  onSelect: () => void;
  danger?: boolean;
}) {
  return (
    <ContextMenu.Item
      className={danger ? dangerClass : itemClass}
      onSelect={onSelect}
    >
      {icon}
      {label}
    </ContextMenu.Item>
  );
}

export function RailTooltip({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="right"
            sideOffset={8}
            className="z-[100] rounded-lg bg-neutral-900 px-3 py-1.5 text-[13px] text-white shadow-lg dark:bg-white dark:text-neutral-900"
          >
            {label}
            <Tooltip.Arrow className="fill-neutral-900 dark:fill-white" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

export function AccountDropdown({
  children,
  onProfile,
  onSettings,
  onLogout,
}: {
  children: ReactNode;
  onProfile: () => void;
  onSettings: () => void;
  onLogout: () => void;
}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          side="top"
          sideOffset={8}
          align="start"
          className={contentClass}
        >
          <DropdownItem
            icon={<User size={14} />}
            label="Profile"
            onSelect={onProfile}
          />
          <DropdownItem
            icon={<Settings size={14} />}
            label="Settings"
            onSelect={onSettings}
          />
          <DropdownMenu.Separator className="my-1 h-px bg-neutral-200 dark:bg-neutral-700" />
          <DropdownItem
            icon={<LogOut size={14} />}
            label="Sign out"
            onSelect={onLogout}
            danger
          />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

function DropdownItem({
  icon,
  label,
  onSelect,
  danger = false,
}: {
  icon: ReactNode;
  label: string;
  onSelect: () => void;
  danger?: boolean;
}) {
  return (
    <DropdownMenu.Item
      className={danger ? dangerClass : itemClass}
      onSelect={onSelect}
    >
      {icon}
      {label}
    </DropdownMenu.Item>
  );
}
