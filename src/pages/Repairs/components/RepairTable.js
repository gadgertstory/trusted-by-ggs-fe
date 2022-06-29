import React, { useState } from "react";
import MaterialTable from "material-table";
import { history } from "../../../helpers/history";

const RepairTable = () => {
    const [rowData, setRowData] = useState("");
    // const [selectedRow, setSelectedRow] = useState(null);

    const selectRow = (selectRow) => {
        // alert(selectRow.tableData.id);
        const id = selectRow.tableData.id;

        history.push(`/repairs/detail/${id}`);
        window.location.reload();
    };

    return (
        <>
            <h1>RepairTable</h1>
            <MaterialTable
                options={{
                    search: false,
                    actionsColumnIndex: -1,
                }}
                title="Simple Action Preview"
                columns={[
                    { title: "Name", field: "name" },
                    { title: "Surname", field: "surname" },
                    {
                        title: "Birth Year",
                        field: "birthYear",
                        type: "numeric",
                    },
                    {
                        title: "Birth Place",
                        field: "birthCity",
                        lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
                    },
                ]}
                data={[
                    {
                        name: "Mehmet",
                        surname: "Baran",
                        birthYear: 1987,
                        birthCity: 63,
                    },
                    {
                        name: "Zerya Betül",
                        surname: "Baran",
                        birthYear: 2017,
                        birthCity: 34,
                    },
                ]}
                actions={[
                    {
                        icon: "visibility",
                        tooltip: "View Detail",
                        onClick: (e, rowData) => {
                            selectRow(rowData);
                        },
                    },
                ]}
            />
        </>
    );
};

export default RepairTable;
