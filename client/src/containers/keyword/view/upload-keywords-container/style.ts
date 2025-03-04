import { createStyles } from '@mantine/styles';

const useStyles = createStyles((theme) => ({
  wrapper: {
    width: '100%',
    maxWidth: 600,
    padding: theme.spacing.xl,
    backgroundColor: theme.white,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
  },
  progress: {
    marginBottom: theme.spacing.xl,
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${theme.spacing.xs}px 0`,
  },
  content: {
    fontWeight: 600,
    fontSize: 18,
  },
  statusCompleted: {
    backgroundColor: `${theme.fn.rgba(theme.colors.green[6], 0.1)}!important`,
    color: `${theme.colors.green[6]}!important`,
    borderColor: `${theme.fn.rgba(theme.colors.green[6], 0.2)}!important`,
  },
  statusProcessing: {
    backgroundColor: `${theme.fn.rgba(theme.colors.yellow[6], 0.1)}!important`,
    color: `${theme.colors.yellow[6]}!important`,
    borderColor: `${theme.fn.rgba(theme.colors.yellow[6], 0.2)}!important`,
  },
  statusFail: {
    backgroundColor: `${theme.fn.rgba(theme.colors.red[6], 0.1)}!important`,
    color: `${theme.colors.red[6]}!important`,
    borderColor: `${theme.fn.rgba(theme.colors.red[6], 0.2)}!important`,
  },
  viewButton: {
    color: theme.colors.blue[6],
    fontWeight: 600,
  },
}));

export default useStyles;
