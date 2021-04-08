import React from "react";
import {Formik} from "formik";
import * as Yup from "yup";
import * as Validators from "../../../../../../root/view/form/Validators";
import {View} from "react-native";
import * as Layout from "../../first/forms/Layout";
import {IntraSectionInvisibleDivider} from "../../first/forms/Layout";
import {DefaultDateInput, DefaultTextInput} from "../../first/forms/ContextSpecificComponents";

export class ConclusionStage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: true,
        }
        this.visitInfo = this.props.route.params.visitInfo;
    }

    componentDidMount() {
    }

    handleInputChange = (changeFunction) => {
        changeFunction();
    }


    render() {
        return (
            <Layout.VisitScreen>
                <Layout.ScreenTitle title={'Conclusion'}/>
                <Layout.FormSection>
                    <Formik
                        initialValues={{
                            reportComment: !this.state.loaded ? "" : this.visitInfo.reportComment,
                        }}
                        validationSchema={Yup.object({
                            reportComment: (this.props.readonly && Validators.NOTHING) || Validators.NOTHING,
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
                                        placeholder={""}
                                        onDateChange={(date => {
                                            this.handleInputChange(() => {
                                                this.visitInfo.inr.nextInrCheckDate.jalali.asString = date
                                            });
                                        })}
                                        initialValue={!this.state.loaded ? null : this.visitInfo.inr.nextInrCheckDate.jalali.asString || null}
                                        disabled={this.props.readonly}
                                    />
                                    <IntraSectionInvisibleDivider s/>
                                    <DefaultDateInput
                                        label={"Next Visit Date"}
                                        placeholder={"Approximate Date of Next Visit"}
                                        onDateChange={(date => {
                                            this.handleInputChange(() => {
                                                this.visitInfo.nextVisitDate = date
                                            });
                                        })}
                                        initialValue={!this.state.loaded ? null : this.visitInfo.nextVisitDate || null}
                                        disabled={this.props.readonly}
                                    />
                                    <IntraSectionInvisibleDivider s/>
                                    <DefaultTextInput
                                        label={'Comment'}
                                        multiline={true} numberOfLines={6}
                                        value={values.reportComment}
                                        onChangeText={(event) => {
                                            handleChange('reportComment')(event);
                                            this.handleInputChange(() => {
                                                this.visitInfo.reportComment = event;
                                            });
                                        }}
                                        onBlur={handleBlur('reportComment')}
                                        disabled={this.props.readonly}
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
