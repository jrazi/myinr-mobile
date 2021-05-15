import React from "react";
import {Surface, Text, useTheme, withTheme} from "react-native-paper";
import {View} from "react-native";
import {
    ConditionalCollapsibleRender,
    InputTitle,
    IntraSectionInvisibleDivider,
    VisitScreen
} from "../../../../../doctor/view/patients/visit/first/forms/Layout";
import {
    ChipBox, DefaultDateInput,
    DefaultSwitchRow, DefaultTextInput
} from "../../../../../doctor/view/patients/visit/first/forms/ContextSpecificComponents";
import {PatientMessageContext} from "../MessageContext";
import {Formik} from "formik";
import * as Yup from "yup";
import * as Validators from "../../../../../root/view/form/Validators";
import * as Layout from "../../../../../doctor/view/patients/visit/first/forms/Layout";
import {hasValue} from "../../../../../root/domain/util/Util";
import {debugBorderRed} from "../../../../../root/view/styles/borders";

class InrReport extends React.Component {
    constructor(props) {
        super(props);
        this.user = {};
        this.state = {
            loaded: false,
            latestInrAtHome: false,
        }
        this.patientMessage = {};
    }

    static contextType = PatientMessageContext;

    componentDidMount = () => {
        this.patientMessage = this.context.patientMessage;
        this.setState({
            loaded: true,
            latestInrAtHome: this.patientMessage.inr.lastInrTest.hasUsedPortableDevice || false,
        });
    }

    toggleLatestInrAtHome = () => {
        this.patientMessage.inr.lastInrTest.hasUsedPortableDevice = !this.state.latestInrAtHome;
        this.setState({latestInrAtHome: !this.state.latestInrAtHome});
    }

    changeValue = (changeFunction) => {
        changeFunction();
    }

    render() {
        const DateInput = (props) => <DefaultDateInput {...props} disabled={false}/>

        return (
            <VisitScreen>
                <View>
                    <Layout.SectionTitle
                        title={'گزارش آی‌ان‌آر'}
                        description={'نتایج آخرین تست آی‌ان‌آر خود'}
                        titleStyle={{textAlign: 'left'}}
                        captionStyle={{textAlign: 'left'}}
                    />
                </View>
                <IntraSectionInvisibleDivider xs/>
                <Formik
                    initialValues={{
                        inrResult: !this.state.loaded ? "" : this.patientMessage.inr.lastInrTest.lastInrValue,
                        testLocation: !this.state.loaded ? "" : this.patientMessage.inr.lastInrTest.lastInrTestLabInfo,
                    }}
                    validationSchema={Yup.object({
                        inrResult:  Validators.INR,
                        testLocation: Validators.SHORT_TEXT,
                    })}
                    validateOnChange={false}
                    validateOnBlur={true}
                    key={this.state.loaded}
                    onSubmit={(values, { validate }) => {
                    }}
                >
                    {({ handleChange, handleBlur, values, touched, errors, validateField, isValid }) => {
                        return (
                            <Layout.FormSection>
                                <DefaultSwitchRow
                                    title={'تست خانگی'}
                                    description={'آیا تست را در خانه انجام دادید؟'}
                                    value={this.state.latestInrAtHome}
                                    onFlip={this.toggleLatestInrAtHome}
                                    disabled={false}
                                    rowStyle={{
                                        flexDirection: 'row',
                                    }}
                                    titleStyle={{
                                        textAlign: 'left',
                                    }}
                                />
                                <Layout.IntraSectionInvisibleDivider sm/>
                                <Layout.InputTitle
                                    title={'نتیجه تست'}
                                    titleStyle={{
                                        textAlign: 'left',
                                    }}
                                />
                                <DefaultTextInput
                                    placeholder={"مقدار آی‌ان‌آر"}
                                    value={values.inrResult}
                                    numeric
                                    onChangeText={handleChange('inrResult')}
                                    onBlur={(event) => {
                                        handleBlur('inrResult')(event);
                                        this.changeValue(() => {
                                            this.patientMessage.inr.lastInrTest.lastInrValue = values.inrResult
                                        });
                                    }}
                                    alignReverse={true}
                                />
                                <Layout.TextInputHelperText type="error" visible={hasValue(errors.inrResult)}>
                                    {errors.inrResult}
                                </Layout.TextInputHelperText>
                                <Layout.IntraSectionInvisibleDivider sm/>
                                <ConditionalCollapsibleRender hidden={this.state.latestInrAtHome}>
                                    <Layout.InputTitle
                                        title={'مکان تست'}
                                        titleStyle={{
                                            textAlign: 'left',
                                        }}
                                    />
                                    <DefaultTextInput
                                        placeholder={"آزمایشگاه محل تست"}
                                        value={values.testLocation}
                                        textContentType={'location'}
                                        onChangeText={handleChange('testLocation')}
                                        onBlur={(event) => {
                                            handleBlur('testLocation')(event);
                                            this.changeValue(() => {
                                                this.patientMessage.inr.lastInrTest.lastInrTestLabInfo = values.testLocation
                                            });
                                        }}
                                        alignReverse={true}
                                    />
                                    <Layout.TextInputHelperText type="error" visible={errors.testLocation}>
                                        {errors.testLocation}
                                    </Layout.TextInputHelperText>
                                    <Layout.IntraSectionInvisibleDivider sm/>
                                </ConditionalCollapsibleRender>
                                <Layout.InputTitle
                                    title={'تاریخ تست'}
                                    titleStyle={{
                                        textAlign: 'left',
                                    }}
                                />
                                <DateInput
                                    placeholder={"تاریخ انجام تست"}
                                    onDateChange={(date => {
                                        this.changeValue(() => {
                                            this.patientMessage.inr.lastInrTest.dateOfLastInrTest.jalali.asString = date
                                        });
                                    })}
                                    initialValue={!this.state.loaded ? null : this.patientMessage.inr.lastInrTest.dateOfLastInrTest.jalali.asString}
                                    alignReverse={true}
                                />
                                <Layout.IntraSectionInvisibleDivider sm/>
                            </Layout.FormSection>
                        )
                    }}
                </Formik>

            </VisitScreen>
        );
    }
}

export default withTheme(InrReport);
