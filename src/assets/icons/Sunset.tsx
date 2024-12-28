import React, {SVGProps, Ref, forwardRef, memo} from 'react'

export const Sunset = memo(forwardRef((props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={ref}
        {...props}
    >

        <path
            d="M8.51759 18.8189L6.41792 16.0494M5.74731 22.4731L2.34998 21.4152M20.2532 22.4731L23.6505 21.4152M17.4829 18.8189L19.5826 16.0494M13.0002 17.4233V14M25 25H18.1864M18.1864 25C18.1913 24.9111 18.1938 24.8215 18.1938 24.7314C18.1938 21.9827 15.8686 19.7543 13.0002 19.7543C10.1319 19.7543 7.80666 21.9827 7.80666 24.7314C7.80666 24.8215 7.80915 24.9111 7.81409 25M18.1864 25H7.81409M7.81409 25L1 25M13 1V6.93029M13 6.93029L16.1384 3.79193M13 6.93029L9.86164 3.79193"
            stroke="white" strokeLinecap="round"/>
    </svg>
)))