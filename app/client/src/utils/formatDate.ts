export const formatDate = (date: string) => {
    const newDate = new Date(date)

    const getOrdinal = (day: number) => {
        if (day > 3 && day < 21) return 'th'

            switch (day % 10) {
            case 1:
                return 'st'
            case 2:
                return 'nd'
            case 3:
                return 'rd'
            default:
                return 'th'
            }
        }

        const day = newDate.getDate()

        const formattedDate = `${newDate.toLocaleDateString('en-US', {
            weekday: 'long'
        })} ${day}${getOrdinal(day)} of ${newDate.toLocaleDateString('en-US', {
            month: 'long'
        })}`

    const formattedTime = newDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    })

    return `${formattedDate} at ${formattedTime}`
}