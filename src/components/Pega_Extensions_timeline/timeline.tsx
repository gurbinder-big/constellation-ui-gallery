// import React, { useState, useRef, useEffect } from "react";
// import "./VerticalTimeline.css";

// interface TimelineEvent {
//   id: number;
//   timestamp: number;
//   title: string;
//   color: string;
//   details: string;
// }

// // Zoom Levels
// const ZOOM_LEVELS = [
//   { label: "10 min", range: 30 * 60 * 1000 },
//   { label: "30 min", range: 2 * 60 * 60 * 1000 },
//   { label: "1 hour", range: 6 * 60 * 60 * 1000 },
//   { label: "3 hours", range: 12 * 60 * 60 * 1000 },
//   { label: "Daily", range: 7 * 24 * 60 * 60 * 1000 },
//   { label: "Weekly", range: 30 * 24 * 60 * 60 * 1000 },
//   { label: "Monthly", range: 180 * 24 * 60 * 60 * 1000 },
//   { label: "Yearly", range: 5 * 365 * 24 * 60 * 60 * 1000 },
// ];

// const now = new Date("2025-01-10T08:00:00Z").getTime();

// // Test Data per Zoom Level
// const ZOOM_TEST_DATA: Record<number, TimelineEvent[]> = {
//   0: [
//     { id: 1, timestamp: now, title: "Order Created", color: "#4285F4", details: "Order #12345 created" },
//     { id: 2, timestamp: now + 5 * 60 * 1000, title: "Payment Started", color: "#0F9D58", details: "Payment in process" },
//     { id: 3, timestamp: now + 10 * 60 * 1000, title: "Payment Completed", color: "#0F9D58", details: "Payment successful" },
//   ],
//   1: [
//     { id: 4, timestamp: now + 15 * 60 * 1000, title: "Item Packed", color: "#F4B400", details: "Item packed at warehouse" },
//     { id: 5, timestamp: now + 25 * 60 * 1000, title: "Shipment Ready", color: "#DB4437", details: "Shipment ready for dispatch" },
//   ],
//   2: [
//     { id: 6, timestamp: now + 40 * 60 * 1000, title: "Shipped", color: "#A333C8", details: "Package left warehouse" },
//     { id: 7, timestamp: now + 55 * 60 * 1000, title: "In Transit", color: "#FF6D01", details: "Package in transit" },
//   ],
//   3: [
//     { id: 8, timestamp: now + 2 * 60 * 60 * 1000, title: "Out for Delivery", color: "#34A853", details: "Courier out for delivery" },
//     { id: 9, timestamp: now + 2.5 * 60 * 60 * 1000, title: "Delivered", color: "#FBBC05", details: "Package delivered" },
//   ],
//   4: [
//     { id: 10, timestamp: now + 24 * 60 * 60 * 1000, title: "Return Requested", color: "#EA4335", details: "Customer requested return" },
//     { id: 11, timestamp: now + 26 * 60 * 60 * 1000, title: "Return Approved", color: "#34A853", details: "Return approved" },
//   ],
//   5: [
//     { id: 12, timestamp: now + 7 * 24 * 60 * 60 * 1000, title: "New Order Created", color: "#4285F4", details: "Order #12346 created" },
//     { id: 13, timestamp: now + 7 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000, title: "Payment Completed", color: "#0F9D58", details: "Payment successful" },
//   ],
//   6: [
//     { id: 14, timestamp: now + 30 * 24 * 60 * 60 * 1000, title: "Monthly Report Generated", color: "#F4B400", details: "Report for January ready" },
//     { id: 15, timestamp: now + 32 * 24 * 60 * 60 * 1000, title: "Invoice Sent", color: "#DB4437", details: "Invoice sent to customer" },
//   ],
//   7: [
//     { id: 16, timestamp: now + 365 * 24 * 60 * 60 * 1000, title: "Yearly Audit Started", color: "#0F9D58", details: "Audit started for year 2025" },
//   ],
// };

// const TimelineWidget: React.FC = () => {
//   const [zoom, setZoom] = useState(4);
//   const [events, setEvents] = useState<TimelineEvent[]>(ZOOM_TEST_DATA[zoom]);
//   const containerRef = useRef<HTMLDivElement>(null);

//   // Zoom handlers
//   const zoomIn = () => {
//     if (zoom === 0) return;
//     const newZoom = zoom - 1;
//     setZoom(newZoom);
//     setEvents(ZOOM_TEST_DATA[newZoom]);
//   };
//   const zoomOut = () => {
//     if (zoom === ZOOM_LEVELS.length - 1) return;
//     const newZoom = zoom + 1;
//     setZoom(newZoom);
//     setEvents(ZOOM_TEST_DATA[newZoom]);
//   };

//   // Horizontal pan/scroll
//   const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     if (!containerRef.current) return;
//     containerRef.current.scrollLeft += e.deltaY;
//   };

//   useEffect(() => {
//     // optional: scroll to start
//     if (containerRef.current) containerRef.current.scrollLeft = 0;
//   }, [events]);

//   return (
//     <div className="timeline-widget">
//       <div className="timeline-header">
//         <div className="timeline-title">Timeline</div>
//         <div className="timeline-zoom">
//           <button onClick={zoomIn}>+</button>
//           <span>{ZOOM_LEVELS[zoom].label}</span>
//           <button onClick={zoomOut}>-</button>
//         </div>
//       </div>

//       <div className="timeline-content" ref={containerRef} onWheel={onWheel}>
//         <div className="timeline-vertical-line"></div>

//         <div className="timeline-events">
//           {events.length === 0 && <div className="no-events">No events in this range…</div>}

