import React, { useEffect, useState } from 'react'
import styles from './Dashboard.module.css'
import SummaryCard from './Summarycard';
import { LineChart } from '@mui/x-charts';
import RecentBookingListItem from './RecentBookingListItem';

function Dashboard({isDark}) {
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
    <aside className={styles.dashBoardMainContainer} style={{color:isDark?"#fff":"#222"}}>

        <div className={styles.headingContainer}>
        <h2 style={{marginBottom:"0rem"}}>Welcome <strong>Mohd. Shadav</strong></h2>
     <div style={{display:"flex",alignItems:"center",gap:"1rem" ,marginBottom:"1rem"}}>
           <p>You have <span>46</span> pending orders.</p>
        <span onMouseEnter={() => setHoverShowOrder(true)} onMouseLeave={() => setHoverShowOrder(false)} style={{border:isDark?"0.2px solid rgba(255, 255, 255, 0.62)":"0.2px solid rgba(47, 47, 218, 0.62)",textAlign:"center",padding:"0.1rem 0.4rem",color:"gray",borderRadius:"20px",color:isDark?"#fff":"#252525",cursor:"pointer",background: hoverShowOrder ? "rgba(46, 46, 46, 0.07)" : "transparent"}}>Show</span>
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
   xAxis={[
    {
      scaleType: 'point',
      data: bookingsData.months,
      tickLabelStyle: { fill: isDark ? '#fff' : '#222' }, // X-axis tick color
    }
  ]}
  yAxis={[
    {
      tickLabelStyle: { fill: isDark ? '#fff' : '#222' }, // Y-axis tick color
    }
  ]}
  series={[
    {
      data: bookingsData.bookings,
      color: '#1976d2',  // Always blue line
      showMark: true,
    
    }
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
    '.MuiChartsGrid-line': {
      stroke: isDark ? '#444' : '#fff',       // white in light mode
      strokeDasharray: '4 4',
    },
    // Hover vertical line
    '.MuiChartsTooltip-crosshair': {
      stroke: isDark ? '#aaa' : '#fff',       // white in light mode
      strokeDasharray: '4 4',
    },
    // Axis lines
    '.MuiChartsAxis-line': {
      stroke: isDark ? '#aaa' : '#222',
    },
    // Tick labels (already handled in xAxis/yAxis but safe to include)
    '.MuiChartsAxis-tickLabel': {
      fill: isDark ? '#fff' : '#222',
    },
    // Optional: make hover marker same color as line
    '.MuiChartsMark-root': {
      stroke: '#1976d2',
      fill: '#1976d2',
    }
  }}
 
/>

        </div>
        <div className={styles.totalBookingContainer} style={{color:isDark?"#fff":"#222"}}>
  <p style={{color:isDark?"#fff":"rgba(0, 0, 0, 0.56)"}}>Total Revenue this year : <span>₹ {totalBookings}</span></p>
</div>
       </div>

       <div className={styles.bottomSection}>
        <h4>Recent Order List</h4>
        <RecentBookingListItem isDark={isDark}/>
       </div>

    </aside>
  )
}

export default Dashboard