import { Share } from '@/components/ui/icons';

import { Item } from '../settings/item';
type HelpProps = {
  iconColor?: string;
};
const Help = ({ iconColor }: HelpProps) => {
  return <Item text="profile.help" icon={<Share color={iconColor} />} />;
};
export default Help;
