import React from "react";
import {Surface} from "react-native-paper";
import {ChipBox, RadioChipBox} from "./visit/first/forms/ContextSpecificComponents";
import {ConditionalCollapsibleRender, IntraSectionInvisibleDivider} from "./visit/first/forms/Layout";
import {firstNonEmpty, noop} from "../../../root/domain/util/Util";
import {ScrollView} from "react-native";

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

