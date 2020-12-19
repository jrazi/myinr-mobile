import React from "react";
import {StyleSheet, View} from "react-native";
import {HelperText, Text, TextInput} from "react-native-paper";
import {ScreenLayout} from "../../../../../root/view/screen/Layout";
import {currentTheme} from "../../../../../../theme";
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
                <Layout.ScreenTitle title={'آزمایش کراتینین خون'}/>
                <Layout.FormSection>
                    <LabTestResultForm userId={this.props.route.params.userId}/>
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
            this.labTestResult = visitDao.getVisits(this.props.userId).testResult;
            this.initialValues = {};
            fields.forEach(field => {
                this.initialValues[field.name] = this.labTestResult[field.name];
                this.validationSchema[field.name] = field.validation;
            })
            this.setState({loaded: true});
        })
    }

    handleChange = async (inputName, data, isValid) => {
        console.log('hi there', inputName, data);
        this.labTestResult[inputName] = data;
    }

    render() {
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
const LabTestField = ({name, unit, error, ...props}) => {
    return (
        <View style={{width: '100%'}}>
            <DefaultTextInput {...props} label={name} placeholder={unit} />
            <HelperText
                style={{
                    width: '50%',
                    alignSelf: 'center',
                }}
                type="error" visible={hasValue(error)} >
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
            placeholder={props.placeholder}
            onChangeText={props.onChangeText}
            onBlur={props.onBlur}
            value={props.value}
            autoCompleteType={'off'}
            keyboardType={'numeric'}
            textContentType={props.textContentType}
            autoCorrect={false}
            style={{
                backgroundColor: currentTheme.colors.surface,
                fontSize: 14,
                width: '50%',
                // flex: 1,
                // paddingLeft: '50%',
                alignSelf: 'center',
                ...props.style
            }}
            // dense={true}
        />
    )
}

let fields = [
    {
        id: 0,
        name: 'Hb',
        unit: 'gr/dl',
        validation: Validators.USUAL_NUMBER,
    },
    {
        id: 1,
        name: 'Hct',
        unit: '%',
        validation: Validators.PERCENTAGE,
    },
    {
        id: 2,
        name: 'Plt',
        unit: 'Cu/mm',
        validation: Validators.USUAL_NUMBER,
    },
    {
        id: 3,
        name: 'Bun',
        unit: 'mg/dl',
        validation: Validators.USUAL_NUMBER,
    },
    {
        id: 4,
        name: 'Urea',
        unit: 'mg/dl',
        validation: Validators.USUAL_NUMBER,
    },
    {
        id: 5,
        name: 'Cr',
        unit: 'mg/dl',
        validation: Validators.USUAL_NUMBER,
    },
    {
        id: 6,
        name: 'Na',
        unit: '',
        validation: Validators.USUAL_NUMBER,
    },
    {
        id: 7,
        name: 'K',
        unit: 'mmol/L',
        validation: Validators.USUAL_NUMBER,
    },
    {
        id: 8,
        name: 'Alt',
        unit: 'IU/L',
        validation: Validators.USUAL_NUMBER,
    },
    {
        id: 9,
        name: 'Ast',
        unit: 'IU/L',
        validation: Validators.USUAL_NUMBER,
    },
]