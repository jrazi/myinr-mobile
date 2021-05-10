import {hasValue} from "../../../root/domain/util/Util";

export const AppointmentFilterType = {
    'DONE': 'DONE',
    'FUTURE': 'FUTURE',
    'MONTH': 'MONTH',
    'ALL': 'ALL',
}
class AppointmentListStore {

    constructor(appointments) {
        this.appointments = appointments || [];
        this.doneAppointments = this.filterDone();
        this.futureAppointments = this.filterFuture();
    }

    changeAppointments(appointments) {
        this.reset();
        this.appointments = appointments || [];
        this.doneAppointments = this.filterDone();
        this.futureAppointments = this.filterFuture();
    }

    reset() {
        this.appointments = [];
        this.doneAppointments = null;
        this.futureAppointments = null;
    }

    filterByType(type) {
        switch (type) {
            case AppointmentFilterType.DONE:
                return this.filterDone();
            case AppointmentFilterType.FUTURE:
                return this.filterFuture();
            default:
                return this.filterAll();
        }
    }

    filterAll() {
        return this.appointments;
    }

    filterDone() {
        if (hasValue(this.doneAppointments))
            return this.doneAppointments;

        this.doneAppointments = this.appointments.filter(appointment => appointment.hasVisitHappened);
        return this.doneAppointments;
    }

    filterFuture() {
        if (hasValue(this.futureAppointments))
            return this.futureAppointments;

        this.futureAppointments = this.appointments.filter(appointment => !appointment.hasVisitHappened && !appointment.expired);
        return this.futureAppointments;
    }

}

export const appointmentListStore = new AppointmentListStore([]);
