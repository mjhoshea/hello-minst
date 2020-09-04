import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Pie = props => {
    const ref = useRef(null);
    const createPie = d3
        .pie()
        .value(d => d.value)
        .sort(null);
    const createArc = d3
        .arc()
        .innerRadius(0)
        .outerRadius(props.outerRadius);




    const colors = d3.scaleOrdinal(d3.schemeCategory10);
    const format = d3.format(".2f");

    useEffect(
        () => {
            const data = createPie(props.data);
            const group = d3.select(ref.current);
            const groupWithData = group.selectAll("g.arc").data(data);

            groupWithData.exit().remove();

            const groupWithUpdate = groupWithData
                .enter()
                .append("g")
                .attr("class", "arc");

            const path = groupWithUpdate
                .append("path")
                .merge(groupWithData.select("path.arc"));

            path
                .attr("class", "arc")
                .attr("d", createArc)
                .attr("data-legend", function(d){return d.data.name})
                .attr("fill", (d, i) => colors(i));


            const text = groupWithUpdate
                .append("text")
                .merge(groupWithData.select("text"));

            text
                .attr("text-anchor", "middle")
                .attr("alignment-baseline", "middle")
                .attr("transform", d => `translate(${createArc.centroid(d)})`)
                .style("fill", "white")
                .style("font-size", 10)
                .text(d => format(d.value));
        },
        [props.data]
    );

    return (
        <svg width="420" height="420" viewBox="0 0 200 200" >
            <g
                ref={ref}
                transform={`translate(${props.outerRadius} ${props.outerRadius})`}
            />
        </svg>
    );
};

export default Pie;