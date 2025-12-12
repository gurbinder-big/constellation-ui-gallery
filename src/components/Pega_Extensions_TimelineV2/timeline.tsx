// import React, { useEffect, useMemo, useState } from 'react';

// const icons: Record<string, string> = {
//   order_created: '📝',
//   payment_completed: '💰',
//   warehouse_packed: '📦',
//   shipped: '🚚',
//   delivered: '📬',
//   out_for_delivery: '📮',
//   return_requested: '↩️',
//   return_approved: '✔️',
//   slaDeadline: '⏰',
//   unknown: '❓',
// };

// interface TimelineWidgetProps {
//   getPConnect?: () => any;
//   datapageName?: string;
//   data?: any[];
//   isLoading?: boolean;
//   dateField?: string;
//   headingField?: string;
// }

// const formatDate = (ts: number) => new Date(ts).toISOString().split('T')[0];

// const TimelineWidget: React.FC<TimelineWidgetProps> = ({ data = [], dateField, headingField }) => {
//   const [normalizedEvents, setNormalizedEvents] = useState<any[]>([]);

//   // Normalize incoming Pega data
//   useEffect(() => {
//     if (!data || data.length === 0) return;

//     const normalized = data.map((e, idx) => {
//       const rawDate = (dateField && e[dateField]) || e.createdAt || e.CreatedAt;
//       const timestamp = rawDate && !isNaN(new Date(rawDate).getTime()) ? new Date(rawDate).getTime() : Date.now();

//       const headerValue = (headingField && e[headingField]) || e.header || e.Header || e.Title || 'Event';

//       return {
//         ...e,
//         id: e.id ?? idx + 1,
//         createdAt: timestamp,
//         header: headerValue,
//         Color: e.Color || '#4285F4',
//         Type: e.Type || 'unknown',
//       };
//     });

//     setNormalizedEvents(normalized);
//   }, [data, dateField, headingField]);

//   // Compute all dates between first and last event
//   const allDates = useMemo(() => {
//     if (normalizedEvents.length === 0) return [];

//     const first = Math.min(...normalizedEvents.map((e) => e.createdAt));
//     const last = Math.max(...normalizedEvents.map((e) => e.createdAt));

//     const dates: string[] = [];
//     const start = new Date(first);
//     start.setUTCHours(0, 0, 0, 0);

//     const end = new Date(last);
//     end.setUTCHours(0, 0, 0, 0);

//     while (start <= end) {
//       dates.push(formatDate(start.getTime()));
//       start.setUTCDate(start.getUTCDate() + 1);
//     }

//     return dates;
//   }, [normalizedEvents]);

//   // Group events by date
//   const eventsByDate = useMemo(() => {
//     const map: Record<string, any[]> = {};

//     allDates.forEach((d) => (map[d] = []));

//     normalizedEvents.forEach((ev) => {
//       const d = formatDate(ev.createdAt);
//       if (!map[d]) map[d] = [];
//       map[d].push(ev);
//     });

//     Object.keys(map).forEach((date) => {
//       map[date].sort((a, b) => a.createdAt - b.createdAt);
//     });

//     return map;
//   }, [allDates, normalizedEvents]);

//   return (
//     <div className='timeline-widget'>
//       <div className='timeline-header'>
//         <h2>Vertical Timeline</h2>
//       </div>

//       <div className='timeline-content'>
//         <div className='timeline-vertical-line'></div>

//         <div className='timeline-events'>
//           {allDates.length === 0 && <p>No Events</p>}

//           {allDates.map((date) => (
//             <div key={date} className='timeline-date-group'>
//               <div className='timeline-date-label'>
//                 {new Date(date).toLocaleDateString('en-US', {
//                   day: 'numeric',
//                   month: 'long',
//                   year: 'numeric',
//                 })}
//               </div>

//               {eventsByDate[date]?.length === 0 ? (
//                 <div className='timeline-no-event'>No events</div>
//               ) : (
//                 eventsByDate[date]?.map((ev) => {
//                   const icon = icons[ev.Type] || icons.unknown;

//                   // Filter out system fields + null/empty fields
//                   const dynamicFields = Object.entries(ev).filter(([key, value]) => {
//                     const isSystemField = [
//                       'id',
//                       'Color',
//                       'icon',
//                       'image',
//                       'createdAt',
//                       'header',
//                       dateField,
//                       headingField,
//                     ].includes(key);

//                     const isEmpty =
//                       value === null || value === undefined || (typeof value === 'string' && value.trim() === '');

//                     return !isSystemField && !isEmpty;
//                   });

//                   return (
//                     <div key={ev.id} className='timeline-event'>
//                       <div className='timeline-dot' style={{ backgroundColor: ev.Color }}>
//                         <span className='timeline-dot-icon'>{icon}</span>
//                       </div>

//                       <div className='timeline-card' style={{ borderColor: ev.Color }}>
//                         <div className='timeline-card-title' style={{ color: ev.Color }}>
//                           {ev.header}
//                         </div>

//                         <div className='timeline-card-column'>
//                           <div className='timeline-card-timestamp'>
//                             <strong>{dateField || 'CreatedAt'}: </strong>
//                             {new Date(ev.createdAt).toLocaleString()}
//                           </div>

//                           {dynamicFields.map(([key, value]) => (
//                             <div key={key} className='timeline-card-details'>
//                               <strong>{key}: </strong> {String(value)}
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TimelineWidget;

import React, { useEffect, useMemo, useState } from 'react';

