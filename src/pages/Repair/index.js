import React from "react";
import { Routes, Route } from "react-router-dom";

import RepairTable from "./pages/RepairTable";
import RepairDetail from "./pages/RepairDetail";

const Repair = () => {
    return (
        <Routes>
            <Route path=":id" element={<RepairDetail />} />
            <Route path="/" element={<RepairTable />} />
        </Routes>
    );
};

export default Repair;
