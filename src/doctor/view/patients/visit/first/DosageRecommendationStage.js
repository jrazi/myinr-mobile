import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {Text} from "react-native-paper";
import {ScreenLayout} from "../../../../../root/view/screen/Layout";
import {currentTheme} from "../../../../../../theme";
import * as Layout from "./forms/Layout";
import {IntraSectionInvisibleDivider} from "./forms/Layout";
import {firstNonEmpty, getFormattedJalaliDate} from "../../../../../root/domain/util/Util";
import CircularPicker from "react-native-circular-picker";


export class DosageRecommendationStage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <Layout.VisitScreen>
                <Layout.ScreenTitle title={'برنامه دارویی'} description={'لطفا دوز مصرفی هفته آتی بیمار را مشخص کنید.'}/>
                <Layout.FormSection>
                    <WeeklyDosagePicker/>
                </Layout.FormSection>
            </Layout.VisitScreen>
        )
    }
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: currentTheme.colors.surface,
    }
})


const WeeklyDosagePicker = (props) => {
    let dosageElements = [];
    let now = Date.now();
    for (let i = 0; i < 7; i++) {
        const date = new Date(now);
        date.setDate(date.getDate() + i + 1);
        dosageElements.push(
            <DosageForDay
                date={date}
                key={'RecomDosage' + i}
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

    return (
        <Layout.FormSection>
            <DosageElemRow items={dosageElements.slice(0, 2)} key={`DosageElemRow${0}`}/>
            <DosageElemRow items={dosageElements.slice(2, 4)} key={`DosageElemRow${1}`}/>
            <DosageElemRow items={dosageElements.slice(4, 6)} key={`DosageElemRow${2}`}/>
            <DosageElemRow items={dosageElements.slice(6, 7)} key={`DosageElemRow${3}`}/>
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
                <Text style={{ textAlign: 'center', fontSize: 12, marginBottom: 8 }}>{`${(currentDose/2.5).toFixed(2)} mg`}</Text>
                <Text style={{ textAlign: 'center' , fontSize: 12}}>{getFormattedJalaliDate(props.date)}</Text>
            </>
        </CircularPicker>
    )
}
