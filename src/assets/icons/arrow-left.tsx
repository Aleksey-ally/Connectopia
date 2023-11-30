import { SVGProps, Ref, forwardRef, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" ref={ref} {...props}>
    <g clipPath="url(#a)">
      <path fill="currentColor" d="m10.3 11-3-3 3-3-1-1-4 4 4 4 1-1Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="var(--color-light-100)" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)
const Memo = memo(ForwardRef)

export default Memo
