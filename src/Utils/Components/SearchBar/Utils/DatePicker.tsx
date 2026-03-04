import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

interface DatePickerProps {
  label: string;
  onchange: (date: any) => void;
  minDate: any;
}

export default function DatePicker({ label, onchange, minDate }: DatePickerProps) {
  return (
    <div className='w-1/2'>
        <div className=' rounded-2xl p-2 text-center border text-white font-bold border-gray-300 bg-linear-to-r to-(--sb-blue-100) from-(--sb-blue-50)'>{label}</div>  

        <LocalizationProvider
            dateAdapter={AdapterDayjs}
            localeText={{
                calendarWeekNumberHeaderText: '#',
                calendarWeekNumberText: (weekNumber) => `${weekNumber}w`,
            }}
            adapterLocale=''
            >
            <DateCalendar className='scale-x-105' onChange={onchange} displayWeekNumber minDate={minDate} /> {/* Set minDate to today */}
        </LocalizationProvider>
    </div>
  );
}