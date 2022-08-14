// @ts-check

import {
    drawPath,
    drawXScale,
    drawYScale,
    makeTooltip,
    drawCircles,
} from "./modules/util.js";
import { drawMap } from "./modules/map.js";

const d3 = window.d3;

console.log("Loading smihi");

const main = async () => {
    console.log("hello world");
    const svg = d3.select("#root");

    // year
    // month
    // temp
    // sd
    // nbr

    const dimensions = {
        width: 500,
        height: 300,
    };

    await drawMap(svg, dimensions);
    // await addMap(svg, dimensions);
    await addDots(svg, dimensions);
};

async function addDots(svg, dimensions) {
    const smhi_data = await d3.csv("data/parsed_smhi.csv");
    console.log(smhi_data[0]);

    const july_data = /** @type {Object<String,any>[]} */ (
        smhi_data.filter(({ month }) => month == "07")
    );

    const margin = {
        top: 20,
        left: 20,
        bottom: 50,
        right: 20,
    };

    const maxTemp = Math.max(...july_data.map(({ temp }) => temp));
    const minTemp = Math.min(...july_data.map(({ temp }) => temp));

    const years = july_data.map(({ year }) => year);

    const yearScale = d3
        .scalePoint()
        .domain(years)
        .range([margin.left, dimensions.width - margin.right]);
    const tempScale = d3
        .scaleLinear()
        .domain([minTemp, maxTemp])
        .range([dimensions.height - margin.bottom, margin.top]);

    const yearAxis = d3.axisBottom(yearScale);
    yearAxis.tickFormat((label, i) => {
        return i % 10 != 0 ? " " : label;
    });

    const tempAxis = d3.axisLeft(tempScale);

    drawXScale(svg.append("g"), yearAxis, dimensions, margin);
    drawYScale(svg.append("g"), tempAxis, margin);
    drawPath(svg.append("path"), july_data, yearScale, tempScale);

    const tooltip = makeTooltip();

    drawCircles(svg, july_data, yearScale, tempScale, tooltip);
}

export { main };
