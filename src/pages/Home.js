import '../App.css';
import React, { useState, useEffect } from "react";

function Home() {
    const [data, setData] = useState(null);
    const [loadData, setLoadData] = useState(true);
    const [err, setErr] = useState(null);

    // fetch API
    useEffect(() => {
        fetch(`https://cat-fact.herokuapp.com/facts`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `This is an HTTP error: The status is ${response.status}`
                    );
                }
                return response.json();
            })
            .then((actualData) => {
                setData(actualData);
                setErr(null);
            })
            .catch((err) => {
                setErr(err.message);
                setData(null);
            })
            .finally(() => {
                setLoadData(false);
            });
    }, []);

    return (
        <div className="App">
            {loadData && <div>wait for it...</div>}
            {err && (
                <div>{`There's problem fething data ${err}`}</div>
            )}
            <ul>
                {data &&
                    data.map(({ id, text }) => (
                        <li key={id}>
                            <h2>{text}</h2>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default Home;
