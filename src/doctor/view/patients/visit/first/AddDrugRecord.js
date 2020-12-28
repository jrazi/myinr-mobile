import React, {useRef, useState} from "react";
import * as Layout from "./forms/Layout";
import {
    Caption,
    Searchbar,
    Appbar,
    Portal,
    Text,
    List,
    TouchableRipple,
    Surface,
    Title,
    useTheme
} from "react-native-paper";
import {View, ScrollView, FlatList, Animated, RefreshControl, StyleSheet} from 'react-native';
import {CustomContentScreenHeader, ScreenHeader, ScreenLayout} from "../../../../../root/view/screen/Layout";
import {IntraSectionDivider} from "./forms/Layout";
import {DrugDao, drugDao} from "../../../../data/dao/DrugDao";
import {fullSize} from "../../../../../root/view/styles/containers";
import DrugDatePicker from "./DrugDatePicker";
import {hasValue, removeWhiteSpace} from "../../../../../root/domain/util/Util";


export class AddDrugRecord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            drugGroups: {},
            searching: false,
            beganToSearch: false,
            datePickerOpen: false,
        }
        this.latestSearchId = 0;
        this.drugBeingAdded = null;
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    updateDrugs = (drugGroups, callback = ()=>{}) => {

        this.setState({drugGroups: drugGroups}, callback);
    }

    openDatePicker = (drugInfo) => {
        this.drugBeingAdded = drugInfo;
        this.setState({datePickerOpen: true});
    }

    closeDatePicker = () => {
        this.drugBeingAdded = null;
        this.setState({datePickerOpen: false});
    }

    searchDrugs = async (query) => {
        const timestamp = new Date().getTime();
        const initialSearchId = timestamp;
        this.latestSearchId = timestamp;
        if (!hasValue(query) || removeWhiteSpace(query) == '') {
            this.setState({searching: false});
            return;
        }
        this.setState({searching: true}, () => {
            setTimeout(() => {
                if (initialSearchId < this.latestSearchId) return;
                new DrugDao().aggregateSearchByRouteOfAdmin(query)
                    .then(drugs => {
                        if (initialSearchId < this.latestSearchId) return;
                        this.updateDrugs(drugs, () => this.setState({searching: false, beganToSearch: true}));
                    })
                    .catch(err => {
                        this.setState({searching: false});
                        // TODO
                    })
            }, 500)
        })
    }
    render() {
        return (
            <Portal>
                <ScreenLayout
                >
                    <SearchBoxContainer
                        navigation={this.props.navigation}
                    >
                        <SearchBox searchDrugs={this.searchDrugs} />
                    </SearchBoxContainer>

                    <Wrapper
                    >
                        <DrugList
                            drugGroups={this.state.drugGroups}
                            refreshing={this.state.searching}
                            beganToSearch={this.state.beganToSearch}
                            navigation={this.props.navigation}
                            pickDateForDrug={this.openDatePicker}
                        />
                    </Wrapper>
                    <DrugDatePicker
                        visible={this.state.datePickerOpen}
                        onDismiss={this.closeDatePicker}
                        drugInfo={this.drugBeingAdded}
                        navigation={this.props.navigation}
                        userId={this.props.route.params.userId}
                    />
                </ScreenLayout>
            </Portal>
        );
    }
}

const Wrapper = (props) => {return (
    <View
        style={{
            borderBottomWidth: 0,
        }}
    >
        {props.children}
    </View>
)}

const SearchBox = (props) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    let latestSearchId = useRef(0);

    const onChangeSearch = query => {
        setSearchQuery(query);
        // const timestamp = new Date().getTime();
        // const initialSearchId = timestamp;
        // latestSearchId.current = timestamp;
        // if (initialSearchId < latestSearchId.current) return;
        props.searchDrugs(query);
    }
    const theme = useTheme();

    return (
        <Searchbar
            placeholder="Search Drugs"
            onChangeText={onChangeSearch}
            value={searchQuery}
            autoFocus={true}
            style={{
                flexDirection: 'row-reverse',
                marginHorizontal: 0,
                paddingHorizontal: 0,
                borderWidth: 0,
                elevation: 0,
                paddingTop: 20,
                paddingBottom: 20,
                fontSize: 20,
                backgroundColor: theme.dark ? theme.colors.accent : null,
                // paddingVertical: 20,
            }}
            inputStyle={{
                textAlign: 'left',
                fontSize: 20,
            }}
        />
    );
};

