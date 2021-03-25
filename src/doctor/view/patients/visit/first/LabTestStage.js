import React from "react";
import {StyleSheet, View} from "react-native";
import {HelperText, Text, TextInput, useTheme} from "react-native-paper";
import * as Layout from "./forms/Layout";
import {DefaultText} from "../../../../../root/view/basic/Text";
import {IntraSectionInvisibleDivider} from "./forms/Layout";
import {debugBorderRed} from "../../../../../root/view/styles/borders";
import {Formik} from "formik";
import * as Yup from "yup";
import * as Validators from "../../../../../root/view/form/Validators";
import {visitDao} from "../../../../data/dao/VisitDao";
import {FirstVisit} from "../../../../domain/visit/Visit";
import {firstNonEmpty, hasValue} from "../../../../../root/domain/util/Util";


export class LabTestStage extends React.Component {
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
                <Layout.ScreenTitle title={'Lab Test'}/>
                <Layout.FormSection>
                    <LabTestResultForm {...this.props.route.params}/>
                </Layout.FormSection>
            </Layout.VisitScreen>
        )
    }
}

class LabTestResultForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        }
        this.fieldNames = fields.map(field => field.name);
        this.initialValues = {};
        this.validationSchema = {};
        this.labTestResult = FirstVisit.createNew().testResult;
    }

    componentDidMount() {
        this.setState({loaded: false}, () => {
            const readonly = this.props.readonly;
            this.labTestResult = visitDao.getVisits(this.props.userId).testResult;
            this.initialValues = {};
            fields.forEach(field => {
                this.initialValues[field.name] = this.labTestResult[field.name];
                this.validationSchema[field.name] = readonly ? Validators.NOTHING : field.validation;
            })
            this.setState({loaded: true});
        })
    }

    handleChange = async (inputName, data, isValid) => {
        this.labTestResult[inputName] = data;
    }

    render() {
        const readonly = this.props.readonly;
        return (
            <View style={{flex: 1, flexGrow:1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'column'}}>
                <Formik
                    initialValues={this.initialValues}
                    validationSchema={Yup.object(this.validationSchema)}
                    validateOnChange={false}
                    validateOnBlur={true}
                    validateOnMount={true}
                    key={this.state.loaded}
                    onSubmit={(values, { validate }) => {
                    }}
                >
                    {({ handleChange, handleBlur, values, touched, errors, validateField, isValid }) => {
                        return fields
                            .map(field => {
                                // console.log(' hi there', this.validationSchema);
                                return (
                                    <LabTestField
                                        unit={field.unit}
                                        name={field.name}
                                        disabled={readonly}
                                        key={`LTRF_${field.id}`}
                                        value={values[field.name]}
                                        onChangeText={handleChange(field.name)}
                                        onBlur={(event) => {
                                            handleBlur(field.name)(event);
                                            this.handleChange(field.name, values[field.name], true);
                                        }}
                                        error={errors[field.name]}
                                    />
                                )
                            })
                    }}
                </Formik>
            </View>
        )
    }
}
const LabTestField = ({name, unit, error, disabled, ...props}) => {
    return (
        <View style={{width: '100%'}}>
            <DefaultTextInput {...props} label={name} placeholder={unit} disabled={disabled}/>
            <Layout.TextInputHelperText
                type="error" visible={hasValue(error)} >
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
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
                onBlur={props.onBlur}
                disabled={props.disabled}
                value={props.value}
                autoCompleteType={'off'}
                keyboardType={'numeric'}
                textContentType={props.textContentType}
                autoCorrect={false}
                style={{
                    backgroundColor: theme.colors.surface,
                    paddingHorizontal: 0,
                    // fontSize: 14,
                    // width: '50%',
                    // flex: 1,
                    // paddingLeft: '50%',
                    textAlign: 'left',
                    ...props.style
                }}
                dense={true}
            />
        </View>
    )
}

let fields = [
    {
        id: 'Hb',
        name: 'Hb',
        unit: 'gr/dl',
        validation: Validators.USUAL_NUMBER,
    },
    {
        id: 'Hct',
        name: 'Hct',
        unit: '%',
        validation: Validators.PERCENTAGE,
    },
    {
        id: 'Plt',
        name: 'Plt',
        unit: 'Cu/mm',
        validation: Validators.USUAL_NUMBER,
    },
    {
        id: 'Bun',
        name: 'Bun',
        unit: 'mg/dl',
        validation: Validators.USUAL_NUMBER,
    },
    {
        id: 'Urea',
        name: 'Urea',
        unit: 'mg/dl',
        validation: Validators.USUAL_NUMBER,
    },
    {
        id: 'Cr',
        name: 'Cr',
        unit: 'mg/dl',
        validation: Validators.USUAL_NUMBER,
    },
    {
        id: 'Na',
        name: 'Na',
        unit: 'Na',
        validation: Validators.USUAL_NUMBER,
    },
    {
        id: 'K',
        name: 'K',
        unit: 'mmol/L',
        validation: Validators.USUAL_NUMBER,
    },
    {
        id: 'Alt',
        name: 'Alt',
        unit: 'IU/L',
        validation: Validators.USUAL_NUMBER,
    },
    {
        id: 'Ast',
        name: 'Ast',
        unit: 'IU/L',
        validation: Validators.USUAL_NUMBER,
    },
]