import React from 'react';

interface ToggleControlsProps {
    m: number;
    n: number;
    setM: (value: number) => void;
    setN: (value: number) => void;
}

const ToggleControls: React.FC<ToggleControlsProps> = ({ m, n, setM, setN }) => {
    return (
        <div className="toggle-controls">
            <label>
                m:
                <input
                    type="number"
                    value={m}
                    onChange={(e) => setM(Number(e.target.value))}
                />
            </label>
            <label>
                n:
                <input
                    type="number"
                    value={n}
                    onChange={(e) => setN(Number(e.target.value))}
                />
            </label>
        </div>
    );
};

export default ToggleControls;