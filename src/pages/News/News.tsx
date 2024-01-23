import React from "react";
import {WthAuthRedirect} from "utils/WithAuthRedirect";

export const News: React.FC = WthAuthRedirect(() => {
    return (
        <div>News</div>
    )
})