const icons: Record<string, string> = {
  order_created: '📝',
  payment_completed: '💰',
  warehouse_packed: '📦',
  shipped: '🚚',
  delivered: '📬',
  out_for_delivery: '📮',
  return_requested: '↩️',
  return_approved: '✔️',
  slaDeadline: '⏰',
  unknown: '❓',
};

interface TimelineWidgetProps {
  getPConnect?: () => any;
  datapageName?: string;
  data?: any[];
  isLoading?: boolean;
  dateField?: string;
  headingField?: string;
}

const formatDate = (ts: number) => new Date(ts).toISOString().split('T')[0];

const TimelineWidget: React.FC<TimelineWidgetProps> = ({ data = [], dateField, headingField }) => {
  const [normalizedEvents, setNormalizedEvents] = useState<any[]>([]);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const normalized = data.map((e, idx) => {
      const rawDate = (dateField && e[dateField]) || e.createdAt || e.CreatedAt;
      const timestamp = rawDate && !isNaN(new Date(rawDate).getTime()) ? new Date(rawDate).getTime() : Date.now();

      const headerValue = (headingField && e[headingField]) || e.header || e.Header || e.Title || 'Event';

      return {
        ...e,
        id: e.id ?? idx + 1,
        createdAt: timestamp,
        header: headerValue,
        Color: e.Color || '#4285F4',
        Type: e.Type || 'unknown',
      };
    });

    setNormalizedEvents(normalized);
  }, [data, dateField, headingField]);

  const allDates = useMemo(() => {
    if (normalizedEvents.length === 0) return [];
    const first = Math.min(...normalizedEvents.map((e) => e.createdAt));
    const last = Math.max(...normalizedEvents.map((e) => e.createdAt));

    const dates: string[] = [];
    const start = new Date(first);
    const end = new Date(last);

    start.setUTCHours(0, 0, 0, 0);
    end.setUTCHours(0, 0, 0, 0);

    while (start <= end) {
      dates.push(formatDate(start.getTime()));
      start.setUTCDate(start.getUTCDate() + 1);
    }
    return dates;
  }, [normalizedEvents]);

  const eventsByDate = useMemo(() => {
    const map: Record<string, any[]> = {};
    allDates.forEach((d) => (map[d] = []));

    normalizedEvents.forEach((ev) => {
      const d = formatDate(ev.createdAt);
      if (!map[d]) map[d] = [];
      map[d].push(ev);
    });

    Object.keys(map).forEach((d) => map[d].sort((a, b) => a.createdAt - b.createdAt));
    return map;
  }, [allDates, normalizedEvents]);

  return (
    <div style={{ width: '100%', maxWidth: 900, margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <h2>Vertical Timeline</h2>
      </div>

      <div style={{ position: 'relative', paddingLeft: 200 }}>
        {/* Vertical line */}
        <div
          style={{
            position: 'absolute',
            left: 190,
            top: 0,
            width: 3,
            height: '100%',
            background: '#d0d0d0',
            borderRadius: 4,
          }}
        />

        {allDates.length === 0 && <p>No Events</p>}

        {allDates.map((date) => (
          <div key={date} style={{ position: 'relative', marginBottom: 30 }}>
            {/* Date label */}
            <div
              style={{
                position: 'absolute',
                left: -200,
                width: 180,
                textAlign: 'left',
                fontWeight: 700,
                fontSize: 15,
                color: '#333',
              }}
            >
              {new Date(date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </div>

            {eventsByDate[date]?.length === 0 ? (
              <div style={{ marginLeft: 40, fontStyle: 'italic', color: '#888' }}>No events</div>
            ) : (
              eventsByDate[date]?.map((ev) => {
                const icon = icons[ev.Type] || icons.unknown;

                const dynamicFields = Object.entries(ev).filter(([key, value]) => {
                  const isSystemField = [
                    'id',
                    'Color',
                    'icon',
                    'image',
                    'createdAt',
                    'header',
                    dateField,
                    headingField,
                  ].includes(key);

                  const isEmpty =
                    value === null || value === undefined || (typeof value === 'string' && value.trim() === '');

                  return !isSystemField && !isEmpty;
                });

                return (
                  <div key={ev.id} style={{ position: 'relative', marginLeft: 40, marginTop: 30 }}>
                    {/* Dot */}
                    <div
                      style={{
                        position: 'absolute',
                        left: -62,
                        top: 0,
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        border: '2px solid #fff',
                        backgroundColor: ev.Color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 16,
                        color: '#fff',
                      }}
                    >
                      {icon}
                    </div>

                    {/* Card */}
                    <div
                      style={{
                        padding: '14px 16px',
                        border: `2px solid ${ev.Color}`,
                        borderRadius: 10,
                        background: '#fff',
                        boxShadow: '0 1px 6px rgba(0,0,0,0.1)',
                      }}
                    >
                      {/* Title */}
                      <div
                        style={{
                          fontWeight: 700,
                          marginBottom: 12,
                          fontSize: 16,
                          color: ev.Color,
                        }}
                      >
                        {ev.header}
                      </div>

                      {/* Content */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                        <div style={{ flex: '0 0 48%', fontSize: 13 }}>
                          <strong>{dateField || 'CreatedAt'}: </strong>
                          {new Date(ev.createdAt).toLocaleString()}
                        </div>

                        {dynamicFields.map(([key, value]) => (
                          <div key={key} style={{ flex: '0 0 48%', fontSize: 13 }}>
                            <strong>{key}: </strong> {String(value)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineWidget;
