import { useDeviceCheck } from '../hooks/useDeviceCheck';

const withMobileCheck = (Component) => {
  return function WrappedComponent(props) {
    useDeviceCheck();
    return <Component {...props} />;
  };
};

export default withMobileCheck;