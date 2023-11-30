import { FC } from 'react'



import s from 'components/Pagination/Pagination.module.scss'



import {ArrowLeft} from "assets/icons";
import {ArrowRight} from 'assets/icons'
import {usePagination} from "components/Pagination/usePagination";
import {Select} from "components/Select/Select";


export type PaginationProps = {
  count: number
  siblings?: number
  page: number
  onChange: (pageNumber: number) => void
  perPage?: number
  perPageOptions?: number[]
  onPerPageChange?: (itemPerPage: string) => void
}
export const Pagination: FC<PaginationProps> = ({
  page,
  count,
  siblings,
  onChange,
  perPage,
  perPageOptions,
  onPerPageChange,
}) => {
  const {
    paginationRange,
    isFirstPage,
    isLastPage,
    handlePageClicked,
    handleNextClicked,
    handlePreviousClicked,
  } = usePagination({ page, count, siblings: siblings, onChange })

  const showPerPageSelect = !!perPage && !!perPageOptions && !!onPerPageChange

  return (
    <div className={s.container}>
      <div className={s.paginationRange}>
        <button className={s.item} disabled={isFirstPage} onClick={handlePreviousClicked}>
          <span className={s.icon}>
            <ArrowLeft />
          </span>
        </button>

        {paginationRange.map((el: number | string, index) => {
          if (typeof el !== 'number') {
            return (
              <span className={s.dots} key={index}>
                . . .
              </span>
            )
          }

          return (
            <button
              key={index}
              onClick={handlePageClicked(el)}
              className={`${s.item} ${el === page && s.selected}`}
              disabled={el === page}
            >
              {el}
            </button>
          )
        })}

        <button className={s.item} disabled={isLastPage} onClick={handleNextClicked}>
          <span className={s.icon}>
            <ArrowRight />
          </span>
        </button>
      </div>
      {showPerPageSelect && (
        <div className={s.selectBox}>
          Show
          <Select
            variant="pagination"
            value={perPage}
            onValueChange={onPerPageChange}
            items={perPageOptions?.map(el => ({ label: `${el}`, value: `${el}` }))}
          />
          on page
        </div>
      )}
    </div>
  )
}
