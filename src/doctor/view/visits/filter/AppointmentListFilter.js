import React, {useRef, useState} from "react";
import {FilterTagBox} from "../../patients/FilterTagBox";


export const AppointmentListFilter = (props) => {
    const filterRows = [
        {
            radio: true,
            filters: [
                {
                    id: 0,
                    name: 'امروز',
                    value: false,
                },
                {
                    id: 1,
                    name: 'هفته جاری',
                    value: false,
                },
                {
                    id: 2,
                    name: 'ماه جاری',
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
            props.filterTodayAppointments();
        }
        if (id == 1) {
            props.filterThisWeekAppointments();
        }
        if (id == 2) {
            props.filterThisMonthAppointments();
        }
    }

    return (
        <FilterTagBox filters={filterRows} onChange={onChange} rowsVisibility={rowsVisibility}/>
    )
}

