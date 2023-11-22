import { atom } from 'recoil';

export const adminNavigationComponentState = atom<JSX.Element | null>({
  key: 'adminNavigationComponentState',
  default: null
});
