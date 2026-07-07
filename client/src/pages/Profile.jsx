
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getProfile } from "../services/profileService";
import { toast } from "react-toastify";

const Profile = () => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {

        try {

            const data = await getProfile();

            setUser(data.user);

        } catch (error) {

            toast.error("Failed to load profile.");

        }

    };

    if (!user) {

        return (

            <Layout>

                <div className="text-center mt-5">

                    <div
                        className="spinner-border text-success"
                        style={{
                            width: "4rem",
                            height: "4rem"
                        }}
                    ></div>

                    <h5 className="mt-3">
                        Loading Profile...
                    </h5>

                </div>

            </Layout>

        );

    }

    return (

        <Layout>

            <div className="container">

                <div className="card border-0 shadow-lg">

                    <div className="card-header bg-success text-white">

                        <h3 className="mb-0">

                            <i className="bi bi-person-circle me-2"></i>

                            My Profile

                        </h3>

                    </div>

                    <div className="card-body">

                        <div className="row">

                            <div className="col-md-4 text-center">

                                <i
                                    className="bi bi-person-circle text-success"
                                    style={{
                                        fontSize: "120px"
                                    }}
                                ></i>

                                <h4 className="mt-3">
                                    {user.fullname}
                                </h4>

                                <span className="badge bg-success">
                                    Farm Manager
                                </span>

                            </div>

                            <div className="col-md-8">

                                <div className="mb-3">

                                    <label className="form-label fw-bold">
                                        Full Name
                                    </label>

                                    <input
                                        className="form-control"
                                        value={user.fullname}
                                        readOnly
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label fw-bold">
                                        Email Address
                                    </label>

                                    <input
                                        className="form-control"
                                        value={user.email}
                                        readOnly
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label fw-bold">
                                        Member Since
                                    </label>

                                    <input
                                        className="form-control"
                                        value={new Date(
                                            user.created_at
                                        ).toLocaleDateString()}
                                        readOnly
                                    />

                                </div>

                                <div className="alert alert-success mt-4">

                                    <i className="bi bi-check-circle-fill me-2"></i>

                                    Your account is active and your information
                                    is securely stored.

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </Layout>

    );

};

export default Profile;