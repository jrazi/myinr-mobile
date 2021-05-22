import {ScreenHeader, ScreenLayout} from "../../../root/view/screen/Layout";
import {
    Menu,
    Button,
    FAB,
    HelperText, Modal,
    Portal,
    Snackbar, Subheading,
    Surface,
    TextInput,
    Title,
    useTheme,
    withTheme, List,
    RadioButton, Text, TouchableRipple
} from "react-native-paper";
import React, {useState, useEffect} from "react";
import {StyleSheet, View} from "react-native";
import {Formik} from "formik";
import * as Yup from "yup";
import * as Validators from "../../../root/view/form/Validators";
import * as Layout from "../../../doctor/view/patients/visit/first/forms/Layout";
import {Spacing} from "../../../root/view/styles";
import SegmentedControl from "@react-native-community/segmented-control";
import {
    ConditionalRender,
    IntraSectionInvisibleDivider,
    Row
} from "../../../doctor/view/patients/visit/first/forms/Layout";
import {DefaultDateInput} from "../../../doctor/view/patients/visit/first/forms/ContextSpecificComponents";
import {noop} from "../../../root/domain/util/Util";
import {REQUIRED_DEFAULT_MESSAGE_FA} from "../../../root/view/form/Validators";
import {secretaryPatientsDao} from "../../data/SecretaryPatientsDao";
import {getLastNameAndTitle} from "../../domain/PhysicianUtil";


class PatientUpsertScreen extends React.Component {
    constructor(props) {
        super(props);
        this.user = {};
        this.state = {
            loaded: true,
            isSubmittingForm: false,
            physiciansList: [],
        }
    }

    componentDidMount = async () => {
        const physicians = await secretaryPatientsDao.getPhysiciansList();
        this.setState({physiciansList: physicians});
    }

    submitForm = (data) => {

    }

