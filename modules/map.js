const drawMap = async (svg, dimensions) => {

    console.log("addMap");

    const projection = d3
        .geoMercator()
        .center([0, 65]) // GPS of locsation to zoom on
        .scale(500) // This is like the zoom
        .translate([dimensions.width / 2, dimensions.height / 2]);

    console.log(projection);

    // Load external data and boot
    const map_data = await d3.json(
        "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
    );
    console.log(map_data);

    // Filter data
    map_data.features = map_data.features.filter(function (d) {
        // console.log(d.properties.name);
        return d.properties.name == "Sweden";
        // return d.properties.name == "France";
    });

    console.log("remaining features", map_data.features);

    // Draw the map
    svg.append("g")
        .selectAll("path")
        .data(map_data.features)
        .enter()
        .append("path")
        .attr("fill", "lightgray")
        .attr("d", d3.geoPath().projection(projection))
        .style("stroke", "none");
}

export { drawMap };
