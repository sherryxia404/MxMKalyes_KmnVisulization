export type Node = {
    id: number;
    label: string;
};

export type Edge = {
    source: number;
    target: number;
};

export type ConnectionState = {
    [key: string]: boolean;
};

export type GraphProps = {
    nodes: Node[];
    edges: Edge[];
    connectionState: ConnectionState;
    toggleConnection: (source: number, target: number) => void;
};

export type MatrixProps = {
    connectionState: ConnectionState;
    m: number;
    n: number;
    toggleConnection: (source: number, target: number) => void;
};

export type ToggleControlsProps = {
    m: number;
    n: number;
    setM: (value: number) => void;
    setN: (value: number) => void;
};