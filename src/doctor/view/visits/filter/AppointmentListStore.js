import {hasValue} from "../../../../root/domain/util/Util";
import {isDateWithinThisMonth, isDateWithinThisWeek, isDateWithinToday} from "../../../../root/domain/util/DateUtil";

export const AppointmentFilterType = {
    'TODAY': 'TODAY',
    'WEEK': 'WEEK',
    'MONTH': 'MONTH',
    'ALL': 'ALL',
}
class AppointmentListStore {

    constructor(appointments) {
        this.appointments = appointments || [];
        this.todayAppointments = this.filterToday();
        this.thisWeekAppointments = this.filterThisWeek();
        this.thisMonthAppointments = this.filterThisMonth();
    }

    changeAppointments(appointments) {
        this.reset();
        this.appointments = appointments || [];
        this.todayAppointments = this.filterToday();
        this.thisWeekAppointments = this.filterThisWeek();
        this.thisMonthAppointments = this.filterThisMonth();
    }

    reset() {
        this.appointments = [];
        this.todayAppointments = null;
        this.thisWeekAppointments = null;
        this.thisMonthAppointments = null;
    }

    filterByType(type) {
        switch (type) {
            case AppointmentFilterType.TODAY:
                return this.filterToday();
            case AppointmentFilterType.WEEK:
                return this.filterThisWeek();
            case AppointmentFilterType.MONTH:
                return this.filterThisMonth();
            default:
                return this.filterAll();
        }
    }

    filterAll() {
        return this.appointments;
    }

     filterToday() {
        if (hasValue(this.todayAppointments))
            return this.todayAppointments;

        this.todayAppointments = this.appointments.filter(appointment => isDateWithinToday(appointment.scheduledVisitDate.timestamp));
        return this.todayAppointments;
     }

    filterThisWeek() {
        if (hasValue(this.thisWeekAppointments))
            return this.thisWeekAppointments;

        this.thisWeekAppointments = this.appointments.filter(appointment => isDateWithinThisWeek(appointment.scheduledVisitDate.timestamp));
        return this.thisWeekAppointments;
    }

    filterThisMonth() {
        if (hasValue(this.thisMonthAppointments))
            return this.thisMonthAppointments;

        this.thisMonthAppointments = this.appointments.filter(appointment => isDateWithinThisMonth(appointment.scheduledVisitDate.timestamp));
        return this.thisMonthAppointments;
    }


}

export const appointmentListStore = new AppointmentListStore([]);
