import React, {useState} from "react";
import {FilterTagBox} from "../../../doctor/view/patients/FilterTagBox";


export const AppointmentListFilter = (props) => {
    const filterRows = [
        {
            radio: true,
            filters: [
                {
                    id: 0,
                    name: 'همه',
                    value: true,
                },
                {
                    id: 1,
                    name: 'آینده',
                    value: false,
                },
                {
                    id: 2,
                    name: 'انجام‌شده',
                    value: false,
                },
            ],
        },
    ];

    const [rowsVisibility, setRowsVisibility] = useState([true]);



    const onChange = (id, value) => {
        if (value === false) {
            props.filterAllAppointments();
            return;
        }

        if (id == 0) {
            props.filterAllAppointments();
        }
        if (id == 1) {
            props.filterFutureAppointments();
        }
        if (id == 2) {
            props.filterAttendedAppointments();
        }
    }

    return (
        <FilterTagBox filters={filterRows} onChange={onChange} rowsVisibility={rowsVisibility}/>
    )
}

