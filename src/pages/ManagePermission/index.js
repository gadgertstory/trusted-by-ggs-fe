import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from "../NotFound";
import ManagePermissionDetail from "./pages/PermissionDetail";
import ManagePermissionTable from "./pages/PermissionTable";

const Permission = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [roleUser] = useState(currentUser.data);

    return (
        <Routes>
            <Route path=":id" element={<ManagePermissionDetail roleUser={roleUser} />} />
            <Route path="/" element={<ManagePermissionTable roleUser={roleUser} />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
    );
};

export default Permission;
