import React from "react";

// Example data
const bookings = [
    {
        id: 1,
        service: "AC Repair",
        date: "15 June",
        price: "₹500",
        status: "Scheduled",
    },
    {
        id: 2,
        service: "Plumbing",
        date: "10 June",
        price: "₹300",
        status: "Completed",
    },
    {
        id: 3,
        service: "Cleaning",
        date: "8 June",
        price: "₹400",
        status: "Cancelled",
    },
];

// Status styles and icons
const statusMap = {
    Scheduled: {
        color: "#007bff",
        icon: "⏳",
        bg: "#e7f1ff",
    },
    Completed: {
        color: "#28a745",
        icon: "✅",
        bg: "#eafaf1",
    },
    Cancelled: {
        color: "#dc3545",
        icon: "❌",
        bg: "#fdeaea",
    },
};

const RecentBookingListItem = () => (
    <div className="booking-table">
        <div className="booking-table-header">
            <div>Product</div>
            <div>Date</div>
            <div>Price</div>
            <div>Status</div>
        </div>
        {bookings.map((b) => {
            const status = statusMap[b.status] || {};
            return (
                <div className="booking-table-row" key={b.id}>
                    <div data-label="Service Name">{b.service}</div>
                    <div data-label="Date">{b.date}</div>
                    <div data-label="Price">{b.price}</div>
                    <div data-label="Status">
                        <span
                            className="status-tag"
                            style={{
                                color: status.color,
                                background: status.bg,
                                borderColor: status.color,
                            }}
                        >
                            <span className="status-icon">{status.icon}</span>
                            {b.status}
                        </span>
                    </div>
                </div>
            );
        })}
        <style>{`
            .booking-table {
                font-family: 'Segoe UI', Arial, sans-serif;
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                overflow: hidden;
                width:70px
                margin: 0 auto;
                background: #fff;
            }
            .booking-table-header, .booking-table-row {
                display: grid;
                grid-template-columns: 2fr 1fr 1fr 1fr;
                align-items: center;
                padding: 16px;
                border-bottom: 1px solid #f0f0f0;
            }
            .booking-table-header {
                background: #f9f9f9;
                font-weight: 600;
                font-size: 1rem;
            }
            .booking-table-row:last-child {
                border-bottom: none;
            }
            .booking-table-row {
                font-size: 0.98rem;
            }
            .status-tag {
                display: inline-flex;
                align-items: center;
                font-weight: 500;
                padding: 4px 10px;
                border-radius: 16px;
                border: 1px solid;
                font-size: 0.95em;
                gap: 6px;
            }
            .status-icon {
                font-size: 1.1em;
            }
            @media (max-width: 600px) {
                .booking-table-header {
                    display: none;
                }
                .booking-table-row {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    padding: 14px 12px;
                    border-bottom: 1px solid #f0f0f0;
                }
                .booking-table-row > div {
                    width: 100%;
                    margin-bottom: 6px;
                    font-size: 1em;
                }
                .booking-table-row > div:last-child {
                    margin-bottom: 0;
                }
                .booking-table-row > div[data-label]:before {
                    content: attr(data-label) ": ";
                    font-weight: 600;
                    color: #888;
                }
            }
        `}</style>
    </div>
);

export default RecentBookingListItem;