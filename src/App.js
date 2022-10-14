import "./App.css";
import React from "react";
import { Card } from "react-bootstrap";
import { useState, useEffect, createContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { MainTable } from "./MainTable";
import { Slider } from "./Slider";
export const DataContext = createContext();

const usernames = []; // TODO refactor
const resourceNames = [];
const current = {};

const formCurrentState = (logObj: Object) => {
    const { name, resource, value } = logObj;
    // if (Object.keys(current.all).includes(resource)) {
    //     current.all[resource] += value;
    // } else {
    //     current.all[resource] = value;
    // }
    if (Object.keys(current).includes(name)) {
        if (Object.keys(current[name]).includes(resource)) {
            current[name][resource] += value;
        } else {
            current[name] = Object.assign(current[name], { [resource]: value });
        }
    } else {
        current[name] = { [resource]: value };
    }
    return JSON.stringify(current);
};

function App() {
    const [data, setData] = useState(null);
    const [time, setTime] = useState([0]);
    useEffect(() => {
        const data = fetch(
            "https://raw.githubusercontent.com/alexgavrushenko/lootbox/master/generated.log"
        )
            .then(response => response.text())
            .then(rawData => {
                const handledData = rawData.split("\n").map(str => {
                    const logObj = str
                        ? JSON.parse(str.replace(/'/g, '"'))
                        : null;
                    if (logObj) {
                        const { name, resource, value, timestamp } = logObj;
                        if (!usernames.includes(name)) {
                            usernames.push(name);
                        }
                        if (!resourceNames.includes(resource)) {
                            resourceNames.push(resource);
                        }
                        const formated = JSON.parse(formCurrentState(logObj));
                        // console.log(logObj.current);
                        Object.assign(formated, { timestamp });
                        return formated;
                    }
                });
                handledData.pop(); // TODO refactor
                setData(handledData);
            });
    }, []);
    console.log("Render App");
    console.log(data);
    return (
        <div className="py-5" style={{ maxWidth: "1200px" }}>
            <div className="justify-content-center">
                <Card>
                    <Card.Body>
                        <Card.Title style={{ textAlign: "center" }}>
                            Wargaming Test Task
                        </Card.Title>
                        <DataContext.Provider
                            value={{
                                data,
                                time,
                                setTime,
                                usernames,
                                resourceNames
                            }}
                        >
                            <MainTable />
                            <Slider />
                        </DataContext.Provider>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default App;
