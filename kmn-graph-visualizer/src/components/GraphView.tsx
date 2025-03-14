import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Node, Edge } from '../types';

const GraphView: React.FC<{ m: number; n: number; connections: boolean[][]; toggleConnection: (i: number, j: number) => void }> = ({ m, n, connections, toggleConnection }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);

    useEffect(() => {
        const newNodes: Node[] = [];
        const newEdges: Edge[] = [];

        for (let i = 0; i < m; i++) {
            newNodes.push({ id: `A${i}` });
        }
        for (let j = 0; j < n; j++) {
            newNodes.push({ id: `B${j}` });
        }

        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (connections[i][j]) {
                    newEdges.push({ source: `A${i}`, target: `B${j}` });
                }
            }
        }

        setNodes(newNodes);
        setEdges(newEdges);
    }, [m, n, connections]);

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const width = 600;
        const height = 400;

        svg.attr('width', width).attr('height', height);

        const nodeElements = svg.selectAll('.node')
            .data(nodes)
            .enter()
            .append('circle')
            .attr('class', 'node')
            .attr('r', 5)
            .attr('fill', 'blue')
            .attr('cx', (d, i) => (i < m ? 100 : 300))
            .attr('cy', (d, i) => (i < m ? i * 30 + 50 : (i - m) * 30 + 50))
            .on('click', (event, d) => {
                const index = d.id.startsWith('A') ? parseInt(d.id.slice(1)) : parseInt(d.id.slice(1)) + m;
                const connectedNodes = d.id.startsWith('A') ? Array.from({ length: n }, (_, j) => toggleConnection(index, j)) : Array.from({ length: m }, (_, i) => toggleConnection(i, index - m));
            });

        const edgeElements = svg.selectAll('.edge')
            .data(edges)
            .enter()
            .append('line')
            .attr('class', 'edge')
            .attr('x1', (d) => (nodes.findIndex(node => node.id === d.source) < m ? 100 : 300))
            .attr('y1', (d) => (nodes.findIndex(node => node.id === d.source) < m ? nodes.findIndex(node => node.id === d.source) * 30 + 50 : (nodes.findIndex(node => node.id === d.source) - m) * 30 + 50))
            .attr('x2', (d) => (nodes.findIndex(node => node.id === d.target) < m ? 100 : 300))
            .attr('y2', (d) => (nodes.findIndex(node => node.id === d.target) < m ? nodes.findIndex(node => node.id === d.target) * 30 + 50 : (nodes.findIndex(node => node.id === d.target) - m) * 30 + 50))
            .attr('stroke', 'black');

    }, [nodes, edges, connections]);

    return <svg ref={svgRef}></svg>;
};

export default GraphView;