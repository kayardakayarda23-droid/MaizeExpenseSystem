import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../api/api";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

const Reports = () => {

    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        loadStatistics();
    }, []);

    const loadStatistics = async () => {

        try {

            const res = await API.get("/statistics/yearly");

            const statistics = res.data.statistics;

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

            statistics.forEach((item) => {
                totals[item.month - 1] = Number(item.total);
            });

            setChartData({

                labels: months,

                datasets: [

                    {

                        label: "Monthly Expenses",

                        data: totals,

                        backgroundColor: "#198754",

                    },

                ],

            });

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <Layout>

            <div className="container">

                <div className="card shadow">

                    <div className="card-header bg-success text-white">

                        <h3>

                            📊 Expense Statistics

                        </h3>

                    </div>

                    <div className="card-body">

                        {chartData ? (

                            <Bar data={chartData} />

                        ) : (

                            <div className="text-center">

                                <div className="spinner-border text-success"></div>

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </Layout>

    );

};

export default Reports;