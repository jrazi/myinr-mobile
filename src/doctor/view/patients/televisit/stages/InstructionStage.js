import React from "react";

import ListUtil from "../../../../../root/domain/util/ListUtil";
import {getTeleVisitInstructionOptions} from "../../../../../root/data/dao/StaticDomainNameTable";
import * as Layout from "../../visit/first/forms/Layout";
import {ChipBox, DefaultSwitchRow, DefaultTextInput} from "../../visit/first/forms/ContextSpecificComponents";
import {ConditionalCollapsibleRender, IntraSectionInvisibleDivider, Row} from "../../visit/first/forms/Layout";
import {View} from "react-native";
import InputSpinner from "react-native-input-spinner";
import {Text, withTheme} from "react-native-paper";
import {WeeklyDosagePicker} from "../../visit/first/forms/WeeklyDosagePicker";
import {PhysicianMessage} from "../../../../domain/visit/PhysicianMessage";


class _InstructionStage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: true,
            physicianInstructions: [],
            stopUsingWarfarin: false,
            daysWithoutWarfarin: null,
            hasNewPrescription: false,
        }
        this.patientMedicalInfo = this.props.route.params.patientMedicalInfo;
        this.patientInfo = this.props.route.params.patientInfo;
        this.physicianMessage = this.props.route.params.physicianMessage;
    }


    componentDidMount() {
        const instructionOptions = Object.values(getTeleVisitInstructionOptions());
        instructionOptions.forEach(instruction => instruction.value = ListUtil.containsElementWithId(this.physicianMessage.physicianInstructions, instruction.id));
        this.setState({physicianInstructions: instructionOptions});
    }

    // changeFormValue(changeFunction) {
    //     changeFunction();
    // }

    changePhysicianInstructions = (id, value) => {
        const instruction = ListUtil.findOneById(this.state.physicianInstructions, id);

        if (value) {
            ListUtil.addById(this.physicianMessage.physicianInstructions, instruction);
        }
        else {
            ListUtil.removeById(this.physicianMessage.physicianInstructions, instruction.id);
        }
    }

    toggleStopUsingWarfarin = () => {
        const daysWithoutWarfarin = this.state.stopUsingWarfarin ? null : 0;
        this.setState({stopUsingWarfarin: !this.state.stopUsingWarfarin}, () => this.onDaysWithoutWarfarinChange(daysWithoutWarfarin));
    }

    onDaysWithoutWarfarinChange = (newValue) => {
        this.physicianMessage.recommendedDaysWithoutWarfarin = newValue;
        this.setState({daysWithoutWarfarin: newValue});
    }

    toggleHasNewPrescription = () => {
        const hasNewPrescription = !this.state.hasNewPrescription;

        this.setState({hasNewPrescription: hasNewPrescription}, () => {
            const prescription = PhysicianMessage.createRecommendedDosageForNextWeek();

            this.physicianMessage.hasNewPrescription = hasNewPrescription;
            this.physicianMessage.prescription = prescription;
        });
    }

    onDosageUpdate = (index, dose) => {
        this.physicianMessage.prescription[index].dosagePH = dose;
    }


    render() {
        const theme = this.props.theme;
        const dosageData = this.physicianMessage.prescription.map(dosageInfo => dosageInfo.dosagePH);
        return (
            <Layout.VisitScreen
            >
                <Layout.ScreenTitle title={'Instructions'}/>
                <Layout.FormSection>
                    <Layout.InputArea>
                        <Layout.ItemsBox>
                            <ChipBox items={this.state.physicianInstructions} onChange={this.changePhysicianInstructions} disableAll={false}/>
                        </Layout.ItemsBox>
                        <IntraSectionInvisibleDivider s/>
                        <DefaultSwitchRow
                            title={'Stop using Warfarin'}
                            description={''}
                            value={this.state.stopUsingWarfarin}
                            onFlip={this.toggleStopUsingWarfarin}
                            disabled={false}
                        />
                        <IntraSectionInvisibleDivider xs/>
                        <ConditionalCollapsibleRender hidden={!this.state.stopUsingWarfarin}>
                            <Row justifyCenter>
                                <InputSpinner
                                    onChange={this.onDaysWithoutWarfarinChange}

                                    max={70}
                                    min={0}
                                    step={1}
                                    value={this.state.daysWithoutWarfarin}

                                    colorMax={theme.colors.backdrop}
                                    colorMin={theme.colors.backdrop}
                                    textColor={theme.colors.backdrop}
                                    color={theme.colors.backdrop}
                                    colorAsBackground={true}
                                    width={'100%'}
                                    speed={5}
                                    accelerationDelay={2000}
                                    longStep={7}
                                    height={40}
                                    style={{
                                        flexDirection: 'row-reverse',
                                    }}
                                    buttonStyle={{
                                    }}
                                    inputStyle={{
                                        opacity: 0,
                                    }}
                                >
                                    <View
                                        style={{
                                            position: 'absolute',
                                            // left: 'auto',
                                            // right: 'auto',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: theme.colors.onSurface,
                                                // color: 'white',
                                            }}
                                        >
                                            {`Stop For ${this.state.daysWithoutWarfarin || 0} Days`}
                                        </Text>
                                    </View>
                                </InputSpinner>
                            </Row>
                        </ConditionalCollapsibleRender>

                        <IntraSectionInvisibleDivider s/>

                        <DefaultSwitchRow
                            title={'New Prescription'}
                            description={''}
                            value={this.state.hasNewPrescription}
                            onFlip={this.toggleHasNewPrescription}
                            disabled={false}
                        />
                        <ConditionalCollapsibleRender hidden={!this.state.hasNewPrescription}>
                            <Layout.FormSection>
                                <WeeklyDosagePicker
                                    onDoseUpdate={this.onDosageUpdate}
                                    initialData={dosageData}
                                    startingDate={null}
                                    increment={1}
                                    disabled={false}
                                    // key={'weekly_dosage_' + this.state.hasNewPrescription}
                                />
                            </Layout.FormSection>
                        </ConditionalCollapsibleRender>

                        {/*<Formik*/}
                        {/*    initialValues={{*/}
                        {/*        procedurePreparing: !this.state.loaded ? "" : this.visitInfo.procedurePreparing,*/}
                        {/*    }}*/}
                        {/*    validationSchema={Yup.object({*/}
                        {/*        inrResult:  this.readonly ? Validators.NOTHING : Validators.NOTHING,*/}
                        {/*    })}*/}
                        {/*    validateOnChange={false}*/}
                        {/*    valisdateOnBlur={true}*/}
                        {/*    key={this.state.loaded}*/}
                        {/*    onSubmit={(values, { validate }) => {}}*/}
                        {/*>*/}
                        {/*    {({ handleChange, handleBlur, values, touched, errors, validateField, isValid }) => (*/}
                        {/*        <DefaultTextInput*/}
                        {/*            label={"Procedure Preparing"}*/}
                        {/*            placeholder={""}*/}
                        {/*            value={values.procedurePreparing}*/}
                        {/*            onChangeText={(event) => {*/}
                        {/*                handleChange('procedurePreparing')(event);*/}
                        {/*                this.changeFormValue(() => {*/}
                        {/*                    this.visitInfo.procedurePreparing = values.procedurePreparing;*/}
                        {/*                });*/}
                        {/*            }}*/}
                        {/*            onBlur={handleBlur('procedurePreparing')}*/}
                        {/*            disabled={this.readonly}*/}
                        {/*        />*/}
                        {/*    )}*/}
                        {/*</Formik>*/}
                    </Layout.InputArea>
                </Layout.FormSection>
                <IntraSectionInvisibleDivider/>
            </Layout.VisitScreen>

        )
    }
}

export const InstructionStage = withTheme(_InstructionStage);