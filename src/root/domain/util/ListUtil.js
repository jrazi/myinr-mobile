import {hasValue} from "./Util";


export default class ListUtil {

    static containsElementWithId(list, id) {
        const el = this.findOneById(list, id);
        return el ? true : false;
    }

    static findOneById(list, id) {
        if (!hasValue(list) || !hasValue(list.length)) return null;

        const item = list.find(el => el == id || (el || {}).id == id);
        return item || null;
    }

    static addById(list, newItem) {
        if (!hasValue(list) || !hasValue(list.length)) return null;

        const item = list.find(el => el == newItem.id || (el || {}).id == newItem.id) || null;
        if (item == null) {
            list.push(newItem)
        }
        else {
            Object.keys(newItem).forEach(key => item[key] = newItem[key]);
        }
    }

    static removeById(list, id) {
        if (!hasValue(list) || !hasValue(list.length)) return null;

        const index = list.findIndex(item => (item || {}).id == id);
        if (index > -1) {
            list.splice(index, 1);
            return true;
        }
        return false;
    }
}