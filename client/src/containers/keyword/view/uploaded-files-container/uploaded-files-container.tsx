import { keywordPaths } from '@containers/keyword/route';
import { getStatusClass } from '@containers/keyword/view/upload-keywords-container/helper';
import { Badge, Stack, Text } from '@mantine/core';
import { createStyles } from '@mantine/styles';
import { UploadedFilesResponse, useGetUploadedFiles } from '@queries';
import { getCleanFileName, getDateDisplay } from '@utils';
import { MantineReactTable, MRT_ColumnDef, useMantineReactTable } from 'mantine-react-table';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

const UploadedFilesContainer = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { files, setParams, isFetching, totalRecords } = useGetUploadedFiles();
  const [rowCount, setRowCount] = useState(0);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    setParams({
      take: pagination.pageSize,
      skip: pagination.pageIndex * pagination.pageSize,
    });
  }, [setParams, pagination.pageSize, pagination.pageIndex]);

  useEffect(() => {
    if (totalRecords) {
      setRowCount(totalRecords);
    }
  }, [totalRecords]);

  const handleNavigateToListKeywords = (fileUploadId: string) => {
    const url = `${keywordPaths.keywordList}?fileUploadId=${fileUploadId}`;
    navigate(url);
  };

  const columns = useMemo<MRT_ColumnDef<UploadedFilesResponse>[]>(
    () => [
      {
        accessorKey: 'fileUrl',
        header: 'Name',
        Cell: ({ cell }) => getCleanFileName(cell.getValue<string>()),
        enableSorting: false,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        Cell: ({ row }) => (
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
        accessorKey: 'uploadedAt',
        header: 'Upload At',
        Cell: ({ row }) => (
          <Text size="sm" c="dimmed">
            {getDateDisplay(row.original.uploadedAt, 'MMM DD, YYYY HH:mm')}
          </Text>
        ),
        enableSorting: false,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const table = useMantineReactTable({
    columns,
    data: files,
    manualPagination: true,
    manualFiltering: true,
    rowCount,
    enableRowActions: false,
    enableColumnFilters: false,
    enableFilters: true,
    enableGlobalFilter: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableColumnActions: false,
    enableHiding: false,
    onPaginationChange: setPagination,
    state: { pagination, isLoading: isFetching },
    mantineTableBodyCellProps: ({ cell, row }) => ({
      onClick: (e) => {
        handleNavigateToListKeywords(row.original.id);
      },
      style:
        cell.column.id === 'fileUrl'
          ? { cursor: 'pointer', color: 'blue', textDecoration: 'underline' }
          : {},
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

export default UploadedFilesContainer;
