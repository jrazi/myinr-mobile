import React, {useState} from "react";
import * as Layout from "../../first/forms/Layout";
import {IntraSectionInvisibleDivider} from "../../first/forms/Layout";
import {firstNonEmpty, getFormattedJalaliDate, hasValue} from "../../../../../../root/domain/util/Util";
import {WeeklyDosagePicker} from "../../first/forms/WeeklyDosagePicker";
import {FollowupVisit} from "../../../../../domain/visit/FollowupVisit";


export class PrescriptionStage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        }
        this.visitInfo = this.props.route.params.visitInfo;
        this.visitInfo.recommendedDosage = this.visitInfo.recommendedDosage || FollowupVisit.createRecommendedDosageForNextWeek();
        this.recommendedDosage = this.visitInfo.recommendedDosage;
    }

    componentDidMount() {
    }

    onDosageUpdate = (index, dose) => {
        this.recommendedDosage[index].dosagePH = dose;
    }

    render() {
        const startingDate = new Date(this.recommendedDosage[0].dosageDate.timestamp);
        const readonly = this.props.route.params.readonly;
        const dosageData = this.recommendedDosage.map(dosageInfo => dosageInfo.dosagePH);

        return (
            <Layout.VisitScreen>
                <Layout.ScreenTitle
                    title={'Recommended Dosage'}
                    description={readonly ? null : 'Please specify Warfarin dosage for the next week.'}
                />
                <Layout.FormSection>
                    <WeeklyDosagePicker
                        onDoseUpdate={this.onDosageUpdate}
                        initialData={dosageData}
                        startingDate={startingDate}
                        increment={1}
                        disabled={readonly}
                    />
                </Layout.FormSection>
            </Layout.VisitScreen>
        )
    }
}