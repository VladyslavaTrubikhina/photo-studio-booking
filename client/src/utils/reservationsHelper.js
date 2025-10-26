export function filterReservations(reservations, compareFunction) {
    const now = new Date();
    return reservations.filter(r => {
        const [day, month, year] = r.date.split("-").map(Number);
        const [hours, minutes] = r.time.split(":").map(Number);
        const resEnd = new Date(year, month - 1, day, hours + r.duration_hours, minutes);
        return compareFunction(resEnd, now);
    });
}