import {getReasonsForWarfarin} from "../../../root/data/dao/StaticDomainNameTable";
import React, {useRef, useState} from "react";
import {FilterTagBox} from "./FilterTagBox";

const reasonsForWarfarin = getReasonsForWarfarin();
export const PatientsListFilterBox = (props) => {
    const filterRows = [
        {
            radio: true,
            filters: [
                {
                    id: 'NOT_VISITED',
                    name: 'بیماران جدید',
                    value: false,
                },
                {
                    id: 'VISITED',
                    name: 'بیماران ویزیت‌شده',
                    value: false,
                },
            ],
        },
        {
            radio: false,
            filters: Object.values(reasonsForWarfarin).map(item => {
                return {...item, value: false}
            })
        }
    ];

    const [rowsVisibility, setRowsVisibility] = useState([true, false]);


    const searchCriteria = useRef({
        VISITED: false,
        NOT_VISITED: false,
        ...Object.values(reasonsForWarfarin)
            .reduce((acc, current) => {
                acc[current.id] = false;
                return acc;
            }, {})
    });

    const onChange = (id, value) => {
        searchCriteria.current[id] = value;
        if (id == 'VISITED' && value == true) {
            searchCriteria.current.VISITED = true;
            searchCriteria.current.NOT_VISITED = false;
        } else if (id == 'NOT_VISITED' && value == true) {
            Object.keys(searchCriteria.current)
                .forEach(key => searchCriteria.current[key] = false)
            searchCriteria.current.NOT_VISITED = true;
        }
        setRowsVisibility([true, searchCriteria.current.VISITED])

        props.onNewQuery(searchCriteria.current);
    }

    return (
        <FilterTagBox filters={filterRows} onChange={onChange} rowsVisibility={rowsVisibility}/>
    )
}