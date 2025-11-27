import React from 'react';
import './Timeline.css';

const sampleEvents = [
  {
    id: 1,
    createdAt: new Date('2025-01-10T10:15:00Z').getTime(),
    header: 'Order Created',
    message:
      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text.',
    caseID: 'CASE-001',
    color: '#4285F4',
    icon: '📝',
  },
  {
    id: 2,
    createdAt: new Date('2025-01-10T12:45:00Z').getTime(),
    details: 'Payment of ₹1500 completed',
    createdBy: 'system',
    goalDate: '2025-01-12',
    color: '#0F9D58',
    image: 'https://cdn-icons-png.flaticon.com/512/992/992651.png',
  },
  {
    id: 3,
    createdAt: new Date('2025-01-11T09:30:00Z').getTime(),
    details: 'Package is packed at warehouse',
    deadLineDate: '2025-01-13',
    caseID: 'CASE-001',
    color: '#F4B400',
    icon: '📦',
  },
  {
    id: 4,
    createdAt: new Date('2025-01-12T08:45:00Z').getTime(),
    header: 'Shipped',
    message: 'Shipment left the warehouse',
    createdBy: 'warehouse-team',
    color: '#DB4437',
    icon: '🚚',
  },
  {
    id: 6,
    createdAt: new Date('2025-01-13T15:30:00Z').getTime(),
    header: 'Delivered',
    details: 'Package delivered successfully',
    createdBy: 'delivery-agent',
    deadLineDate: '2025-01-16',
    color: '#34A853',
    image: 'https://cdn-icons-png.flaticon.com/512/190/190411.png',
  },
  {
    id: 5,
    createdAt: new Date('2025-01-14T12:00:00Z').getTime(),
    header: 'Out for Delivery',
    details: 'Courier is out for delivery',
    caseID: 'CASE-001',
    goalDate: '2025-01-15',
    color: '#A333C8',
    icon: '📮',
  },
  {
    id: 6,
    createdAt: new Date('2025-01-15T15:30:00Z').getTime(),
    header: 'Delivered',
    details: 'Package delivered successfully',
    createdBy: 'delivery-agent',
    deadLineDate: '2025-01-16',
    color: '#34A853',
    image: 'https://cdn-icons-png.flaticon.com/512/190/190411.png',
  },
  {
    id: 7,
    createdAt: new Date('2025-01-17T10:00:00Z').getTime(),
    header: 'Return Requested',
    details: 'Customer requested a return',
    createdBy: 'customer',
    caseID: 'CASE-RET-91',
    color: '#EA4335',
    icon: '↩️',
  },
  {
    id: 8,
    createdAt: new Date('2025-01-17T14:00:00Z').getTime(),
    details: 'Return approved',
    goalDate: '2025-01-18',
    deadLineDate: '2025-01-20',
    color: '#0F9D58',
    icon: '✔️',
  },
];

const formatDate = (ts: number) => new Date(ts).toISOString().split('T')[0];

const TimelineWidget: React.FC = () => {
  const firstDate = Math.min(...sampleEvents.map((e) => e.createdAt));
  const lastDate = Math.max(...sampleEvents.map((e) => e.createdAt));

  const allDates: string[] = [];
  const currentDate = new Date(firstDate);
  currentDate.setUTCHours(0, 0, 0, 0);

  const endDate = new Date(lastDate);
  endDate.setUTCHours(0, 0, 0, 0);

  while (currentDate <= endDate) {
    allDates.push(formatDate(currentDate.getTime()));
    currentDate.setUTCDate(currentDate.getUTCDate() + 1);
  }

  const eventsByDate: Record<string, any[]> = {};
  allDates.forEach((d) => (eventsByDate[d] = []));
  sampleEvents.forEach((ev) => {
    const d = formatDate(ev.createdAt);
    eventsByDate[d]?.push(ev);
  });

  return (
    <div className='timeline-widget'>
      <div className='timeline-header'>
        <h2>Vertical Timeline</h2>
      </div>

      <div className='timeline-content'>
        <div className='timeline-vertical-line'></div>

        <div className='timeline-events'>
          {allDates.map((date) => (
            <div key={date} className='timeline-date-group'>
              <div className='timeline-date-label'>
                {new Date(date).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </div>

              {eventsByDate[date].length === 0 ? (
                <div className='timeline-no-event'>No events</div>
              ) : (
                eventsByDate[date].map((ev) => {
                  // AUTO DETECT FIELDS
                  const dynamicFields = Object.entries(ev).filter(
                    ([key]) => !['id', 'color', 'icon', 'image', 'createdAt'].includes(key),
                  );

                  return (
                    <div key={ev.id} className='timeline-event'>
                      <div className='timeline-dot' style={{ backgroundColor: ev.color }}>
                        {/*ev.image && <img src={ev.image} alt="" className="timeline-dot-img" /> */}
                        {/*ev.icon && <span className="timeline-dot-icon">{ev.icon}</span> */}
                      </div>

                      <div className='timeline-card' style={{ borderColor: ev.color }}>
                        <div className='timeline-card-title' style={{ color: ev.color }}>
                          {ev.header || 'Untitled Event'}
                        </div>

                        <div className='timeline-card-column'>
                          <div className='timeline-card-timestamp'>
                            <strong>Created At : </strong> {new Date(ev.createdAt).toLocaleString()}
                          </div>

                          {dynamicFields.map(([key, value]) => {
                            if (key === 'header') return null; // skip header

                            if (key === 'message') {
                              return (
                                <div key={key} className='timeline-card-details timeline-card-details-message'>
                                  {String(value)}
                                </div>
                              );
                            }

                            return (
                              <div key={key} className='timeline-card-details'>
                                <strong>{key}: </strong> {String(value)}
                              </div>
                            );
                          })}
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
    </div>
  );
};

export default TimelineWidget;
