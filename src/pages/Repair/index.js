import React from "react";
import { Routes, Route } from "react-router-dom";

import RepairTable from "./components/RepairTable";
import RepairDetail from "./components/RepairDetail";

const Repair = () => {
    return (
        <Routes>
            <Route path=":id" element={<RepairDetail />} />
            <Route path="/" element={<RepairTable />} />
        </Routes>
    );
};

export default Repair;
