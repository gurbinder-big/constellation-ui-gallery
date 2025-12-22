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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const hasValidDateSource = data.every((e) =>
      dateField ? e[dateField] : e.createdAt || e.CreatedAt
    );

    if (!hasValidDateSource) {
       setError(
         dateField
           ? `Date field "${dateField}" not found in one or more events`
           : 'createdAt is missing and no dateField was provided, Please configure a dateField for the Timeline component configuration'
       );
       setNormalizedEvents([]);
       return;
     }

     setError(null);

    const normalized = data.map((e, idx) => {
      const rawDate = (dateField && e[dateField]) || e.createdAt || e.CreatedAt;
      // const timestamp = rawDate && !isNaN(new Date(rawDate).getTime()) ? new Date(rawDate).getTime() : Date.now();
      const timestamp = new Date(rawDate).getTime();

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

  console.log(data, 'data from pega side');

  if (error) {
    return <div className="timeline-error">{error}</div>;
  }

  return (
    <div className='timeline-container'>
      <div className='timeline-header'>
        <h2>Vertical Timeline</h2>
      </div>

      <div className='timeline-wrapper'>
        <div className='timeline-line' />

        {allDates.length === 0 && <p>No Events</p>}

        {allDates.map((date) => (
          <div key={date} className='timeline-date-group'>
            <div className='timeline-date'>
              {new Date(date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </div>

            {eventsByDate[date]?.length === 0 ? (
              <div className='timeline-no-events'>No events</div>
            ) : (
              eventsByDate[date].map((ev) => {
                const icon = icons[ev.Type] || icons.unknown;

                const dynamicFields = Object.entries(ev).filter(([key, value]) => {
                  const isSystemField = ['id', 'Color', 'createdAt', 'header', dateField, headingField].includes(key);

                  const isEmpty =
                    value === null || value === undefined || (typeof value === 'string' && value.trim() === '');

                  return !isSystemField && !isEmpty;
                });

                return (
                  <div key={ev.id} className='timeline-event'>
                    <div className='timeline-dot' style={{ backgroundColor: ev.Color }}>
                      {icon}
                    </div>

                    <div className='timeline-card' style={{ border: `2px solid ${ev.Color}` }}>
                      <div className='timeline-title' style={{ color: ev.Color }}>
                        {ev.header}
                      </div>

                      <div className='timeline-content'>
                        <div className='timeline-field'>
                          <strong>{dateField || 'CreatedAt'}: </strong>
                          {new Date(ev.createdAt).toLocaleString()}
                        </div>

                        {dynamicFields.map(([key, value]) => (
                          <div key={key} className='timeline-field'>
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
