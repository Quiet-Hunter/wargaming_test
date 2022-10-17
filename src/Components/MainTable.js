import React, { Fragment } from "react";
import { Table, Spinner } from "react-bootstrap";
import { useContext } from "react";
import { DataContext } from "../App";

function ResourcePart({ resMap, resource }) {
    const { usernames } = useContext(DataContext);
    const sorted = [];
    usernames.forEach(name => {
        sorted.push([name, resMap && name in resMap ? resMap[name] : 0]);
    });
    // for (let name in resMap) {
    //     sorted.push([name, resMap[name]]);
    // }
    sorted.sort(function (a, b) {
        return b[1] - a[1];
    });
    return sorted.map(([name, value], i) => {
        return (
            <tr key={i}>
                <td>{name}</td>
                <td>{resource}</td>
                <td>{value}</td>
            </tr>
        );
    });
}

export function MainTable() {
    console.log("Render Table");
    const { data, time, resourceNames } = useContext(DataContext);
    const current = data ? data[time[0]] : null;
    const sortedResources = [];
    if (current) {
        resourceNames.forEach(resource => {
            const summ =
                resource in current
                    ? Object.values(current[resource]).reduce((a, b) => a + b)
                    : 0;
            sortedResources.push([resource, summ]);
        });
        sortedResources.sort(function (a, b) {
            return b[1] - a[1];
        });
    }
    return (
        <>
            {current ? (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Resouce</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedResources.map(([res, value], i) => (
                            <Fragment key={i}>
                                <tr>
                                    <td></td>
                                    <td>{res}</td>
                                    <td>{value}</td>
                                </tr>
                                <ResourcePart
                                    resMap={current[res]}
                                    resource={res}
                                    key={i}
                                />
                            </Fragment>
                        ))}
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
