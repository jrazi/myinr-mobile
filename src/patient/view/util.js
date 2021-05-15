import {getPersianDayOfWeek} from "../../root/domain/util/DateUtil";
let moment = require('moment');
require('moment-precise-range-plugin');
require('moment-timezone');


export function assignDatesToDosageRecords(records) {

    if (!records)
        return null;

    const now = Date.now();

    const todayDayOfWeek = getPersianDayOfWeek(now);

    const indexOfMatchingDayOfWeek = records.findIndex(record => todayDayOfWeek.no == getPersianDayOfWeek(record.dosageDate.timestamp).no);

    if (indexOfMatchingDayOfWeek < 0) return records;

    let recordsStartingFromToday = [];

    let currentDosageDate = moment(now);

    for (let i = indexOfMatchingDayOfWeek; i < indexOfMatchingDayOfWeek + records.length; i++) {
        const index = i % (records.length);
        const record = records[index];

        const _date = currentDosageDate.toDate();

        record.dosageDate.timestamp = _date.getTime();
        record.dosageDate.iso = _date.toISOString();

        currentDosageDate.add(1, 'd');

        recordsStartingFromToday.push(record)
    }

    return recordsStartingFromToday;
}