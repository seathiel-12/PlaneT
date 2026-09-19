import toast from 'react-hot-toast';
export const useToasting = () => {
    const notify = (message: string, type: 'success' | 'error' | 'warning') => {
    switch (type) { 
        case 'success':
            toast.success(message, {position:'bottom-right', duration: 5000, style:{
                // background: '#333',
                color: '#333',
                fontSize: '16px',
                padding: '16px',
            }});
            break;
        case 'error':
            toast.error(message, {position: 'bottom-right', duration: 5000, style:{
                // background: '#333',
                color: '#333',
                fontSize: '16px',
                padding: '16px',
            }});
            break;
        case 'warning':
            toast(message, {position: 'bottom-right', icon:'⚠️', duration: 5000, style:{
                // background: '#333',
                color: '#333',
                fontSize: '16px',
                padding: '16px',
            }});
            break;
        }
    }
    const notifyCustom = toast.custom ;
    return {notify, notifyCustom}
}