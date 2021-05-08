import React, {useState} from "react";
import {FilterTagBox} from "../../../doctor/view/patients/FilterTagBox";


export const MessageListFilter = (props) => {
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
                    name: 'پیام‌های من',
                    value: false,
                },
                {
                    id: 2,
                    name: 'پیام‌های پزشک',
                    value: false,
                },
            ],
        },
    ];

    const [rowsVisibility, setRowsVisibility] = useState([true]);



    const onChange = (id, value) => {
        if (value === false) {
            props.filterAllMessages();
            return;
        }
        else if (id == 0) {
            props.filterAllMessages();
        }
        else if (id == 1) {
            props.filterMyMessages();
        }
        else if (id == 2) {
            props.filterPhysicianMessages();
        }
    }

    return (
        <FilterTagBox filters={filterRows} onChange={onChange} rowsVisibility={rowsVisibility}/>
    )
}
