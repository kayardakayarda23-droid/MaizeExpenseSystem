import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Sidebar = () => {
    const location = useLocation();
    const { logout } = useAuth();

    const active = (path) =>
        location.pathname === path ? "active bg-success text-white" : "";

    return (
        <div
            className="bg-dark text-white p-3"
            style={{
                width: "250px",
                minHeight: "100vh",
                position: "fixed",
                left: 0,
                top: 0,
            }}
        >
            <h3 className="text-center mb-4">
                🌽 Maize Tracker
            </h3>

            <div className="list-group">

                <Link
                    to="/dashboard"
                    className={`list-group-item list-group-item-action ${active("/dashboard")}`}
                >
                    <i className="bi bi-house-fill me-2"></i>
                    Dashboard
                </Link>

                <Link
                    to="/expenses"
                    className={`list-group-item list-group-item-action ${active("/expenses")}`}
                >
                    <i className="bi bi-cash-stack me-2"></i>
                    Expenses
                </Link>

                <Link
                    to="/expenses/add"
                    className={`list-group-item list-group-item-action ${active("/expenses/add")}`}
                >
                    <i className="bi bi-plus-circle me-2"></i>
                    Add Expense
                </Link>

                <Link
                    to="/profile"
                    className={`list-group-item list-group-item-action ${active("/profile")}`}
                >
                    <i className="bi bi-person-circle me-2"></i>
                    Profile
                </Link>

                <button
                    className="btn btn-danger mt-4"
                    onClick={logout}
                >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                </button>

            </div>
        </div>
    );
};

export default Sidebar;