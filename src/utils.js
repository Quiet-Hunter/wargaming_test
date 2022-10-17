import { resourceNames, usernames } from "./App";

const current = {};

export const formCurrentState = (logObj: Object) => {
    const { name, resource, value } = logObj;
    if (Object.keys(current).includes(resource)) {
        if (Object.keys(current[resource]).includes(name)) {
            current[resource][name] += value;
        } else {
            current[resource] = Object.assign(current[resource], {
                [name]: value
            });
        }
    } else {
        current[resource] = { [name]: value };
    }
    return JSON.stringify(current); // TODO refactoring
};

const parseData = rawData => {
    return rawData.split("\n").map(str => {
        const logObj = str ? JSON.parse(str.replace(/'/g, '"')) : null;
        if (logObj) {
            const { name, resource, timestamp } = logObj;
            if (!usernames.includes(name)) {
                usernames.push(name);
            }
            if (!resourceNames.includes(resource)) {
                resourceNames.push(resource);
            }
            const formated = JSON.parse(formCurrentState(logObj));
            Object.assign(formated, { timestamp });
            return formated;
        }
        return null;
    });
};

export const fetchData = (data, setData) => {
    fetch(
        "https://raw.githubusercontent.com/alexgavrushenko/lootbox/master/generated.log"
    )
        .then(response => response.text())
        .then(rawData => {
            const handledData = parseData(rawData);
            handledData.pop(); // TODO refactor
            setData(handledData);
        });
};
