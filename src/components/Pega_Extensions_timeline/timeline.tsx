import React, { useEffect, useState } from 'react';

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
}

const formatDate = (ts: number) => new Date(ts).toISOString().split('T')[0];

const TimelineWidget: React.FC<TimelineWidgetProps> = ({ getPConnect, datapageName, data }) => {
  const [events, setEvents] = useState<any[]>([]);
  const [normalized, setNormalized] = useState<any[]>([]);
  console.log(data, 'Data From Pega side');

  // Use data passed from parent
  useEffect(() => {
    if (data && Array.isArray(data)) {
      setEvents(data); // ✅ FIX 2 — use the "data" prop → removes unused-var error
      return;
    }

    // fallback: get data from PConnect
    if (!getPConnect || !datapageName) return;

    try {
      const pConn = getPConnect();
      const value = pConn?.getValue?.(datapageName);

      if (value && Array.isArray(value)) {
        setEvents(value);
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.warn('Failed to fetch Data Page:', error);
      setEvents([]);
    }
  }, [data, getPConnect, datapageName]);

  // Normalize events
  useEffect(() => {
    if (!events || events.length === 0) return;

    const now = Date.now();

    const normalizedData = events.map((e, idx) => ({
      id: e.id || idx + 1,
      createdAt: new Date(e.createdAt || e.pxCreateDateTime || now).getTime(),
      header: e.header || e.Label || e.Title || 'Event',
      color: e.color || '#4285F4',
      type: e.type || 'unknown',
      ...e,
    }));

    setNormalized(normalizedData);
  }, [events]);

  if (!normalized || normalized.length === 0) return <div>No timeline events found</div>;

  const firstDate = Math.min(...normalized.map((e) => e.createdAt));
  const lastDate = Math.max(...normalized.map((e) => e.createdAt));

  // const allDates: string[] = [];
  const currentDate = new Date(firstDate);
  currentDate.setUTCHours(0, 0, 0, 0);

  const endDate = new Date(lastDate);
  endDate.setUTCHours(0, 0, 0, 0);

  while (currentDate <= endDate) {
    data?.push(formatDate(currentDate.getTime()));
    currentDate.setUTCDate(currentDate.getUTCDate() + 1);
  }

  const eventsByDate: Record<string, any[]> = {};
  data?.forEach((d) => (eventsByDate[d] = []));
  normalized.forEach((ev) => {
    const d = formatDate(ev.createdAt);
    eventsByDate[d].push(ev);
  });

  return (
    <div className='timeline-widget'>
      <div className='timeline-header'>
        <h2>Vertical Timeline</h2>
      </div>

      <div className='timeline-content'>
        <div className='timeline-vertical-line'></div>

        <div className='timeline-events'>
          {data?.map((date) => (
            <div key={date} className='timeline-date-group'>
              <div className='timeline-date-label'>
                {new Date(date).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </div>

              {!eventsByDate[date] || eventsByDate[date].length === 0 ? (
                <div className='timeline-no-event'>No events</div>
              ) : (
                eventsByDate[date].map((ev) => {
                  const dynamicFields = Object.entries(ev).filter(
                    ([k]) => !['id', 'color', 'icon', 'image', 'createdAt', 'pxCreateDateTime'].includes(k),
                  );

                  const icon = icons[ev.type] || icons['unknown'];

                  return (
                    <div key={ev.id} className='timeline-event'>
                      <div className='timeline-dot' style={{ backgroundColor: ev.color }}>
                        <span className='timeline-dot-icon'>{icon}</span>
                      </div>

                      <div className='timeline-card' style={{ borderColor: ev.color }}>
                        <div className='timeline-card-title' style={{ color: ev.color }}>
                          {ev.header}
                        </div>

                        <div className='timeline-card-column'>
                          <div className='timeline-card-timestamp'>
                            <strong>Created At: </strong> {new Date(ev.createdAt).toLocaleString()}
                          </div>

                          {dynamicFields.map(([key, value]) => (
                            <div key={key} className='timeline-card-details'>
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
    </div>
  );
};

export default TimelineWidget;
