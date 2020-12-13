import React, {useCallback, useState} from "react";
import * as Layout from "./Layout";
import {Button, Divider, Switch} from "react-native-paper";
import {currentTheme} from "../../../../../../theme";
import {ConditionalRender} from "./Layout";
import {View} from 'react-native';


export class InrInfoStage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latestInrAtHome: false,
        }
    }

    toggleLatestInrAtHome = () => this.setState({latestInrAtHome: !this.state.latestInrAtHome});

    componentDidMount() {
    }

    render() {
        return (
            <Layout.VisitScreen
            >
                <Layout.ScreenTitle title={'شاخص INR'}/>

                <Layout.FormSection>
                    <Layout.SectionTitle title={'آخرین آزمایش'}/>
                    <Layout.InputTitle title={'میزان شاخص'} description={'آخرین رکورد ثبت شده INR'}/>
                    <SwitchRow
                        title={'آزمایش خانگی'}
                        value={this.state.latestInrAtHome}
                        onChange={this.toggleLatestInrAtHome}
                    />
                    <ConditionalRender hidden={this.state.latestInrAtHome}>
                        <Layout.InputTitle title={'محل آزمایش'}/>
                    </ConditionalRender>
                    <Layout.InputTitle title={'تاریخ آزمایش'} />
                    <Layout.IntraSectionDivider s/>
                    <Layout.InputTitle title={'بازه هدف'} description={'بازه هدف شاخص INR بیمار'}/>
                    <View style={{width: '100%'}}>
                        <InrRangeSlider/>
                    </View>
                </Layout.FormSection>
            </Layout.VisitScreen>
        );
    }
}

const SwitchRow = (props) => {
    return (
        <Layout.Row justifyBetween>
            <Layout.InputTitle title={props.title}/>
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