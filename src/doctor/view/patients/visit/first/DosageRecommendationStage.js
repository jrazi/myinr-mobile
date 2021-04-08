import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {Text} from "react-native-paper";
import {ScreenLayout} from "../../../../../root/view/screen/Layout";
import * as Layout from "./forms/Layout";
import {IntraSectionInvisibleDivider} from "./forms/Layout";
import {firstNonEmpty, getFormattedJalaliDate, hasValue} from "../../../../../root/domain/util/Util";
import CircularPicker from "react-native-circular-picker";
import {WeeklyDosagePicker} from "./forms/WeeklyDosagePicker";
import {FirstVisit} from "../../../../domain/visit/FirstVisit";
import {firstVisitDao} from "../../../../data/dao/FirstVisitDao";


export class DosageRecommendationStage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        }
        this.visitInfo = FirstVisit.createNew();
        this.recommendedDosage = this.visitInfo.recommendedDosage;
    }

    componentDidMount() {
        this.setState({loaded: false}, () => {
            this.visitInfo = firstVisitDao.getVisits(this.props.route.params.userId);
            if (hasValue(this.visitInfo.recommendedDosage))
                this.recommendedDosage = this.visitInfo.recommendedDosage;
            else {
                this.visitInfo.recommendedDosage = this.recommendedDosage;
            }
            this.setState({loaded: true});
        })
    }

    onDosageUpdate = (index, dose) => {
        this.recommendedDosage[index] = dose;
    }

    render() {
        const startingDate = this.visitInfo.finished ? new Date(this.visitInfo.finishDate) : new Date(Date.now());
        const readonly = this.props.route.params.readonly;
        startingDate.setDate(startingDate.getDate() + 1);
        return (
            <Layout.VisitScreen>
                <Layout.ScreenTitle
                    title={'Recommended Dosage'}
                    description={readonly ? null : 'Please specify Warfarin dosage for the next week.'}
                />
                <Layout.FormSection>
                    <WeeklyDosagePicker
                        onDoseUpdate={this.onDosageUpdate}
                        initialData={this.recommendedDosage}
                        dayOrder={['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday']}
                        dates={['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه']}
                        manualDate
                        startingDate={startingDate}
                        increment={1}
                        disabled={readonly}
                    />
                </Layout.FormSection>
            </Layout.VisitScreen>
        )
    }
}