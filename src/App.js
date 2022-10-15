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

function App() {
    const [data, setData] = useState(null);
    const [time, setTime] = useState([0]);
    useEffect(() => {
        fetch(
            "https://raw.githubusercontent.com/alexgavrushenko/lootbox/master/generated.log"
        )
            .then(response => response.text())
            .then(rawData => {
                for (var line in current) delete current[line]; // TODO refactor
                const handledData = rawData.split("\n").map(str => {
                    const logObj = str
                        ? JSON.parse(str.replace(/'/g, '"'))
                        : null;
                    if (logObj) {
                        const { name, resource, timestamp } = logObj;
                        if (!usernames.includes(name)) {
                            usernames.push(name);
                        }
                        if (!resourceNames.includes(resource)) {
                            resourceNames.push(resource);
                        }
                        const formated = JSON.parse(formCurrentState(logObj));
                        // console.log(formated);
                        Object.assign(formated, { timestamp });
                        // console.log(formated);
                        return formated;
                    }
                    return null;
                });
                handledData.pop(); // TODO refactor
                // console.log(handledData);
                setData(handledData);
            });
    }, []);
    console.log("Render App");
    // console.log(data);
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
                            <Slider />
                            <MainTable />
                        </DataContext.Provider>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default App;
