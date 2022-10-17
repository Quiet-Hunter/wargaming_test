import "./App.css";
import React from "react";
import { Card } from "react-bootstrap";
import { useState, useEffect, createContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { MainTable } from "./Components/MainTable";
import { Slider } from "./Components/Slider";
import { formCurrentState } from "./utils";
export const DataContext = createContext();

const usernames = []; // TODO refactor
const resourceNames = [];
export const current = {};

const fetchData = (data, setData) => {
    fetch(
        "https://raw.githubusercontent.com/alexgavrushenko/lootbox/master/generated.log"
    )
        .then(response => response.text())
        .then(rawData => {
            for (var line in current) delete current[line]; // TODO refactor
            const handledData = rawData.split("\n").map(str => {
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
};

function App() {
    const [data, setData] = useState(null);
    const [time, setTime] = useState([0]);
    useEffect(() => {
        fetchData(data, setData);
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
                                setTime
                            }}
                        >
                            <Slider />
                        </DataContext.Provider>
                        <DataContext.Provider
                            value={{
                                data,
                                time,
                                resourceNames,
                                usernames
                            }}
                        >
                            <MainTable />
                        </DataContext.Provider>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default App;
