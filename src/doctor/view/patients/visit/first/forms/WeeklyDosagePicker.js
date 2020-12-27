import React, {useEffect, useState} from "react";
import * as Layout from "./Layout";
import {IntraSectionInvisibleDivider} from "./Layout";
import {firstNonEmpty, getFormattedJalaliDate} from "../../../../../../root/domain/util/Util";
import CircularPicker from "react-native-circular-picker";
import {currentTheme} from "../../../../../../../theme";
import {Text} from "react-native-paper";
import {Animated, View} from 'react-native';
import {visitDao} from "../../../../../data/dao/VisitDao";

export const WeeklyDosagePicker = (props) => {
    let dosageElements = [];
    let now = new Date(Date.now());
    const increment = firstNonEmpty(props.increment, -1);
    for (let i = 0; i < 7; i++) {
        const date = new Date(firstNonEmpty(props.startingDate, now).getTime());
        date.setDate(date.getDate() + i*increment);
        dosageElements.push(
            <DosageForDay
                date={date}
                key={'DosageForDay' + i}
                onDoseUpdate={(dose) => {props.onDoseUpdate(i, dose)}}
                dose={0}
                initialDose={firstNonEmpty(props.initialData[i], 0)}
            />
        )
    }

    const DosageElemRow = (props) => {return ([
        <Layout.Row justifyBetween style={{}} key={'row0E'}>
            {props.items}
        </Layout.Row>,
        <IntraSectionInvisibleDivider s key={'row1E'}/>
    ])};

    const [fadeAnim] = useState(new Animated.Value(0));

    return (
        <Layout.FormSection>
            <View
            >
                <DosageElemRow items={dosageElements.slice(0, 2)} key={`DosageElemRow:0`}/>
                <DosageElemRow items={dosageElements.slice(2, 4)} key={`DosageElemRow:1`}/>
                <DosageElemRow items={dosageElements.slice(4, 6)} key={`DosageElemRow:2`}/>
                <DosageElemRow items={dosageElements.slice(6, 7)} key={`DosageElemRow:3`}/>
            </View>
        </Layout.FormSection>
    );
}

const DosageForDay = (props) => {
    let unit = 2.5;
    let steps = [];

    for (let u = 0; u <= 100 ; u += unit*2.5) {
        steps.push(u);
    }

    const [percentage, setPercentage] = useState(0);

    const handleChange = (v) => {
        setPercentage(v);
        props.onDoseUpdate(v/2.5);
    }

    useEffect(() => {
        setPercentage(firstNonEmpty(props.initialDose*2.5, 0));
    }, []);

    return (
        <CircularPicker
            size={140}
            strokeWidth={15}
            steps={steps}
            gradients={{
                0: [currentTheme.colors.primary, currentTheme.colors.primary],
                100: [currentTheme.colors.primary, currentTheme.colors.primary],
            }}
            perc={percentage}
            onChange={handleChange}
        >
            <>
                <Text style={{ textAlign: 'center', fontSize: 12, fontWeight: 'bold', marginBottom: 8 }}>{`${(percentage/2.5).toFixed(2)} mg`}</Text>
                <Text style={{ textAlign: 'center' , fontSize: 12}}>{getFormattedJalaliDate(props.date)}</Text>
            </>
        </CircularPicker>
    )
}

