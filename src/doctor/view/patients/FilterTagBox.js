import React, {useRef, useState} from "react";
import {Surface} from "react-native-paper";
import {ChipBox, RadioChipBox} from "./visit/first/forms/ContextSpecificComponents";
import {ConditionalCollapsibleRender, IntraSectionInvisibleDivider} from "./visit/first/forms/Layout";
import {firstNonEmpty, noop} from "../../../root/domain/util/Util";
import {ScrollView} from "react-native";
import {debugBorderBlue, debugBorderRed} from "../../../root/view/styles/borders";
import {getReasonsForWarfarin} from "../../../root/data/dao/StaticDomainNameTable";

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
            filters: Object.values(reasonsForWarfarin).map(item => {return {...item, value: false}})
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
        }
        else if (id == 'NOT_VISITED' && value == true) {
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

export class FilterTagBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const chipRows = [];
        this.props.filters.forEach((filterRow, index) => {
            chipRows.push(
                <ConditionalCollapsibleRender hidden={!this.props.rowsVisibility[index]} key={index}>
                    <ChipRow
                        items={filterRow.filters}
                        radio={filterRow.radio}
                        onChange={firstNonEmpty(this.props.onChange, noop)}
                        key={`ChipRowFilterTagBox${index}${this.props.rowsVisibility[index]}`}
                    />
                </ConditionalCollapsibleRender>
            )
        })
        return (
            <Surface style={{elevation: 0}}>
                {
                    chipRows
                }
                <IntraSectionInvisibleDivider s/>
            </Surface>
        )
    }
}

const ChipRow = (props) => {
    return (
        <ScrollView
            horizontal={true}
            style={{
                width: '100%',
            }}
            contentContainerStyle={{
                minWidth: '100%',
            }}
        >
            {
                props.radio ?
                    <RadioChipBox
                        items={props.items}
                        itemBoxStyle={{
                            flexDirection: 'row',
                        }}
                        onChange={props.onChange}
                    />
                :
                    <ChipBox
                        items={props.items}
                        itemBoxStyle={{
                            flexDirection: 'row',
                        }}
                        onChange={props.onChange}
                    />
            }
        </ScrollView>
    )
}

