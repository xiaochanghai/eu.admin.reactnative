
import AboutUs from '@/components/about-us';
import {
  ChatScreenHeader,
  ChatShell,
} from '@/features/chat';

export default function ChatProfileScreen() {
  return (
    <ChatShell>
      <ChatScreenHeader title="About Us" />
      <AboutUs />
    </ChatShell>
  );
}