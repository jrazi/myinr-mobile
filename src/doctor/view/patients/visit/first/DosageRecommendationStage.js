import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {Text} from "react-native-paper";
import {ScreenLayout} from "../../../../../root/view/screen/Layout";
import {currentTheme} from "../../../../../../theme";
import * as Layout from "./forms/Layout";
import {IntraSectionInvisibleDivider} from "./forms/Layout";
import {firstNonEmpty, getFormattedJalaliDate} from "../../../../../root/domain/util/Util";
import CircularPicker from "react-native-circular-picker";
import {WeeklyDosagePicker} from "./forms/WeeklyDosagePicker";
import {FirstVisit} from "../../../../domain/visit/Visit";
import {visitDao} from "../../../../data/dao/VisitDao";


export class DosageRecommendationStage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        }
        this.recommendedDosage = FirstVisit.createNew().recommendedDosage;
    }

    componentDidMount() {
        this.setState({loaded: false}, () => {
            this.recommendedDosage = visitDao.getVisits(this.props.route.params.userId).recommendedDosage;
            this.setState({loaded: true});
        })
    }

    onDosageUpdate = (index, dose) => {
        this.recommendedDosage[index] = dose;
    }

    render() {
        const startingDate = new Date(Date.now());
        startingDate.setDate(startingDate.getDate() + 1);
        return (
            <Layout.VisitScreen>
                <Layout.ScreenTitle title={'برنامه دارویی'} description={'لطفا دوز مصرفی هفته آتی بیمار را مشخص کنید.'}/>
                <Layout.FormSection>
                    <WeeklyDosagePicker
                        onDoseUpdate={this.onDosageUpdate}
                        initialData={this.recommendedDosage}
                        startingDate={startingDate}
                    />
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