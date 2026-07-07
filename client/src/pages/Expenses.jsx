import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Layout from "../components/Layout";

import {
    getExpenses,
    deleteExpense,
} from "../services/expenseService";

import exportPDF from "../utils/exportPDF";
import exportExcel from "../utils/exportExcel";

const Expenses = () => {

    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        loadExpenses();
    }, []);

    const loadExpenses = async () => {

        try {

            const data = await getExpenses();

            setExpenses(data.expenses || []);

        } catch (error) {

            console.error(error);

            toast.error("Failed to load expenses.");

        } finally {

            setLoading(false);

        }

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this expense?"
        );

        if (!confirmDelete) return;

        try {

            await deleteExpense(id);

            toast.success("Expense deleted successfully.");

            loadExpenses();

        } catch (error) {

            console.error(error);

            toast.error("Delete failed.");

        }

    };

    const filteredExpenses = expenses.filter((expense) => {

        const matchesSearch =
            expense.title
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            expense.category
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesCategory =
            category === "" ||
            expense.category === category;

        const expenseDate =
            expense.expense_date?.substring(0, 10);

        const matchesStart =
            startDate === "" ||
            expenseDate >= startDate;

        const matchesEnd =
            endDate === "" ||
            expenseDate <= endDate;

        return (
            matchesSearch &&
            matchesCategory &&
            matchesStart &&
            matchesEnd
        );

    });

    if (loading) {

        return (

            <Layout>

                <div className="text-center mt-5">

                    <div
                        className="spinner-border text-success"
                        role="status"
                    >
                        <span className="visually-hidden">
                            Loading...
                        </span>
                    </div>

                    <p className="mt-3">
                        Loading expenses...
                    </p>

                </div>

            </Layout>

        );

    }

    return (

        <Layout>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>

                    <i className="bi bi-cash-stack me-2"></i>

                    Expenses

                </h2>

                <div>

                    <button
                        className="btn btn-danger me-2"
                        onClick={() => exportPDF(filteredExpenses)}
                    >
                        <i className="bi bi-file-earmark-pdf me-2"></i>

                        PDF

                    </button>

                    <button
                        className="btn btn-success me-2"
                        onClick={() => exportExcel(filteredExpenses)}
                    >
                        <i className="bi bi-file-earmark-excel me-2"></i>

                        Excel

                    </button>

                    <Link
                        to="/expenses/add"
                        className="btn btn-primary"
                    >
                        <i className="bi bi-plus-circle me-2"></i>

                        Add Expense

                    </Link>

                </div>

            </div>

                    {/* Summary Cards */}

            <div className="row mb-4">

                <div className="col-md-3 mb-3">

                    <div className="card shadow border-0 bg-success text-white">

                        <div className="card-body">

                            <h6>Total Expenses</h6>

                            <h3>{filteredExpenses.length}</h3>

                        </div>

                    </div>

                </div>

                <div className="col-md-3 mb-3">

                    <div className="card shadow border-0 bg-primary text-white">

                        <div className="card-body">

                            <h6>Total Amount</h6>

                            <h3>

                                ₦

                                {filteredExpenses
                                    .reduce(
                                        (sum, item) =>
                                            sum + Number(item.amount),
                                        0
                                    )
                                    .toLocaleString()}

                            </h3>

                        </div>

                    </div>

                </div>

                <div className="col-md-3 mb-3">

                    <div className="card shadow border-0 bg-warning">

                        <div className="card-body">

                            <h6>Highest Expense</h6>

                            <h3>

                                ₦

                                {(
                                    filteredExpenses.length
                                        ? Math.max(
                                              ...filteredExpenses.map((e) =>
                                                  Number(e.amount)
                                              )
                                          )
                                        : 0
                                ).toLocaleString()}

                            </h3>

                        </div>

                    </div>

                </div>

                <div className="col-md-3 mb-3">

                    <div className="card shadow border-0 bg-info text-white">

                        <div className="card-body">

                            <h6>Average Expense</h6>

                            <h3>

                                ₦

                                {(
                                    filteredExpenses.length
                                        ? filteredExpenses.reduce(
                                              (sum, e) =>
                                                  sum + Number(e.amount),
                                              0
                                          ) / filteredExpenses.length
                                        : 0
                                ).toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}

                            </h3>

                        </div>

                    </div>

                </div>

            </div>

            {/* Filters */}

            <div className="card shadow border-0 mb-4">

                <div className="card-body">

                    <div className="row">

                        <div className="col-md-3 mb-2">

                            <input
                                type="text"
                                className="form-control"
                                placeholder="🔍 Search..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                            />

                        </div>

                        <div className="col-md-3 mb-2">

                            <select
                                className="form-select"
                                value={category}
                                onChange={(e) =>
                                    setCategory(e.target.value)
                                }
                            >

                                <option value="">
                                    All Categories
                                </option>

                                <option>Farm Inputs</option>
                                <option>Seeds</option>
                                <option>Labour</option>
                                <option>Transportation</option>
                                <option>Equipment</option>
                                <option>Miscellaneous</option>

                            </select>

                        </div>

                        <div className="col-md-2 mb-2">

                            <input
                                type="date"
                                className="form-control"
                                value={startDate}
                                onChange={(e) =>
                                    setStartDate(e.target.value)
                                }
                            />

                        </div>

                        <div className="col-md-2 mb-2">

                            <input
                                type="date"
                                className="form-control"
                                value={endDate}
                                onChange={(e) =>
                                    setEndDate(e.target.value)
                                }
                            />

                        </div>

                        <div className="col-md-2 mb-2">

                            <button
                                className="btn btn-secondary w-100"
                                onClick={() => {

                                    setSearch("");
                                    setCategory("");
                                    setStartDate("");
                                    setEndDate("");

                                }}
                            >

                                <i className="bi bi-arrow-clockwise me-2"></i>

                                Reset

                            </button>

                        </div>

                    </div>

                </div>

            </div>

                    <div className="card shadow border-0">

                <div className="card-header bg-success text-white">

                    <h5 className="mb-0">

                        <i className="bi bi-list-ul me-2"></i>

                        Expense Records

                    </h5>

                </div>

                <div className="card-body p-0">

                    <div className="table-responsive">

                        <table className="table table-hover table-striped mb-0">

                            <thead className="table-success">

                                <tr>

                                  <th>#</th>
<th>Title</th>
<th>Category</th>
<th>Receipt</th>
<th>Amount</th>
<th>Date</th>
<th className="text-center">
    Actions
</th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredExpenses.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="7"
                                            className="text-center py-5"
                                        >

                                            <i
                                                className="bi bi-folder-x"
                                                style={{
                                                    fontSize: "3rem",
                                                    color: "#999",
                                                }}
                                            ></i>

                                            <h5 className="mt-3">
                                                No Expenses Found
                                            </h5>

                                            <p className="text-muted">
                                                Start by adding your first expense.
                                            </p>

                                            <Link
                                                to="/expenses/add"
                                                className="btn btn-success"
                                            >

                                                <i className="bi bi-plus-circle me-2"></i>

                                                Add Expense

                                            </Link>

                                        </td>

                                    </tr>

                                ) : (

                                    filteredExpenses.map((expense, index) => (

                                        <tr key={expense.id}>

                                            <td>{index + 1}</td>

                                            <td>

                                                <strong>
                                                    {expense.title}
                                                </strong>

                                            </td>

                                            <td>

                                                <span className="badge bg-success">

                                                    {expense.category}

                                                </span>

                                            </td>
                                            <td>

    {expense.receipt ? (

        <a
            href={`http://localhost:5000/uploads/${expense.receipt}`}
            target="_blank"
            rel="noreferrer"
        >

            <img
                src={`http://localhost:5000/uploads/${expense.receipt}`}
                alt="Receipt"
                className="img-thumbnail"
                style={{
                    width: "70px",
                    height: "70px",
                    objectFit: "cover",
                    cursor: "pointer"
                }}
            />

        </a>

    ) : (

        <span className="text-muted">
            No Receipt
        </span>

    )}

</td>

                                            <td>

                                                <strong className="text-primary">

                                                    ₦
                                                    {Number(
                                                        expense.amount
                                                    ).toLocaleString()}

                                                </strong>

                                            </td>

                                            <td>

                                                {new Date(
                                                    expense.expense_date
                                                ).toLocaleDateString()}

                                            </td>

                                            <td className="text-center">

                                                <Link
                                                    to={`/expenses/edit/${expense.id}`}
                                                    className="btn btn-warning btn-sm me-2"
                                                >

                                                    <i className="bi bi-pencil-square"></i>

                                                </Link>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() =>
                                                        handleDelete(expense.id)
                                                    }
                                                >

                                                    <i className="bi bi-trash"></i>

                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </Layout>

    );

};

export default Expenses;