import "./App.css";
import React from "react";
import { Card } from "react-bootstrap";
import { useState, useEffect, createContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { MainTable } from "./MainTable";
import { Slider } from "./Slider";
export const DataContext = createContext();

const usersMap = {};
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
                        const name = logObj.name;
                        if (!Object.keys(logObj).includes(name)) {
                            usersMap[name] = logObj.value;
                        } else {
                            usersMap[name] += logObj.value;
                        }
                    }
                    return logObj;
                });
                handledData.pop(); // TODO refactor
                setData(handledData);
            });
    }, []);
    console.log("Render App");
    return (
        <div
            className="py-5"
            style={{ maxWidth: "1200px", textAlign: "center" }}
        >
            <div className="justify-content-center">
                <Card>
                    <Card.Body>
                        <Card.Title>Wargaming Test Task</Card.Title>
                        <DataContext.Provider
                            value={{ data, time, setTime, usersMap }}
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
