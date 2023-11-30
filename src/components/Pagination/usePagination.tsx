const generateRange = (start: number, end: number): number[] => {
  return Array.from({ length: end - start + 1 }, (_, idx) => idx + start)
}

const spaceBetweenNumbers = '...'

type UsePaginationParamType = {
  count: number
  siblings?: number
  page: number
  onChange: (pageNumber: number) => void
}

type PaginationRange = (number | '...')[]

export const usePagination = ({
  count,
  siblings = 1,
  page,
  onChange,
}: UsePaginationParamType): {
  paginationRange: PaginationRange
  isFirstPage: boolean
  isLastPage: boolean
  handlePageClicked: (pageNumber: number) => () => void
  handleNextClicked: () => void
  handlePreviousClicked: () => void
} => {
  const totalPageNumbers = siblings + 5

  let paginationRange: PaginationRange

  if (totalPageNumbers >= count) {
    paginationRange = generateRange(1, count)
  } else {
    const firstPageIndex = 1
    const lastPageIndex = count

    const leftSiblingIndex = Math.max(page - siblings, firstPageIndex)
    const rightSiblingIndex = Math.min(page + siblings, lastPageIndex)

    const shouldShowLeftDots = leftSiblingIndex > firstPageIndex + 2
    const shouldShowRightDots = rightSiblingIndex < lastPageIndex - 2

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblings

      paginationRange = [
        ...generateRange(firstPageIndex, firstPageIndex + leftItemCount - 1),
        spaceBetweenNumbers,
        lastPageIndex,
      ]
    } else if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblings

      paginationRange = [
        firstPageIndex,
        spaceBetweenNumbers,
        ...generateRange(lastPageIndex - rightItemCount + 1, lastPageIndex),
      ]
    } else {
      paginationRange = [
        firstPageIndex,
        spaceBetweenNumbers,
        ...generateRange(leftSiblingIndex, rightSiblingIndex),
        spaceBetweenNumbers,
        lastPageIndex,
      ]
    }
  }

  const lastPage = paginationRange[paginationRange.length - 1]
  const isFirstPage = page === 1
  const isLastPage = page === lastPage

  const handleNextClicked = () => onChange(page + 1)
  const handlePreviousClicked = () => onChange(page - 1)
  const handlePageClicked = (pageNumber: number) => () => onChange(pageNumber)

  return {
    paginationRange,
    isFirstPage,
    isLastPage,
    handlePageClicked,
    handleNextClicked,
    handlePreviousClicked,
  }
}
