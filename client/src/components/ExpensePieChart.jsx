import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const ExpensePieChart = ({ expenses }) => {

    const categoryTotals = {};

    expenses.forEach((expense) => {
        if (!categoryTotals[expense.category]) {
            categoryTotals[expense.category] = 0;
        }

        categoryTotals[expense.category] += Number(expense.amount);
    });

    const data = {
        labels: Object.keys(categoryTotals),
        datasets: [
            {
                data: Object.values(categoryTotals),
                backgroundColor: [
                    "#198754",
                    "#0d6efd",
                    "#ffc107",
                    "#dc3545",
                    "#20c997",
                    "#6f42c1",
                    "#fd7e14",
                    "#6c757d",
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
            title: {
                display: true,
                text: "Expenses by Category",
            },
        },
    };

    return <Pie data={data} options={options} />;
};

export default ExpensePieChart;