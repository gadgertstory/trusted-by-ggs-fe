import React from "react";
import { Controller } from "react-hook-form";

import { Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const HeaderTable = (props) => {
    const { statusList, control } = props;
    return (
        <>
            <Grid container>
                <Grid item xs={12} md={3}>
                    <Controller
                        name="status_id"
                        required
                        control={control}
                        defaultValue=""
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-required-label">
                                    สถานะการซ่อม
                                </InputLabel>
                                <Select
                                    size="small"
                                    value={value}
                                    label="Status"
                                    onChange={onChange}
                                >
                                    {statusList?.map((item) => {
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
                            </FormControl>
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={3}></Grid>
            </Grid>
        </>
    );
};

export default HeaderTable;
