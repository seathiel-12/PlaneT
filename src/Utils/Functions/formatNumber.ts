/** Formats a numeric value with the application's display locale. */
export const formatNumber = (number: number)=>{
        return number < 10 ? `0${number}` : number;
}
