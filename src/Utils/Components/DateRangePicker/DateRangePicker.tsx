import { useState, useMemo, type CSSProperties, useEffect} from "react";
import { useFlightSearchStore } from "../SearchBar/useFlightSearchStore";

export type DateValue = Date | null;


type PresetKey = "this-week" | "last-week" | "last-7" | "current-month" | "next-month" | "reset";

type CalendarMonthProps = {
  year: number;
  month: number;
  startDate: DateValue;
  endDate: DateValue;
  hoverDate: DateValue;
  onDayClick: (date: Date) => void;
  onDayHover: (date: DateValue) => void;
  today: Date;
};

const DAYS: string[] = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS: string[] = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function isSameDay(a: DateValue, b: DateValue): boolean {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function isInRange(date: DateValue, start: DateValue, end: DateValue): boolean {
  if (!start || !end || !date) return false;
  const [s, e] = start <= end ? [start, end] : [end, start];
  return date > s && date < e;
}

function startOfDay(date: Date | string): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function getCalendarDays(year: number, month: number): Array<Date | null> {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Array<Date | null> = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  return cells;
}

function CalendarMonth({ year, month, startDate, endDate, hoverDate, onDayClick, onDayHover, today }: CalendarMonthProps) {
  const cells = useMemo<Array<Date | null>>(() => getCalendarDays(year, month), [year, month]);

  return (
    <div className="date-range-calendar-month" style={{ minWidth: 280 }}>
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
          const inRange = isInRange(
            startOfDay(date),
            startDate ? startOfDay(startDate) : null,
            effectiveEnd ? startOfDay(effectiveEnd) : null
          );
          const isSelected = isStart || isEnd;

          let bg = "transparent";
          let color = "black";
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

          return (
            <div
              key={i}
              style={{ position: "relative", padding: "2px 0" }}
              onMouseEnter={() => onDayHover(date)}
              onMouseLeave={() => onDayHover(null)}
            >
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

export const DateRangePicker= () => {
  const today = startOfDay(new Date());
  const [viewYear, setViewYear] = useState<number>(today.getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(today.getMonth() > 0 ? today.getMonth() - 1 : 0);
  const {flightSearchInfos, setFlightSearchInfos} = useFlightSearchStore();
  const startDate = flightSearchInfos.dates?.startDate || null;
  const endDate = flightSearchInfos.dates?.endDate || null;


  const [internalStartDate, setInternalStartDate] = useState<DateValue>(startDate ?? null);
  const [internalEndDate, setInternalEndDate] = useState<DateValue>(endDate ?? null);
  const [hoverDate, setHoverDate] = useState<DateValue>(null);
  const [selecting, setSelecting] = useState<boolean>(false);
  const resolvedStartDate = startDate ?? internalStartDate;
  const resolvedEndDate = endDate ?? internalEndDate;

  const leftYear = viewYear;
  const leftMonth = viewMonth;
  const rightMonth = viewMonth === 11 ? 0 : viewMonth + 1;
  const rightYear = viewMonth === 11 ? viewYear + 1 : viewYear;

 

  const updateDate = (value: DateValue, kind: "start" | "end") => {
    if (kind === "start") {
      setFlightSearchInfos((prev) => ({
        ...prev,
        dates:{
          endDate: prev.dates?.endDate ?? null,
          startDate:value,
        }
      }));

      setInternalStartDate(value);
    } else {
      setFlightSearchInfos((prev) => ({
        ...prev,
        dates:{
          startDate: prev.dates?.startDate ?? null,
          endDate:value,
        }
      }));
      setInternalEndDate(value);
    }
  };

  function restart() {
    updateDate(null, "start");
    updateDate(null, "end");
    setSelecting(false);
    setHoverDate(null);
  }

  function handleDayClick(date: Date) {
    if (!selecting) {
      updateDate(startOfDay(date), "start");
      updateDate(null, "end");
      setSelecting(true);
    } else {
      const d = startOfDay(date);
      if (resolvedStartDate && d < resolvedStartDate) {
        updateDate(resolvedStartDate, "end");
        updateDate(d, "start");
      } else {
        updateDate(d, "end");
      }
      setSelecting(false);
    }
  }

  function goLeft() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y: number) => y - 1);
    } else {
      setViewMonth((m: number) => m - 1);
    }
  }

  function goRight() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y: number) => y + 1);
    } else {
      setViewMonth((m: number) => m + 1);
    }
  }

  function applyPreset(preset: PresetKey) {
    const now = startOfDay(new Date());
    const dow = now.getDay();
    switch (preset) {
      case "this-week": {
        const s = new Date(now);
        s.setDate(now.getDate() - dow);
        const e = new Date(s);
        e.setDate(s.getDate() + 6);
        updateDate(s, "start");
        updateDate(e, "end");
        break;
      }
      case "current-month": {
        const s = new Date(now.getFullYear(), now.getMonth(), 1);
        const e = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        updateDate(s, "start");
        updateDate(e, "end");
        break;
      }
      case "next-month": {
        const s = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        const e = new Date(now.getFullYear(), now.getMonth() + 2, 0);
        updateDate(s, "start");
        updateDate(e, "end");
        break;
      }
      case "reset":
        restart();
        break;
    }
    setSelecting(false);
  }

   useEffect(() => {
     if (!startDate) {
      restart();
    }
  }, [startDate]);

  function formatDate(d: DateValue) {
    if (!d) return "—";
    return `${MONTHS[d.getMonth()].slice(0, 3)} ${d.getDate()}`;
  }

  const presets: Array<{ key: PresetKey; label: string }> = [
    { key: "this-week", label: "This Week" },
    { key: "current-month", label: "Current Month" },
    { key: "next-month", label: "Next Month" },
    { key: "reset", label: "Reset" },
  ];

  return (
    <div className="date-range-picker" style={{
      display: "inline-flex",
      borderRadius: 16,
      padding: "28px 24px",
      gap: 28,
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      color: "black",
      width: '100%',
      boxSizing: "border-box"
    }}>
      <div className="date-range-presets" style={{ display: "flex", flexDirection: "column", gap: 8, justifyContent: "flex-start", paddingTop: 90 }}>
        {presets.map(p => (
          <button
            key={p.key}
            onClick={() => p.key === 'reset' ? restart() : applyPreset(p.key)}
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
              width: 'max-content'
            }}
            className="bg-[#b6b6b662] hover:bg-[#374151] hover:text-white"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="date-range-main">
        <div style={{ marginBottom: 4 }}>
          <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: 1, color: "black", textTransform: "uppercase", marginBottom: 2 }}>
            Select Date Range
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 20 }}>
            <span style={{ color: 'var(--color-gray-400)' }}>{resolvedStartDate ? formatDate(resolvedStartDate) : 'Start'}</span>
            <span style={{ color: "#60a5fa", margin: "0 8px" }}>–</span>
            <span style={{ color: "#111827" }}>{resolvedEndDate ? formatDate(resolvedEndDate) : 'End'}</span>
          </div>
        </div>

        <div className="date-range-months" style={{ display: "flex", gap: 32 }}>
          <div className="date-range-month date-range-month--left">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <button onClick={goLeft} style={navBtnStyle}>&#8249;</button>
              <span style={{ fontSize: 15, fontWeight: 600 }}>{MONTHS[leftMonth]} {leftYear}</span>
              <button className="date-range-mobile-next" onClick={goRight} style={navBtnStyle} aria-label="Next month">&#8250;</button>
            </div>
            <CalendarMonth
              year={leftYear} month={leftMonth}
              startDate={resolvedStartDate} endDate={resolvedEndDate}
              hoverDate={selecting ? hoverDate : null}
              onDayClick={handleDayClick}
              onDayHover={setHoverDate}
              today={today}
            />
          </div>

          <div className="date-range-divider" style={{ background: "var(--sb-gray-hover)", alignSelf: "stretch" }} />

          <div className="date-range-month date-range-month--right">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ width: 28 }} />
              <span style={{ fontSize: 15, fontWeight: 600 }}>{MONTHS[rightMonth]} {rightYear}</span>
              <button onClick={goRight} style={navBtnStyle}>&#8250;</button>
            </div>
            <CalendarMonth
              year={rightYear} month={rightMonth}
              startDate={resolvedStartDate} endDate={resolvedEndDate}
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
};

const navBtnStyle: CSSProperties = {
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

export default DateRangePicker;