import React from "react";
import {visitDao} from "../../../../data/dao/VisitDao";
import {Formik} from "formik";
import * as Yup from "yup";
import * as Validators from "../../../../../root/view/form/Validators";
import {View} from "react-native";
import * as Layout from "./forms/Layout";
import {IntraSectionInvisibleDivider} from "./forms/Layout";
import {DefaultDateInput, DefaultTextInput} from "./forms/ContextSpecificComponents";

export class ReportStage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        }
    }

    componentDidMount() {
        this.setState({loaded: false}, () => {
            this.firstVisit = visitDao.getVisits(this.props.route.params.userId);
            this.setState({loaded: true});
        })
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
                            reportComment: !this.state.loaded ? "" : this.firstVisit.reportComment,
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
                                                this.firstVisit.inr.nextInrCheckDate = date
                                            });
                                        })}
                                        initialValue={!this.state.loaded ? null : this.firstVisit.inr.nextInrCheckDate || null}
                                        disabled={this.props.readonly}
                                    />
                                    <IntraSectionInvisibleDivider s/>
                                    <DefaultDateInput
                                        label={"Next Visit Date"}
                                        placeholder={"Approximate Date of Next Visit"}
                                        onDateChange={(date => {
                                            this.handleInputChange(() => {
                                                this.firstVisit.visitDate.value = date
                                            });
                                        })}
                                        initialValue={!this.state.loaded ? null : this.firstVisit.visitDate.value || null}
                                        disabled={this.props.readonly}
                                    />
                                    <IntraSectionInvisibleDivider s/>
                                    <DefaultTextInput
                                        label={'Comment'}
                                        multiline={true} numberOfLines={10}
                                        value={values.reportComment}
                                        onChangeText={(event) => {
                                            handleChange('reportComment')(event);
                                            this.handleInputChange(() => {
                                                this.firstVisit.reportComment = values.reportComment
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
