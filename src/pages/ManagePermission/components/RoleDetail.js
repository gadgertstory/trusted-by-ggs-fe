import { Controller } from "react-hook-form";

import {
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select
} from "@mui/material";

const RoleDetail = (props) => { 
    const {
        control,
        // error,
        // setError,
        classes,
        roles
    } = props;
    
    return (
        <Paper
            sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                mb: 3,
            }}
        >
            <h2>แก้ไขสิทธิ์</h2>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                <Controller
                        name="role_name"
                        required
                        control={control}
                        defaultValue=""
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <FormControl
                                className={classes.formControl}
                                fullWidth
                                required
                                error={!!error}
                            >
                                <InputLabel id="demo-simple-select-required-label">
                                    สิทธิ์ผู้ใช้งาน
                                </InputLabel>
                                <Select
                                    size="small"
                                    value={value}
                                    label="สิทธิ์ผู้ใช้งาน"
                                    onChange={onChange}
                                    error={!!error}
                                    MenuProps={{
                                        classes: { paper: classes.menuPaper },
                                    }}
                                >
                                    {roles?.map((item) => {
                                        return (
                                            <MenuItem
                                                key={item.role_id}
                                                value={item.role_name}
                                            >
                                                {item.role_name}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                                <FormHelperText error>
                                    {error ? error.message : null}
                                </FormHelperText>
                            </FormControl>
                        )}
                        rules={{
                            required: "กรุณาเลือก ช่องทางรับแจ้ง",
                        }}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default RoleDetail;
