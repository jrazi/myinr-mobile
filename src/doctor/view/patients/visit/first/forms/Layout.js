import React from "react";
import {StyleSheet, View, ScrollView} from "react-native";
import {
    Title as _Title,
    Caption as _Caption,
    Headline as _Headline,
    Divider,
    Text as _Text,
    Chip,
    HelperText as _HelperText,
    useTheme
} from "react-native-paper";
import {hasValue, removeWhiteSpace} from "../../../../../../root/domain/util/Util";
import Collapsible from 'react-native-collapsible';

const Headline = ({style, ...props}) => <_Headline style={[WrapperStyles.headline, style]} {...props}/>;
const Title = ({style, ...props}) => <_Title style={[WrapperStyles.title, style]} {...props}/>;
const Caption = ({style, ...props}) => <_Caption style={[WrapperStyles.caption, style]} {...props}/>;
const Text = ({style, ...props}) => <_Text style={[WrapperStyles.text, style]} {...props}/>;
export const TextInputHelperText = ({style, ...props}) =>
    <_HelperText
        style={[{color: useTheme().colors.actionColors.remove}, WrapperStyles.helper, style]} {...props}
    />;
export const LayoutText = Text;
export const LayoutTitle = Title;
export const LayoutCaption = Caption;
export const LayoutHeadline = Headline;

export const VisitScreen = (props) => {
    const theme = useTheme();
    return (
        <ScrollView
            style={[{backgroundColor: theme.colors.surface,}, styles.screenWrapper, props.style]}
        >
            {props.children}
            <IntraSectionInvisibleDivider s/>
        </ScrollView>
    )
}

export const ViewScreen = (props) => {
    const theme = useTheme();
    return (
        <View
            style={[{backgroundColor: theme.colors.surface,}, styles.screenWrapper, props.style]}
        >
            {props.children}
            <IntraSectionInvisibleDivider s/>
        </View>
    )
}

export const FormSection = (props) => {
    return (
        <View style={styles.formSection}>
            {
                [
                    props.children,
                    props.divider ? <Divider style={{marginTop: 20,}}/> : null
                ]
            }

        </View>
    )
}

export const ScreenTitle = (props) => {
    const theme = useTheme();
    return (
        <View style={[styles.screenTitle, props.style]}>
            <Headline style={{color: theme.colors.text}}>{props.title}</Headline>
            <ConditionalRender hidden={!hasValue(props.description)}>
                <Caption>{props.description}</Caption>
            </ConditionalRender>
        </View>
    )
}

export const SectionTitle = (props) => {
    return (
        <View style={styles.sectionTitle}>
            <Title>{props.title}</Title>
            {
                !hasValue(props.description) || removeWhiteSpace(props.description) == "" ? null :
                    <Caption>{props.description}</Caption>
            }
        </View>
    )
}

export const InputTitle = (props) => {
    const theme = useTheme();
    return (
        <View style={[styles.inputTitle, props.style]}>
            <Text style={[{fontSize: 16, color: theme.colors.primary}, props.titleStyle]}>{props.title}</Text>
            {
                !hasValue(props.description) || removeWhiteSpace(props.description) == "" ? null :
                    <Caption style={styles.inputTitleDescription}>{props.description}</Caption>
            }
        </View>
    )
}

export const InputOutlineLabel = (props) => {
    const theme = useTheme();
    return (
        <View style={[props.style]}>
            <Text style={{color: theme.colors.primary}}>{props.title}</Text>
        </View>
    )
}

export const SecondaryInputTitle = (props) => {
    const theme = useTheme();
    return (
        <View style={[styles.inputTitle, props.style]}>
            <Text numberOfLines={1} ellipsizeMode={'tail'} style={{fontSize: 14, color: theme.colors.text}}>{props.title}</Text>
            {
                !hasValue(props.description) || removeWhiteSpace(props.description) == "" ? null :
                    <Caption numberOfLines={1} ellipsizeMode={'tail'} style={[styles.inputTitleDescription, {}]}>{props.description}</Caption>
            }
        </View>
    )
}