    render() {
        const theme = this.props.theme;
        const patientInfo = this.props.route.params.patientInfo || {};
        return (
            <ScreenLayout>
                <ControlHeader
                    isForEditingPatient={this.props.route.params.isForEditingPatient}
                />

                <Layout.VisitScreen
                >
                        <Formik
                            initialValues={{
                                firstName: patientInfo.firstName || null,
                                lastName: patientInfo.lastName || null,
                                nationalId: patientInfo.nationalId || null,
                                fatherName: patientInfo.fatherName || null,
                                gender: patientInfo.gender || null,
                                birthDate: patientInfo.birthDate || null,
                                birthPlace: patientInfo.birthPlace || null,
                                phone: patientInfo.phone || null,
                                mobile: patientInfo.mobile || null,
                                emergencyPhone: patientInfo.emergencyPhone || null,
                                email: patientInfo.email || null,
                                physicianId: patientInfo.physicianUserId || null,
                                address: patientInfo.address || null,
                            }}
                            validationSchema={Yup.object({
                                firstName: Validators.NAME.required(REQUIRED_DEFAULT_MESSAGE_FA),
                                lastName: Validators.NAME.required(REQUIRED_DEFAULT_MESSAGE_FA),
                                nationalId: Validators.NATIONAL_ID.required(REQUIRED_DEFAULT_MESSAGE_FA),
                                fatherName: Validators.NAME.notRequired(),
                                gender: Validators.NOTHING.required('لطفا جنسیت بیمار را انتخاب نمایید.'),
                                birthDate: null,
                                birthPlace: Validators.NAME.notRequired(),
                                phone: Validators.PHONE.notRequired(),
                                mobile: Validators.PHONE.notRequired(),
                                emergencyPhone: Validators.PHONE.notRequired(),
                                email: Validators.EMAIl.notRequired(),
                                physicianId: Validators.NOTHING.required('لطفا یک پزشک را انتخاب نمایید.'),
                                address: null,
                            })}
                            // innerRef={this.props.containerRef}
                            validateOnChange={false}
                            validateOnBlur={true}
                            validateOnSubmit={true}
                            onSubmit={(values, { validate }) => {
                                this.submitForm(values);
                            }}
                        >
                            {
                                ({ ...formikProps }) => {return (
                                    <View style={styles.formContainer}>
                                        <View style={styles.formBody}>
                                            <View style={styles.formRow}>
                                                <FormRow
                                                    name={"firstName"}
                                                    label={"نام"}
                                                    formikProps={formikProps}
                                                />
                                            </View>
                                            <View style={styles.formRow}>
                                                <FormRow
                                                    name={"lastName"}
                                                    label={"نام خانوادگی"}
                                                    formikProps={formikProps}
                                                />
                                            </View>
                                            <View style={styles.formRow}>
                                                <FormRow
                                                    name={"nationalId"}
                                                    label={"کد ملی"}
                                                    formikProps={formikProps}
                                                    numeric
                                                />
                                            </View>
                                            <View style={styles.formRow}>
                                                <FormRow
                                                    name={"fatherName"}
                                                    label={"نام پدر"}
                                                    formikProps={formikProps}
                                                />
                                            </View>
                                            <View style={styles.formRow}>
                                                <SelectInputRow
                                                    name={"gender"}
                                                    label={"جنسیت"}
                                                    formikProps={formikProps}
                                                    options={[
                                                        {
                                                            id: 'M',
                                                            name: 'مرد'
                                                        },
                                                        {
                                                            id: 'F',
                                                            name: 'زن',
                                                        }
                                                    ]}
                                                />
                                            </View>
                                            <View style={styles.formRow}>
                                                <DateInputRow
                                                    name={"birthDate"}
                                                    label={"تاریخ تولد"}
                                                    formikProps={formikProps}
                                                />
                                            </View>
                                            <View style={styles.formRow}>
                                                <FormRow
                                                    name={"birthPlace"}
                                                    label={"محل تولد"}
                                                    formikProps={formikProps}
                                                />
                                            </View>
                                            <View style={styles.formRow}>
                                                <FormRow
                                                    name={"phone"}
                                                    label={"تلفن ثابت"}
                                                    formikProps={formikProps}
                                                    numeric
                                                />
                                            </View>
                                            <View style={styles.formRow}>
                                                <FormRow
                                                    name={"mobile"}
                                                    label={"تلفن همراه"}
                                                    formikProps={formikProps}
                                                    numeric
                                                />
                                            </View>
                                            <View style={styles.formRow}>
                                                <FormRow
                                                    name={"emergencyPhone"}
                                                    label={"تلفن ضروری"}
                                                    formikProps={formikProps}
                                                    numeric
                                                />
                                            </View>
                                            <View style={styles.formRow}>
                                                <FormRow
                                                    name={"email"}
                                                    label={"ایمیل"}
                                                    formikProps={formikProps}
                                                />
                                            </View>
                                            <View style={styles.formRow}>
                                                <PortalSelectInputRow
                                                    name={"physicianId"}
                                                    label={"پزشک معالج"}
                                                    formikProps={formikProps}
                                                    options={this.state.physiciansList.map(p => {return {id: p.userId, name: getLastNameAndTitle(p)}})}
                                                />
                                            </View>
                                            <View style={styles.formRow}>
                                                <FormRow
                                                    name={"address"}
                                                    label={"آدرس"}
                                                    formikProps={formikProps}
                                                />
                                            </View>
                                            <View style={styles.buttonContainer}>
                                                <Button
                                                    style={{
                                                        ...styles.loginButton,
                                                    }}
                                                    contentStyle={{
                                                        ...styles.loginButtonContent,
                                                    }}
                                                    mode={'contained'}
                                                    loading={this.state.isSubmittingForm}
                                                    disabled={this.state.isSubmittingForm}
                                                    onPress={formikProps.handleSubmit}
                                                >
                                                    <Subheading style={{color: theme.colors.surface,}}>
                                                        {this.props.route.params.isForEditingPatient ? 'اعمال تغییرات' : 'افزودن بیمار'}
                                                    </Subheading>
                                                </Button>
                                            </View>
                                        </View>

                                    </View>
                                )}
                            }
                        </Formik>
                </Layout.VisitScreen>
            </ScreenLayout>
        );
    }
}

