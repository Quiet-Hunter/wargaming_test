import React from "react";
import { Table } from "react-bootstrap";
import { useContext } from "react";
import { DataContext } from "./App";

export function MainTable() {
    const { data, time, usersMap } = useContext(DataContext);
    console.log("Render Table");
    const current = data ? data[time[0]] : null;
    console.log(usersMap);

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Silver</th>
                    <th>Gold</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(usersMap).map((username, i) => {
                    return (
                        <tr key={i}>
                            <td>{username}</td>
                            <td>{current.resource}</td>
                            <td>{current.resource}</td>
                            <td>{current.value}</td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
}
