import React, { useState } from "react";
import { Controller } from "react-hook-form";

import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    ButtonGroup,
    Button,
    Popper,
    MenuList,
    Paper,
    ClickAwayListener,
    Grow,
} from "@mui/material";

import { MoreVert } from "@mui/icons-material";

import { options } from "../../../dataMock/master";

const RoleDetail = (props) => {
    const {
        control,
        classes,
        roles,
        dataUser,
        isEdit,
        setIsEdit,
        setOpenConfirmRemove,
    } = props;

    const [open, setOpen] = useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [placement, setPlacement] = React.useState();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuItemClick = (event, index, option) => {
        if (option.name === "Edit") {
            setIsEdit(!isEdit);
            setSelectedIndex(index);
        } else setOpenConfirmRemove(true);
        setOpen(false);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleToggle = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };

    return (
        <>
            <Grid
                container
                flexDirection="row"
                justifyContent="flex-end"
                alignItems="center"
            >
                <ButtonGroup
                    variant="contained"
                    ref={anchorRef}
                    aria-label="split button"
                >
                    <Button
                        size="small"
                        aria-controls={open ? "split-button-menu" : undefined}
                        aria-expanded={open ? "true" : undefined}
                        aria-label="select merge strategy"
                        aria-haspopup="menu"
                        onClick={handleToggle("bottom-end")}
                    >
                        <MoreVert />
                    </Button>
                </ButtonGroup>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    placement={placement}
                    transition
                    disablePortal
                    sx={{ zIndex: 2 }}
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === "right bottom"
                                        ? "center top"
                                        : "center bottom",
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        id="split-button-menu"
                                        autoFocusItem
                                    >
                                        {options.map((option, index) => (
                                            <MenuItem
                                                key={option.name}
                                                selected={
                                                    index === selectedIndex
                                                }
                                                onClick={(event) =>
                                                    handleMenuItemClick(
                                                        event,
                                                        index,
                                                        option
                                                    )
                                                }
                                            >
                                                <Typography
                                                    variant="p"
                                                    component="p"
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "center",
                                                        aligItems: "center",
                                                    }}
                                                    color={
                                                        option.name === "Delete"
                                                            ? "error.light"
                                                            : ""
                                                    }
                                                >
                                                    {option.name === "Print" ? (
                                                        ""
                                                    ) : (
                                                        <>
                                                            {option.icon}
                                                            {option.name}
                                                        </>
                                                    )}
                                                </Typography>
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </Grid>
            <Grid container direction="column">
                <Typography variant="p">
                    <strong>Email: </strong> {dataUser.user_email}
                </Typography>
                <Typography variant="p">
                    <strong>Name: </strong> {dataUser.user_name}
                </Typography>
                {isEdit ? (
                    <Grid>
                        <Grid item sm={6}>
                            <Controller
                                name="role_name"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                    <FormControl
                                        sx={{ mt: 2 }}
                                        className={classes.formControl}
                                        fullWidth
                                    >
                                        <InputLabel id="demo-simple-select-required-label">
                                            สิทธิ์ผู้ใช้งาน
                                        </InputLabel>
                                        <Select
                                            size="small"
                                            value={value}
                                            label="สิทธิ์ผู้ใช้งาน"
                                            onChange={onChange}
                                            MenuProps={{
                                                classes: {
                                                    paper: classes.menuPaper,
                                                },
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
                                    </FormControl>
                                )}
                            />
                        </Grid>
                    </Grid>
                ) : (
                    <Typography variant="p">
                        <strong>Role: </strong> {dataUser.role?.role_name}
                    </Typography>
                )}
            </Grid>
        </>
    );
};

export default RoleDetail;
