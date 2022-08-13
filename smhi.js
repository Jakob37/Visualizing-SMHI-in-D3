console.log("Loading smihi");

const dates = [23, 24, 25, 26, 27, 28, 29];
const timeSeriesData = [1, 4, 3, 5, 6, 4, 5];

const main = async () => {
    console.log("hello world");
    const svg = d3.select("#root");
    console.log(root);

    const smhi_data = await d3.csv("data/parsed_smhi.csv");
    console.log(smhi_data[0]);

    const july_data = smhi_data.filter(({ month }) => month == "07");

    const margin = {
        top: 20,
        left: 20,
        bottom: 50,
        right: 20,
    };

    // year
    // month
    // temp
    // sd
    // nbr

    const dimensions = {
        width: 500,
        height: 300,
    };

    const maxTemp = Math.max(...july_data.map(({ temp }) => temp));
    const minTemp = Math.min(...july_data.map(({ temp }) => temp));

    const years = july_data.map(({ year }) => year);

    console.log(minTemp, maxTemp);

    const yearScale = d3
        .scalePoint()
        .domain(years)
        .range([margin.left, dimensions.width - margin.right]);
    const tempScale = d3
        .scaleLinear()
        .domain([minTemp, maxTemp])
        .range([dimensions.height - margin.bottom, margin.top]);

    const yearAxis = d3.axisBottom().scale(yearScale);
    yearAxis.tickFormat((label, i) => {
        return i % 10 != 0 ? " " : label;
    });

    svg.append("g")
        .attr(
            "transform",
            `translate(0, ${dimensions.height - margin.bottom + 10})`
        )
        .call(yearAxis)
        .call((g) =>
            g
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", "-.40em")
                .attr("transform", "rotate(-90)")
        )
        .call((g) =>
            g.selectAll(".tick line").each(function (_, i) {
                if (i % 10 != 0) d3.select(this).remove();
            })
        );

    svg.selectAll("circle")
        .data(july_data)
        .join("circle")
        .attr("cx", (d) => yearScale(d.year))
        .attr("cy", (d) => tempScale(d.temp))
        .attr("r", 2)
        .style("fill", "blue");
};
