import React, {useState} from "react";
import {StyleSheet, View, ScrollView, RefreshControl} from "react-native";
import {
    List,
    Surface,
    Card,
    Text,
    Avatar, TouchableRipple, withTheme, useTheme, Searchbar, Divider, TextInput, Caption
} from "react-native-paper";
import Icons from "react-native-vector-icons/EvilIcons";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {rootDao} from "../../../root/data/dao/RootDao";
import {
    calcAge,
    e2p,
    firstNonEmpty,
    hasValue,
    jalaliTimePastInFarsi, noop,
    normalizeDictForDisplay, removeWhiteSpace
} from "../../../root/domain/util/Util";
import {
    DefaultMaterialIcon,
    DoubleIconScreenHeader,
    EmptyHeader,
    ScreenHeader,
    ScreenLayout
} from "../../../root/view/screen/Layout";
import {ConditionalCollapsibleRender, ConditionalRender, IntraSectionDivider} from "./visit/first/forms/Layout";
import {FilterTagBox, PatientsListFilterBox} from "./FilterTagBox";
import {EmptyList} from "../../../root/view/list/EmptyListMessage";
import {VisitRedirect} from "./VisitRedirect";
import {doctorDao, VisitState} from "../../data/dao/DoctorDao";

class PatientsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.user = {};
        this.state = {
            allPatients: [],
            patients: [],
            loading: true,
            visitRedirect: {
                visible: false,
                activePatient: {},
            }
        }
        this.searchCriteria = {};
        this.searchQuery = null;
    }

    async componentDidMount() {
        this.refresh();
    }

    refresh = () => {
        this.setState({loading: true}, () => {
            rootDao.withRefresh()
                .getUser()
                .then(user => {
                    this.setPatients(user.patients, {loading: false,});
                })
                .catch(err => {
                    this.setState({
                        loading: false,
                    })
                });
        })
    }

    setPatients = (allPatients, additionalState={}) => {
        let filteredPatients = this.filterPatients(allPatients, this.searchCriteria);
        let searchedPatients = this.searchPatients(filteredPatients, this.searchQuery);

        this.setState({
            allPatients: allPatients,
            patients: searchedPatients,
            ...additionalState
        })
    }

    applyFilters = (filters) => {
        this.searchCriteria = filters;
        this.refresh();
    }

    applySearchQuery = (query) => {
        this.searchQuery = query;
        this.setPatients(this.state.allPatients)
    }

    cancelSearch = () => this.applySearchQuery(null);

    searchPatients = (patients, query) => {
        if (!hasValue(query) || removeWhiteSpace(query).length == 0) return patients;
        let safeIncludes = (str, substr) => {
            if (!hasValue(str)) return false;
            return str.toString().includes(substr);
        }
        let filteredList = patients
            .filter(p => {
                return safeIncludes(p.fullName, query) ||
                    safeIncludes(p.username, query) ||
                    (
                        query.length > 3 &&
                        (
                            safeIncludes(p.nationalId, query) ||
                            safeIncludes(p.phone, query) ||
                            safeIncludes(p.mobile, query) ||
                            safeIncludes(p.emergencyPhone, query)
                        )
                    )
            })
        return filteredList;
    }

    filterPatients = (patients, filters) => {
        const visitFilterEnabled = filters.VISITED ^ filters.NOT_VISITED;
        const medicalConditionFilterEnabled = (filters.MVR ^ filters.AVR) || (filters.MVR ^ filters.VALVULAR_AF);

        let filteredList = patients
            .filter(p => !visitFilterEnabled || (filters.VISITED && p.visited) || (filters.NOT_VISITED && !p.visited))
            .filter(p =>
                !medicalConditionFilterEnabled || (
                    hasValue(p.medicalCondition) && (
                        (filters.MVR && p.medicalCondition.includes('MVR')) ||
                        (filters.AVR && p.medicalCondition.includes('AVR')) ||
                        (filters.VALVULAR_AF && p.medicalCondition.includes('Valvular AF'))
                    )
                )
            );
        return filteredList;
    }

    onPatientCardPress = (patient) => {
        if (patient.visited) {
            this.props.navigation.navigate('PatientProfileScreen', {userId: patient.userId});
        }
        else {
            doctorDao.getVisitState(patient.userId)
                .then(visitState => {
                    patient.unfinishedVisit = visitState == VisitState.INCOMPLETE_VISIT;
                    this.setState({visitRedirect: {visible: true, activePatient: patient}});
                })
                .catch(err => {})
        }
    }

    dismissVisitRedirect = () => {
        this.setState({visitRedirect: {visible: false, activePatient: {}}});
    }

    render() {
        const patientInfoCards = [];
        for (let patient of this.state.patients) {
            patient.age = calcAge(patient.birthDate);
            const displayPatient = normalizeDictForDisplay(patient, 'FA');
            patientInfoCards.push([
                <PatientInfoCard
                    key={patient.nationalId + patient.username}
                    patientInfo={displayPatient}
                    onPress={() => this.onPatientCardPress(patient)}
                />,

            ]);
        }
        const theme = this.props.theme;
        return (
            <ScreenLayout>
                <ControlHeader
                    onNewFilterSet={this.applyFilters}
                    onNewSearchQuery={this.applySearchQuery}
                    onSearchCancel={this.cancelSearch}
                />
                <ScrollView
                    style={styles.container}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.loading}
                            onRefresh={this.refresh}
                            colors={[theme.colors.primary]}
                            progressBackgroundColor={theme.colors.surface}
                        />
                    }
                >
                    <EmptyList
                        hidden={this.state.patients.length > 0 || this.state.loading}
                        message={'بیماری وجود ندارد'}
                    />
                    <View style={styles.patientsListContainer}>
                        <List.Section>
                            {patientInfoCards}
                        </List.Section>
                    </View>
                </ScrollView>
                <VisitRedirect
                    onDismiss={this.dismissVisitRedirect}
                    visible={this.state.visitRedirect.visible}
                    patient={this.state.visitRedirect.activePatient}
                />
            </ScreenLayout>
        );
    }
}

