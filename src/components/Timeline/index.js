import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import { TimelineItem as MuiTimelineItem } from "@mui/lab";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";

import { withStyles } from "@material-ui/core/styles";

import BadgeStatus from "../../components/Badge";
import { Box, Grid, Paper } from "@mui/material";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const TimelineItem = withStyles({
    missingOppositeContent: {
        "&:before": {
            display: "none",
        },
    },
})(MuiTimelineItem);

export default function CustomizedTimeline(props) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));
    const { dataRepair } = props;

    return (
        <>
            <Typography variant="h5" component="h1">
                ประวัติการทำรายการ
            </Typography>
            <Box width={matches ? "50%" : "100%"}>
                <Timeline position={"left"}>
                    {dataRepair?.histories?.map((history) => {
                        return (
                            <TimelineItem key={history.history_id}>
                                <TimelineSeparator>
                                    <TimelineDot />
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>
                                    <Paper sx={{ p: 2 }}>
                                        <Grid container>
                                            <Grid item xs={4}>
                                                <Typography
                                                    variant="caption"
                                                    fontWeight={"bold"}
                                                >
                                                    สถานะการซ่อม:
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <BadgeStatus
                                                    sx={{ mr: 6 }}
                                                    badgeContent={
                                                        history.status
                                                            ?.status_name
                                                    }
                                                ></BadgeStatus>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography
                                                    variant="caption"
                                                    fontWeight={"bold"}
                                                >
                                                    วันที่ทำรายการ:
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={8}>
                                                {new Date(
                                                    history.process_date
                                                ).toLocaleString("en-GB")}
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography
                                                    variant="caption"
                                                    fontWeight={"bold"}
                                                >
                                                    รายละเอียด:
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <Typography>
                                                    {history.description}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography
                                                    variant="caption"
                                                    fontWeight={"bold"}
                                                >
                                                    ผู้ปฏิบัติงาน:
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={8}>
                                                {history.user.user_name}
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </TimelineContent>
                            </TimelineItem>
                        );
                    })}
                </Timeline>
            </Box>
        </>
    );
}
