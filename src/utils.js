import { current } from "./App";

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
