import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import Link from "@mui/material/Link";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import MenuIcon from "@mui/icons-material/Menu";
import ConstructionIcon from "@mui/icons-material/Construction";

import { logout } from "../../services/actions/auth";
// import AuthVerify from "./common/AuthVerify";
import EventBus from "../../common/EventBus";

const pages = [
    {
        pathname: "/",
        name: "หน้าหลัก",
    },
    {
        pathname: "/repairs",
        name: "งานซ่อม",
    },
];

const settings = [
    {
        pathname: "/profile",
        name: "Profile",
    },
    {
        pathname: "logout",
        name: "Logout",
    },
];

const ResponsiveAppBar = (currentUser) => {
    const dispatch = useDispatch();
    // const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    // const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    // const [value, setValue] = React.useState(0);

    const [dataUser] = useState(currentUser)

    // const handleChange = (event, newValue) => {
    //     setValue(newValue);
    // };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    useEffect(() => {
        console.log("dataUser in Header", dataUser);
        // if (dataUser) {
        //     setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
        //     setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
        // } else {
        //     setShowModeratorBoard(false);
        //     setShowAdminBoard(false);
        // }

        EventBus.on("logout", () => {
            logOut();
        });

        return () => {
            EventBus.remove("logout");
        };
    }, [dataUser, logOut]);

    return (
        <AppBar position="static">
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <ConstructionIcon
                        sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".1rem",
                            color: "inherit",
                            textDecoration: "none",
                            cursor: "pointer",
                        }}
                    >
                        Repair System
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pages.map((page) => (
                                <Link
                                    key={`${page.pathname}`}
                                    href={`${page.pathname}`}
                                    underline="none"
                                >
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">
                                            {page.name}
                                        </Typography>
                                    </MenuItem>
                                </Link>
                            ))}
                        </Menu>
                    </Box>

                    {/* ==========================Menu Responsive=========================== */}

                    <ConstructionIcon
                        sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
                    />

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        Repair System
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {pages.map((page) => (
                            <Link
                                underline="none"
                                key={page.pathname}
                                href={`${page.pathname}`}
                            >
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: "white",
                                        display: "block",
                                    }}
                                >
                                    {page.name}
                                </Button>
                            </Link>
                        ))}
                    </Box>

                    {/* ============================Setting==========================      */}

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar
                                    // alt={dataUser.name.toUpperCase()}
                                    src="/static/images/avatar/2.jpg"
                                />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem
                                    key={setting.pathname}
                                    onClick={handleCloseUserMenu}
                                >
                                    {setting.pathname !== "logout" ? (
                                        <Link
                                            underline="none"
                                            href={`${setting.pathname}`}
                                        >
                                            <Typography textAlign="center">
                                                {setting.name}
                                            </Typography>
                                        </Link>
                                    ) : (
                                        <Link
                                            underline="none"
                                            href="/login"
                                            className="nav-link"
                                            onClick={logOut}
                                        >
                                            LogOut
                                        </Link>
                                    )}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
