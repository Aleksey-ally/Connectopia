import {lazy} from "react";
import {withSuspense} from "utils/WithSuspense";

const ProfileInformationContainer = withSuspense(
    lazy(() =>
        import('./ProfileInformation')
            .then(module => ({default: module.ProfileInformationContainer}))
    ));


export const Profile = () => {

    return (
        <div>
            <ProfileInformationContainer/>
        </div>
    )
}