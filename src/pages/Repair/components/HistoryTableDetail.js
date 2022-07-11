import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import MaterialTable from "material-table";
import { Stack, Typography } from "@mui/material";

const HistoryTableDetail = () => {
    const { dataRepair } = useSelector((state) => state.repair);

    useEffect(() => {
        const _newData = dataRepair.histories;
        _newData?.map((index) => {
            const processDate = index.process_date;
            const process_date = new Date(processDate).toLocaleString();
            if (processDate) {
                return Object.assign(..._newData, { process_date });
            } else {
                return "";
            }
        });
    }, [dataRepair]);

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
                        field: "description",
                        textOverflow: "ellipsis",
                    },
                ]}
                data={dataRepair.histories}
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
