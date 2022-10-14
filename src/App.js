import "./App.css";
import React from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBTable,
    MDBTableHead,
    MDBTableBody
} from "mdb-react-ui-kit";
import { Range } from "react-range";
import { useState, useEffect } from "react";

function MainTable() {
    return (
        <MDBTable striped hover>
            <MDBTableHead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td colSpan={2}>Larry the Bird</td>
                    <td>@twitter</td>
                </tr>
            </MDBTableBody>
        </MDBTable>
    );
}

function Slider() {
    const [values, setValues] = useState([50]);
    return (
        <>
            <Range
                step={1}
                min={0}
                max={100}
                values={values}
                onChange={values => setValues(values)}
                renderTrack={({ props, children }) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            height: "6px",
                            width: "100%",
                            backgroundColor: "#ccc"
                        }}
                    >
                        {children}
                    </div>
                )}
                renderThumb={({ props }) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            height: "42px",
                            width: "42px",
                            backgroundColor: "#999"
                        }}
                    />
                )}
            />
            {values}
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
                console.log(extractword(data, "{", "}"));
                console.log(data);
                return data;
            });
        // useState(data);
    }, []);

    return (
        <MDBCard style={{ width: "600px" }}>
            <MDBCardBody>
                <MainTable />
                {data}
                <Slider />
            </MDBCardBody>
        </MDBCard>
    );
}

export default App;