//           {events.map((ev) => (
//             <div key={ev.id} className="timeline-event">
//               <div className="timeline-date">
//                 {new Date(ev.timestamp).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
//                 <div className="timeline-time">{new Date(ev.timestamp).toLocaleTimeString()}</div>
//               </div>

//               <div className="timeline-dot" style={{ backgroundColor: ev.color }}></div>

//               <div className="timeline-card" style={{ borderColor: ev.color }}>
//                 <div className="timeline-card-title" style={{ color: ev.color }}>{ev.title}</div>
//                 <div className="timeline-card-timestamp">{new Date(ev.timestamp).toLocaleString()}</div>
//                 <div className="timeline-card-details">{ev.details}</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TimelineWidget;

import React from 'react';
import './Timeline.css';

interface TimelineEvent {
  id: number;
  timestamp: number;
  title: string;
  color: string;
  details: string;
  icon?: string; // emoji or icon text
  image?: string;
}

// ------------------------------
// Dummy events across multiple dates
// ------------------------------
const sampleEvents: TimelineEvent[] = [
  {
    id: 1,
    timestamp: new Date('2025-01-10T10:15:00Z').getTime(),
    title: 'Order Created',
    color: '#4285F4',
    details: 'Order #12345 created',
    icon: '📝',
  },
  {
    id: 2,
    timestamp: new Date('2025-01-10T12:45:00Z').getTime(),
    title: 'Payment Completed',
    color: '#0F9D58',
    details: 'Payment of ₹1500 completed',
    image: 'https://cdn-icons-png.flaticon.com/512/992/992651.png',
  },
  {
    id: 3,
    timestamp: new Date('2025-01-11T09:30:00Z').getTime(),
    title: 'Item Packed',
    color: '#F4B400',
    details: 'Package is packed at warehouse',
    icon: '📦',
  },
  {
    id: 4,
    timestamp: new Date('2025-01-12T08:45:00Z').getTime(),
    title: 'Shipped',
    color: '#DB4437',
    details: 'Shipment left the warehouse',
    icon: '🚚',
  },
  {
    id: 5,
    timestamp: new Date('2025-01-15T12:00:00Z').getTime(),
    title: 'Out for Delivery',
    color: '#A333C8',
    details: 'Courier is out for delivery',
    icon: '📮',
  },
  {
    id: 6,
    timestamp: new Date('2025-01-15T15:30:00Z').getTime(),
    title: 'Delivered',
    color: '#34A853',
    details: 'Package delivered successfully',
    image: 'https://cdn-icons-png.flaticon.com/512/190/190411.png',
  },
  {
    id: 7,
    timestamp: new Date('2025-01-17T10:00:00Z').getTime(),
    title: 'Return Requested',
    color: '#EA4335',
    details: 'Customer requested a return',
    icon: '↩️',
  },
  {
    id: 8,
    timestamp: new Date('2025-01-17T14:00:00Z').getTime(),
    title: 'Return Approved',
    color: '#0F9D58',
    details: 'Return approved',
    icon: '✔️',
  },
];

// ------------------------------
// Helper: Format Date YYYY-MM-DD
// ------------------------------
const formatDate = (ts: number) => new Date(ts).toISOString().split('T')[0];

// ------------------------------
// TimelineWidget Component
// ------------------------------
const TimelineWidget: React.FC = () => {
  // 1. Find range of dates
  const firstDate = Math.min(...sampleEvents.map((e) => e.timestamp));
  const lastDate = Math.max(...sampleEvents.map((e) => e.timestamp));

  // 2. Generate all dates in range
  const allDates: string[] = [];
  // eslint-disable-next-line prefer-const
  let currentDate = new Date(firstDate);
  currentDate.setUTCHours(0, 0, 0, 0);

  const endDate = new Date(lastDate);
  endDate.setUTCHours(0, 0, 0, 0);

  while (currentDate <= endDate) {
    allDates.push(currentDate.toISOString().split('T')[0]);
    currentDate.setUTCDate(currentDate.getUTCDate() + 1);
  }

  // 3. Map events to each date
  const eventsByDate: Record<string, TimelineEvent[]> = {};
  allDates.forEach((date) => (eventsByDate[date] = []));
  sampleEvents.forEach((ev) => {
    const date = formatDate(ev.timestamp);
    if (eventsByDate[date]) eventsByDate[date].push(ev);
  });

  return (
    <div className='timeline-widget'>
      <div className='timeline-header'>
        <h2>Vertical Timeline</h2>
      </div>

      <div className='timeline-content'>
        {/* Center Vertical Line */}
        <div className='timeline-vertical-line'></div>

        <div className='timeline-events'>
          {allDates.map((date) => (
            <div key={date} className='timeline-date-group'>
              {/* Date Label */}
              <div className='timeline-date-label'>
                {new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>

              {/* Events for this date */}
              {eventsByDate[date].length === 0 ? (
                <div className='timeline-no-event'>No events</div>
              ) : (
                eventsByDate[date].map((ev) => (
                  <div key={ev.id} className='timeline-event'>
                    <div className='timeline-dot' style={{ backgroundColor: ev.color }}>
                      {ev.image && <img src={ev.image} alt='' className='timeline-dot-img' />}
                      {ev.icon && <span className='timeline-dot-icon'>{ev.icon}</span>}
                    </div>
                    <div className='timeline-card' style={{ borderColor: ev.color }}>
                      <div className='timeline-card-title' style={{ color: ev.color }}>
                        {ev.title}
                      </div>
                      <div className='timeline-card-timestamp'>{new Date(ev.timestamp).toLocaleString()}</div>
                      <div className='timeline-card-details'>{ev.details}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelineWidget;
