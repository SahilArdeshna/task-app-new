import { isEmpty } from "lodash";
import { FC, ReactElement, ReactNode } from "react";
import { useTable, usePagination, useSortBy, HeaderGroup } from "react-table";
import {
  ArrowSmUpIcon,
  ArrowSmDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/outline";

export type IColumn = {
  title: string | ReactElement;
  accessor: string;
  render?: (param: any) => ReactNode;
};
export type ITable = {
  records: any[];
  currPage?: number;
  columns: IColumn[];
  isLoading?: boolean;
  defaultPageSize?: number;
  defaultSizeOptions?: number[];
  onPageChange?: (value: number) => void;
};

const Table: FC<ITable> = ({
  columns,
  records,
  isLoading,
  onPageChange,
  currPage = 0,
  defaultSizeOptions,
  defaultPageSize = 10,
}) => {
  const options = defaultSizeOptions
    ? defaultSizeOptions
    : [10, 20, 30, 40, 50];

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: records,
      initialState: { pageIndex: currPage, pageSize: defaultPageSize },
    },
    useSortBy,
    usePagination
  );

  const getPages = (currentPage: number, totalPages: number) => {
    // default to first page
    currentPage = currentPage + 1 || 1;

    let startPage = currentPage - 2;
    let endPage = currentPage + 2;

    if (startPage < 1 && endPage < totalPages) {
      startPage = 1;
      endPage = totalPages >= 5 ? 5 : totalPages;
    } else if (endPage >= totalPages) {
      startPage = totalPages <= 4 ? 1 : totalPages - 4;
      endPage = totalPages;
    }

    // create an array of pages to ng-repeat in the pager control
    const keys = Array(endPage + 1 - startPage).keys();
    const pages = [...keys].map((i) => startPage + i);

    return pages;
  };

  const sortIcon = (children: ReactElement) => {
    return <div className="h-4 w-4 text-brand-600 ml-1">{children}</div>;
  };

  const nextPageClickHandler = (value: number) => {
    onPageChange && onPageChange(value);
    nextPage();
  };

  const previousPageClickHandler = (value: number) => {
    onPageChange && onPageChange(value);
    previousPage();
  };

  const gotoPageClickHandler = (value: number) => {
    onPageChange && onPageChange(value);
    gotoPage(value);
  };

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-auto border-b border-gray-200 sm:rounded-lg">
            <table
              {...getTableProps}
              className="min-w-full divide-y divide-gray-200"
            >
              <thead className="bg-gray-50">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => {
                      const headerProps = (column: HeaderGroup<object>) => {
                        return column.canSort
                          ? column.getSortByToggleProps()
                          : {};
                      };

                      return (
                        <th
                          {...column.getHeaderProps({
                            ...headerProps(column),
                            style: {
                              minWidth: column.minWidth,
                              width: column.width,
                              cursor: column.canSort ? "pointer" : "text",
                            },
                          })}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          <div className="flex items-center">
                            {column.render("title")}
                            {column.isSorted
                              ? column.isSortedDesc
                                ? sortIcon(<ArrowSmDownIcon />)
                                : sortIcon(<ArrowSmUpIcon />)
                              : ""}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {isEmpty(page) && !isLoading ? (
                  <tr>
                    <td className="text-center py-4" colSpan={columns.length}>
                      <span className="text-base text-gray-500 font-medium">
                        No data available
                      </span>
                    </td>
                  </tr>
                ) : (
                  page.map((row, i) => {
                    prepareRow(row);
                    return (
                      <tr
                        {...row.getRowProps()}
                        className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                      >
                        {row.cells.map((cell) => {
                          return (
                            <td
                              className="px-6 py-4 text-sm font-medium text-gray-900 lg:max-w-xl md:max-w-md sm:max-w-xs max-w-0 whitespace-normal break-words"
                              {...cell.getCellProps({
                                style: {
                                  width: cell.column.width,
                                  minWidth: cell.column.minWidth,
                                },
                              })}
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>

            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 sm:py-4">
              {pageCount > 1 && (
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    disabled={!canPreviousPage}
                    onClick={() => previousPageClickHandler(pageIndex - 1)}
                    className={`outline-none relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white ${
                      !canPreviousPage ? "cursor-default" : "hover:bg-gray-50"
                    }`}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => nextPageClickHandler(pageIndex + 1)}
                    disabled={!canNextPage}
                    className={`outline-none ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white ${
                      !canNextPage ? "cursor-default" : "hover:bg-gray-50"
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">
                      {records.length > 0 ? pageIndex * pageSize + 1 : 0}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {(pageIndex + 1) * pageSize > records.length
                        ? records.length
                        : (pageIndex + 1) * pageSize}
                    </span>{" "}
                    of <span className="font-medium">{records.length}</span>{" "}
                    results
                  </p>
                </div>

                <div className="flex item-center">
                  {pageCount > 1 && (
                    <div>
                      <nav
                        className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                        aria-label="Pagination"
                      >
                        <button
                          disabled={!canPreviousPage}
                          onClick={() => gotoPageClickHandler(0)}
                          className={`outline-none relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 ${
                            !canPreviousPage
                              ? "cursor-default"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <span className="sr-only">Next</span>
                          <ChevronDoubleLeftIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </button>
                        <button
                          disabled={!canPreviousPage}
                          onClick={() =>
                            previousPageClickHandler(pageIndex - 1)
                          }
                          className={`outline-none bg-white border-gray-300 text-gray-500 relative inline-flex items-center px-2 py-2 border text-sm font-medium ${
                            !canPreviousPage
                              ? "cursor-default"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <span className="sr-only">Previous</span>
                          <ChevronLeftIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </button>
                        {(getPages(pageIndex, pageCount) || []).map(
                          (page, index) => (
                            <button
                              key={index}
                              aria-current="page"
                              onClick={() => gotoPageClickHandler(page - 1)}
                              className={`outline-none bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                pageIndex + 1 === page &&
                                "border-brand-500 rounded-sm bg-brand-50 z-10 text-brand-700"
                              }`}
                            >
                              {page}
                            </button>
                          )
                        )}
                        <button
                          onClick={() => nextPageClickHandler(pageIndex + 1)}
                          disabled={!canNextPage}
                          className={`outline-none bg-white border-gray-300 text-gray-500 relative inline-flex items-center px-2 py-2 border text-sm font-medium ${
                            !canNextPage ? "cursor-default" : "hover:bg-gray-50"
                          }`}
                        >
                          <span className="sr-only">Next</span>
                          <ChevronRightIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </button>
                        <button
                          onClick={() => gotoPageClickHandler(pageCount - 1)}
                          disabled={!canNextPage}
                          className={`outline-none relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 ${
                            !canNextPage ? "cursor-default" : "hover:bg-gray-50"
                          }`}
                        >
                          <span className="sr-only">Next</span>
                          <ChevronDoubleRightIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </button>
                      </nav>
                    </div>
                  )}

                  {/* <div className="ml-3">
                    <select
                      value={pageSize}
                      className="rounded-md border-gray-300 max-h-2.375 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:border-transparent focus:ring-brand-500"
                      onChange={(e) => {
                        setPageSize(Number(e.target.value));
                      }}
                    >
                      {options.map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                          Show {pageSize}
                        </option>
                      ))}
                    </select>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
