import { Controller } from "react-hook-form";

import {
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem, 
    Select,
    Typography
} from "@mui/material";

const RoleDetail = (props) => {
    const {
        control, 
        classes,
        roles,
        name,
        email
    } = props;

    return (
        <>
            <Grid container direction="column">
                <Typography variant="p">
                    <strong>Email: </strong> {email}
                </Typography>
                <Typography variant="p">
                    <strong>Name: </strong> {name}
                </Typography>
                <Grid variant="p">
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
                                    sx={{ mb: 2 }}
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
        </>
    );
};

export default RoleDetail;
