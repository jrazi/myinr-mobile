import React from 'react';
import {UserRole} from "../domain/Role";
import {rootDao} from "../data/dao/RootDao";
import {Locale} from '../domain/Locale';
import {LoadingScreen} from "./loading/Loading";
import LoginScreen from "../../login/view/LoginScreen";
import DoctorAppNavigator from "../../doctor/view/DoctorAppNavigator";
import PatientApp from "../../patient/view/PatientApp";
import PatientAppNavigator from "../../patient/view/PatientAppNavigator";
import SecretaryAppNavigator from "../../secretary/view/SecretaryAppNavigator";

export default class RootEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            role: {},
            loaded: false,
        }
    }

    componentDidMount = () => {
        this.refresh();
        this.props.navigation.addListener(
            'focus',
            payload => {
                this.refresh();
            }
        );
    }

    refresh = () => {
        this.setState({loaded: false}, () => {
            rootDao.withRefresh().getUser().then(user => {
                this.setState({
                    role: user == null ? null : user.userInfo.role,
                    loaded: true,
                })
            })
        })
    }


    render() {
        return (
            <LoadingScreen loaded={this.state.loaded}>
                {
                    this.state.role == null ? <LoginScreen navigation={this.props.navigation}/>
                        : this.state.role == UserRole.DOCTOR ? <DoctorAppNavigator navigation={this.props.navigation}/>
                        : this.state.role == UserRole.PATIENT ? <PatientAppNavigator navigation={this.props.navigation}/>
                        : this.state.role == UserRole.SECRETARY ? <SecretaryAppNavigator navigation={this.props.navigation}/>
                                : <LoginScreen navigation={this.props.navigation}/>
                }
            </LoadingScreen>
        );
    }
}
