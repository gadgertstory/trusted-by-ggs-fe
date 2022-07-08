import React from "react";
import { Routes, Route } from "react-router-dom";

import RepairTable from "./pages/RepairTable";
import RepairDetail from "./pages/RepairDetail";
import NotFound from "../NotFound";

const Repair = () => {
    return (
        <Routes>
            <Route path=":id" element={<RepairDetail />} />
            <Route path="/" element={<RepairTable />} />
            {/* <Route path=":id*" element={<NotFound />} /> */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default Repair;
