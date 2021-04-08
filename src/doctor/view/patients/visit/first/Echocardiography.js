import React from "react";
import {StyleSheet, View} from "react-native";
import {HelperText, Text, TextInput, useTheme} from "react-native-paper";
import * as Layout from "./forms/Layout";
import {IntraSectionInvisibleDivider} from "./forms/Layout";
import {Formik} from "formik";
import * as Yup from "yup";
import * as Validators from "../../../../../root/view/form/Validators";
import {FirstVisit} from "../../../../domain/visit/FirstVisit";
import {firstVisitDao} from "../../../../data/dao/FirstVisitDao";
import {hasValue} from "../../../../../root/domain/util/Util";


export class Echocardiography extends React.Component {
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
                <Layout.ScreenTitle title={'Echocardiography'}/>
                <Layout.FormSection>
                    <ECForm {...this.props.route.params}/>
                </Layout.FormSection>
            </Layout.VisitScreen>
        )
    }
}

export class ECForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        }
        this.echocardiographyInfo = FirstVisit.createNew().echocardiography;
    }

    componentDidMount() {
        this.setState({loaded: false}, () => {
            this.echocardiographyInfo = firstVisitDao.getVisits(this.props.userId).echocardiography;
            this.setState({loaded: true});
        })
    }

    handleChange = (inputName, data, isValid) => {
        this.echocardiographyInfo[inputName] = data;
    }

    render() {
        return (
            <Formik
                initialValues={{
                    EF: this.echocardiographyInfo.EF,
                    LAVI: this.echocardiographyInfo.LAVI,
                    comment: this.echocardiographyInfo.comment,
                }}
                validationSchema={Yup.object({
                    EF: (this.props.readonly && Validators.NOTHING) ||  Validators.PERCENTAGE,
                    LAVI: (this.props.readonly && Validators.NOTHING) || Validators.USUAL_NUMBER,
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
                            <LabTestField
                                name={'EF'} unit={'%'}
                                value={values.EF}
                                onChangeText={handleChange('EF')}
                                disabled={this.props.readonly}
                                onBlur={(event) => {
                                    handleBlur('EF')(event);
                                    this.handleChange('EF', values.EF, true);
                                }}
                                error={errors.EF}
                            />
                            <LabTestField
                                name={'LAVI'} unit={'ml/m^2'}
                                value={values.LAVI}
                                onChangeText={handleChange('LAVI')}
                                disabled={this.props.readonly}
                                onBlur={(event) => {
                                    handleBlur('LAVI')(event);
                                    this.handleChange('LAVI', values.LAVI, true);
                                }}
                                error={errors.LAVI}
                            />
                            <DefaultTextInput
                                label={'Comments'}
                                multiline={true} numberOfLines={10}
                                value={values.comment}
                                disabled={this.props.readonly}
                                onChangeText={(event) => {
                                    handleChange('comment')(event);
                                    this.handleChange('comment', values.comment, true);
                                }}
                                onBlur={handleBlur('comment')}
                            />
                        </View>
                    );
                }}
            </Formik>
        )
    }
}
const LabTestField = ({name, unit, error, disabled, ...props}) => {
    return (
        <View style={{}}>
            <DefaultTextInput label={name} placeholder={unit} {...props} disabled={disabled} numeric/>
            <Layout.TextInputHelperText type="error" visible={hasValue(error)}>
                {error}
            </Layout.TextInputHelperText>
            <IntraSectionInvisibleDivider s/>
        </View>
    )
}

const DefaultTextInput = (props) => {
    const theme = useTheme();
    return (
        <View>
            <Layout.InputOutlineLabel title={props.label}/>
            <TextInput
                // label={props.label}
                value={props.value}
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
                disabled={props.disabled}
                onBlur={props.onBlur}
                autoCompleteType={'off'}
                keyboardType={props.numeric ? 'numeric' : 'default'}
                textContentType={props.textContentType}
                autoCorrect={false}
                style={{
                    backgroundColor: theme.colors.surface,
                    fontSize: 14,
                    paddingHorizontal: 0,
                    textAlign: 'left',
                    ...props.style
                }}
                multiline={props.multiline}
                numberOfLines={props.numberOfLines}
                dense={true}
            />
        </View>
    )
}