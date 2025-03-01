import { useMantineColorScheme } from '@mantine/core';

const useTheme = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return {
    isDarkMode,
    toggleColorScheme,
    colorScheme,
  };
};

export default useTheme;