export default withTheme(PatientsScreen);

const ControlHeader = (props) => {
    const [filterBoxOpen, setFilterBoxOpen] = useState(false);
    const [searchBoxOpen, setSearchBoxOpen] = useState(false);
    const theme = useTheme();
    const [searchQuery, setSearchQuery] = useState(null);
    const onChangeText = (query) => {
        setSearchQuery(query);
        props.onNewSearchQuery(query);
    }
    const onIconPress = () => {
        setSearchBoxOpen(false);
        setSearchQuery(null);
        props.onSearchCancel();
    }
    const cancelIfEmpty = () => {
        if(!hasValue(searchQuery) || removeWhiteSpace(searchQuery) == null)
            onIconPress();
    }
    return (
        <View>
            <ConditionalRender hidden={searchBoxOpen}>
                <DoubleIconScreenHeader
                    title="فهرست بیماران"
                    style={{elevation: 0}}
                    right={"filter"}
                    left={"magnify"}
                    onRightPress={() => setFilterBoxOpen(!filterBoxOpen)}
                    onLeftPress={() => setSearchBoxOpen(!searchBoxOpen)}
                />
            </ConditionalRender>
            <ConditionalRender hidden={!searchBoxOpen}>
                <EmptyHeader>
                    <Searchbar
                        placeholder="جستجو"
                        onChangeText={onChangeText}
                        value={searchQuery}
                        autoFocus={true}
                        icon={(props) => <DefaultMaterialIcon iconName={'arrow-right'}/>}
                        onIconPress={onIconPress}
                        style={{
                            marginHorizontal: 0,
                            paddingHorizontal: 0,
                            borderWidth: 0,
                            elevation: 0,
                        }}
                        inputStyle={{
                        }}
                    />
                </EmptyHeader>
            </ConditionalRender>
            <ConditionalCollapsibleRender hidden={!filterBoxOpen && !searchBoxOpen}>
                <PatientsListFilterBox onNewQuery={props.onNewFilterSet}/>
            </ConditionalCollapsibleRender>
        </View>
    )
}
const PatientInfoCard = (props) => {
    // TODO Refactor
    const nameSplitted = props.patientInfo.fullName.split(/\s+/);
    const nameChunks = [nameSplitted.shift(), nameSplitted.join(' ')];
    let latestInrTestMessage = null;
    let timePast = null;
    if (hasValue(props.patientInfo.latestINR)) {
        timePast = jalaliTimePastInFarsi(props.patientInfo.latestINR.testDate);
        latestInrTestMessage = 'آخرین گزارش INR در ' + timePast;
        if (timePast != null && !timePast.includes('امروز')) latestInrTestMessage += ' قبل';
    }
    if (timePast == null) {
        latestInrTestMessage = 'عدم ثبت شاخص INR';
    }
    const theme = useTheme();
    return (
            <View style={[{
                // elevation: 4,
            }, styles.patientInfoCardContainer]}>
                <TouchableRipple
                    onPress={props.onPress}
                    rippleColor="rgba(0, 0, 0, .1)"
                    delayPressIn={ 100 }
                >
                    <View style={{
                        // paddingBottom: 10,
                    }}>
                        <Card.Title
                            title={props.patientInfo.fullName}
                            subtitle={latestInrTestMessage}
                            left={() => <Avatar.Text
                                size={32} label={nameChunks[0][0] + '.' + nameChunks[1][0]}
                                style={{backgroundColor: theme.colors.accent}}
                            />}
                        />
                        <Card.Content>
                            <View >
                                <PatientCardDetails patientInfo={props.patientInfo}/>
                            </View>
                        </Card.Content>
                        <IntraSectionDivider none borderWidth={0.1} style={{marginHorizontal: 20, marginTop: 10,}}/>
                    </View>
                </TouchableRipple>
            </View>
    );
}

