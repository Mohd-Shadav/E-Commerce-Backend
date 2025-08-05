import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import SummaryCard from "./Summarycard";
import { LineChart } from "@mui/x-charts";
import RecentBookingListItem from "./RecentBookingListItem";
import { useSelector } from "react-redux";
import axios from "axios";

function Dashboard({ isDark }) {
  const [totalBookings, setTotalBookings] = useState(0);
  const year = new Date().getFullYear();
  const [hoverShowOrder, setHoverShowOrder] = useState(false);
  const [orders, setOrders] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [latestOrders,setLatestOrder] = useState([]);
  // const theme = useSelector((state)=>state.themeStatus.value)
  const [bookingData,setBookingData] = useState({
      months: [],
      sales: [],
      productsDelivered:[]
  })
  const [admin, setAdmin] = useState({
    name: "",
    pic: "",
  });

  const [summaryCardList, setSummaryCardList] = useState([
    { heading: "Pending Orders", value: 0, color: "#fffde7" },
    { heading: "Total Orders", value: 0, color: "#e8f5e9" },
    { heading: "Total Sales", value: 0, color: "#ffebee" },
    { heading: "Total Users", value: 0, color: "#e3f2fd" },
  ]);
  const { adminName, adminPic } = useSelector((state) => state.getAdminData);


  const fetchMonthlySales = async () => {
    try {
      let res = await axios.get(
        "http://localhost:3000/api/orders/get-monthly-sales"
      );
    
      let months = res.data.map((item)=>item.month)
      let sales = res.data.map((item)=>item.sales)
      let productsDelivered = res.data.map((item)=>item.productsDelivered)

      const totalb = sales.reduce((acc, val) => acc + val, 0);
       setTotalBookings(totalb);

      setBookingData({
        months,
        sales,
        productsDelivered

      })

    } catch (err) {
      alert("failed to load sales");
    }
  };

  const fetchOrders = async () => {
    try {
      let res = await axios.get(
        "http://localhost:3000/api/orders/get-all-orders"
      );

      let user = await axios.get("http://localhost:3000/api/users/get-users");

      const allOrders = res.data;

      setOrders(allOrders);

      // Total Sales from Delivered Orders
      const deliveredSales = allOrders
        .filter((order) => order.orderStatus === "Delivered")
        .reduce((sum, order) => sum + order.totalAmount, 0);

      const pendingOrders = allOrders.filter(
        (order) =>
          order.orderStatus === "Booked" || order.orderStatus === "Shipped"
      );

      setTotalSales(deliveredSales);

      const newValues = {
        "Total Sales": `₹ ${deliveredSales}`,
        "Pending Orders": pendingOrders.length || 0,
        "Total Orders": allOrders.length,
        "Total Users": user.data.length,
      };

      setSummaryCardList((prev) =>
        prev.map((card) => ({
          ...card,
          value: newValues[card.heading] || card.value, // update if key exists
        }))
      );
    } catch (err) {
      alert("Error to fetch orders");
    }
  };

  const fetchLatestOrders = async()=>{
    try{
            let res = await axios.get('http://localhost:3000/api/orders/get-latest-orders');
            setLatestOrder(res.data)

    }catch(err){
      alert("error to fetch latest order")
    }
  }

  useEffect(() => {
    

    setAdmin({
      name: adminName,
      pic: adminPic,
    });

    fetchOrders();
    fetchMonthlySales();
    fetchLatestOrders();

   
  }, []);

  return (
    <aside
      className={styles.dashBoardMainContainer}
      style={{ color: isDark ? "#fff" : "#222" }}
    >
      <div className={styles.headingContainer}>
        <h2 style={{ marginBottom: "2rem" }}>
          Welcome <strong>{admin.name}</strong>
        </h2>
     
      </div>

      <div className={styles.summaryCardsContainer}>
        {summaryCardList.map((item, index) => {
          return (
            <SummaryCard
              heading={item.heading}
              value={item.value}
              color={item.color}
            />
          );
        })}
      </div>

      <div className={styles.midSection}>
        <h4>
          Sales Overview <span>({year})</span>
        </h4>
        <div className={styles.lineChartContainer}>
          <LineChart
            xAxis={[
              {
                scaleType: "point",
                data: bookingData.months,
                tickLabelStyle: { fill: isDark ? "#fff" : "#222" }, // X-axis tick color
              },
            ]}
            yAxis={[
              {
                tickLabelStyle: { fill: isDark ? "#fff" : "#222" }, // Y-axis tick color
              },
            ]}
            series={[
               {
    data:bookingData.sales,
    label: "Sales",
    color: "#1976d2",
    showMark: true,
  },
  {
    data: bookingData.productsDelivered,
    label: "Products Delivered",
    color: "#66bb6a", // greenish
    showMark: true,
  },
            ]}
            grid={{
              horizontal: true,
              vertical: false,
            }}
            slotProps={{
              legend: { hidden: true },
            }}
            sx={{
              // Horizontal grid lines (Y markers)
              ".MuiChartsGrid-line": {
                stroke: isDark ? "#444" : "#fff", // white in light mode
                strokeDasharray: "4 4",
              },
              // Hover vertical line
              ".MuiChartsTooltip-crosshair": {
                stroke: isDark ? "#aaa" : "#fff", // white in light mode
                strokeDasharray: "4 4",
              },
              // Axis lines
              ".MuiChartsAxis-line": {
                stroke: isDark ? "#aaa" : "#222",
              },
              // Tick labels (already handled in xAxis/yAxis but safe to include)
              ".MuiChartsAxis-tickLabel": {
                fill: isDark ? "#fff" : "#222",
              },
              // Optional: make hover marker same color as line
              ".MuiChartsMark-root": {
                stroke: "#1976d2",
                fill: "#1976d2",
              },
            }}
          />
        </div>
        <div
          className={styles.totalBookingContainer}
          style={{ color: isDark ? "#fff" : "#222" }}
        >
          <p style={{ color: isDark ? "#fff" : "rgba(0, 0, 0, 0.56)" }}>
            Total Revenue this year : <span>₹ {totalBookings}</span>
          </p>
        </div>
      </div>

      <div className={styles.bottomSection}>
        <h4>Recent Order List</h4>
        <RecentBookingListItem isDark={isDark} order={latestOrders}/>
      </div>
    </aside>
  );
}

export default Dashboard;
