import { CustomErrorBoundary } from '@components';
import { authRoutes } from '@containers/auth/route';
import { AuthContainer, LoadingContainer, ToastContainer } from '@containers/startup';
import { ActionIcon, Affix, Tooltip, Transition } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { IconArrowUp } from '@tabler/icons-react';
import { FC, HTMLProps, PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';
import SidebarLayout from './sidebar-header-layout';

const MainLayout: FC<Props> = ({ children, ...props }) => {
  const location = useLocation();
  const [scroll, scrollTo] = useWindowScroll();

  const isAuthRoute = authRoutes.some(
    (route: { props: { path: string } }) => route.props.path === location.pathname,
  );

  const isOutsideRoute = isAuthRoute;

  return (
    <CustomErrorBoundary>
      <AuthContainer />
      <LoadingContainer />
      <ToastContainer />

      {isOutsideRoute ? <> {children} </> : <SidebarLayout {...props}>{children}</SidebarLayout>}

      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Tooltip label="Scroll to top" position="left" withArrow>
              <ActionIcon
                color="blue"
                size="lg"
                radius="xl"
                variant="filled"
                style={transitionStyles}
                onClick={() => scrollTo({ y: 0 })}
              >
                <IconArrowUp size="1.2rem" />
              </ActionIcon>
            </Tooltip>
          )}
        </Transition>
      </Affix>
    </CustomErrorBoundary>
  );
};

type Props = PropsWithChildren & HTMLProps<HTMLDivElement> & {};

export default MainLayout;