const DrugList = (props) => {

    const pickDatesForDrug = (drugInfo) => {
        props.pickDateForDrug(drugInfo);
    }
    const theme = useTheme();

    return (
            <ScrollView
                style={{
                    marginBottom: 30,
                    minHeight: 100,
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={props.refreshing}
                        colors={[theme.colors.primary]}
                        progressBackgroundColor={theme.colors.surface}
                    />
                }
            >
            {
                Object.keys(props.drugGroups).length == 0 && !props.refreshing ?
                    (
                        <View style={{paddingTop: 20, alignItems: 'center'}}>
                            <Caption style={{paddingVertical: 10,fontSize: 16}}>
                                {props.beganToSearch ? 'No Results' : 'Search the name of the drug.'}
                            </Caption>
                        </View>
                    )
                :
                Object.entries(props.drugGroups)
                    .map( ([key, drugList]) => {
                        return (
                            <List.Section>
                                <List.Subheader style={styles.drugListTitle}>{key}</List.Subheader>
                                {
                                    drugList.map((drug, index) => {
                                        return (
                                            <DrugInfo
                                                id={drug.IDDrug}
                                                name={drug.DrugName}
                                                isLast={index == drugList.length-1}
                                                dosageForm={drug.DosageForm}
                                                strength={drug.Strengh}
                                                onPress={() => pickDatesForDrug(drug)}
                                            />
                                        )
                                    })
                                }
                            </List.Section>
                        )
                    })
            }
            </ScrollView>
    )
}

const DrugInfo = (props) => {
    // TODO Better View
    const DrugDescription = (_props) => {
        return (
            <Layout.Row justifyBetween style={{alignItems: 'center'}}>
                <View style={{}}><Caption>{props.dosageForm}</Caption></View>
                <View style={{}}><Caption>{props.strength}</Caption></View>
            </Layout.Row>
        )
    }
    return (
        <TouchableRipple
            onPress={() => {}} onPressOut={props.onPress} delayPressIn={ 100 } delayPressOut={ 50 }
            pressRetentionOffset={100}
        >
            <View key={`DrugSearch${props.id}`} style={{paddingHorizontal: 10}}>
                <List.Item
                    title={props.name} titleStyle={styles.drugListItem.title}
                    descriptionStyle={styles.drugListItem.title}
                    description={DrugDescription}
                />
                {
                    props.isLast ? null
                        : <IntraSectionDivider none style={{marginHorizontal: 5, marginTop: 5,}}/>
                }
            </View>
        </TouchableRipple>
    )
}
const styles = {
    drugListItem: {
        title: {
            textAlign: 'right',
        }
    },
    drugListTitle: {
        textAlign: 'right',
    }
}

export const SearchBoxContainer = (props) => {
    const theme = useTheme();
    return (
        <Surface style={[searchBoxStyles.appBarHeader, {backgroundColor: theme.dark ? theme.colors.accent : null,}]}>
            <View style={searchBoxStyles.appBarHeaderWrapper}>
                <View style={searchBoxStyles.headerOfHeader}>
                    <Appbar.Action icon="arrow-right" onPress={() => props.navigation.goBack()} color={theme.colors.placeholder}/>
                </View>
                <View style={searchBoxStyles.bodyOfHeader}>
                    {props.children}
                </View>
            </View>
        </Surface>
    )
}

const searchBoxStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        ...fullSize,
    },
    appBarHeader: {
        elevation: 0,
        paddingLeft: 15,
        paddingRight: 10,
        paddingTop: 40,
    },
    appBarHeaderWrapper: {
        flexGrow: 1,
    },
    headerOfHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bodyOfHeader: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        // paddingVertical: 20,
    },
});
