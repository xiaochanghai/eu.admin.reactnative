import { Share } from '@/components/ui/icons';

import { Item } from '../settings/item';
type FeedbackProps = {
  iconColor?: string;
};
const Feedback = ({ iconColor }: FeedbackProps) => {
  return <Item text="profile.feedback" icon={<Share color={iconColor} />} />;
};
export default Feedback;
