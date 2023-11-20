// Set up chart dimensions and margins
const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const width = 400 - margin.left - margin.right;
const height = 300 - margin.top - margin.bottom;

const svg = d3.select("#bow-chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Define x and y scales
const x = d3.scaleBand()
    .range([0, width])
    .padding(0.1);

const y = d3.scaleLinear()
    .range([height, 0]);

// Add x and y axes
svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x)); // Add x-axis and style it

svg.append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(y)); // Add y-axis and style it

// Function to update the graph with a new BoW vector
function updateGraph(bowVector) {
    // Update the domain of x and y scales based on the new data
    x.domain(d3.range(bowVector.length));
    y.domain([0, d3.max(bowVector)]);

    // Update bars
    const bars = svg.selectAll(".bar")
        .data(bowVector);

    bars.enter().append("rect")
        .attr("class", "bar")
        .merge(bars)
        .attr("x", (d, i) => x(i))
        .attr("y", d => y(d))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d))
        .style("fill", "black"); // Set the fill color to black for the bars

    bars.exit().remove();

    // Update x and y axes
    svg.select(".x-axis")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-0.5em")
        .attr("dy", "0.15em")
        .attr("transform", "rotate(-45)"); // Rotate x-axis labels for better readability

    svg.select(".y-axis")
        .call(d3.axisLeft(y))
        .selectAll("text")
        .style("text-anchor", "end");
}

// Export the updateGraph function
// export { updateGraph };
