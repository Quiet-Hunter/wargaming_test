import React from "react";
import { Table } from "react-bootstrap";
import { useContext } from "react";
import { DataContext } from "./App";

export function MainTable() {
    const { data, time, usernames } = useContext(DataContext);
    console.log("Render Table");
    const current = data ? data[time[0]] : null;
    console.log(current);
    return (
        <>
            {current && (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Silver</th>
                            <th>Gold</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usernames.map((username, i) => {
                            return (
                                <tr key={i}>
                                    <td>{username}</td>
                                    <td>
                                        {(current[username] &&
                                            current[username].silver) ||
                                            0}
                                    </td>
                                    <td>
                                        {(current[username] &&
                                            current[username].gold) ||
                                            0}
                                    </td>
                                </tr>
                            );
                        })}
                        <tr>
                            <td>{"All"}</td>
                            <td>{current["all"].silver}</td>
                            <td>{current["all"].gold}</td>
                        </tr>
                    </tbody>
                </Table>
            )}
        </>
    );
}
