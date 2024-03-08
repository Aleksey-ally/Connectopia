import {ComponentType, Suspense} from 'react';
import {Preloader} from "components/Preloader";

type Props<P> = P & {};

export const withSuspense = <P extends object>(
    Component: ComponentType<P>
): ComponentType<Props<P>> => (props: P) => {
    return (
        <Suspense fallback={<Preloader/>}>
            <Component {...props} />
        </Suspense>
    );
};