import { getStatusClass } from '@containers/keyword/view/upload-keywords-container/helper';
import { Badge, Code, ScrollArea, Stack, Text, Highlight } from '@mantine/core';
import { ListKeywordResponse, useGetListKeywords } from '@queries';
import { MantineReactTable, MRT_ColumnDef, useMantineReactTable } from 'mantine-react-table';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { createStyles } from '@mantine/styles';
import { getDateDisplay } from '@utils';
import { keywordPaths } from '@containers/keyword/route';
import { KeywordListRowType } from './type';

const useStyles = createStyles((theme) => ({
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
  row: {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  highlight: {
    backgroundColor: theme.fn.rgba(theme.colors.yellow[4], 0.3),
    padding: 0,
  },
}));

const KeywordListContainer = () => {
  const { classes } = useStyles();
  const location = useLocation();

  console.log();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fileUploadId = searchParams.get('fileUploadId');
  const { keywords, setParams, isFetching, totalRecords } = useGetListKeywords();
  const [rowCount, setRowCount] = useState(0);

  const [globalFilter, setGlobalFilter] = useState('');

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    const { state } = location as { state: { search: string; isGlobalSearch: string } };

    setParams({
      fileUploadId,
      take: pagination.pageSize,
      skip: pagination.pageIndex * pagination.pageSize,
      isGlobalSearch: state?.isGlobalSearch === 'true' || false,
      search: state?.search || '',
    });
  }, [setParams, fileUploadId, pagination.pageSize, pagination.pageIndex, globalFilter, location]);

  useEffect(() => {
    if (totalRecords) {
      setRowCount(totalRecords);
    }
  }, [totalRecords]);

  const columns = useMemo<MRT_ColumnDef<ListKeywordResponse>[]>(() => {
    const { state } = location as { state: { search: string; isGlobalSearch: string } };

    const isGlobalSearch = state?.isGlobalSearch === 'true';
    const contentColumn: MRT_ColumnDef<ListKeywordResponse> = {
      accessorKey: 'content',
      header: 'Keyword',
      enableSorting: false,
    };

    if (isGlobalSearch) {
      contentColumn.Cell = ({ row }: KeywordListRowType) => (
        <Highlight
          highlight={state?.search}
          highlightStyles={(theme) => ({
            backgroundColor: classes.highlight,
            padding: 0,
          })}
        >
          {row.original.content}
        </Highlight>
      );
    }
    const baseColumns = [
      contentColumn,
      {
        accessorKey: 'status',
        header: 'Status',
        Cell: ({ row }: KeywordListRowType) => (
          <Badge
            variant="outline"
            className={getStatusClass(row.original.status, classes)}
            size="sm"
            radius="sm"
          >
            {row.original.status}
          </Badge>
        ),
        enableSorting: false,
      },
      {
        accessorKey: 'resolvedAt',
        header: 'Search At',
        Cell: ({ row }: KeywordListRowType) => (
          <Text size="sm" c="dimmed">
            {getDateDisplay(row.original.resolvedAt, 'MMM DD, YYYY HH:mm')}
          </Text>
        ),
        enableSorting: false,
      },
    ];

    if (isGlobalSearch) {
      baseColumns.push(
        {
          accessorKey: 'crawledContent.totalLinks',
          header: 'Total Links',
          Cell: ({ row }: KeywordListRowType) => (
            <Text size="sm">{row.original.crawledContent?.totalLinks ?? 0}</Text>
          ),
          enableSorting: false,
        },
        {
          accessorKey: 'crawledContent.totalGoogleAds',
          header: 'Total Ads',
          Cell: ({ row }: KeywordListRowType) => (
            <Text size="sm">{row.original.crawledContent?.totalGoogleAds ?? 0}</Text>
          ),
          enableSorting: false,
        },
        {
          accessorKey: 'crawledContent.content',
          header: 'HTML Content',
          Cell: ({ row }: KeywordListRowType) => (
            <ScrollArea h={100}>
              <Code block style={{ maxWidth: '100%', fontSize: '0.8rem' }}>
                <Highlight
                  highlight={state?.search}
                  highlightStyles={(theme) => ({
                    backgroundColor: classes.highlight,
                    padding: 0,
                  })}
                >
                  {row.original.crawledContent?.content ?? 'No content available'}
                </Highlight>
              </Code>
            </ScrollArea>
          ),
          enableSorting: false,
        },
      );
    }

    return baseColumns;
  }, [classes, location]);

  const handleNavigateToKeywordDetail = (id: string) => {
    const url = `${keywordPaths.keywordDetail.replace(':id', id)}`;
    navigate(url);
  };

  const table = useMantineReactTable({
    columns,
    data: keywords,
    onPaginationChange: setPagination,
    state: {
      pagination,
      isLoading: isFetching,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    manualPagination: true,
    manualFiltering: true,
    rowCount,
    enableRowActions: false,
    enableColumnFilters: false,
    enableFilters: true,
    enableGlobalFilter: true,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableColumnActions: false,
    enableHiding: false,
    mantineTableProps: {
      highlightOnHover: true,
      sx: { cursor: 'pointer' },
    },
    mantineTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        const keywordId = row.original.id;
        handleNavigateToKeywordDetail(keywordId);
      },
      sx: {
        '&:hover': {
          backgroundColor: classes.row,
        },
      },
    }),
  });

  return (
    <Stack p="lg">
      <MantineReactTable table={table} />
    </Stack>
  );
};

export default KeywordListContainer;
