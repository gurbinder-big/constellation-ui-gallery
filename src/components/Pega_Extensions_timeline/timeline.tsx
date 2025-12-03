import React, { useEffect, useMemo, useState } from "react";

const icons: Record<string, string> = {
  order_created: "📝",
  payment_completed: "💰",
  warehouse_packed: "📦",
  shipped: "🚚",
  delivered: "📬",
  out_for_delivery: "📮",
  return_requested: "↩️",
  return_approved: "✔️",
  slaDeadline: "⏰",
  unknown: "❓",
};

interface TimelineWidgetProps {
  getPConnect?: () => any;
  datapageName?: string;
  data?: any[];
  isLoading?: boolean;
}

const formatDate = (ts: number) => new Date(ts).toISOString().split("T")[0];

const TimelineWidget: React.FC<TimelineWidgetProps> = ({ data }) => {
  const [normalizedEvents, setNormalizedEvents] = useState<any[]>([]);

  useEffect(() => {
    if (!data) return;
    const normalized = data.map((e, idx) => {
      const timestamp = new Date(e.createdAt || e.CreatedAt).getTime();
      return {
        ...e,
        id: e.id ?? idx + 1,
        createdAt: timestamp,
        header: e.header || e.Label || e.Title || "Event",
        color: e.color || "#4285F4",
        type: e.type || "unknown",
      };
    });

    console.log(normalized);
    setNormalizedEvents(normalized);
  }, [data]);

  const allDates = useMemo(() => {
    if (normalizedEvents.length === 0) return [];

    const first = Math.min(...normalizedEvents.map((e) => e.createdAt));
    const last = Math.max(...normalizedEvents.map((e) => e.createdAt));

    console.log(first);
    console.log(last);

    const dates: string[] = [];

    const start = new Date(first);
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date(last);
    end.setUTCHours(0, 0, 0, 0);

    while (start <= end) {
      dates.push(formatDate(start.getTime()));
      start.setUTCDate(start.getUTCDate() + 1);
    }

    return dates;
  }, [normalizedEvents]);

  console.log(allDates);


  const eventsByDate = useMemo(() => {
    const map: Record<string, any[]> = {};

    allDates.forEach((d) => (map[d] = []));

    normalizedEvents.forEach((ev) => {
      const d = formatDate(ev.createdAt);
      if (!map[d]) map[d] = [];
      map[d].push(ev);
    });

    return map;
  }, [allDates, normalizedEvents]);

  return (
    <div className="timeline-widget">
      <div className="timeline-header">
        <h2>Vertical Timeline</h2>
      </div>

      <div className="timeline-content">
        <div className="timeline-vertical-line"></div>

        <div className="timeline-events">

          {
            allDates.length == 0 && <p>dsadsaa </p>
          }

          {
            allDates.map((date) => (
            <div key={date} className="timeline-date-group">
              <div className="timeline-date-label">
                {new Date(date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>

              {eventsByDate[date].length === 0 ? (
                <div className="timeline-no-event">No events</div>
              ) : (
                eventsByDate[date].map((ev) => {
                  const dynamicFields = Object.entries(ev).filter(
                    ([k]) => !["id", "color", "icon", "image", "createdAt", "pxCreateDateTime"].includes(k)
                  );

                  const icon = icons[ev.type] || icons["unknown"];

                  return (
                    <div key={ev.id} className="timeline-event">
                      <div className="timeline-dot" style={{ backgroundColor: ev.color }}>
                        <span className="timeline-dot-icon">{icon}</span>
                      </div>

                      <div className="timeline-card" style={{ borderColor: ev.color }}>
                        <div className="timeline-card-title" style={{ color: ev.color }}>
                          {ev.header}
                        </div>

                        <div className="timeline-card-column">
                          <div className="timeline-card-timestamp">
                            <strong>Created At: </strong>
                            {new Date(ev.createdAt).toLocaleString()}
                          </div>

                          {dynamicFields.map(([key, value]) => (
                            <div key={key} className="timeline-card-details">
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
