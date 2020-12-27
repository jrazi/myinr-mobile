import React, {useRef, useState} from "react";
import * as Layout from "./forms/Layout";
import {Caption, Searchbar, Appbar, Portal, Text, List, TouchableRipple, Surface, Title} from "react-native-paper";
import {View, ScrollView, FlatList, Animated, RefreshControl, StyleSheet} from 'react-native';
import {CustomContentScreenHeader, ScreenHeader, ScreenLayout} from "../../../../../root/view/screen/Layout";
import {IntraSectionDivider} from "./forms/Layout";
import {drugDao} from "../../../../data/dao/DrugDao";
import {currentTheme, mostlyWhiteTheme} from "../../../../../../theme";
import {fullSize} from "../../../../../root/view/styles/containers";


export class AddDrugRecord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            drugGroups: {},
            searching: false,
            beganToSearch: false,
        }
        this.latestSearchId = 0;
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    updateDrugs = (drugGroups, callback = ()=>{}) => {

        this.setState({drugGroups: drugGroups}, callback);
    }

    searchDrugs = (query) => {
        const timestamp = new Date().getTime();
        const initialSearchId = timestamp;
        this.latestSearchId = timestamp;
        this.setState({searching: true}, () => {
            drugDao.aggregateSearchByRouteOfAdmin(query)
                .then(drugs => {
                    if (initialSearchId < this.latestSearchId) return;
                    this.updateDrugs(drugs, () => this.setState({searching: false, beganToSearch: true}));
                })
                .catch(err => {
                    // TODO
                })
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
                        />
                    </Wrapper>
                </ScreenLayout>
            </Portal>
        );
    }
}

const Wrapper = (props) => {return (
    <View
        style={{
            // paddingVertical: 40,
            // paddingHorizontal: 10,
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
        const timestamp = new Date().getTime();
        const initialSearchId = timestamp;
        latestSearchId.current = timestamp;
        setTimeout(() => {
            if (initialSearchId < latestSearchId.current) return;
            props.searchDrugs(query);
        }, 500);
    }

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
    const [fadeAnim] = useState(new Animated.Value(0));

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 350,
            useNativeDriver: false,
        }).start();
    }, [props.drugGroups]);

    return (
            <Animated.ScrollView
                style={{
                    opacity: fadeAnim,
                    marginBottom: 30
                }}
                refreshControl={
                    <RefreshControl refreshing={props.refreshing} colors={[currentTheme.colors.primary]} />
                }
            >
            {
                Object.keys(props.drugGroups).length == 0 && !props.refreshing ?
                    (
                        <View style={{paddingTop: 20, alignItems: 'center'}}>
                            <Caption style={{paddingVertical: 10,fontSize: 16}}>
                                {props.beganToSearch ? 'No Result' : 'Search the name of the drug.'}
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
                                            />
                                        )
                                    })
                                }
                            </List.Section>
                        )
                    })
            }
            </Animated.ScrollView>
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
        <TouchableRipple onPress={() => {}} delayPressIn={ 100 }>
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
    return (
        <Surface style={searchBoxStyles.appBarHeader}>
            <View style={searchBoxStyles.appBarHeaderWrapper}>
                <View style={searchBoxStyles.headerOfHeader}>
                    <Appbar.Action icon="arrow-left" onPress={() => props.navigation.goBack()} color={currentTheme.colors.placeholder}/>
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
        elevation: 4,
        paddingLeft: 15,
        paddingRight: 10,
        paddingTop: 40,
    },
    appBarHeaderWrapper: {
        flexGrow: 1,
    },
    headerOfHeader: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bodyOfHeader: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        // paddingVertical: 20,
    },
    avatar: {
        backgroundColor: currentTheme.colors.primary,
    },
    containerBody: {
        padding: 20,
    },
    profileMenuItemContainer: {
        elevation: 4,
        marginVertical: 10,
    },
    profileMenuItem: {
    }
});
