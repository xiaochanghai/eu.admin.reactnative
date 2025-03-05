import { Share } from '@/components/ui/icons';

import { Item } from '../settings/item';
type AboutProps = {
  iconColor?: string;
};
const About = ({ iconColor }: AboutProps) => {
  return <Item text="profile.about" icon={<Share color={iconColor} />} />;
};
export default About;
