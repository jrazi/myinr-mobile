import React, {useEffect, useRef, useState} from "react";
import {StyleSheet, View, ScrollView} from "react-native";
import * as Layout from '../../first/forms/Layout';
import {
    IntraSectionInvisibleDivider
} from "../../first/forms/Layout";
import {ChipBox, DefaultTextInput, RadioChipBox} from "../../first/forms/ContextSpecificComponents";
import {
    getReasonsForVisit,
    getTreatmentRecommendationOptions
} from "../../../../../../root/data/dao/StaticDomainNameTable";
import ListUtil from "../../../../../../root/domain/util/ListUtil";
import {Formik} from "formik";
import * as Yup from "yup";
import * as Validators from "../../../../../../root/view/form/Validators";

export class TreatmentRecommendationStage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        }
        this.visitInfo = this.props.route.params.visitInfo;
        this.readonly = this.props.route.params.readonly;
        this.treatmentRecommendationOptions = [];
    }


    componentDidMount() {
        this.setState({loaded: false}, () => {
            this.treatmentRecommendationOptions = ListUtil.justifyItemListForDisplay(Object.values(getTreatmentRecommendationOptions()), item => item.name);
            this.treatmentRecommendationOptions.forEach(option => option.value = (this.visitInfo.recommendationForFuture || {}).id === option.id);

            this.setState({loaded: true});
        })
    }

    changeFormValue(changeFunction) {
        changeFunction();

    }

    changeTreatmentRecommendation = (id, value) => {
        const option = ListUtil.findOneById(this.treatmentRecommendationOptions, id);

        if (value) {
            this.visitInfo.recommendationForFuture = option;
        }
        else {
            this.visitInfo.recommendationForFuture = null;
        }
    }

    render() {
        return (
            <Layout.VisitScreen
            >
                <Layout.ScreenTitle title={'Recommendation'}/>
                <Layout.FormSection>
                    <Layout.InputArea>
                        <Layout.ItemsBox>
                            <RadioChipBox
                                items={this.treatmentRecommendationOptions}
                                onChange={this.changeTreatmentRecommendation}
                                disableAll={this.readonly}
                                key={`REC_OPTIONS_CHIPS_${this.state.loaded}`}
                            />
                        </Layout.ItemsBox>
                        <IntraSectionInvisibleDivider s/>
                        <Formik
                            initialValues={{
                                recommendedDaysWithoutWarfarin: !this.state.loaded ? "" : this.visitInfo.recommendedDaysWithoutWarfarin,
                            }}
                            validationSchema={Yup.object({
                                recommendedDaysWithoutWarfarin:  this.readonly ? Validators.NOTHING : Validators.USUAL_NUMBER,
                            })}
                            validateOnChange={false}
                            valisdateOnBlur={true}
                            key={this.state.loaded}
                            onSubmit={(values, { validate }) => {}}
                        >
                            {({ handleChange, handleBlur, values, touched, errors, validateField, isValid }) => (
                                <DefaultTextInput
                                    label={"Stop using warfarin for"}
                                    placeholder={"Number of days"}
                                    value={values.recommendedDaysWithoutWarfarin}
                                    onChangeText={(event) => {
                                        handleChange('recommendedDaysWithoutWarfarin')(event);
                                        this.changeFormValue(() => {
                                            this.visitInfo.recommendedDaysWithoutWarfarin = event;
                                        });
                                    }}
                                    onBlur={handleBlur('recommendedDaysWithoutWarfarin')}
                                    numeric
                                />
                            )}
                        </Formik>
                    </Layout.InputArea>
                </Layout.FormSection>
                <IntraSectionInvisibleDivider/>
            </Layout.VisitScreen>

        )
    }
}


const styles = StyleSheet.create({
})