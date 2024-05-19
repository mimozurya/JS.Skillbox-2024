import { Routes, Route, Navigate } from "react-router-dom";

import UserList from "./components/Pages/UserList/UserList";
import UserPage from "./components/Pages/UserPage/UserPage";
import Registration from "./components/Pages/Registration/Registration";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/user/:id/" element={<UserPage />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="*" replace element={<Navigate to="/" />} />
        </Routes>
    );
};

export default App;
