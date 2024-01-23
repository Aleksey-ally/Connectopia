import React from "react";
import {WthAuthRedirect} from "utils/WithAuthRedirect";

export const Music: React.FC = WthAuthRedirect(() => {
    return (
        <div>Music</div>
    )
})