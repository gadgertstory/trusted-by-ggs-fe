import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import RepairTable from "./pages/RepairTable";
import RepairDetail from "./pages/RepairDetail";
import NotFound from "../NotFound";

const Repair = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [roleUser] = useState(currentUser.data);

    return (
        <Routes>
            <Route path=":id" element={<RepairDetail roleUser={roleUser} />} />
            <Route path="/" element={<RepairTable roleUser={roleUser} />} />
            <Route path="/NotFoundPage" element={<NotFound />} />
            <Route path="*" element={<Navigate replace to="/NotFoundPage" />} />
        </Routes>
    );
};

export default Repair;
