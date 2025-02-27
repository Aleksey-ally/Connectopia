import { SVGProps, Ref, forwardRef, memo } from 'react'

export const Close = memo(forwardRef((props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={ref}
        {...props}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <g clipPath="url(#clip0_9883_2381)">
          <path
              d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
              fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_9883_2381">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </svg>
)))
