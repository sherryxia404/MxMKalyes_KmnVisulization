import React from 'react';

interface MatrixViewProps {
    matrix: boolean[][];
    toggleConnection: (row: number, col: number) => void;
}

const MatrixView: React.FC<MatrixViewProps> = ({ matrix, toggleConnection }) => {
    return (
        <div className="matrix-view">
            <table>
                <tbody>
                    {matrix.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, colIndex) => (
                                <td
                                    key={colIndex}
                                    className={cell ? 'connected' : 'disconnected'}
                                    onClick={() => toggleConnection(rowIndex, colIndex)}
                                >
                                    {cell ? '1' : '0'}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MatrixView;