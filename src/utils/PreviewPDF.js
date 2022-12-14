import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

pdfMake.fonts = {
    THSarabunNew: {
        normal: "THSarabunNew.ttf",
        bold: "THSarabunNew Bold.ttf",
        italics: "THSarabunNew Italic.ttf",
        bolditalics: "THSarabunNew BoldItalic.ttf",
    },
    Roboto: {
        normal: "Roboto-Regular.ttf",
        bold: "Roboto-Medium.ttf",
        italics: "Roboto-Italic.ttf",
        bolditalics: "Roboto-MediumItalic.ttf",
    },
};

const PreviewPDF = (dataRepairPDF, dataUrl) => {
    const ObjData = dataRepairPDF;

    const received_date = new Date(
        ObjData?.received_date === null ? "" : ObjData?.received_date
    );
    const return_date = new Date(
        ObjData?.return_date === null ? "" : ObjData?.return_date
    );
    const notified_date = new Date(ObjData?.notified_date);

    if (received_date.toString() === "Invalid Date") {
        var ThaiReceivedDate = "";
    } else {
        // eslint-disable-next-line 
        var ThaiReceivedDate  = received_date?.toLocaleDateString("th-TH", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long",
        }); 
    }

    if (return_date.toString() === "Invalid Date") {
        var ThaiReturnDate = "";
    } else {
        // eslint-disable-next-line 
        var ThaiReturnDate = return_date?.toLocaleDateString("th-TH", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long",
        });
    }

    const ThaiNotifiedDate = notified_date?.toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
    });

    var docDefinition = {
        info: {
            title: `${ObjData.repair_no}`,
        },
        content: [
            {
                columns: [
                    {
                        image: `${dataUrl}`,
                        width: 100,
                    },
                    {
                        text: "ใบรับซ่อมสินค้า",
                        style: ["FontSize20", "Bold", "AlignCenter"],
                    },
                    {
                        image: `${ObjData.QRCode}`,
                        width: 100,
                        // margin: [left, top, right, bottom]
                    },
                ],
            },
            {
                text: `${ObjData.customer_firstname} ${ObjData.customer_lastname}`,
                style: ["FontSize20", "Bold"],
            },
            {
                columns: [
                    {
                        text: `${ObjData.customer_house_no} ${ObjData.customer_subdistrict} ${ObjData.customer_district} ${ObjData.customer_province} ${ObjData.customer_zipcode}
                        โทรศัพท์: ${ObjData.customer_tel}
                        ช่องทางการสั่งซื้อ:  ${ObjData.purchase_method}
                        ช่องทางรับแจ้ง:  ${ObjData.receive_method}`,
                    },
                    {
                        text: `เลขที่ใบแจ้งซ่อม: ${ObjData.repair_no}
                        เลขที่ออเดอร์ / เลขที่ทำรายการ : ${ObjData.order_no} 
                        วันที่แจ้งเรื่อง : ${ThaiNotifiedDate} 
                        วันที่รับซ่อม : ${ThaiReceivedDate}`,
                    },
                ],
            },
            `\n`,
            {
                table: {
                    headerRows: 1,
                    widths: ["*", "*"],
                    body: [
                        [
                            `ชื่อลูกค้า: ${ObjData.customer_firstname} ${ObjData.customer_lastname}`,
                            `โทรศัพท์:  ${ObjData.customer_tel}`,
                        ],
                        [
                            {
                                text: `ที่อยู่: ${ObjData.customer_house_no} ${ObjData.customer_subdistrict} ${ObjData.customer_district} ${ObjData.customer_province} ${ObjData.customer_zipcode}`,
                                colSpan: 2,
                            },
                        ],
                        [
                            `อุปกรณ์: ${ObjData.product_name}`,
                            `หมายเลขเครื่อง: ${ObjData.product_serial_no}`,
                        ],
                        [
                            {
                                text: `รายละเอียดการซ่อม/ปัญหา: ${
                                    ObjData.description
                                        ? ObjData.description
                                        : ""
                                }`,
                                colSpan: 2,
                            },
                        ],
                        [
                            {
                                text: `ระยะประกัน:  ${ObjData.warranty_status}`,
                                colSpan: 2,
                            },
                        ],
                        [
                            {
                                text: `หมายเหตุ: ${
                                    ObjData.remark ? ObjData.remark : ""
                                }`,
                                colSpan: 2,
                            },
                        ],
                        [
                            {
                                text: `วันที่นัดรับ: ${ThaiReturnDate}`,
                                colSpan: 2,
                            },
                        ],
                    ],
                },
            },
            `\n \n`,
            {
                columns: [
                    {
                        text: `.......................................................`,
                        style: "AlignCenter",
                    },
                    {
                        text: `.......................................................`,
                        style: "AlignCenter",
                    },
                ],
            },
            {
                columns: [
                    { text: `ลูกค้า`, style: "AlignCenter" },
                    { text: `ผู้ปฏิบัติงาน`, style: "AlignCenter" },
                ],
            },
        ],
        defaultStyle: {
            font: "THSarabunNew",
            fontSize: 14,
        },
        styles: {
            FontSize20: {
                fontSize: 20,
            },
            Bold: {
                bold: true,
            },
            AlignCenter: {
                alignment: "center",
            },
            header: {
                fontSize: 22,
                bold: true,
            },
            anotherStyle: {
                alignment: "right",
            },
        },
    };
    pdfMake.createPdf(docDefinition).open();
};

export default PreviewPDF;
