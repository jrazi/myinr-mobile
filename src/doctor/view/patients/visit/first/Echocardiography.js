import React from "react";
import {StyleSheet, View} from "react-native";
import {HelperText, Text, TextInput} from "react-native-paper";
import {ScreenLayout} from "../../../../../root/view/screen/Layout";
import {currentTheme} from "../../../../../../theme";
import * as Layout from "./forms/Layout";
import {IntraSectionInvisibleDivider} from "./forms/Layout";
import {Formik} from "formik";
import * as Yup from "yup";
import * as Validators from "../../../../../root/view/form/Validators";
import {FirstVisit} from "../../../../domain/visit/Visit";
import {visitDao} from "../../../../data/dao/VisitDao";
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
                <Layout.ScreenTitle title={'اکوکاردیوگرافی'}/>
                <Layout.FormSection>
                    <ECForm userId={this.props.route.params.userId}/>
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
            this.echocardiographyInfo = visitDao.getVisits(this.props.userId).echocardiography;
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
                    EF: Validators.PERCENTAGE,
                    LAVI: Validators.USUAL_NUMBER,
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
                                onBlur={(event) => {
                                    handleBlur('LAVI')(event);
                                    this.handleChange('LAVI', values.LAVI, true);
                                }}
                                error={errors.LAVI}
                            />
                            <DefaultTextInput
                                label={'توضیحات'}
                                multiline={true} numberOfLines={10}
                                value={values.comment}
                                onChangeText={handleChange('comment')}
                                onBlur={(event) => {
                                    handleBlur('comment')(event);
                                    this.handleChange('comment', values.comment, true);
                                }}
                            />
                        </View>
                    );
                }}
            </Formik>
        )
    }
}
const LabTestField = ({name, unit, error, ...props}) => {
    return (
        <View style={{}}>
            <DefaultTextInput label={name} placeholder={unit} {...props} numeric/>
            <HelperText type="error" visible={hasValue(error)}>
                {error}
            </HelperText>
            <IntraSectionInvisibleDivider s/>
        </View>
    )
}

const DefaultTextInput = (props) => {
    return (
        <TextInput
            label={props.label}
            value={props.value}
            placeholder={props.placeholder}
            onChangeText={props.onChangeText}
            onBlur={props.onBlur}
            autoCompleteType={'off'}
            keyboardType={props.numeric ? 'numeric' : 'default'}
            textContentType={props.textContentType}
            autoCorrect={false}
            style={{
                backgroundColor: currentTheme.colors.surface,
                fontSize: 14,
                // width: '50%',
                // flex: 1,
                // paddingLeft: '50%',
                paddingHorizontal: 0,
                // alignSelf: 'center',
                ...props.style
            }}
            multiline={props.multiline}
            numberOfLines={props.numberOfLines}
            // dense={true}
        />
    )
}