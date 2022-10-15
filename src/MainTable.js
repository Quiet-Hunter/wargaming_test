import React from "react";
import { Table, Spinner } from "react-bootstrap";
import { useContext } from "react";
import { DataContext } from "./App";

export function MainTable() {
    const { data, time, usernames, resourceNames } = useContext(DataContext);
    console.log("Render Table");
    const current = data ? data[time[0]] : null;
    console.log(current);
    return (
        <>
            {current ? (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>All</th>
                            {usernames.map((rn, i) => {
                                return <td key={i}>{rn}</td>;
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {resourceNames.map((resource, i) => {
                            let summ = 0;
                            if (current.hasOwnProperty(resource)) {
                                summ = Object.values(current[resource]).reduce(
                                    (a, b) => a + b
                                );
                            }
                            return (
                                <tr key={i}>
                                    <td>{resource}</td>
                                    <td>{summ}</td>
                                    {usernames.map((rn, i) => {
                                        return (
                                            <td key={i}>
                                                {(current[resource] &&
                                                    current[resource][rn]) ||
                                                    0}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            ) : (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "40px"
                    }}
                >
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}
        </>
    );
}
