import Repair from "../middleware/repair";
import { toast } from "react-toastify";

var XLSX = require("xlsx");

const ExportExcel = async (value) => {
    /* generate worksheet and workbook */
    let queryParams = "";

    if (value[0] && value[1]) {
        queryParams = `?start_date=${value[0]}&end_date=${value[1]}`;
    }

    await Repair.RepairRequestExport(queryParams)
        .then((response) => response.data)
        .then((data) => {
            if (data) {
                const worksheet = XLSX.utils.json_to_sheet(data);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");

                /* fix headers */
                XLSX.utils.sheet_add_aoa(
                    worksheet,
                    [
                        [
                            "เลขที่ใบแจ้งซ่อม",
                            "ชื่อ",
                            "นามสกุล",
                            "เบอร์โทรศัพท์ ",
                            "บ้านเลขที่ / อาคาร / ซอย / ถนน",
                            "แขวง / ตำบล",
                            "เขต / อำเภอ",
                            "จังหวัด",
                            "รหัสไปรษณีย์",
                            "Brand",
                            "ชื่ออุปกรณ์ ",
                            "หมายเลขเครื่อง/Serial Number",
                            "รายละเอียดการซ่อม/ปัญหา",
                            "วันที่รับซ่อม",
                            "วันที่นัดรับ",
                            "หมายเหตุ",
                            "ช่องทางรับแจ้ง ",
                            "ระยะเวลาประกัน",
                            "วันที่แจ้งเรื่อง",
                            "ช่องทางการสั่งซื้อ",
                            "เลขที่ออเดอร์ / เลขที่ทำรายการ ",
                            "ผู้บันทึกข้อมูล",
                            "สถานะการแจ้งซ่อม",
                        ],
                    ],
                    { origin: "A1" }
                );

                /* calculate column width */
                const max_width = data.reduce(
                    (w, r) => Math.max(w, r.repair_no.length),
                    20
                );
                worksheet["!cols"] = [{ wch: max_width }];
                return XLSX.writeFile(workbook, "Repair System.xlsx");
            }
        })
        .catch((err) => {
            const statusCode =
                (err.response &&
                    err.response.data &&
                    err.response.data.statusCode) ||
                err.statusCode ||
                err.toString();

            toast.error(
                statusCode === 400
                    ? "วันที่สิ้นสุดต้องไม่เกินวันที่ปัจจุบัน!"
                    : "ไม่สามารถเชื่อมต่อ Server ได้",
                {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }
            );
        });
};

export default ExportExcel;
