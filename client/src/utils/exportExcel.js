import * as XLSX from "xlsx";

const exportExcel = (expenses) => {

    const worksheet = XLSX.utils.json_to_sheet(

        expenses.map((expense) => ({

            Title: expense.title,

            Category: expense.category,

            Amount: Number(expense.amount),

            Date: expense.expense_date.substring(0, 10),

            Description: expense.description,

        }))

    );

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Expenses"
    );

    XLSX.writeFile(
        workbook,
        "Expense_Report.xlsx"
    );

};

export default exportExcel;