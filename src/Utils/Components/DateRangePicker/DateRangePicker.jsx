import { useState, useMemo } from "react";

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

function isSameDay(a, b) {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function isInRange(date, start, end) {
  if (!start || !end || !date) return false;
  const [s, e] = start <= end ? [start, end] : [end, start];
  return date > s && date < e;
}

function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function getCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  return cells;
}

function CalendarMonth({ year, month, startDate, endDate, hoverDate, onDayClick, onDayHover, today }) {
  const cells = useMemo(() => getCalendarDays(year, month), [year, month]);

  return (
    <div style={{ minWidth: 280 }}>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(7, 1fr)",
        gap: "2px 0", textAlign: "center"
      }}>
        {DAYS.map((d, i) => (
          <div key={i} style={{ color: "#6b7280", fontSize: 12, fontWeight: 500, padding: "4px 0 10px" }}>{d}</div>
        ))}
        {cells.map((date, i) => {
          if (!date) return <div key={i} />;

          const isStart = isSameDay(date, startDate);
          const isEnd = isSameDay(date, endDate);
          const isToday = isSameDay(date, today);
          const effectiveEnd = endDate || hoverDate;
          const inRange = isInRange(startOfDay(date),
            startDate ? startOfDay(startDate) : null,
            effectiveEnd ? startOfDay(effectiveEnd) : null
          );
          const isSelected = isStart || isEnd;

          let bg = "transparent";
          let color = "black";
          let borderRadius = "50%";
          let rangeBg = "transparent";

          if (isSelected) {
            bg = "var(--sb-blue-250)";
            color = "#fff";
          } else if (isToday) {
            color = "#111827";
          }

          if (inRange) {
            rangeBg = "rgba(96, 165, 250, 0.12)";
          }

          // Round range caps
          let rangeBorderRadius = "0";
          if (isStart) rangeBorderRadius = "50% 0 0 50%";
          else if (isEnd) rangeBorderRadius = "0 50% 50% 0";

          return (
            <div
              key={i}
              style={{ position: "relative", padding: "2px 0" }}
              onMouseEnter={() => onDayHover(date)}
              onMouseLeave={() => onDayHover(null)}
            >
              {/* Range background strip */}
              {(inRange || isStart || isEnd) && (
                <div style={{
                  position: "absolute", top: "50%", left: 0, right: 0,
                  height: 36, transform: "translateY(-50%)",
                  background: inRange ? rangeBg : (isStart || isEnd) ? "rgba(96, 165, 250, 0.12)" : "transparent",
                  borderRadius: isStart ? "50% 0 0 50%" : isEnd ? "0 50% 50% 0" : "0",
                  pointerEvents: "none",
                }} />
              )}
              <div
                onClick={() => onDayClick(date)}
                style={{
                  position: "relative",
                  width: 36, height: 36,
                  margin: "0 auto",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: "50%",
                  background: bg,
                  color,
                  fontSize: 14,
                  fontWeight: isSelected ? 600 : 400,
                  cursor: "pointer",
                  border: isToday && !isSelected ? "1.5px solid #6b7280" : "1.5px solid transparent",
                  transition: "background 0.15s",
                  userSelect: "none",
                  zIndex: 1,
                }}
                onMouseOver={e => { if (!isSelected) e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                onMouseOut={e => { if (!isSelected) e.currentTarget.style.background = bg; }}
              >
                {date.getDate()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function DateRangePicker() {
  const today = startOfDay(new Date());

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth() > 0 ? today.getMonth() - 1 : 0);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);
  const [selecting, setSelecting] = useState(false); // false = picking start, true = picking end

  const leftYear = viewYear;
  const leftMonth = viewMonth;
  const rightMonth = viewMonth === 11 ? 0 : viewMonth + 1;
  const rightYear = viewMonth === 11 ? viewYear + 1 : viewYear;

  function handleDayClick(date) {
    if (!selecting) {
      setStartDate(startOfDay(date));
      setEndDate(null);
      setSelecting(true);
    } else {
      const d = startOfDay(date);
      if (d < startDate) {
        setEndDate(startDate);
        setStartDate(d);
      } else {
        setEndDate(d);  
      }
      setSelecting(false);
    }
  }

  function goLeft() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }

  function goRight() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }

  function applyPreset(preset) {
    const now = startOfDay(new Date());
    const dow = now.getDay();
    switch (preset) {
      case "this-week": {
        const s = new Date(now); s.setDate(now.getDate() - dow);
        const e = new Date(s); e.setDate(s.getDate() + 6);
        setStartDate(s); setEndDate(e); break;
      }
      case "last-week": {
        const s = new Date(now); s.setDate(now.getDate() - dow - 7);
        const e = new Date(s); e.setDate(s.getDate() + 6);
        setStartDate(s); setEndDate(e); break;
      }
      case "last-7": {
        const s = new Date(now); s.setDate(now.getDate() - 6);
        setStartDate(s); setEndDate(now); break;
      }
      case "current-month": {
        const s = new Date(now.getFullYear(), now.getMonth(), 1);
        const e = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        setStartDate(s); setEndDate(e); break;
      }
      case "next-month": {
        const s = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        const e = new Date(now.getFullYear(), now.getMonth() + 2, 0);
        setStartDate(s); setEndDate(e); break;
      }
      case "reset":
        setStartDate(null); setEndDate(null); break;
    }
    setSelecting(false);
  }

  function formatDate(d) {
    if (!d) return "—";
    return `${MONTHS[d.getMonth()].slice(0, 3)} ${d.getDate()}`;
  }

  const presets = [
    { key: "this-week", label: "This Week" },
    { key: "last-week", label: "Last Week" },
    { key: "last-7", label: "Last 7 Days" },
    { key: "current-month", label: "Current Month" },
    { key: "next-month", label: "Next Month" },
    { key: "reset", label: "Reset" },
  ];

  return (
    <div style={{
      display: "inline-flex",
      // background: "#111827",
      borderRadius: 16,
      padding: "28px 24px",
      gap: 28,
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      color: "black",
      // boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
      width:'100%'
    }}>
      {/* Left: Presets */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, justifyContent: "flex-start", paddingTop: 90 }}>
        {presets.map(p => (
          <button
            key={p.key}
            onClick={() => applyPreset(p.key)}
            style={{
              border: "none",
              borderRadius: 20,
              padding: "8px 18px",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              textAlign: "left",
              whiteSpace: "nowrap",
              transition: "background 0.15s, color 0.15s",
              width:'max-content'
            }}
            className="bg-[#b6b6b662] hover:bg-[#374151] hover:text-white"
            
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Right: Calendars */}
      <div>
        {/* Header */}
        <div style={{ marginBottom: 4 }}>
          <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: 1, color: "black", textTransform: "uppercase", marginBottom: 2 }}>
            Select Date Range
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 20 }}>
            <span style={{color:'var(--color-gray-400)'}}>{startDate ? formatDate(startDate) : 'Start'}</span>
            <span style={{ color: "#60a5fa", margin: "0 8px" }}>–</span>
            <span style={{ color: "#111827" }}>{endDate ? formatDate(endDate) : 'End'}</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 32 }}>
          {/* Left Calendar */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <button onClick={goLeft} style={navBtnStyle}>&#8249;</button>
              <span style={{ fontSize: 15, fontWeight: 600 }}>{MONTHS[leftMonth]} {leftYear}</span>
              <div style={{ width: 28 }} />
            </div>
            <CalendarMonth
              year={leftYear} month={leftMonth}
              startDate={startDate} endDate={endDate}
              hoverDate={selecting ? hoverDate : null}
              onDayClick={handleDayClick}
              onDayHover={setHoverDate}
              today={today}
            />
          </div>

          {/* Divider */}
          <div style={{ width: 1, background: "#1f2937", alignSelf: "stretch" }} />

          {/* Right Calendar */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ width: 28 }} />
              <span style={{ fontSize: 15, fontWeight: 600 }}>{MONTHS[rightMonth]} {rightYear}</span>
              <button onClick={goRight} style={navBtnStyle}>&#8250;</button>
            </div>
            <CalendarMonth
              year={rightYear} month={rightMonth}
              startDate={startDate} endDate={endDate}
              hoverDate={selecting ? hoverDate : null}
              onDayClick={handleDayClick}
              onDayHover={setHoverDate}
              today={today}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const navBtnStyle = {
  background: "transparent",
  border: "none",
  color: "#9ca3af",
  fontSize: 22,
  cursor: "pointer",
  width: 28,
  height: 28,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  padding: 0,
  lineHeight: 1,
};