export default withTheme(PatientUpsertScreen);

const ControlHeader = (props) => {
    const theme = useTheme();
    const headerTitle = props.isForEditingPatient ? 'ویرایش بیمار' : 'بیمار جدید';
    return (
        <Surface style={{elevation: 4}}>
            <ScreenHeader
                title={headerTitle}
                style={{elevation: 0}}
            />
        </Surface>
    )
}

const FormRow = ({formikProps, name, label, numeric, ...props}) => {
    const theme = useTheme();
    return (
        <View style={styles.formRow}>
            <DefaultTextInput
                label={label}
                value={formikProps.values[name]}
                onChangeText={formikProps.handleChange(name)}
                autoCompleteType={name}
                onBlur={formikProps.handleBlur(name)}
                numeric={numeric}
            />
            <HelperText type="error" visible={true} style={{color: theme.colors.actionColors.remove}}>
                {formikProps.errors[name]}
            </HelperText>
        </View>
    )
}

const SelectInputRow = ({formikProps, name, label, options, ...props}) => {
    const theme = useTheme();
    const index = (options || []).findIndex(option => option.id == formikProps.values[name]);
    const [selectedIndex, setSelectedIndex] = useState(index);
    const onChange = (index) => {
        formikProps.setFieldValue(name, (options[index] || {}).id);
        setSelectedIndex(index);
    }

    return (
        <View style={styles.formRow}>
            <Layout.InputOutlineLabel title={label} textStyle={{textAlign: 'left'}}/>
            <IntraSectionInvisibleDivider s/>
            <SegmentedControl
                activeFontStyle={{color: theme.colors.primary}}
                fontStyle={{color: theme.dark ? null : theme.colors.backdrop}}
                values={(options || []).map(option => option.name)}
                selectedIndex={selectedIndex}
                onChange={(event) => {
                    onChange(event.nativeEvent.selectedSegmentIndex)
                }}
                backgroundColor={theme.dark ? theme.colors.backdrop : null}
                tintColor={theme.colors.surface}
                style={{
                    fontSize: 14,
                    paddingHorizontal: 0,
                }}
            />
            <HelperText type="error" visible={true} style={{color: theme.colors.actionColors.remove}}>
                {(selectedIndex != null && selectedIndex >=0 ) ? null : formikProps.errors[name]}
            </HelperText>
        </View>
    )
}

const PortalSelectInputRow = ({formikProps, name, label, options, ...props}) => {
    const theme = useTheme();


    const [selectedIndex, setSelectedIndex] = useState(null);
    const [selectPickerVisible, setSelectPickerVisible] = useState(false);

    useEffect(() => {
        const index = (options || []).findIndex(option => option.id == formikProps.values[name]);
        setSelectedIndex(index);
    }, [options.length]);

    const dismissModal = () => {
        setSelectPickerVisible(false);
    }

    const onChange = (index) => {
        formikProps.setFieldValue(name, (options[index] || {}).id);
        setSelectedIndex(index);
        dismissModal();
    }

    const optionItems = options.map((option, index) => (
        <SelectInputOption
            name={option.name}
            id={option.id}
            isChecked={selectedIndex == index}
            key={'option_' + option.id}
            onPress={() => onChange(index)}
        />
    ))

    return (
        <View style={styles.formRow}>
            <Layout.InputOutlineLabel title={label} textStyle={{textAlign: 'left'}}/>
            <TextInput
                value={(options[selectedIndex] || {}).name || ''}
                disabled={props.disabled}
                placeholder={props.placeholder}
                onChangeText={noop}
                onFocus={() => setSelectPickerVisible(true)}
                autoCompleteType={'off'}
                returnKeyType={'next'}
                keyboardType={null}
                showSoftInputOnFocus={false}
                textContentType={props.textContentType}
                autoCorrect={false}
                style={{
                    backgroundColor: theme.colors.surface,
                    fontSize: 14,
                    flexGrow: 0,
                    paddingHorizontal: 0,
                    ...props.style
                }}
                dense={true}
            />
            <HelperText type="error" visible={true} style={{color: theme.colors.actionColors.remove}}>
                {(selectedIndex != null && selectedIndex >=0 ) ? null : formikProps.errors[name]}
            </HelperText>
            <Portal>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                    <Modal
                        dismissable={true}
                        visible={selectPickerVisible}
                        onDismiss={dismissModal}
                        contentContainerStyle={{
                            width: '80%',
                            height: '60%',
                            alignSelf: 'center',
                        }}
                    >
                        <Surface
                            style={{
                                elevation: 4,
                                paddingHorizontal: 15,
                            }}
                        >
                            {optionItems}
                        </Surface>
                    </Modal>
                </View>
            </Portal>
        </View>
    )
}

