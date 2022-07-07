import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MaterialTable from "material-table";
import { history } from "../../../helpers/history";
import { Button, Stack, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { getAllRepair } from "../../../services/actions/repairs";

const RepairTable = () => {
    const dispatch = useDispatch();
    const [rowData, setRowData] = useState("");
    const { dataAllRepair = [] } = useSelector((state) => state.repairs);
    // const [selectedRow, setSelectedRow] = useState(null);

    useEffect(() => {
        dispatch(getAllRepair());
    }, []);

    const selectRow = (selectRow) => {
        // alert(selectRow.repair_id);
        const id = selectRow.repair_id;

        history.push(`/repair/${id}`);
        window.location.reload();
    };

    const handleCreateRepair = () => {
        history.push("/repair/new");
        window.location.reload();
    };

    return (
        <>
            <Stack
                sx={{ my: 2 }}
                direction="row"
                justifyContent={"space-between"}
            >
                <Typography variant="h5" component="h1">
                    RepairTable
                </Typography>
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
                    pageSize: 5,
                    toolbar: false,
                    // maxBodyHeight: "50vh",
                    // headerStyle: { position: 'sticky', top: 0 }
                }}
                title=""
                columns={[
                    { title: "เลขที่ใบรับ", field: "repair_no" },
                    {
                        title: "Serial number",
                        field: "product_serial_no",
                        textOverflow: "ellipsis",
                    },
                    {
                        title: "ชื่อ",
                        field: "customer_firstname",
                        textOverflow: "ellipsis",
                    },
                    {
                        title: "นามสกุล",
                        field: "customer_lastname",
                        textOverflow: "ellipsis",
                    },
                    {
                        title: "โทรศัพท์",
                        field: "customer_tel",
                        type: "numeric",
                    },
                    {
                        title: "อุปกรณ์",
                        field: "product_name",
                        textOverflow: "ellipsis",
                    },
                    {
                        title: "วันที่รับซ่อม",
                        field: "received_date",
                    },
                    {
                        title: "วันที่นัดรับ",
                        field: "return_date",
                    },
                    {
                        title: "สถานะการซ่อม",
                        field: "status_name",
                    },
                ]}
                data={dataAllRepair}
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
