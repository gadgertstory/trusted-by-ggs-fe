import React, { useEffect, useState } from "react";

import MaterialTable from "material-table";
import { Stack, Typography } from "@mui/material";

import BadgeStatus from "../../../components/Badge";

const HistoryTableDetail = ({ dataRepair }) => {
    const [dataHistory, setDataHistory] = useState([]);

    useEffect(() => {
        const _newData = dataRepair.histories;
        const _newDataDate = _newData?.map((index) => ({
            ...index,
            process_date: new Date(index.process_date).toLocaleString("en-GB", {
                timeZone: "UTC",
            }),
        }));
        setDataHistory(_newDataDate);
    }, [dataRepair]);

    const tableColumns = [
        {
            title: "ลำดับ",
            textAlign: "center",
            render: (rowData) => (
                <Typography component="p" variant="p">
                    {rowData.tableData.id + 1}
                </Typography>
            ),
            width: "10%",
        },
        { title: "ผู้ปฏิบัติงาน", field: "user.user_name", width: "10%" },
        {
            title: "สถานะการซ่อม",
            align: "center",
            cellStyle: {
                textAlign: "center",
            },
            render: (rowData) => (
                <BadgeStatus
                    badgeContent={rowData.status.status_name}
                ></BadgeStatus>
            ),
            width: "10%",
        },
        {
            title: "วันที่ทำรายการ",
            field: "process_date",
            width: "20%",
        },
        {
            title: "รายละเอียดการซ่อม",
            field: "description",
            width: "50%",
        },
    ];

    return (
        <>
            <Stack
                sx={{ my: 2 }}
                direction="row"
                justifyContent={"space-between"}
            >
                <Typography variant="h5" component="h1">
                    ประวัติการทำรายการ
                </Typography>
            </Stack>

            <MaterialTable
                options={{
                    search: false,
                    actionsColumnIndex: -1,
                    pageSize: 5,
                    toolbar: false,
                    sorting: false,
                }}
                title=""
                columns={tableColumns}
                data={dataHistory}
                localization={{
                    body: {
                        emptyDataSourceMessage: (
                            <h1
                                style={{
                                    top: "50%",
                                    textAlign: "center",
                                }}
                            >
                                ไม่พบข้อมูล
                            </h1>
                        ),
                    },
                }}
            />
        </>
    );
};

export default HistoryTableDetail;
