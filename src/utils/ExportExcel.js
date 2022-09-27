import Repair from "../middleware/repair";

var XLSX = require("xlsx");

const ExportExcel = async (value) => {
    /* generate worksheet and workbook */
    let queryParams = ''

    if (value[0] && value[1]) {
        queryParams = `?start_date=${value[0]}&end_date=${value[1]}`
    }

    await Repair.RepairRequestExport(queryParams)
        .then((response) => response.data)
        .then((data) => {
            if (data) {
                const worksheet = XLSX.utils.json_to_sheet(data);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");

                /* fix headers */
                XLSX.utils.sheet_add_aoa(worksheet, [["id", "no", "customer_firstname"]], { origin: "A1" });

                /* calculate column width */
                const max_width = data.reduce((w, r) => Math.max(w, r.repair_no.length), 20);
                worksheet["!cols"] = [{ wch: max_width }];
                return XLSX.writeFile(workbook, "Presidents.xlsx");
            }
        });
}

export default ExportExcel;
