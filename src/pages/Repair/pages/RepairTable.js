import React, { useState } from "react";
import MaterialTable from "material-table";
import { history } from "../../../helpers/history";
import { Button, Stack, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const RepairTable = () => {
    const [rowData, setRowData] = useState("");
    // const [selectedRow, setSelectedRow] = useState(null);

    const selectRow = (selectRow) => {
        // alert(selectRow.tableData.id);
        const id = selectRow.tableData.id;

        history.push(`/repair/${id}`);
        window.location.reload();
    };

    const handleCreateRepair = () =>{
        history.push('/repair/new');
        window.location.reload();
    }

    return (
        <>
            <Stack sx={{my:2}} direction="row" justifyContent={"space-between"}>
                <Typography variant="h5" component="h1">RepairTable</Typography>
                <Button
                    sx={{
                        bgcolor: "secondary.light",
                        color: "background.default",
                        ":hover": {
                            bgcolor: "secondary.main",
                        },
                    }}
                    variant="contained"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={handleCreateRepair}
                >
                    เพิ่มใบแจ้งซ่อม
                </Button>
            </Stack>
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
