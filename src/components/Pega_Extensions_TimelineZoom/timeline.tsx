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
// Ensure time formatting is robust for UTC strings like '2025-12-16T06:39:42.082Z'
const formatTime = (ts: number) =>
  new Date(ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

const TimelineWidget: React.FC<TimelineWidgetProps> = ({ data = [], dateField, headingField }) => {
  const [normalizedEvents, setNormalizedEvents] = useState<any[]>([]);
  const [zoomLevel, setZoomLevel] = useState(0);

  /* ==================== NORMALIZE DATA: PRIORITIZING pxTimeCreated ==================== */
  useEffect(() => {
    if (!data || data.length === 0) return;

    const normalized = data
      .map((e, idx) => {
        // 1. Prioritize pxTimeCreated for the timestamp
        const rawDate = e.pxTimeCreated || e[dateField!] || e.createdAt || e.CreatedAt;

        let timestamp: number;
        // Convert Pega-like date string (or any valid date string) to a timestamp
        if (rawDate && !isNaN(new Date(rawDate).getTime())) {
          timestamp = new Date(rawDate).getTime();
        } else {
          // Fallback only if no valid date/time field is found
          // NOTE: If real data always provides pxTimeCreated, this fallback won't be hit.
          // Using 0 or a placeholder for missing dates to avoid using Date.now()
          timestamp = 0;
        }

        const headerValue = (headingField && e[headingField]) || e.header || e.Header || e.Title || 'Event';

        return {
          ...e,
          id: e.id ?? idx + 1,
          // The core timestamp used throughout the component
          createdAt: timestamp,
          header: headerValue,
          Color: e.Color || '#4285F4',
          Type: e.Type || 'unknown',
        };
      })
      // Filter out events where timestamp is 0 (missing/invalid date) and sort
      .filter((e) => e.createdAt > 0)
      .sort((a, b) => a.createdAt - b.createdAt);

    setNormalizedEvents(normalized);
  }, [data, dateField, headingField]);

  /* ==================== CTRL + SCROLL ZOOM (Existing) ==================== */
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!e.ctrlKey) return;
      e.preventDefault();
      setZoomLevel((prev) => {
        const next = e.deltaY < 0 ? prev + 1 : prev - 1;
        return Math.max(-5, Math.min(5, next));
      });
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  /* ==================== DOUBLE CLICK RESET (Existing) ==================== */
  const handleDoubleClick = () => {
    setZoomLevel(0);
  };

  /* ==================== TIME GAP FROM ZOOM (Existing) ==================== */
  const timeGapMinutes = useMemo(() => {
    if (zoomLevel === 0) return null;
    const minGap = 5;
    const maxGap = 55;
    const normalized = (zoomLevel + 5) / 10;
    return Math.round(maxGap - normalized * (maxGap - minGap));
  }, [zoomLevel]);

  /* ==================== ZOOM LABEL (Existing) ==================== */
  const zoomLabel = useMemo(() => {
    if (!timeGapMinutes) return 'Default (Daily)';
    if (timeGapMinutes <= 5) return '5 min';
    if (timeGapMinutes <= 15) return '15 min';
    if (timeGapMinutes <= 30) return '30 min';
    return `${timeGapMinutes} min`;
  }, [timeGapMinutes]);

  /* ==================== DATE GROUPING (Existing) ==================== */
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

  // Helper to render the event card
  const renderEvent = (ev: any, dateField: string | undefined, headingField: string | undefined) => {
    // Check if event has a valid timestamp before rendering
    if (ev.createdAt === 0) return null;

    const icon = icons[ev.Type] || icons.unknown;

    // Filter dynamic fields, ensuring pxTimeCreated is excluded from the dynamic list
    const systemFieldsToExclude = ['id', 'Color', 'createdAt', 'header', dateField, headingField, 'pxTimeCreated'];

    const dynamicFields = Object.entries(ev).filter(([key, value]) => {
      const isSystemField = systemFieldsToExclude.includes(key);
      const isEmpty =
        value === null || value === undefined || (typeof value === 'string' && String(value).trim() === '');
      return !isSystemField && !isEmpty;
    });

    console.log(data, 'data from pega side');
    console.log(dynamicFields, 'dynamicFields data from pega side');
    console.log(allDates, 'allDates data from pega side');

    return (
      <div key={ev.id} className='timeline-event-item'>
        {/* Time Marker/Label: Uses the dynamic event timestamp */}
        <div className='timeline-event-time'>{formatTime(ev.createdAt)}</div>

        {/* Dot and Line */}
        <div className='timeline-dot-container'>
          <div className='timeline-line-tick' />
          <div className='timeline-dot' style={{ backgroundColor: ev.Color }}>
            {icon}
          </div>
        </div>

        {/* Card */}
        <div className='timeline-card-wrapper'>
          <div
            className='timeline-card'
            style={{ borderLeft: `5px solid ${ev.Color}`, border: `1px solid ${ev.Color}` }}
          >
            <div className='timeline-title' style={{ color: ev.Color }}>
              {ev.header}
            </div>

            <div className='timeline-content'>
              <div className='timeline-field'>
                {/* Displaying the date derived from the event data */}
                <strong>Date: </strong>
                {new Date(ev.createdAt).toLocaleDateString()}
              </div>
              <div className='timeline-field'>
                {/* Displaying the exact time derived from the event data */}
                <strong>Time: </strong>
                {new Date(ev.createdAt).toLocaleTimeString()}
              </div>
              {dynamicFields.map(([key, value]) => (
                <div key={key} className='timeline-field'>
                  <strong>{key}: </strong> {String(value)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  /* ==================== RENDER ==================== */
  return (
    <div className='timeline-container' onDoubleClick={handleDoubleClick}>
      {/* Internal CSS - (Unchanged) */}
      <style>
        {`
        .timeline-container {
          width: 100%;
          max-width: 1000px;
          margin: 20px auto;
          font-family: Arial, sans-serif;
          padding: 20px;
          border-radius: 8px;
        }

        .timeline-header {
          text-align: center;
          margin-bottom: 10px;
          color: #333;
        }

        .zoom-indicator {
          text-align: center;
          font-size: 12px;
          color: #555;
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 1px dashed #ccc;
        }

        .timeline-wrapper {
          position: relative;
          padding-left: 190px;
        }

        .timeline-line {
          position: absolute;
          left: 190px;
          top: 0;
          width: 2px;
          height: 100%;
          background: #d0d0d0;
          border-radius: 1px;
        }

        .timeline-date-group, .timeline-time-group {
          position: relative;
          padding-bottom: 20px;
        }

        .timeline-date {
          position: absolute;
          left: -190px;
          width: 180px;
          font-weight: 700;
          font-size: 15px;
          color: #333;
        }

        .timeline-event-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 10px;
            position: relative;
            padding-bottom: 15px;
        }

        .timeline-event-time {
            position: absolute;
            left: -110px;
            font-size: 12px;
            color: #666;
            top: 34px;
            width: 80px;
            text-align: right;
        }

        .timeline-dot-container {
            position: relative;
            z-index: 10;
            width: 40px;
            display: flex;
            align-items: center;
            margin-left: 0;
            left: -30px;
        }

       .timeline-line-tick {
          width: 20px;
          height: 2px;
          background: #d0d0d0;
          position: absolute;
          right: -8px;
          top: 40px;
      }

        .timeline-dot {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            border: 3px solid #fff;
            box-shadow: 0 0 0 2px #d0d0d0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            color: #fff;
            position: relative;
            left: 20px;
            z-index: 2;
        }

        .timeline-card-wrapper {
            flex-grow: 1;
            margin-left: 20px;
        }

        .timeline-card {
            padding: 10px 15px;
            border-radius: 5px;
            background: #fff;
            box-shadow: 0 1px 4px rgba(0,0,0,0.08);
            border: 1px solid #ccc;
        }

        .timeline-title {
          font-weight: 600;
          margin-bottom: 8px;
          font-size: 14px;
        }

        .timeline-content {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 15px;
          font-size: 12px;
        }

        .timeline-field {
          flex: 0 0 calc(50% - 10px);
        }
        `}
      </style>

      <div className='timeline-header'>
        <h2>History Timeline</h2>
      </div>

      <div className='zoom-indicator'>
        🔍 Zoom: <strong>{zoomLabel}</strong> &nbsp; | &nbsp; CTRL + Scroll to Zoom &nbsp; | &nbsp; Double-click to
        reset
      </div>

      <div className='timeline-wrapper'>
        <div className='timeline-line' />

        {normalizedEvents.length === 0 && <p>No Events</p>}

        {/* --- Render logic based on zoom level --- */}
        {timeGapMinutes ? (
          /* --- ZOOMED VIEW (Minute/Hourly) --- */
          <div className='timeline-time-group'>
            {/* Date label at the top */}
            {normalizedEvents.length > 0 && (
              <h3 style={{ marginLeft: '40px', marginBottom: '20px', fontSize: '16px' }}>
                {new Date(normalizedEvents[0].createdAt).toLocaleDateString('en-US', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </h3>
            )}
            {/* Render all events in a continuous list */}
            {normalizedEvents.map((ev) => renderEvent(ev, dateField, headingField))}
          </div>
        ) : (
          /* --- DEFAULT VIEW (Daily) --- */
          allDates.map((date) => (
            <div key={date} className='timeline-date-group'>
              <div className='timeline-date'>
                {new Date(date).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </div>

              {eventsByDate[date]?.length === 0 ? (
                <div className='timeline-no-events' style={{ marginLeft: '100px', fontStyle: 'italic', color: '#888' }}>
                  No events
                </div>
              ) : (
                // Render events using the new item structure
                eventsByDate[date].map((ev) => <div key={ev.id}>{renderEvent(ev, dateField, headingField)}</div>)
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TimelineWidget;
