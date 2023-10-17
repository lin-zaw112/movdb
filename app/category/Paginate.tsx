"use client";
import React, { Fragment, type ReactNode } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import ReactPaginate from "react-paginate";

export default function Paginate({ movie }: { movie: moviesObj }): ReactNode {
  const router = useRouter();
  const pageCount = 500; // from api doc

  const handlePageClick = (clickEvent: {
    index: number | null;
    selected: number;
    nextSelectedPage: number | undefined;
    event: object;
    isPrevious: boolean;
    isNext: boolean;
    isBreak: boolean;
    isActive: boolean;
  }): void => {
    router.push(`?page=${clickEvent.selected + 1}`);
  };
  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={handlePageClick}
      nextLabel={
        <Fragment>
          Next <ChevronRightIcon className="h-6 w-6 " />
        </Fragment>
      }
      previousLabel={
        <Fragment>
          <ChevronLeftIcon className="h-6 w-6 " />
          Previous
        </Fragment>
      }
      pageRangeDisplayed={5}
      forcePage={movie.page - 1}
      marginPagesDisplayed={1}
      containerClassName="fixed bottom-0 flex w-full flex-row left-64 justify-between border-t-2 border-neutral-500 px-10 bg-neutral-50 dark:bg-neutral-950"
      pageClassName="border-t-2 border-transparent pt-5 transition duration-300 hover:border-neutral-950 dark:hover:border-neutral-50"
      breakClassName="p-5"
      pageLinkClassName="p-5"
      activeClassName="border-neutral-950 dark:border-neutral-50"
      nextLinkClassName="mr-64 gap-2 flex items-center border-t-2 border-transparent pt-5 transition duration-300 hover:border-neutral-950 dark:hover:border-neutral-50"
      previousLinkClassName="flex flex-row gap-2 items-center border-t-2 border-transparent pt-5 transition duration-300 hover:border-neutral-950 dark:hover:border-neutral-50"
    />
  );
}
