import React from "react";
import {WthAuthRedirect} from "utils/WithAuthRedirect";
import {compose} from "redux";

export const Music: React.FC = compose(
    WthAuthRedirect
)(() => {
    return (
        <div>Music</div>
    )
})