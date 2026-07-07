import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Layout from "../components/Layout";
import { addExpense } from "../services/expenseService";

const AddExpense = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        amount: "",
        expense_date: new Date().toISOString().split("T")[0],
        description: "",
        receipt: null
    });

    const handleChange = (e) => {

        if (e.target.name === "receipt") {

            const file = e.target.files[0];

            setFormData({
                ...formData,
                receipt: file
            });

            if (file) {
                setPreview(URL.createObjectURL(file));
            }

            return;
        }

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (Number(formData.amount) <= 0) {
            toast.error("Amount must be greater than zero.");
            return;
        }

        setLoading(true);

        try {

            await addExpense(formData);

            toast.success("Expense added successfully!");

            navigate("/expenses");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to add expense."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <Layout>

            <div className="container">

                <div className="card shadow">

                    <div className="card-header bg-success text-white">

                        <h3>
                            <i className="bi bi-plus-circle me-2"></i>
                            Add New Expense
                        </h3>

                    </div>

                    <div className="card-body">

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label className="form-label">Expense Title</label>

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
                                <label className="form-label">Category</label>

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
                                <label className="form-label">Amount (₦)</label>

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
                                <label className="form-label">Expense Date</label>

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
                                <label className="form-label">Description</label>

                                <textarea
                                    className="form-control"
                                    rows="4"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="mb-4">
                                <label className="form-label">
                                    Upload Receipt (Optional)
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

                                <div className="text-center mb-4">

                                    <img
                                        src={preview}
                                        alt="Receipt Preview"
                                        className="img-thumbnail"
                                        style={{ maxHeight: "250px" }}
                                    />

                                </div>

                            )}

                            <button
                                type="submit"
                                className="btn btn-success"
                                disabled={loading}
                            >

                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-check-circle me-2"></i>
                                        Save Expense
                                    </>
                                )}

                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </Layout>

    );

};

export default AddExpense;