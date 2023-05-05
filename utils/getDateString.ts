const getDateString = (matchDate: Date) => {
    return matchDate.getHours().toString().padStart(2, "0") + ":" + matchDate.getMinutes().toString().padStart(2, "0") + " " + matchDate.getDate().toString().padStart(2, "0") + "." + (matchDate.getMonth() + 1).toString().padStart(2, "0") + "." + matchDate.getFullYear()
}

export default getDateString
