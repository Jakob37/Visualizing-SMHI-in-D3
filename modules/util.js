// @ts-check

const d3 = window.d3;

const drawXScale = (svgGroup, axis, dimensions, margin) => {
    svgGroup
        .attr(
            "transform",
            `translate(0, ${dimensions.height - margin.bottom + 10})`
        )
        .call(axis)
        .call((g) =>
            g
                .selectAll("text")
                .style("text-a  nchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", "-.40em")
                .attr("transform", "rotate(-90)")
        )
        .call((g) =>
            g.selectAll(".tick line").each(function (_, i) {
                if (i % 10 != 0) d3.select(this).remove();
            })
        );
};

const drawYScale = (svgGroup, axis, margin) => {
    svgGroup.attr("transform", `translate(${margin.left}, 0)`).call(axis);
};

const makeTooltip = () => {
    const tooltip = d3
        .select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background", "darkblue")
        .style("border-radius", "8px")
        .style("padding", "4px")
        .style("text-align", "center")
        .style("color", "white")
        .style("opacity", 1);
    return tooltip;
};

const drawPath = (pathGroup, data, xScale, yScale) => {
    const line = d3
        .line(
            (d) => xScale(d.year),
            (d) => yScale(d.temp)
        )
        .curve(d3.curveCatmullRom.alpha(0.5));

    pathGroup
        .style("fill", "none")
        .style("stroke", "lightgray")
        .datum(data)
        .attr("d", line);
};

const drawCircles = (svg, data, xScale, yScale, tooltip) => {
    const transTime = 50;

    svg.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", (d) => xScale(d.year))
        .attr("cy", (d) => yScale(d.temp))
        .attr("r", 2)
        .style("fill", "blue")
        .on("mouseover", function (event, d) {
            d3.select(this)
                .transition()
                .duration(transTime)
                .attr("opacity", 0.6);
            tooltip.transition().duration(transTime).style("opacity", 1);

            tooltip
                .html("test")
                .style("left", event.pageX + 10 + "px")
                .style("top", event.pageY - 15 + "px")
                .text(d.temp);
        })
        .on("mouseout", function (event, d) {
            d3.select(this).transition().duration(transTime).attr("opacity", 1);
            tooltip.transition().duration(transTime).style("opacity", 0);
        });
};

export { drawXScale, drawYScale, makeTooltip, drawPath, drawCircles };
