import { useDeviceCheck } from '../hooks/useDeviceCheck';

export const MobileOnlyRoute = ({ children }) => {
  useDeviceCheck();
  return children;
};