import React, { useEffect, useState } from 'react'
import styles from './Dashboard.module.css'
import SummaryCard from './Summarycard';
import { LineChart } from '@mui/x-charts';
import RecentBookingListItem from './RecentBookingListItem';

function Dashboard() {
     const [totalBookings,setTotalBookings] = useState(0)
     const year = new Date().getFullYear();
     const [hoverShowOrder,setHoverShowOrder] = useState(false)


        const summaryCardList = [{heading:"Pending Orders",value:5},{heading:"Total Orders",value:"300"},{heading:"Total Sales",value:'₹ 18000'},{heading:"Total Users",value:"5673"}]
    
        
    const bookingsData = {
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      bookings: [3745, 5555, 1983, 822, 2343,6323]
    };
    
    useEffect(()=>{
      const totalb = bookingsData.bookings.reduce((acc,val)=>acc+val,0);
    
      setTotalBookings(totalb)
    })
    
  return (
    <aside className={styles.dashBoardMainContainer}>

        <div className={styles.headingContainer}>
        <h2 style={{marginBottom:"0rem"}}>Welcome <strong>Mohd. Shadav</strong></h2>
     <div style={{display:"flex",alignItems:"center",gap:"1rem" ,marginBottom:"1rem"}}>
           <p>You have <span>46</span> pending orders.</p>
        <span onMouseEnter={() => setHoverShowOrder(true)} onMouseLeave={() => setHoverShowOrder(false)} style={{border:"0.2px solid rgba(47, 47, 218, 0.62)",textAlign:"center",padding:"0.1rem 0.4rem",color:"gray",borderRadius:"20px",cursor:"pointer",background: hoverShowOrder ? "rgba(46, 46, 46, 0.07)" : "transparent"}}>Show</span>
     </div>
       </div>

       <div className={styles.summaryCardsContainer}>


         {summaryCardList.map((item,index)=>{
          return (
                   <SummaryCard heading={item.heading} value={item.value} />
          )
         })}
         
          

       </div>

       <div className={styles.midSection}>
         <h4>Sales Overview <span>({year})</span></h4>
        <div className={styles.lineChartContainer}>
         
   <LineChart
  xAxis={[{ scaleType: 'point', data: bookingsData.months }]}
  series={[{ data: bookingsData.bookings }]}
 
/>

        </div>
        <div className={styles.totalBookingContainer}>
  <p>Total Revenue this year : <span>{totalBookings}</span></p>
</div>
       </div>

       <div className={styles.bottomSection}>
        <h4>Recent Order List</h4>
        <RecentBookingListItem/>
       </div>

    </aside>
  )
}

export default Dashboard