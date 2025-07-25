import React, { lazy } from 'react'
import { useRoutes } from 'react-router-dom'
const First = lazy(() => import("./first"));
const Second = lazy(() => import("./second"));
const Third = lazy(() => import("./third"));

const AppRoutes = () => {
    return (
        useRoutes(
            [
                {
                    path: "/",
                    element: <First />
                },
                {
                    path: "/second",
                    element: <Second />
                },
                {
                    path: "/third",
                    element: <Third />
                },
            ]
        )
    )

}

export default React.memo(AppRoutes);