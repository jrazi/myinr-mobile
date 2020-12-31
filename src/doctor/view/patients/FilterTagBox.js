import React from "react";
import {Surface} from "react-native-paper";
import {ChipBox} from "./visit/first/forms/ContextSpecificComponents";
import {View} from 'react-native';
import {IntraSectionInvisibleDivider} from "./visit/first/forms/Layout";
import {firstNonEmpty, noop} from "../../../root/domain/util/Util";

export const PatientsListFilterBox = (props) => {
    const filters = [
        [
            {
                id: 'VISITED',
                name: 'ویزیت شده',
                value: 'false',
            },
            {
                id: 'NOT_VISITED',
                name: 'ویزیت نشده',
                value: 'false',
            },
        ],
        [
            {
                id: 'MVR',
                name: 'MVR',
                value: 'false',
            },
            {
                id: 'AVR',
                name: 'AVR',
                value: 'false',
            },
            {
                id: 'VALVULAR_AF',
                name: 'Valvular AF',
                value: 'false',
            },
        ]
    ];
    return (
        <FilterTagBox filters={filters} onChange={props.onChange}/>
    )
}

export class FilterTagBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const chipRows = [];
        for (const filterRow of this.props.filters) {
            chipRows.push(
                <ChipRow items={filterRow} onChange={firstNonEmpty(this.props.onChange, noop)}/>
            )
        }
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
    return <ChipBox
        items={props.items}
        itemBoxStyle={{
            flexDirection: 'row',
        }}
        onChange={props.onChange}
    />
}

