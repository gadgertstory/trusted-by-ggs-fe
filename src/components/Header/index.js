import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "@mui/material/Link";

import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import TrustedByGGSLogo from "../../assets/Logo/Trusted-by-GGS.png";

import EventBus from "../../common/EventBus";
import { logout } from "../../services/actions/auth";
import { getProfile } from "../../services/actions/profile";

const pagesList = [
    {
        pathname: "/",
        name: "หน้าหลัก",
    },
    {
        pathname: "/repair?status_no=0&customer_name=",
        name: "งานซ่อม",
    },
    {
        pathname: "/warranty",
        name: "การรับประกัน",
    },
];

const pagesSuperAdminList = [
    {
        pathname: "/manage-permission",
        name: "จัดการสิทธิ์ผู้ใช้",
    },
    {
        pathname: "/register",
        name: "เพิ่มผู้ใช้งาน",
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

const ResponsiveAppBar = () => {
    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const { profile } = useSelector((state) => state.profile);

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
        dispatch(getProfile());
    }, [dispatch]);

    useEffect(() => {
        EventBus.on("logout", () => {
            logOut();
        });

        return () => {
            EventBus.remove("logout");
        };
    }, [dataUser, logOut]);

    const renderPageListResponsive = pagesList.map((page) => (
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

    const renderSuperAdminPageListResponsive = pagesSuperAdminList.map(
        (page) => (
            <Link
                key={`${page.pathname}`}
                href={`${page.pathname}`}
                underline="none"
            >
                <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
            </Link>
        )
    );

    const renderPageList = pagesList.map((page) => (
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

    const renderSuperAdminPageList = pagesSuperAdminList.map((page) => (
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
            <Container maxWidth="xxl">
                <Toolbar disableGutters>
                    <Box
                        component="img"
                        sx={{
                            width: 50,
                            my: 2,
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                        }}
                        src={TrustedByGGSLogo}
                        alt={TrustedByGGSLogo}
                    ></Box>
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
                        Trusted By GGS
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {renderPageList}
                        {profile.role?.role_name === "superAdmin"
                            ? renderSuperAdminPageList
                            : ""}
                    </Box>
                    {/* ============================Menu Responsive==========================      */}
                    <Box
                        component="img"
                        sx={{
                            width: 50,
                            my: 2,
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                        }}
                        src={TrustedByGGSLogo}
                        alt={TrustedByGGSLogo}
                    ></Box>
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
                        Trusted By GGS
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
                            {renderPageListResponsive}
                            {profile.role?.role_name === "superAdmin"
                                ? renderSuperAdminPageListResponsive
                                : ""}
                        </Menu>
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
                        {profile.user_name?.toUpperCase()}
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ pl: 1 }}
                            >
                                <Avatar
                                    alt={profile.user_name?.toUpperCase()}
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
