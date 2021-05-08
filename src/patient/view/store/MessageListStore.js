import {hasValue} from "../../../root/domain/util/Util";
import {isDateWithinThisMonth, isDateWithinThisWeek, isDateWithinToday} from "../../../root/domain/util/DateUtil";

export const MessageListFilterType = {
    'MY_MESSAGES': 'MY_MESSAGES',
    'PHYSICIAN_MESSAGES': 'PHYSICIAN_MESSAGES',
    'ALL': 'ALL',
}
class MessageListStore {

    constructor(messages) {
        this.messages = messages || [];
        this.myMessages = this.filterMyMessages();
        this.physicianMessages = this.filterPhysicianMessages();
    }

    changeMessages(messages) {
        this.reset();
        this.messages = messages || [];
        this.myMessages = this.filterMyMessages();
        this.physicianMessages = this.filterPhysicianMessages();
    }

    reset() {
        this.messages = [];
        this.myMessages = null;
        this.physicianMessages = null;
    }

    filterByType(type) {
        switch (type) {
            case MessageListFilterType.MY_MESSAGES:
                return this.filterMyMessages();
            case MessageListFilterType.PHYSICIAN_MESSAGES:
                return this.filterPhysicianMessages();
            default:
                return this.filterAll();
        }
    }

    filterAll() {
        return this.messages;
    }

    filterMyMessages() {
        if (hasValue(this.myMessages))
            return this.myMessages;

        this.myMessages = this.messages.filter(message => message.meta.fromPatient);
        return this.myMessages;
    }

    filterPhysicianMessages() {
        if (hasValue(this.physicianMessages))
            return this.physicianMessages;

        this.physicianMessages = this.messages.filter(message => message.meta.toPatient);
        return this.physicianMessages;
    }

}

export const messageListStore = new MessageListStore([]);
