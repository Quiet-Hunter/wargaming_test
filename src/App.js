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

function MainTable() {
    return null;
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

function App() {
    return (
        <MDBCard style={{ width: "600px" }}>
            <MDBCardBody>
                <MainTable />
                <Slider />
            </MDBCardBody>
        </MDBCard>
    );
}

export default App;