const PatientCardDetails = (props) => {
    const theme = useTheme();
    return ([
        <Row key={'first'}>
            <InfoItem
                title={props.patientInfo.medicalCondition}
                customIcon={<MaterialCommunityIcons name="stethoscope" size={20} color={theme.colors.placeholder}/>}
            />
            <InfoItem
                wrapperStyle={{
                    paddingLeft: 40,
                }}
                title={props.patientInfo.age != 'نامشخص' ?  `${props.patientInfo.age} سال ` : 'نامشخص'}
                customIcon={<MaterialCommunityIcons name={'calendar-account'} size={20} color={theme.colors.placeholder}/>}
            />
        </Row>,
        <Row key={'second'}>
            <InfoItem
                title={props.patientInfo.mobile}
                customIcon={<MaterialCommunityIcons name="cellphone" size={20} color={theme.colors.placeholder}/>}
            />
            <InfoItem
                wrapperStyle={{
                    paddingLeft: 40,
                }}
                title={props.patientInfo.birthPlace}
                customIcon={<MaterialCommunityIcons name={'map-marker-outline'} size={20} color={theme.colors.placeholder}/>}
            />
        </Row>
    ]);
}

const InfoItem = (props) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                flexBasis: '50%',
                ...props.wrapperStyle
            }}
        >
            <View
                style={{
                    paddingHorizontal: 4,
                }}
            >
                {props.customIcon}
            </View>
            <View
                style={{
                    paddingHorizontal: 4,
                }}
            >
                <Text>{props.title}</Text>
            </View>
        </View>
    )
}
const Row = (props) => {return (
    <View
        style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 10,
        }}
    >
        {props.children}
    </View>
)}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'white',
    },

    patientsListContainer: {
    },
    patientInfoCardContainer: {
    },
    patientInfoCard: {
    },
    patientCardDetails: {
    }
});

