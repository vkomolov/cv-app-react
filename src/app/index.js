import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../pages/Layout";
import RootContainer from "../pages/RootContainer";
import NotFoundPage from "../pages/NotFountPage";


export default function App() {

    return (
        <Routes>
            <Route path="/" element={ <Layout /> } >
                { /*for direct navigating to NotFoundPage*/ }
                <Route path="404" element={ <NotFoundPage /> } />
                <Route path=":filter" element={ <RootContainer/> } />
                { /* for the cases with deeper routes like: "/:data/some" to navigate to 404 */ }
                <Route path=":filter/*" element={ <Navigate to="/404" replace /> } />
            </Route>
        </Routes>
    );
}


///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}