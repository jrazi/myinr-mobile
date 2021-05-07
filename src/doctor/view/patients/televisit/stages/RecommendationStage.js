import React from "react";

import * as Layout from "../../visit/first/forms/Layout";
import {Formik} from "formik";
import * as Yup from "yup";
import * as Validators from "../../../../../root/view/form/Validators";
import {View} from "react-native";
import {DefaultDateInput, DefaultTextInput} from "../../visit/first/forms/ContextSpecificComponents";
import {IntraSectionInvisibleDivider} from "../../visit/first/forms/Layout";

export class RecommendationStage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: true,
        }
        this.patientMedicalInfo = this.props.route.params.patientMedicalInfo;
        this.patientInfo = this.props.route.params.patientInfo;
        this.physicianMessage = this.props.route.params.physicianMessage;
    }

    componentDidMount() {
    }

    handleInputChange = (changeFunction) => {
        changeFunction();
    }


    render() {
        return (
            <Layout.VisitScreen>
                <Layout.ScreenTitle title={'Recommendations'}/>
                <Layout.FormSection>
                    <Formik
                        initialValues={{
                            physicianComment: !this.state.loaded ? "" : this.physicianMessage.physicianComment,
                        }}
                        validationSchema={Yup.object({
                            physicianComment: Validators.NOTHING,
                        })}
                        validateOnChange={false}
                        validateOnBlur={true}
                        validateOnMount={true}
                        key={this.state.loaded}
                        onSubmit={(values, { validate }) => {
                        }}
                    >
                        {({ handleChange, handleBlur, values, touched, errors, validateField, isValid }) => {
                            return (
                                <View>
                                    <DefaultDateInput
                                        label={"Next INR Check Date"}
                                        placeholder={"Recommended Date for Next INR Test"}
                                        onDateChange={(date => {
                                            this.handleInputChange(() => {
                                                this.physicianMessage.nextInrCheckDate.jalali.asString = date
                                            });
                                        })}
                                        initialValue={!this.state.loaded ? null : this.physicianMessage.nextInrCheckDate.jalali.asString || null}
                                        disabled={false}
                                    />
                                    <IntraSectionInvisibleDivider s/>
                                    <DefaultDateInput
                                        label={"Next Visit Date"}
                                        placeholder={"Approximate Date of Next Visit"}
                                        onDateChange={(date => {
                                            this.handleInputChange(() => {
                                                this.physicianMessage.nextVisitDate = date
                                            });
                                        })}
                                        initialValue={!this.state.loaded ? null : this.physicianMessage.nextVisitDate || null}
                                        disabled={false}
                                    />
                                    <IntraSectionInvisibleDivider s/>
                                    <DefaultTextInput
                                        label={'Comment'}
                                        placeholder={"متن این پیام مستقیما به بیمار ارسال خواهد شد."}
                                        multiline={true} numberOfLines={6}
                                        alignReverse
                                        value={values.physicianComment}
                                        onChangeText={(event) => {
                                            handleChange('physicianComment')(event);
                                            this.handleInputChange(() => {
                                                this.physicianMessage.physicianComment = event;
                                            });
                                        }}
                                        onBlur={handleBlur('physicianComment')}
                                        disabled={false}
                                    />
                                </View>
                            );
                        }}
                    </Formik>
                </Layout.FormSection>
            </Layout.VisitScreen>
        )
    }
}