export const InputArea = (props) => {
    return (
        <View style={styles.inputArea}>
            {props.children}
        </View>
    )
}

export const RowWithDivider = (props) => {
    return (
        [
            <Divider style={{marginBottom: 10,}}/>,
            <Row {...props}>{props.children}</Row>,
            <Divider style={{marginTop: 10,}}/>
        ]
    )
}

export const RowWithBottomDivider = (props) => {
    return (
        [
            <Row {...props}>{props.children}</Row>,
            <Divider style={{marginTop: 10,}}/>
        ]
    )
}

export const Row = (props) => {return (
    <View style={
        [styles.row,
            {
                justifyContent: props.justifyAround == true ?
                    'space-around' : props.justifyBetween == true ?
                        'space-between' : props.justifyCenter ? 'center' : 'flex-start',
                flexDirection: props.rowReverse === false ? 'row' : 'row-reverse',
            },
            props.style
        ]
    }>
        {props.children}
    </View>
)}
export const ItemsBox = (props) => {
    return (
        <View style={[styles.itemsBox, props.style]}>
            {props.children}
        </View>
    )
}

export const BasicElement = (props) => {
    return (
        <View style={styles.basicElement}>
            {props.children}
        </View>
    )
}

export const PrimaryText = (props) => {
    const theme = useTheme();
    return (
        <Text style={{color: theme.colors.primary}}>{props.children}</Text>
    )
}

export const IntraSectionDivider = (props) => {
    return (
        <View style={{
            paddingVertical: props.none ? 0 : props.xxs ? 3 : props.xs ? 5 : props.s ? 10 : props.sm ? 15 : props.m ? 20 : props.l ? 30 : props.xl ? 40 : 20,
        }}>
            <Divider style={[{borderWidth: props.borderWidth}, props.style]}/>
        </View>
    )
}

export const IntraSectionInvisibleDivider = (props) => {
    return (
        <View style={{
            paddingVertical: props.none ? 0 : props.xxs ? 3 : props.xs ? 5 : props.s ? 10 : props.sm ? 15 : props.m ? 20 : props.l ? 30 : props.xl ? 40 : 20,
        }}>
        </View>
    )
}

export const ConditionalRender = (props) => {
    if ((props.hidden == true) || (props.visible == false)) return null;
    else return props.children;
}

export const ConditionalCollapsibleRender = (props) => {
    return (
        <Collapsible collapsed={props.hidden} duration={props.duration}>
            {props.children}
        </Collapsible>
    )

}
export const FormContainer = (props) => {
    return props.children;
}

export const DefaultChip = (props) => {
    return (
        <BasicElement>
            <Chip
                selected={props.selected}
                icon="information" onPress={() => props.onPress()}
            >
                {props.title}
            </Chip>
        </BasicElement>
    )
}

const styles = StyleSheet.create({
    screenWrapper: {
        flex: 1,
        elevation: 0,
        paddingTop: 20,
        paddingHorizontal: 20,
        // marginBottom: 20,
    },
    formSection: {
        paddingTop: 10,
    },
    screenTitle: {
        paddingBottom: 20,
    },
    sectionTitle: {
        paddingBottom: 10,
    },
    inputTitle: {

        // flexShrink: 1,
    },
    inputTitleDescription: {
        fontSize: 12,
        paddingVertical: 0,
        marginVertical: 0,
        // paddingHorizontal: 2,
    },
    sectionDescription: {

    },
    formTitle: {

    },
    groupTitle: {

    },
    inputArea: {
    },
    row: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        // paddingVertical: 10,
        flexWrap: 'nowrap'
    },
    itemsBox: {
        flexDirection: 'row-reverse',
        flexWrap: 'wrap',
        paddingTop: 5,
    },
    basicElement: {
        paddingHorizontal: 5,
        paddingVertical: 5,
    }
})

export const LayoutStyles = styles;

const WrapperStyles = {
    headline: {
        textAlign: 'right',
    },
    text: {
        textAlign: 'right',
    },
    caption: {
        textAlign: 'right',
    },
    title: {
        textAlign: 'right',
    },
    helper: {
        textAlign: 'right',
        paddingHorizontal: 0,
    }
}