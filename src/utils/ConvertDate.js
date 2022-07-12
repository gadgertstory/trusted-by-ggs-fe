export const convertISOtoGMT = (dateISO) => {
    const isoStr = new Date(dateISO).toISOString();
    const date = new Date(isoStr);
    const timestampWithOffset = date.getTime();
    const offset = date.getTimezoneOffset() * 60 * 1000;
    const timestampWithoutOffset = timestampWithOffset - offset;
    const dateWithoutOffset = new Date(timestampWithoutOffset);

    return dateWithoutOffset
}
