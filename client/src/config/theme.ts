import { MantineThemeOverride, createTheme } from '@mantine/core';

const appTheme: MantineThemeOverride = createTheme({
  autoContrast: true,
  luminanceThreshold: 0.3,
  defaultRadius: 'sm',
  components: {
    Stepper: {
      styles: {
        step: {
          flexDirection: 'column',
          padding: 0,
        },
        stepIcon: {
          marginBottom: '8px',
          fontSize: '12px',
          width: '32px',
          height: '32px',
          minHeight: 0,
          minWidth: 0,
        },
        separator: {
          height: '4px',
          margin: 0,
          transform: 'translateY(-11px)',
        },
        stepBody: {
          marginLeft: 0,
        },
        stepLabel: {
          fontSize: '14px',
        },
      },
    },
    Accordion: {
      styles: {
        label: {
          fontWeight: 600,
        },
      },
    },
  },
  fontFamily: '"Whitney SSm A", "Whitney SSm B", Helvetica, Arial, sans-serif',
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  headings: { fontFamily: '"Whitney SSm A", Helvetica, Arial, sans-serif' },
});

export default appTheme;
