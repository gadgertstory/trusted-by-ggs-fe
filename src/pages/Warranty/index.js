import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import WarrantyTable from "./pages/WarrantyTable";
// import RepairDetail from "./pages/RepairDetail";
import NotFound from "../NotFound";

const Warranty = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [roleUser] = useState(currentUser.data);

    return (
        <Routes>
            <Route path="/" element={<WarrantyTable roleUser={roleUser} />} />
            {/* <Route path=":id" element={<RepairDetail roleUser={roleUser} />} /> */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
    );
};

export default Warranty;
