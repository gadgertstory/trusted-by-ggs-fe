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
import EventBus from "../../common/EventBus";

const pagesList = [
    {
        pathname: "/",
        name: "หน้าหลัก",
    },
    {
        pathname: "/repair?status_no=0&customer_name=",
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
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const [dataUser] = useState(currentUser);

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
        EventBus.on("logout", () => {
            logOut();
        });

        return () => {
            EventBus.remove("logout");
        };
    }, [dataUser, logOut]);

    const renderPageList = pagesList.map((page) => (
        <Link
            key={`${page.pathname}`}
            href={`${page.pathname}`}
            underline="none"
        >
            <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{page.name}</Typography>
            </MenuItem>
        </Link>
    ));

    const renderPageListResponsive = pagesList.map((page) => (
        <Link underline="none" key={page.pathname} href={`${page.pathname}`}>
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
    ));

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
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
                            {renderPageList}
                        </Menu>
                    </Box>

                    {/* ==========================Menu Responsive=========================== */}

                    <ConstructionIcon
                        sx={{
                            display: { xs: "flex", md: "none" },
                            fontSize: 40,
                            mr: 1,
                        }}
                    />

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            direction: "flex-wrap",
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".2rem",
                            color: "inherit",
                            textDecoration: "none",
                            whiteSpace: "pre-wrap",
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
                        {renderPageListResponsive}
                    </Box>

                    {/* ============================Setting==========================      */}

                    <Box
                        sx={{
                            flexGrow: 0,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {dataUser.currentUser.data.name.toUpperCase()}
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ pl: 1 }}
                            >
                                <Avatar
                                    alt={dataUser.currentUser.data.name.toUpperCase()}
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
