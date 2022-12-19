// Hjælpe funktion til fødselsdag
// Formaterer en dags- eller månedsværdi som en to-cifret string
const formatDayOrMonth = (num) => {
    return num < 10 ? "0" + num : num
}

export {formatDayOrMonth}