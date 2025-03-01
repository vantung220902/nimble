import { useLocation } from 'react-router-dom';

const usePathname = (): { pathname: string; search: string } => {
  const location = useLocation();
  const { pathname, search } = location;
  return { pathname, search };
};

export default usePathname;
