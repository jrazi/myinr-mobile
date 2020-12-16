import React, {useState} from "react";
import * as Layout from "./Layout";
import {IntraSectionInvisibleDivider} from "./Layout";
import {firstNonEmpty, getFormattedJalaliDate} from "../../../../../../root/domain/util/Util";
import CircularPicker from "react-native-circular-picker";
import {currentTheme} from "../../../../../../../theme";
import {Text} from "react-native-paper";
import {Animated} from 'react-native';

export const WeeklyDosagePicker = (props) => {
    let dosageElements = [];
    let now = new Date(Date.now());
    for (let i = 0; i < 7; i++) {
        const date = new Date(firstNonEmpty(props.startingDate, now).getTime());
        date.setDate(date.getDate() - i);
        dosageElements.push(
            <DosageForDay
                date={date}
                key={'DosageForDay' + i}
                onChange={(dose) => {}}
                dose={0}
            />
        )
    }

    const DosageElemRow = (props) => {return ([
        <Layout.Row justifyBetween style={{}}>
            {props.items}
        </Layout.Row>,
        <IntraSectionInvisibleDivider s/>
    ])};

    const [fadeAnim] = useState(new Animated.Value(0));

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 250,
            useNativeDriver: false,
        }).start();
    }, []);

    return (
        <Layout.FormSection>
            <Animated.View
                style={{
                    opacity: fadeAnim,
                }}
            >
                <DosageElemRow items={dosageElements.slice(0, 2)} key={0}/>
                <DosageElemRow items={dosageElements.slice(2, 4)} key={1}/>
                <DosageElemRow items={dosageElements.slice(4, 6)} key={2}/>
                <DosageElemRow items={dosageElements.slice(6, 7)} key={3}/>
            </Animated.View>
        </Layout.FormSection>
    );
}

const DosageForDay = (props) => {
    let unit = 2.5;
    let steps = [];

    for (let u = 0; u <= 100 ; u += unit*2.5) {
        steps.push(u);
    }

    const [percentage, setPercentage] = useState(null);

    const handleChange = (v) => {
        setPercentage(v);
        // props.onChange(v);
    }

    const currentDose = firstNonEmpty(percentage, props.dose, 0)
    return (
        <CircularPicker
            size={140}
            strokeWidth={15}
            steps={steps}
            gradients={{
                0: [currentTheme.colors.primary, currentTheme.colors.primary],
                100: [currentTheme.colors.primary, currentTheme.colors.primary],
            }}
            perc={currentDose}
            onChange={handleChange}
        >
            <>
                <Text style={{ textAlign: 'center', fontSize: 12, fontWeight: 'bold', marginBottom: 8 }}>{`${(currentDose/2.5).toFixed(2)} mg`}</Text>
                <Text style={{ textAlign: 'center' , fontSize: 12}}>{getFormattedJalaliDate(props.date)}</Text>
            </>
        </CircularPicker>
    )
}

