import { storage, useMMKVBoolean } from '../storage';

const IS_AGREE_PRIVACY = 'IS_AGREE_PRIVACY';

export const useIsAgreePrivacy = () => {
  const [isAgreePrivacy, setIsAgreePrivacy] = useMMKVBoolean(
    IS_AGREE_PRIVACY,
    storage
  );
  if (isAgreePrivacy === undefined) {
    return [false, setIsAgreePrivacy] as const;
  }
  return [isAgreePrivacy, setIsAgreePrivacy] as const;
};