const SelectInputOption = ({name, id, onPress, isChecked, ...props}) => {
    return (
        <TouchableRipple
            onPress={onPress}
            rippleColor="rgba(0, 0, 0, .1)"
            delayPressIn={ 100 }
        >
            <Row justifyBetween rowReverse={false} style={{alignItems: 'center', paddingVertical: 15,}}>
                <View>
                    <Layout.InputOutlineLabel title={name} textStyle={{textAlign: 'left'}}/>
                </View>
                <RadioButton
                    value={id}
                    status={isChecked ? 'checked' : 'unchecked'}
                    onPress={() => onPress()}
                    style={{
                        flex: 1,
                    }}
                />
            </Row>
        </TouchableRipple>
    )
}

const DateInputRow = ({formikProps, name, label, ...props}) => {
    const theme = useTheme();
    return (
        <View style={styles.formRow}>
            <Layout.InputOutlineLabel title={label} textStyle={{textAlign: 'left'}}/>
            <DefaultDateInput
                value={formikProps.values[name]}
                onChangeText={formikProps.handleChange(name)}
                onDateChange={formikProps.handleChange(name)}
                autoCompleteType={name}
                onBlur={formikProps.handleBlur(name)}
                initialValue={formikProps.values[name] || null}
                alignReverse
            />
            <HelperText type="error" visible={true} style={{color: theme.colors.actionColors.remove}}>
                {formikProps.errors[name]}
            </HelperText>
        </View>
    )
}

const DefaultTextInput = (props) => {
    const theme = useTheme();
    return (
        <View>
            <Layout.InputOutlineLabel title={props.label} textStyle={{textAlign: 'left'}}/>
            <TextInput
                // label={props.label}
                value={props.value}
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
                disabled={props.disabled}
                onBlur={props.onBlur}
                keyboardType={props.numeric ? 'numeric' : 'default'}
                textContentType={props.textContentType}
                autoCorrect={false}
                style={{
                    backgroundColor: theme.colors.surface,
                    fontSize: 14,
                    paddingHorizontal: 0,
                    ...props.style
                }}
                multiline={props.multiline}
                numberOfLines={props.numberOfLines}
                dense={true}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        paddingTop: 40,
    },
    formContainer: {
        // ...Spacing.py2P,
        paddingTop: '8%',
    },
    formTitle: {
        alignSelf: 'center',
        ...Spacing.py2F,
        paddingHorizontal: 10,
    },
    formBody: {
        // ...Spacing.px3P,

    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'right',
    },
    formRow: {
        ...Spacing.py1F,
    },
    buttonContainer: {
        // ...Spacing.px3P,
        paddingHorizontal: 20,
        ...Spacing.py1F,
        // borderRadius: 3,
        // ...Spacing.py2,
    },
    loginButton: {
        // borderRadius: 0,
    },
    loginButtonContent: {
        paddingVertical: 5,
    },
});