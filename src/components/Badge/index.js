import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Badge from "@mui/material/Badge";

const styles = (theme) => ({
    statusId1: {
        backgroundColor: "#512da8",
        color: "white",
    },
    statusId2: {
        backgroundColor: "#283593",
        color: "white",
    },
    statusId3: {
        backgroundColor: "#26c6da",
        color: "white",
    },
    statusId4: {
        backgroundColor: "#1b5e20",
        color: "white",
    },
    statusId5: {
        backgroundColor: "#ff1744",
        color: "white",
    },
    statusId6: {
        backgroundColor: "#00e5ff",
        color: "white",
    },
    statusId7: {
        backgroundColor: "#ffab00",
        color: "white",
    },
    statusId8: {
        backgroundColor: "#e64a19",
        color: "white",
    },
    statusId9: {
        backgroundColor: "#00bfa5",
        color: "white",
    },
});

const BadgeStatus = (props) => {
    const { badgeContent, classes } = props;
    const [colorCustom, setColorCustom] = useState("");

    useEffect(() => {
        if (badgeContent) {
            if (badgeContent === "แจ้งซ่อม") {
                return setColorCustom(classes.statusId1);
            } else if (badgeContent === "กำลังดำเนินการ") {
                return setColorCustom(classes.statusId2);
            } else if (badgeContent === "รออะไหล่") {
                return setColorCustom(classes.statusId3);
            } else if (badgeContent === "ซ่อมสำเร็จ") {
                return setColorCustom(classes.statusId4);
            } else if (badgeContent === "ซ่อมไม่สำเร็จ") {
                return setColorCustom(classes.statusId5);
            } else if (badgeContent === "เปลี่ยนสินค้าชิ้นใหม่") {
                return setColorCustom(classes.statusId6);
            } else if (badgeContent === "ยกเลิกการซ่อม") {
                return setColorCustom(classes.statusId7);
            } else if (badgeContent === "ชำระเงิน") {
                return setColorCustom(classes.statusId8);
            } else {
                return setColorCustom(classes.statusId9);
            }
        }
    }, [badgeContent]);

    return (
        <Badge
            sx={{ whiteSpace: "nowrap" }}
            classes={{ badge: colorCustom }}
            badgeContent={badgeContent}
        ></Badge>
    );
};

BadgeStatus.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BadgeStatus);
