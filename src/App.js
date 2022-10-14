import "./App.css";
import React from "react";
import { Range, getTrackBackground } from "react-range";
import { Table, Card } from "react-bootstrap";
import { useState, useEffect, createContext, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
const DataContext = createContext();
// const TimeContext = createContext();

function MainTable() {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td colSpan={2}>Larry the Bird</td>
                    <td>@twitter</td>
                </tr>
            </tbody>
        </Table>
    );
}

function showTime(timestamp: number) {
    const date = new Date(timestamp * 1000);
    return date.toDateString() + " " + date.toLocaleTimeString();
}

function Slider() {
    const [time, setTime] = useState([0]);
    const data = useContext(DataContext);
    return (
        <>
            {data ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        margin: "2em"
                    }}
                >
                    <Range
                        values={time}
                        step={1}
                        min={0}
                        max={data.length - 1}
                        onChange={values => setTime(values)}
                        renderTrack={({ props, children }) => (
                            <div
                                onMouseDown={props.onMouseDown}
                                onTouchStart={props.onTouchStart}
                                style={{
                                    ...props.style,
                                    height: "36px",
                                    display: "flex",
                                    width: "100%"
                                }}
                            >
                                <div
                                    ref={props.ref}
                                    style={{
                                        height: "5px",
                                        width: "100%",
                                        borderRadius: "4px",
                                        background: getTrackBackground({
                                            values: time,
                                            colors: ["#548BF4", "#ccc"],
                                            min: 0,
                                            max: data.length - 1
                                        }),
                                        alignSelf: "center"
                                    }}
                                >
                                    {children}
                                </div>
                            </div>
                        )}
                        renderThumb={({ props, isDragged }) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    height: "42px",
                                    width: "42px",
                                    borderRadius: "4px",
                                    backgroundColor: "#FFF",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    boxShadow: "0px 2px 6px #AAA"
                                }}
                            >
                                <div
                                    style={{
                                        height: "16px",
                                        width: "5px",
                                        backgroundColor: isDragged
                                            ? "#548BF4"
                                            : "#CCC"
                                    }}
                                />
                            </div>
                        )}
                    />
                    <output
                        className={"example"}
                        style={{
                            marginTop: "30px"
                        }}
                        id="output"
                    >
                        {data[time] && showTime(data[time].timestamp)}
                    </output>
                </div>
            ) : null}
        </>
    );
}

function extractword(str, start, end) {
    var startindex = str.indexOf(start);
    var endindex = str.indexOf(end, startindex) + 1;
    if (startindex != -1 && endindex != -1 && endindex > startindex)
        return str.slice(startindex, endindex);
}

function App() {
    const [data, setData] = useState(null);
    useEffect(() => {
        const data = fetch(
            "https://raw.githubusercontent.com/alexgavrushenko/lootbox/master/generated.log"
        )
            .then(res => res.text())
            .then(data => {
                const dataArr = data.split("\n").map(str => {
                    return str ? JSON.parse(str.replace(/'/g, '"')) : null;
                });
                dataArr.pop(); // TODO
                setData(dataArr);
            });
    }, []);

    return (
        <div
            className="py-5"
            style={{ maxWidth: "1200px", textAlign: "center" }}
        >
            <div className="justify-content-center">
                <Card>
                    <Card.Body>
                        <Card.Title>Wargaming Test Task</Card.Title>
                        <DataContext.Provider value={data}>
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
