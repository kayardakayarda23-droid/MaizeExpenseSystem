
const DashboardCards = ({ summary }) => {

    const totalExpenses = Number(summary?.totalExpenses || 0);
    const totalAmount = Number(summary?.totalAmount || 0);
    const averageExpense = Number(summary?.averageExpense || 0);
    const highestExpense = Number(summary?.highestExpense || 0);
    const lowestExpense = Number(summary?.lowestExpense || 0);

    const cards = [
        {
            title: "Total Expenses",
            value: totalExpenses.toLocaleString(),
            icon: "bi-receipt",
            color: "success",
            text: "text-white"
        },
        {
            title: "Total Amount",
            value: `₦${totalAmount.toLocaleString()}`,
            icon: "bi-cash-stack",
            color: "primary",
            text: "text-white"
        },
        {
            title: "Average Expense",
            value: `₦${averageExpense.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}`,
            icon: "bi-graph-up-arrow",
            color: "warning",
            text: "text-dark"
        },
        {
            title: "Highest Expense",
            value: `₦${highestExpense.toLocaleString()}`,
            icon: "bi-arrow-up-circle-fill",
            color: "danger",
            text: "text-white"
        },
        {
            title: "Lowest Expense",
            value: `₦${lowestExpense.toLocaleString()}`,
            icon: "bi-arrow-down-circle-fill",
            color: "info",
            text: "text-white"
        }
    ];

    return (
        <div className="row">

            {cards.map((card, index) => (

                <div
                    className="col-lg-4 col-md-6 mb-4"
                    key={index}
                >

                    <div
                        className={`card border-0 shadow-lg bg-${card.color} ${card.text}`}
                        style={{
                            borderRadius: "18px",
                            transition: "0.3s"
                        }}
                    >

                        <div className="card-body">

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <h6 className="mb-2">
                                        {card.title}
                                    </h6>

                                    <h3 className="fw-bold">
                                        {card.value}
                                    </h3>

                                </div>

                                <div>

                                    <i
                                        className={`bi ${card.icon}`}
                                        style={{
                                            fontSize: "3rem",
                                            opacity: 0.85
                                        }}
                                    ></i>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            ))}

        </div>
    );

};

export default DashboardCards;