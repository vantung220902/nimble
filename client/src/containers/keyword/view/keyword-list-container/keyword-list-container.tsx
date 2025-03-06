import { keywordPaths } from '@containers/keyword/route';
import { getStatusClass } from '@containers/keyword/view/upload-keywords-container/helper';
import { Badge, Stack, Text } from '@mantine/core';
import { createStyles } from '@mantine/styles';
import { ListKeywordResponse, useGetListKeywords } from '@queries';
import { getDateDisplay } from '@utils';
import { MantineReactTable, MRT_ColumnDef, useMantineReactTable } from 'mantine-react-table';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
}));

const KeywordListContainer = () => {
  const { classes } = useStyles();

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const fileUploadId = searchParams.get('fileUploadId');
  const search = searchParams.get('search');

  const { keywords, setParams, isFetching, totalRecords } = useGetListKeywords();
  const [rowCount, setRowCount] = useState(0);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const handleSearch = (search: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (search) {
      newParams.set('search', search);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  useEffect(() => {
    setParams({
      fileUploadId,
      take: pagination.pageSize,
      skip: pagination.pageIndex * pagination.pageSize,
      search,
    });
  }, [setParams, fileUploadId, pagination.pageSize, pagination.pageIndex, search]);

  useEffect(() => {
    if (totalRecords) {
      setRowCount(totalRecords);
    }
  }, [totalRecords]);

  const columns = useMemo<MRT_ColumnDef<ListKeywordResponse>[]>(() => {
    return [
      {
        accessorKey: 'content',
        header: 'Keyword',
        enableSorting: false,
      },
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
    ];
  }, [classes]);

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
      globalFilter: search,
    },
    onGlobalFilterChange: handleSearch,
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
    initialState: {
      showGlobalFilter: true,
    },
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
