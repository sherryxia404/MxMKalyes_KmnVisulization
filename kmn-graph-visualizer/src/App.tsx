import React, { useState } from 'react';
import GraphView from './components/GraphView';
import MatrixView from './components/MatrixView';
import ToggleControls from './components/ToggleControls';
import './styles/App.css';

const App = () => {
    const [m, setM] = useState(3); // default value for m
    const [n, setN] = useState(3); // default value for n
    const [connections, setConnections] = useState<boolean[][]>(Array(m).fill(Array(n).fill(false)));

    const toggleConnection = (i: number, j: number) => {
        const newConnections = connections.map(row => [...row]);
        newConnections[i][j] = !newConnections[i][j];
        setConnections(newConnections);
    };

    const updateM = (newM: number) => {
        setM(newM);
        setConnections(Array(newM).fill(Array(n).fill(false)));
    };

    const updateN = (newN: number) => {
        setN(newN);
        setConnections(Array(m).fill(Array(newN).fill(false)));
    };

    return (
        <div className="app">
            <h1>K<sub>m,n</sub> Graph Visualizer</h1>
            <ToggleControls m={m} n={n} updateM={updateM} updateN={updateN} />
            <GraphView m={m} n={n} connections={connections} toggleConnection={toggleConnection} />
            <MatrixView m={m} n={n} connections={connections} toggleConnection={toggleConnection} />
        </div>
    );
};

export default App;