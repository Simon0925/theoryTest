export default function currentDate () {
    let date = new Date
    let year = date.getFullYear()
    let month = date.toLocaleString('default', { month: 'short' });
    let day = date.getUTCDay()
    let currentDate = `${day} ${month} ${year}`;
    return currentDate
}