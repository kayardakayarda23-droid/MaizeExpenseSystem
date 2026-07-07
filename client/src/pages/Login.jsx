
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

const Login = () => {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
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

            await login(formData);

            toast.success("Login Successful!");

            navigate("/dashboard");

        } catch (err) {

            toast.error(
                err.response?.data?.message || "Login Failed"
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
                className="card shadow-lg border-0"
                style={{
                    width: "100%",
                    maxWidth: "450px",
                    borderRadius: "20px"
                }}
            >

                <div className="card-body p-5">

                    <div className="text-center mb-4">

                        <i
                            className="bi bi-flower1 text-success"
                            style={{
                                fontSize: "70px"
                            }}
                        ></i>

                        <h2 className="mt-3 fw-bold">
                            Maize Expense Tracker
                        </h2>

                        <p className="text-muted">
                            Sign in to continue
                        </p>

                    </div>

                    <form onSubmit={handleSubmit}>

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
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <button
                            className="btn btn-success w-100"
                            type="submit"
                            disabled={loading}
                        >

                            {loading ? (

                                <>

                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                    ></span>

                                    Logging in...

                                </>

                            ) : (

                                <>

                                    <i className="bi bi-box-arrow-in-right me-2"></i>

                                    Login

                                </>

                            )}

                        </button>

                    </form>

                    <hr />

                  <div className="text-center">

    <Link to="/forgot-password">
        Forgot Password?
    </Link>

    <hr />

    <p>

        Don't have an account?

        <br />

        <Link to="/register">
            Register Here
        </Link>

    </p>

</div>

                </div>

            </div>

        </div>

    );

};

export default Login;