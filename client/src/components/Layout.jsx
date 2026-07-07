import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Layout = ({ children }) => {

    const location = useLocation();
    const { logout } = useAuth();

    const menu = [
        {
            name: "Dashboard",
            icon: "bi-speedometer2",
            path: "/dashboard",
        },
        {
            name: "Expenses",
            icon: "bi-cash-stack",
            path: "/expenses",
        },
        {
            name: "Add Expense",
            icon: "bi-plus-circle",
            path: "/expenses/add",
        },
    
        {
            name: "Reports",
            icon: "bi-bar-chart",
            path: "/reports",
        },
        {
            name: "Profile",
            icon: "bi-person-circle",
            path: "/profile",
        },
    ];

    return (
        <div className="d-flex">

            {/* Sidebar */}
            <div
                className="bg-success text-white p-3 shadow"
                style={{
                    width: "260px",
                    minHeight: "100vh",
                }}
            >
                <h3 className="text-center mb-4">
                    🌽
                    <br />
                    Maize Farming Expense Tracker
                </h3>

                <ul className="nav flex-column">

                    {menu.map((item) => (
                        <li
                            className="nav-item mb-2"
                            key={item.path}
                        >
                            <Link
                                to={item.path}
                                className={`nav-link text-white ${
                                    location.pathname === item.path
                                        ? "bg-dark rounded"
                                        : ""
                                }`}
                            >
                                <i
                                    className={`bi ${item.icon} me-2`}
                                ></i>

                                {item.name}
                            </Link>
                        </li>
                    ))}

                    <li className="nav-item mt-4">
                        <button
                            className="btn btn-danger w-100"
                            onClick={logout}
                        >
                            <i className="bi bi-box-arrow-right me-2"></i>
                            Logout
                        </button>
                    </li>

                </ul>
            </div>

            {/* Main Content */}
            <div
                className="flex-grow-1 p-4"
                style={{
                    background: "#f5f5f5",
                    minHeight: "100vh",
                }}
            >
                {children}
            </div>

        </div>
    );

};

export default Layout;