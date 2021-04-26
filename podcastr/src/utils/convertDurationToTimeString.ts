export function convertDurationToTimeString(duration: number){
    const hours = Math.floor(duration /3600)
    const minutes = Math.floor((duration /3600) /60)
    const seconds = duration % 60;

    console.log(hours)
    console.log(minutes)
    console.log(seconds)
    const timeString = [ hours, minutes, seconds]
    .map( unit => String(unit).padStart(2, '0') )
    .join(':')

    console.log(timeString)
    return timeString;
    
}