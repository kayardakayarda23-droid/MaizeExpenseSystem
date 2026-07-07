import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const MonthlyBarChart = ({ expenses }) => {

    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    const totals = new Array(12).fill(0);

    expenses.forEach((expense) => {
        const month = new Date(expense.expense_date).getMonth();

        totals[month] += Number(expense.amount);
    });

    const data = {
        labels: months,
        datasets: [
            {
                label: "Monthly Expenses (₦)",
                data: totals,
                backgroundColor: [
                    "#198754",
                    "#198754",
                    "#198754",
                    "#198754",
                    "#198754",
                    "#198754",
                    "#198754",
                    "#198754",
                    "#198754",
                    "#198754",
                    "#198754",
                    "#198754",
                ],
                borderRadius: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: "Monthly Expenses",
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default MonthlyBarChart;