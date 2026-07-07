import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Layout from "../components/Layout";
import {
    getExpense,
    updateExpense,
} from "../services/expenseService";

const EditExpense = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [preview, setPreview] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        amount: "",
        expense_date: "",
        description: "",
        receipt: null,
    });

    useEffect(() => {
        loadExpense();
    }, []);

    const loadExpense = async () => {

        try {

            const data = await getExpense(id);

            setFormData({
                title: data.expense.title,
                category: data.expense.category,
                amount: data.expense.amount,
                expense_date: data.expense.expense_date.substring(0, 10),
                description: data.expense.description || "",
                receipt: null,
            });

            if (data.expense.receipt) {
                setPreview(
                    `http://localhost:5000/uploads/${data.expense.receipt}`
                );
            }

        } catch (error) {

            toast.error("Failed to load expense.");

        } finally {

            setLoading(false);

        }

    };

    const handleChange = (e) => {

        if (e.target.name === "receipt") {

            const file = e.target.files[0];

            setFormData({
                ...formData,
                receipt: file,
            });

            if (file) {
                setPreview(URL.createObjectURL(file));
            }

            return;
        }

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setSaving(true);

        try {

            const data = new FormData();

            data.append("title", formData.title);
            data.append("category", formData.category);
            data.append("amount", formData.amount);
            data.append("expense_date", formData.expense_date);
            data.append("description", formData.description);

            if (formData.receipt) {
                data.append("receipt", formData.receipt);
            }

            await updateExpense(id, data);

            toast.success("Expense updated successfully!");

            navigate("/expenses");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to update expense."
            );

        } finally {

            setSaving(false);

        }

    };

    if (loading) {

        return (
            <Layout>
                <div className="text-center mt-5">
                    <div className="spinner-border text-primary"></div>
                    <p className="mt-3">Loading expense...</p>
                </div>
            </Layout>
        );

    }

    return (

        <Layout>

            <div className="container">

                <div className="card shadow">

                    <div className="card-header bg-primary text-white">
                        <h3>Edit Expense</h3>
                    </div>

                    <div className="card-body">

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label className="form-label">Title</label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Category
                                </label>

                                <select
                                    className="form-select"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">Select Category</option>

                                    <option>Farm Inputs</option>
                                    <option>Seeds</option>
                                    <option>Labour</option>
                                    <option>Transportation</option>
                                    <option>Equipment</option>
                                    <option>Miscellaneous</option>

                                </select>

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Amount (₦)
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Expense Date
                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="expense_date"
                                    value={formData.expense_date}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Description
                                </label>

                                <textarea
                                    className="form-control"
                                    rows="4"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Receipt Image
                                </label>

                                <input
                                    type="file"
                                    className="form-control"
                                    name="receipt"
                                    accept="image/*"
                                    onChange={handleChange}
                                />

                            </div>

                            {preview && (

                                <div className="mb-4 text-center">

                                    <img
                                        src={preview}
                                        alt="Receipt"
                                        className="img-thumbnail"
                                        style={{ maxHeight: "250px" }}
                                    />

                                </div>

                            )}

                            <div className="d-flex gap-2">

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={saving}
                                >

                                    {saving ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                            Updating...
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-check-circle me-2"></i>
                                            Update Expense
                                        </>
                                    )}

                                </button>

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => navigate("/expenses")}
                                >
                                    Cancel
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </Layout>

    );

};

export default EditExpense;