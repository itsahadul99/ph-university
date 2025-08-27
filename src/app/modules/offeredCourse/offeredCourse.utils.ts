import { TSchedules } from "./offeredCourse.interface";

export const hasTimeConflict = (asignSchedules: TSchedules[], newSchedule: TSchedules) => {
    // Checking.....
    for (const schedule of asignSchedules) {
        const existingStartTime = new Date(`1971-01-01T${schedule?.startTime}`);
        const existingEndTime = new Date(`1971-01-01T${schedule?.endTime}`);
        const newStartTime = new Date(`1971-01-01T${newSchedule?.startTime}`);
        const newEndTime = new Date(`1971-01-01T${newSchedule?.startTime}`);
        if (newStartTime < existingStartTime && newEndTime > existingEndTime) {
            return true
        }
    }
    return false;
}