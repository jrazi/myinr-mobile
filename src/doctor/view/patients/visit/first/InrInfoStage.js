import React, {useCallback, useState} from "react";
import * as Layout from "./Layout";
import {Text, Button, Divider, Switch, TextInput} from "react-native-paper";
import {currentTheme, mostlyWhiteTheme} from "../../../../../../theme";
import {ConditionalRender, IntraSectionInvisibleDivider, PrimaryText} from "./Layout";
import {Platform, PanResponder, View} from 'react-native';
import {Formik} from "formik";
import * as Yup from 'yup';
import {debugBorderRed} from "../../../../../root/view/styles/borders";


export class InrInfoStage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latestInrAtHome: false,
        }
        this.panResponder = {};
    }

    toggleLatestInrAtHome = () => this.setState({latestInrAtHome: !this.state.latestInrAtHome});

    componentDidMount() {
    }

    render() {
        return (
            <Layout.VisitScreen
            >
                <Layout.ScreenTitle title={'آزمایش INR'} description={'اطلاعات مربوط به نتایج آخرین آزمایش INR'}/>

                <Layout.FormSection>
                    {/*<Layout.SectionTitle title={'آخرین آزمایش'} description={'اطلاعات آخرین تست INR'}/>*/}
                    {/*<Layout.InputTitle title={'میزان شاخص'}/>*/}
                    {/*<Layout.IntraSectionInvisibleDivider s/>*/}
                    <SwitchRow
                        title={'آزمایش خانگی'}
                        description={'آیا آزمایش در خانه انجام شده؟'}
                        value={this.state.latestInrAtHome}
                        onChange={this.toggleLatestInrAtHome}
                    />
                    <Layout.IntraSectionInvisibleDivider sm/>
                    <Layout.InputTitle title={'میزان شاخص'}/>
                    <DefaultTextInput
                        // label="میزان شاخص "
                        placeholder={"INR"}
                        numeric
                    />
                    <Layout.IntraSectionInvisibleDivider sm/>
                    <ConditionalRender hidden={this.state.latestInrAtHome}>
                        {/*<Layout.InputTitle title={'محل آزمایش'}/>*/}
                        <Layout.InputTitle title={'محل آزمایش'} style={{}}/>
                        <DefaultTextInput
                            placeholder={"مثال: آزمایشگاه فارابی"}
                            // label={"محل آزمایش"}
                            textContentType={'location'}
                            style={{}}
                        />
                        <Layout.IntraSectionInvisibleDivider sm/>
                    </ConditionalRender>
                    {/*<Layout.InputTitle title={'تاریخ آزمایش'} />*/}
                    <Layout.InputTitle title={'تاریخ آزمایش'}/>
                    <Layout.Row justifyCenter>
                        <DefaultTextInput
                            placeholder={"روز"}
                            style={{flexGrow: 0, paddingHorizontal: 25}}
                            numeric
                        />
                        <DefaultTextInput
                            placeholder={"ماه"}
                            style={{flexGrow: 0,marginHorizontal: 15,  paddingHorizontal: 25}}
                            numeric
                        />
                        <DefaultTextInput
                            placeholder={"سال"}
                            style={{flexGrow: 0, paddingHorizontal: 25}}
                            numeric
                        />
                    </Layout.Row>
                    <Layout.IntraSectionInvisibleDivider sm/>
                    <Layout.InputTitle title={'بازه هدف'}

                    />
                    <Layout.Row justifyCenter>
                        <DefaultTextInput
                            label={'از'}
                            style={{flexGrow: 0, paddingHorizontal: 25}}
                            numeric
                        />
                        <View style={{flexGrow: 0, marginHorizontal: 15,  paddingHorizontal: 30}}></View>
                        <DefaultTextInput
                            label={'تا'}
                            style={{flexGrow: 0, paddingHorizontal: 25}}
                            numeric
                        />
                    </Layout.Row>
                </Layout.FormSection>
                <IntraSectionInvisibleDivider xl/>
            </Layout.VisitScreen>
        );
    }
}

const SwitchRow = (props) => {
    return (
        <Layout.Row justifyBetween>
            <Layout.InputTitle title={props.title} description={props.description}/>
            <Switch
                style={{}} value={props.value}
                color={currentTheme.colors.primary}
                onValueChange={() => props.onChange()}
            />
        </Layout.Row>
    );
}

const InrRangeSlider = (props) => {

    return (
        <View>

        </View>
    )
}

const DefaultTextInput = (props) => {
    return (
            <TextInput
                label={props.label}
                // value={}
                placeholder={props.placeholder}
                onChangeText={() => {}}
                autoCompleteType={'off'}
                keyboardType={props.numeric ? 'numeric' : 'default'}
                textContentType={props.textContentType}
                autoCorrect={false}
                // onBlur={handleBlur('username')}
                // mode={'outlined'}
                borderless={true}
                // style={{width: 75, textAlign: 'center'}}
                // textAlign={'center'}
                style={{
                    backgroundColor: currentTheme.colors.surface,
                    // flexGrow: 1,
                    // borderBottomColor: 'red',
                    fontSize: 14,
                    flexGrow: 0,
                    paddingHorizontal: 0,

                    // textAlign: 'center',
                    // color: 'red',
                    ...props.style
                    // ...debugBorderRed
                }}
                // labelStyle={{
                //     color: 'blue',
                // }}
                // textStyle={{
                //     color: 'blue',
                // }}
                // placeholderTextColor={currentTheme.colors.primary}
                // dense={true}

            />
    )
}