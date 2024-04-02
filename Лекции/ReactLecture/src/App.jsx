import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import PostsList from "./components/Pages/PostsList/PostsList";
import PostPage from "./components/Pages/PostPage/PostPage";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<PostsList />} />
            <Route path="/post/:id/" element={<PostPage />} />
            <Route path="*" replace element={<Navigate to="/" />} />
        </Routes>
    );
};

export default App;
