
export const months = ['January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October', 'November', 'December'
]
export const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
export const getDays = (params) => {
    const date = params.initial - params.firstDay;
    const day = params.initial % 7;
    let prevMonth = params.month - 1;
    let prevYear = params.year;
    if (prevMonth < 0) {
        prevMonth = 11;
        prevYear--;
    }
    const previousDays = getNumberOfDays(prevYear, prevMonth);
    const _date =
        (date < 0 ? previousDays + date : date % params.numberOfDays) + 1;
    const month = date < 0 ? -1 : date >= params.numberOfDays ? 1 : 0;
    const timestamp = new Date(params.year, params.month, _date).getTime();
    return {
        date: _date,
        day,
        month,
        timestamp,
        dayString: days[day]
    }
}

export const getNumberOfDays = (year, month) => {
    return 40 - new Date(year, month, 40).getDate()
}

export const getMonths = (year, month) => {
    const firstDay = new Date(year, month).getDay();
    const numberOfDays = getNumberOfDays(year, month);
    const monthArray = [];
    const rows = 6;
    let currentDay = null;
    let initial = 0;
    const cols = 7;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            currentDay = getDays({
                initial,
                numberOfDays,
                firstDay,
                year,
                month
            })
            monthArray.push(currentDay)
            initial++;
        }
    }
    return monthArray
}
