import React, { useEffect, useState } from "react";
import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    Typography,
} from "@mui/material";
import MaterialTable from "material-table";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../../../services/actions/user";
import { getAllRoles } from "../../../services/actions/role";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { Controller } from "react-hook-form";

const RoleDetail = (props) => {
    const dispatch = useDispatch();
    const { dataAllUsers = [] } = useSelector((state) => state.user);
    const { dataAllRoles = [] } = useSelector((state) => state.role);

    // const [switchCheck, setSwitchCheck] = React.useState([]); 
    const [user, setUser] = useState(dataAllUsers);
    const [isEdit, setIsEdit] = useState(false);
    const [value, setValue] = useState('');


    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getAllRoles());
    }, [dispatch]);

    const {
        control,
        // onEdit,
        // roleUser,
        // classes,
    } = props;

    const handleChange = (id, checked) => {
        console.log(id, checked)
        if (id === value) {
            setIsEdit(checked)
        }
    }

    const changee = (value) => { 
        setValue(value)
    }

    return (
        <>
            <MaterialTable
                options={{
                    search: false,
                    actionsColumnIndex: -1,
                    pageSize: 20,
                    toolbar: false,
                    sorting: false,
                }}
                title=""
                columns={[
                    {
                        title: "ลำดับ",
                        textAlign: "center",
                        render: (rowData) => (
                            <Typography component="p" variant="p">
                                {rowData.tableData.id + 1}
                            </Typography>
                        ),
                    },
                    {
                        title: "ชื่อ",
                        render: (rowData) => (
                            <Box
                                sx={{
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    maxWidth: 150,
                                }}
                            >
                                {rowData.user_name}
                            </Box>
                        ),
                    },

                    {
                        title: "อีเมล",
                        render: (rowData) => (
                            <Box
                                sx={{
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    maxWidth: 100,
                                }}
                            >
                                {rowData.user_email}
                            </Box>
                        ),
                    },

                ]}
                data={dataAllUsers}
                localization={{
                    header: {
                        actions: " ",
                    },
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

export default RoleDetail;
