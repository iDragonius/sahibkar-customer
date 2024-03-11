import { useEffect, useState } from 'react';
export type PaginationProps<T> = {
  items: T;
  pageSizeVariants: number[];
  page: number;
  pageSize: number;
  pageCount: number;
  totalCount: number;
  nextPage: () => void;
  prevPage: () => void;
  changePageSize: (newPageSize: number) => void;
};

export const usePagination = <T>(
  items: any[],
  initialPage: number,
  initialPageSize: number
): PaginationProps<T> => {
  const [paginatedItems, setPaginatedItems] = useState<any[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [page, setPage] = useState<number>(initialPage);
  const [pageSize, setPageSize] = useState<number>(initialPageSize);

  const pageSizeVariants = [10, 25, 50, 75, 100, 150, 200];
  useEffect(() => {
    if (items.length > 0) {
      setPageCount(Math.ceil(items.length / pageSize));
      setPaginatedItems(items.slice((page - 1) * pageSize, page * pageSize));
    }
  }, [items, page, pageSize]);

  const nextPage = () => {
    if (page < pageCount) setPage((prevState) => (prevState = prevState + 1));
  };
  const prevPage = () => {
    if (page > 1) setPage((prevState) => (prevState = prevState - 1));
  };

  const changePageSize = (newPageSize: number) => {
    if (newPageSize === pageSize) return;
    setPageSize(newPageSize);
    setPage(1);
  };
  return {
    items: paginatedItems as T,
    page,
    pageSize,
    pageCount,
    nextPage,
    prevPage,
    totalCount: items.length,
    pageSizeVariants,
    changePageSize,
  };
};
