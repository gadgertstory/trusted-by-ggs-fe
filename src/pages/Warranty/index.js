import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import WarrantyTable from "./pages/WarrantyTable";
import WarrantyDetail from "./pages/WarrantyDetail";
import NotFound from "../NotFound";

const Warranty = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [roleUser] = useState(currentUser.data);

    return (
        <Routes>
            <Route path="/" element={<WarrantyTable roleUser={roleUser} />} />
            <Route path=":id" element={<WarrantyDetail roleUser={roleUser} />} />
            <Route path="/NotFoundPage" element={<NotFound />} />
            <Route path="*" element={<Navigate replace to="/NotFoundPage" />} />
        </Routes>
    );
};

export default Warranty;
