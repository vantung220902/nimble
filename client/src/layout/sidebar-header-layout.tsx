import { Navbar } from '@components';
import { Sidebar } from '@components/sidebar/sidebar';
import { keywordPaths } from '@containers/keyword/route';
import { AppShell, rem, TextInput, Title } from '@mantine/core';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import { createStyles } from '@mantine/styles';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ScreenSize, useResponsive } from 'src/hooks';

type Props = PropsWithChildren & {};

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: `${theme.colors.blue[9]} !important`,
    color: theme.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 16px',
  },
  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    alignSelf: 'center',
  },
  searchInput: {
    width: rem(342),
    input: {
      backgroundColor: theme.colors.blue[9],
      color: theme.white,
      '::placeholder': {
        color: theme.white,
        opacity: 1,
      },
    },
  },
}));

const SidebarHeaderLayout: FC<Props> = ({ children, ...props }) => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearch] = useDebouncedValue(searchValue, 500);
  const [opened, { toggle }] = useDisclosure();
  const [sidebarWidth, setSidebarWidth] = useState(260);
  const isMobileScreen = useResponsive(ScreenSize.MOBILE);

  useEffect(() => {
    if (debouncedSearch) {
      navigate(keywordPaths.keywordList, {
        state: {
          search: debouncedSearch,
          isGlobalSearch: 'true',
        },
      });
    } else {
      searchParams.delete('search');
      searchParams.delete('isGlobalSearch');
      setSearchParams(searchParams);
    }
  }, [debouncedSearch, searchParams, setSearchParams, navigate]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setSearchValue(value);
  };

  return (
    <AppShell
      header={{ height: 64, offset: true }}
      navbar={{
        width: sidebarWidth,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
    >
      <Sidebar setWidth={setSidebarWidth} />
      <Navbar opened={opened} toggle={toggle} />

      <AppShell.Header className={classes.header}>
        <Title order={3} className={classes.title} ta="left" mt="md" mb={24} />
        <TextInput
          placeholder="Search all..."
          classNames={{ root: classes.searchInput }}
          value={searchValue}
          onChange={handleSearchChange}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && searchValue.trim()) {
              navigate(keywordPaths.keywordList, {
                state: {
                  search: debouncedSearch,
                  isGlobalSearch: 'true',
                },
              });
            }
          }}
        />
      </AppShell.Header>

      <AppShell.Main
        styles={{
          main: {
            marginTop: '70px',
            backgroundColor: '#FBFBFB',
            ...(isMobileScreen && {
              paddingLeft: '0',
              paddingRight: '0',
            }),
          },
        }}
        {...props}
      >
        {children}
      </AppShell.Main>
    </AppShell>
  );
};

export default SidebarHeaderLayout;
