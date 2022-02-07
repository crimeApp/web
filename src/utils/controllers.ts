import { keys } from "@material-ui/core/styles/createBreakpoints"

type DataStructStadistic = {
    labels: string[],
    datasets: [
        {
            data: number[]
        }
    ]
}

export const ObjectToDataStruct = (obj: any): DataStructStadistic => {
    let labels: string[] = []
        , data: number[] = []

    Object.keys(obj).map((key: string) => {
        labels.push(key)
        data.push(obj[key])
    })

    return {
        labels: labels,
        datasets: [
            {
                data: data
            }
        ]
    }
}

export const deepDiffMapper = () => ({
    VALUE_CREATED: 'Creado',
    VALUE_UPDATED: 'Actualizado',
    VALUE_DELETED: 'Eliminado',
    VALUE_UNCHANGED: 'Sin cambios',
    map: function (obj1, obj2, label?) {
        if (this.isFunction(obj1) || this.isFunction(obj2)) {
            throw 'Invalid argument. Function given, object expected.';
        }
        if (this.isValue(obj1) || this.isValue(obj2)) {
            let val = this.compareValues(obj1, obj2);
            if (this.VALUE_UNCHANGED === val)
                return
            return {
                label,
                type: this.compareValues(obj1, obj2),
                now: obj1,
                before: obj2
            };
        }

        let diff = [];
        for (let key in obj1) {
            if (this.isFunction(obj1[key])) {
                continue;
            }

            let value2 = undefined;
            if (obj2[key] !== undefined) {
                value2 = obj2[key];
            }

            //@ts-ignore
            diff.push(this.map(obj1[key], value2, key));
        }
        for (let key in obj2) {
            if (this.isFunction(obj2[key]) || diff[key] !== undefined) {
                continue;
            }

            let value2 = undefined;
            if (obj1[key] !== undefined) {
                value2 = obj2[key];
            }

            //@ts-ignore
            diff.push(this.map(value2, obj2[key], key));
        }

        return diff.filter(v => !!v);
    },
    compareValues: function (value1, value2) {
        if (value1 === value2 || this.isDate(value1) && this.isDate(value2) && value1.getTime() === value2.getTime()) {
            return this.VALUE_UNCHANGED;
        }
        if (value2 === undefined) {
            return this.VALUE_CREATED;
        }
        if (value1 === undefined) {
            return this.VALUE_DELETED;
        }
        return this.VALUE_UPDATED;
    },
    isFunction: function (x) {
        return Object.prototype.toString.call(x) === '[object Function]';
    },
    isArray: function (x) {
        return Object.prototype.toString.call(x) === '[object Array]';
    },
    isDate: function (x) {
        return Object.prototype.toString.call(x) === '[object Date]';
    },
    isObject: function (x) {
        return Object.prototype.toString.call(x) === '[object Object]';
    },
    isValue: function (x) {
        return !this.isObject(x) && !this.isArray(x);
    }
});