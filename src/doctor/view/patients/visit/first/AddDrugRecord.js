import React, {useRef, useState} from "react";
import * as Layout from "./forms/Layout";
import * as MainLayout from '../../../../../root/view/layout/Layout';
import {Caption, Searchbar, Appbar, Portal, Text, List, TouchableRipple} from "react-native-paper";
import {View, ScrollView, FlatList, Animated, RefreshControl} from 'react-native';
import {ScreenHeader, ScreenLayout} from "../../../../../root/view/screen/Layout";
import {debugBorderRed} from "../../../../../root/view/styles/borders";
import {IntraSectionDivider} from "./forms/Layout";
import {DrugHistoryStageData} from "./Data";
import {drugDao} from "../../../../data/dao/DrugDao";
import {currentTheme} from "../../../../../../theme";


export class AddDrugRecord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            drugGroups: {},
            searching: false,
        }
        this.latestSearchId = 0;
    }

    componentDidMount() {
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
                    this.updateDrugs(drugs, () => this.setState({searching: false}));
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
                    <Wrapper
                    >
                        <SearchBox searchDrugs={this.searchDrugs}/>
                        <IntraSectionDivider none/>
                        <DrugList drugGroups={this.state.drugGroups} refreshing={this.state.searching}/>
                    </Wrapper>
                </ScreenLayout>
            </Portal>
        );
    }
}

const Wrapper = (props) => {return (
    <View
        style={{
            paddingVertical: 40,
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
        }, 1000);
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
                // paddingVertical: 20,
            }}
            inputStyle={{
                textAlign: 'left',
                paddingVertical: 20,
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