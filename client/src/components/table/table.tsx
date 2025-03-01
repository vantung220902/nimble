import { createStyles } from '@mantine/emotion';
import { MRT_TableOptions, MantineReactTable, useMantineReactTable } from 'mantine-react-table';

type Props<T> = {
  config: MRT_TableOptions<T>;
  loading?: boolean;
};

const useStyles = createStyles((theme) => ({
  table: {
    't &': {
      border: `1px solid ${theme.colors.gray[2]}`,
      borderRadius: theme.radius.md,
    },
    '& thead tr th': {
      color: theme.black,
      fontWeight: 600,
      fontSize: theme.fontSizes.sm,
    },
    '& tbody tr td': {
      fontSize: theme.fontSizes.sm,
    },
    '& tbody tr:nth-of-type(even)': {
      backgroundColor: theme.colors.gray[0],
    },
  },
  pagination: {},
}));

const Table = <T extends object>({ config, loading }: Props<T>) => {
  const { classes } = useStyles();
  const { state, mantineTableProps, ...restConfig } = config;

  const tableData = useMantineReactTable({
    state: {
      isLoading: loading,
      showLoadingOverlay: loading,
      ...state,
    },
    enableColumnResizing: false,
    enableTopToolbar: false,
    mantineTableProps: {
      highlightOnHover: true,
      withRowBorders: true,
      className: classes.table,
    },
    enableRowActions: true,
    positionActionsColumn: 'last',
    enableStickyHeader: true,
    mantineTableBodyCellProps: {
      style: { padding: '8px 10px' },
    },
    mantineTableHeadCellProps: {
      style: { padding: '8px 10px' },
    },
    mantinePaginationProps: {
      showRowsPerPage: false,
      size: 'sm',
    },
    paginationDisplayMode: 'pages',
    ...restConfig,
    mantinePaperProps: {
      shadow: null,
    },
  });

  return <MantineReactTable table={tableData} />;
};

export default Table;
