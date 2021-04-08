import React, {useEffect, useRef, useState} from "react";
import {StyleSheet, View, ScrollView} from "react-native";
import * as Layout from '../../first/forms/Layout';
import {
    ConditionalCollapsibleRender,
    ConditionalRender,
    IntraSectionDivider,
    IntraSectionInvisibleDivider
} from "../../first/forms/Layout";
import {ChipBox, DefaultTextInput} from "../../first/forms/ContextSpecificComponents";
import {getReasonsForVisit} from "../../../../../../root/data/dao/StaticDomainNameTable";
import ListUtil from "../../../../../../root/domain/util/ListUtil";
import {Formik} from "formik";
import * as Yup from "yup";
import * as Validators from "../../../../../../root/view/form/Validators";

export class PreliminaryStage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reasonsForVisit: [],
            loaded: true,
        }
        this.visitInfo = this.props.route.params.visitInfo;
        this.readonly = this.props.route.params.readonly;
    }


    componentDidMount() {
        const reasonsForVisit = ListUtil.justifyItemListForDisplay(Object.values(getReasonsForVisit()), item => item.name);
        reasonsForVisit.forEach(reason => reason.value = ListUtil.containsElementWithId(this.visitInfo.reasonForVisit, reason.id));
        this.setState({reasonsForVisit: reasonsForVisit});
    }

    changeFormValue(changeFunction) {
        changeFunction();
    }

    changeReasonsForVisit = (id, value) => {
        const reason = ListUtil.findOneById(this.state.reasonsForVisit, id);

        if (value) {
            ListUtil.addById(this.visitInfo.reasonForVisit, reason);
        }
        else {
            ListUtil.removeById(this.visitInfo.reasonForVisit, reason.id);
        }
    }


    render() {

        return (
            <Layout.VisitScreen
            >
                <Layout.ScreenTitle title={'Preliminary'}/>
                <Layout.FormSection>
                    <Layout.InputTitle title={'Reason for Visit'}/>
                    <Layout.InputArea>
                        <Layout.ItemsBox>
                            <ChipBox items={this.state.reasonsForVisit} onChange={this.changeReasonsForVisit} disableAll={this.readonly}/>
                        </Layout.ItemsBox>
                        <IntraSectionInvisibleDivider s/>
                        <Formik
                            initialValues={{
                                procedurePreparing: !this.state.loaded ? "" : this.visitInfo.procedurePreparing,
                            }}
                            validationSchema={Yup.object({
                                inrResult:  this.readonly ? Validators.NOTHING : Validators.NOTHING,
                            })}
                            validateOnChange={false}
                            valisdateOnBlur={true}
                            key={this.state.loaded}
                            onSubmit={(values, { validate }) => {}}
                        >
                            {({ handleChange, handleBlur, values, touched, errors, validateField, isValid }) => (
                                <DefaultTextInput
                                    label={"Procedure Preparing"}
                                    placeholder={""}
                                    value={values.procedurePreparing}
                                    onChangeText={(event) => {
                                        handleChange('procedurePreparing')(event);
                                        this.changeFormValue(() => {
                                            this.visitInfo.procedurePreparing = values.procedurePreparing;
                                        });
                                    }}
                                    onBlur={handleBlur('procedurePreparing')}
                                />
                            )}
                        </Formik>
                    </Layout.InputArea>
                </Layout.FormSection>
                <IntraSectionInvisibleDivider/>
            </Layout.VisitScreen>

        )
    }
}


const styles = StyleSheet.create({
})