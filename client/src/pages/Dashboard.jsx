import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../api/api";

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
import { getExpenseStatistics } from "../services/expenseService";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {

    const [dashboard, setDashboard] = useState({
        totalExpenses: 0,
        totalAmount: 0,
        averageExpense: 0,
        highestExpense: 0,
        lowestExpense: 0,
    });

    const [statistics, setStatistics] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboard();
        loadStatistics();
    }, []);

    const loadDashboard = async () => {

        try {

            const res = await API.get("/dashboard");

            setDashboard(res.data.dashboard);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    const loadStatistics = async () => {

        try {

            const data = await getExpenseStatistics();

            setStatistics(data.statistics);

        } catch (error) {

            console.log(error);

        }

    };

    const chartData = {

        labels: statistics.map(
            item => `${item.month}/${item.year}`
        ),

        datasets: [

            {

                label: "Monthly Expenses (₦)",

                data: statistics.map(
                    item => item.total
                ),

                backgroundColor: "rgba(25,135,84,0.7)",

                borderColor: "rgba(25,135,84,1)",

                borderWidth: 1,

            },

        ],

    };

    const chartOptions = {

        responsive: true,

        plugins: {

            legend: {
                position: "top",
            },

            title: {
                display: true,
                text: "Monthly Maize Farming Expenses",
            },

        },

    };

    if (loading) {

        return (

            <Layout>

                <div className="text-center mt-5">

                    <div className="spinner-border text-success"></div>

                    <p className="mt-3">

                        Loading Dashboard...

                    </p>

                </div>

            </Layout>

        );

    }

    return (

        <Layout>

            <div className="container-fluid">

                <h2 className="mb-4">

                    🌽 Maize Farming Expense Dashboard

                </h2>

                <div className="row">

                    <div className="col-md-3 mb-4">

                        <div className="card bg-success text-white shadow">

                            <div className="card-body">

                                <h5>Total Expense Records</h5>

                                <h2>{dashboard.totalExpenses}</h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3 mb-4">

                        <div className="card bg-danger text-white shadow">

                            <div className="card-body">

                                <h5>Total Amount Spent</h5>

                                <h2>

                                    ₦{Number(
                                        dashboard.totalAmount
                                    ).toLocaleString()}

                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-2 mb-4">

                        <div className="card bg-primary text-white shadow">

                            <div className="card-body">

                                <h5>Average</h5>

                                <h4>

                                    ₦{Number(
                                        dashboard.averageExpense
                                    ).toLocaleString()}

                                </h4>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-2 mb-4">

                        <div className="card bg-warning text-dark shadow">

                            <div className="card-body">

                                <h5>Highest</h5>

                                <h4>

                                    ₦{Number(
                                        dashboard.highestExpense
                                    ).toLocaleString()}

                                </h4>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-2 mb-4">

                        <div className="card bg-secondary text-white shadow">

                            <div className="card-body">

                                <h5>Lowest</h5>

                                <h4>

                                    ₦{Number(
                                        dashboard.lowestExpense
                                    ).toLocaleString()}

                                </h4>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="card shadow">

                    <div className="card-header bg-success text-white">

                        <h5 className="mb-0">

                            Monthly Expense Statistics

                        </h5>

                    </div>

                    <div className="card-body">

                        <Bar

                            data={chartData}

                            options={chartOptions}

                        />

                    </div>

                </div>

            </div>

        </Layout>

    );

};

export default Dashboard;