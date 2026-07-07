import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPassword } from "../services/authService";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const res = await forgotPassword(email);

            toast.success(res.message);

            setEmail("");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">

            <div
                className="card shadow mx-auto mt-5"
                style={{ maxWidth: "450px" }}
            >

                <div className="card-header bg-warning text-dark text-center">
                    <h3>Forgot Password</h3>
                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label className="form-label">
                                Email Address
                            </label>

                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                            />

                        </div>

                        <button
                            className="btn btn-warning w-100"
                            disabled={loading}
                        >
                            {loading
                                ? "Sending..."
                                : "Send Reset Link"}
                        </button>

                    </form>

                    <hr />

                    <div className="text-center">

                        <Link to="/login">
                            Back to Login
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ForgotPassword;