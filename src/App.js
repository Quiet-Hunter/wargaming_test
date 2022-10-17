import React from "react";
import { useState, useEffect, createContext, useRef } from "react";

import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { Slider } from "./Components/Slider";
import { MainTable } from "./Components/MainTable";
import { fetchData } from "./utils";

export const DataContext = createContext();

export const usernames = [];
export const resourceNames = [];

function App() {
    const [data, setData] = useState(null);
    const [time, setTime] = useState([0]);
    const [order, setOrder] = useState(-1);
    const hasFetchedData = useRef(false);
    useEffect(() => {
        if (hasFetchedData.current === false) {
            fetchData(data, setData);
            hasFetchedData.current = true;
        }
    }, []);
    return (
        <div className="py-5" style={{ maxWidth: "1200px", margin: "auto" }}>
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
                                setData,
                                order,
                                setOrder
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
