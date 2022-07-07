import React from "react";
import { useSelector } from "react-redux";

import { Grid, FormControl, InputLabel, MenuItem, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import  Input from "../../../components/Input";
import  SelectMenu from "../../../components/SelectMenu";

const HeaderTable = (props) => {
    const { statusList = [] } = useSelector((state) => state.status);
    const { status, onChangeStatus, onSearch, keyword, onChangeKeyword } =
        props;

    const statusDropdown = [
        { status_id: 0, status_name: "ทั้งหมด" },
        ...statusList,
    ];

    return (
        <Grid container spacing={2} sx={{ my: 2 }}>
            <Grid item xs={12} md={3}>
                {/* <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-required-label">
                        สถานะการซ่อม
                    </InputLabel>
                    <Select
                        size="small"
                        value={status}
                        label="Status"
                        onChange={onChangeStatus}
                    >
                        {statusDropdow?.map((item) => {
                            return (
                                <MenuItem
                                    key={item.status_id}
                                    value={item.status_id}
                                >
                                    {item.status_name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl> */}
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
                    label="ค้นหา Serial Number"
                    type="search"
                    onInput={(e) => {
                        if (e.target.value === "") onSearch(true);
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
    );
};

export default HeaderTable;
