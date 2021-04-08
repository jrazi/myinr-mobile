import React from "react";
import {firstVisitDao} from "../../../../data/dao/FirstVisitDao";
import * as Layout from "./forms/Layout";
import {IntraSectionInvisibleDivider} from "./forms/Layout";
import {CheckboxGroup, ChipBox, RadioChipBox} from "./forms/ContextSpecificComponents";
import ListUtil from "../../../../../root/domain/util/ListUtil";

export class HabitsStage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        }
        this.habitItems = {...habitItems};
    }

    componentDidMount() {
        this.setState({loaded: false}, () => {
            this.firstVisit = firstVisitDao.getVisits(this.props.route.params.userId);
            const habit = this.firstVisit.habit

            Object.values(this.habitItems).forEach(condition => {
                const isConditionListed = ListUtil.findOneById(habit, condition.id) != null;
                condition['value'] = isConditionListed;
            });

            this.setState({loaded: true});
        })
    }


    modifyHabitsList = (id, value) => {
        const habit = this.firstVisit.habit;
        if (value) {
            const condition = habitItems[id] || null;
            ListUtil.addById(habit, condition)
        }
        else {
            ListUtil.removeById(habit, id);
        }
    };



    render() {
        const habitItems = Object.values(this.habitItems).sort((a, b) => b.name.length - a.name.length);

        return (
            <Layout.VisitScreen>
                <Layout.ScreenTitle title={'Habits'} description={null}/>
                <Layout.FormSection>
                    <Layout.InputArea>

                        <Layout.ItemsBox>
                            <ChipBox
                                items={habitItems}
                                onChange={(id, value) => {this.modifyHabitsList(id, value)}}
                                disableAll={this.props.readonly}
                                key={`HABIT_CHIPS_${this.state.loaded}`}
                            />
                        </Layout.ItemsBox>
                    </Layout.InputArea>
                </Layout.FormSection>

                <IntraSectionInvisibleDivider s/>

            </Layout.VisitScreen>
        )
    }
}

let habitItems = {
    43: {
        id: 43,
        name: 'Smoking',
        groupId: 5,
    },
    44: {
        id: 44,
        name: 'Opium Addiction',
        groupId: 5,
    },
    45: {
        id: 45,
        name: 'Alcohol',
        groupId: 5,
    },
}