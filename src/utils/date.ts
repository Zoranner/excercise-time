/**
 * @returns 当天00:00点的时间戳
 */
export const thatDayStart = () => new Date().setHours(0, 0, 0, 0).valueOf()

/**
 * @returns 获取当天23:59:59时间戳
 */
export const thatDayEnd = () => new Date().setHours(23, 59, 59, 999).valueOf()
