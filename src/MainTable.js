import React from "react";
import { Table } from "react-bootstrap";
import { useContext } from "react";
import { DataContext } from "./App";

export function MainTable() {
    const { data, time, usernames, resourceNames } = useContext(DataContext);
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
                            {resourceNames.map((rn, i) => {
                                return <td key={i}>{rn}</td>;
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {usernames.map((username, i) => {
                            return (
                                <tr key={i}>
                                    <td>{username}</td>
                                    {resourceNames.map((rn, i) => {
                                        return (
                                            <td key={i}>
                                                {(current[username] &&
                                                    current[username][rn]) ||
                                                    0}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                        {/* <tr>
                            <td>{"All"}</td>
                            <td>{current["all"].silver}</td>
                            <td>{current["all"].gold}</td>
                        </tr> */}
                    </tbody>
                </Table>
            )}
        </>
    );
}
