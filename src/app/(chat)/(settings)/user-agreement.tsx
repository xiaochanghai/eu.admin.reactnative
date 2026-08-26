
import UserAgreement from '@/components/user-agreement';
import {
  ChatScreenHeader,
  ChatShell,
} from '@/features/chat';

export default function ChatProfileScreen() {
  return (
    <ChatShell>
      <ChatScreenHeader title="User Agreement" />
      <UserAgreement />
    </ChatShell>
  );
}