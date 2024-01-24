import React from "react";
import {WthAuthRedirect} from "utils/WithAuthRedirect";
import {compose} from "redux";

export const News: React.FC = compose(
    WthAuthRedirect
)(() => {
    return (
        <div>News</div>
    )
})