
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

const Register = () => {

    const navigate = useNavigate();
    const { register } = useAuth();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            await register(formData);

            toast.success("Registration Successful!");

            navigate("/dashboard");

        } catch (err) {

            toast.error(
                err.response?.data?.message || "Registration Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div
            className="container-fluid d-flex justify-content-center align-items-center"
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg,#198754,#4CAF50)"
            }}
        >

            <div
                className="card border-0 shadow-lg"
                style={{
                    width: "100%",
                    maxWidth: "500px",
                    borderRadius: "20px"
                }}
            >

                <div className="card-body p-5">

                    <div className="text-center mb-4">

                        <i
                            className="bi bi-person-plus-fill text-success"
                            style={{
                                fontSize: "70px"
                            }}
                        ></i>

                        <h2 className="fw-bold mt-3">
                            Create Account
                        </h2>

                        <p className="text-muted">
                            Join the Maize Expense Tracker
                        </p>

                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label className="form-label fw-bold">
                                Full Name
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                name="fullname"
                                placeholder="Enter your full name"
                                value={formData.fullname}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label fw-bold">
                                Email Address
                            </label>

                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="mb-4">

                            <label className="form-label fw-bold">
                                Password
                            </label>

                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <button
                            type="submit"
                            className="btn btn-success w-100"
                            disabled={loading}
                        >

                            {loading ? (

                                <>

                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                    ></span>

                                    Creating Account...

                                </>

                            ) : (

                                <>

                                    <i className="bi bi-person-plus-fill me-2"></i>

                                    Create Account

                                </>

                            )}

                        </button>

                    </form>

                    <hr />

                    <p className="text-center mb-0">

                        Already have an account?

                        <br />

                        <Link
                            to="/login"
                            className="fw-bold text-success text-decoration-none"
                        >
                            Login Here
                        </Link>

                    </p>

                </div>

            </div>

        </div>

    );

};

export default Register;