import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const exportPDF = (expenses) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Maize Farming Expense Report", 14, 18);

    const tableData = expenses.map((expense) => [
        expense.title,
        expense.category,
        `₦${Number(expense.amount).toLocaleString()}`,
        expense.expense_date.substring(0, 10),
        expense.description || "",
    ]);

    autoTable(doc, {
        head: [[
            "Title",
            "Category",
            "Amount",
            "Date",
            "Description",
        ]],
        body: tableData,
        startY: 30,
    });

    doc.save("Expense_Report.pdf");
};

export default exportPDF;