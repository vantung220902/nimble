import { keywordPaths } from '@containers/keyword/route';
import { Stack } from '@mantine/core';
import { UploadedFilesResponse, useGetUploadedFiles } from '@queries';
import { getCleanFileName } from '@utils';
import { MantineReactTable, MRT_ColumnDef, useMantineReactTable } from 'mantine-react-table';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UploadedFilesContainer = () => {
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
      },
      {
        accessorKey: 'status',
        header: 'Status',
      },
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data: files,
    onPaginationChange: setPagination,
    state: { pagination, isLoading: isFetching },
    manualPagination: true,
    rowCount,
    mantineTableBodyCellProps: ({ cell, row }) => ({
      onClick: (e) => {
        handleNavigateToListKeywords(row.original.id);
      },
      style:
        cell.column.id === 'fileUrl'
          ? { cursor: 'pointer', color: 'blue', textDecoration: 'underline' }
          : {},
    }),
  });

  return (
    <Stack p="lg">
      <MantineReactTable table={table} />
    </Stack>
  );
};

export default UploadedFilesContainer;
