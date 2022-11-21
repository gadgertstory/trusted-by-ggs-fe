import React from "react";
import { useSelector } from "react-redux";

import { Grid, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import Input from "../../../components/Input";
import SelectMenu from "../../../components/SelectMenu";

const HeaderTable = (props) => {
    const { statusList = [] } = useSelector((state) => state.status);
    const { status, onChangeStatus, onSearch, keyword, onChangeKeyword, roleUser, handleOpenDialog } =
        props;

    const statusDropdown = [
        { status_id: 0, status_name: "ทั้งหมด" },
        ...statusList,
    ];

    return (
        <Grid container direction={'row'} justifyContent={'space-between'}>
            <Grid item xs={8} sx={{ my: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        <SelectMenu
                            list={statusDropdown}
                            value={status}
                            label="สถานะการซ่อม"
                            fullWidth
                            onChange={onChangeStatus}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Input
                            onChange={onChangeKeyword}
                            value={keyword}
                            fullWidth={true}
                            label="ค้นหาจาก ชื่อ"
                            type="search"
                            onKeyDown={(event) => {
                                if (event.code === "Enter") {
                                    onSearch(false);
                                }
                            }}
                            onInput={(e) => {
                                if (e.target.value === "") {
                                    onSearch(true);
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Button
                            variant="contained"
                            onClick={() => {
                                onSearch(false);
                            }}
                        >
                            <SearchIcon />
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid display={'flex'} alignItems={'center'} >
                {roleUser.roleUser.role === "admin" || roleUser.roleUser.role === "superAdmin" ? (
                    <Button
                        sx={{
                            bgcolor: "primary.dark",
                            color: "background.default",
                            ":hover": {
                                bgcolor: "primary.main",
                            },
                        }}
                        variant="contained"
                        startIcon={<FileDownloadIcon />}
                        onClick={handleOpenDialog}
                    >
                        Export Excel
                    </Button>
                ) : (
                    ""
                )}
            </Grid>
        </Grid>
    );
};

export default HeaderTable;
