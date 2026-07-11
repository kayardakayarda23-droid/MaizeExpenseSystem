import API from "../api/api";

// Get All Expenses
export const getExpenses = async () => {
    const response = await API.get("/expenses");
    return response.data;
};

// Get One Expense
export const getExpense = async (id) => {
    const response = await API.get(`/expenses/${id}`);
    return response.data;
};


// Expense Statistics By Year
export const getExpenseStatistics = async () => {
    const response = await API.get("/expenses/statistics");
    return response.data;
};

// Add Expense
export const addExpense = async (expense) => {

    const formData = new FormData();

    Object.keys(expense).forEach((key) => {
        formData.append(key, expense[key]);
    });

    const response = await API.post(
        "/expenses",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

// Update Expense
export const updateExpense = async (id, expense) => {

    const formData = new FormData();

    Object.keys(expense).forEach((key) => {
        formData.append(key, expense[key]);
    });

    const response = await API.put(
        `/expenses/${id}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

// Delete Expense
export const deleteExpense = async (id) => {
    const response = await API.delete(`/expenses/${id}`);
    return response.data;
};