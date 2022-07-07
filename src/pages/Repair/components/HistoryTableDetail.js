import React from "react";
import { useSelector } from "react-redux";

import MaterialTable from "material-table";
import { Stack, Typography } from "@mui/material";

const HistoryTableDetail = () => {
    const { dataRepair } = useSelector((state) => state.repair);

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
                    // maxBodyHeight: "50vh",
                    // headerStyle: { position: 'sticky', top: 0 }
                }}
                title=""
                columns={[
                    { title: "ผู้ปฏิบัติงาน", field: "user.user_name" },
                    {
                        title: "สถานะการซ่อม",
                        field: "status.status_name",
                        textOverflow: "ellipsis",
                    },
                    {
                        title: "วันที่ทำรายการ",
                        field: "process_date",
                        textOverflow: "ellipsis",
                    },
                    {
                        title: "รายละเอียดการซ่อม",
                        field: "remark",
                        textOverflow: "ellipsis",
                    },
                ]}
                data={dataRepair.histories}
            />
        </>
    );
};

export default HistoryTableDetail;
