import React from "react";
import {Surface, Text, useTheme, withTheme} from "react-native-paper";
import {View} from "react-native";
import {IntraSectionInvisibleDivider, VisitScreen} from "../../../../../doctor/view/patients/visit/first/forms/Layout";
import {SectionDescriptionText} from "../common/MessageStageLayout";
import {
    ChipBox,
    DefaultDateInput, DefaultTextInput
} from "../../../../../doctor/view/patients/visit/first/forms/ContextSpecificComponents";
import {Formik} from "formik";
import * as Yup from "yup";
import * as Validators from "../../../../../root/view/form/Validators";
import {PatientMessageContext} from "../MessageContext";

class MessageText extends React.Component {
    constructor(props) {
        super(props);
        this.user = {};
        this.state = {
            loaded: false,
        }
        this.patientMessage = {};
    }

    static contextType = PatientMessageContext;

    componentDidMount = () => {
        this.patientMessage = this.context.patientMessage;
        this.setState({loaded: true});
    }

    handleCommentTextChange = (commentText) => {
        this.patientMessage.patientComment = commentText;
    }


    render() {

        return (
            <VisitScreen>
                <View>
                    <SectionDescriptionText>{'متن پیام خود را وارد نمایید.'}</SectionDescriptionText>
                </View>
                <IntraSectionInvisibleDivider xs/>
                <Formik
                    initialValues={{
                        patientComment: !this.state.loaded ? "" : (this.patientMessage.patientComment || ""),
                    }}
                    validationSchema={Yup.object({
                        patientComment: Validators.NOTHING,
                    })}
                    validateOnChange={false}
                    validateOnBlur={true}
                    validateOnMount={true}
                    onSubmit={(values, { validate }) => {
                    }}
                    key={'form_' + this.state.loaded}
                >
                    {({ handleChange, handleBlur, values, touched, errors, validateField, isValid }) => {
                        return (
                            <View>
                                <DefaultTextInput
                                    // label={'Comment'}
                                    placeholder={'متن پیام به پزشک'}
                                    multiline={true} numberOfLines={8}
                                    value={values.patientComment}
                                    onChangeText={(event) => {
                                        handleChange('patientComment')(event);
                                        this.handleCommentTextChange(event);
                                    }}
                                    onBlur={handleBlur('patientComment')}
                                    disabled={false}
                                    alignReverse={true}
                                />
                            </View>
                        );
                    }}
                </Formik>

            </VisitScreen>
        );
    }
}

export default withTheme(MessageText);
