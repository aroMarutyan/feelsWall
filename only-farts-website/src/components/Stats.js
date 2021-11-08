import * as d3 from "d3";
import { useEffect } from "react";
import { colorCoding } from "../colorCoding";

const Stats = (props) => {
  // set the dimensions and margins of the graph
  const { data, outerRadius, innerRadius, messages } = props;

  const margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50,
  };

  const width = 2 * outerRadius + margin.left + margin.right;
  const height = 2 * outerRadius + margin.top + margin.bottom;

  // const colorScale = d3
  //   .scaleSequential()
  //   .interpolator(d3.interpolateCool)
  //   .domain([0, data.length]);

  useEffect(() => {
    drawChart();
  }, [data]);

  function drawChart() {
    //reduce method - more elegant solution. Check if you can implement it without too much headache
    // const filteredMessages = messages
    //   .map((entry) => {
    //     return entry.emotion;
    //   })
    //   .reduce((a, c) => a.set(c, (a.get(c) || 0) + 1), new Map());

    // console.log(filteredMessages.entries());
    // console.log(filteredMessages);

    //set and filter method - second option if can't get the upper one to output arrays
    let arr = messages.map((entry) => {
      return entry.emotion;
    });
    let unique = [...new Set(arr)];

    let dataReady = unique.map((value) => [
      value,
      arr.filter((str) => str === value).length,
    ]);

    console.log(dataReady);

    // Remove the old svg
    d3.select("#pie-container").select("svg").remove();

    // Create new svg
    const svg = d3
      .select("#pie-container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const arcGenerator = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const pieGenerator = d3
      .pie()
      .padAngle(0)
      .value((d) => d[1]);

    const arc = svg.selectAll().data(pieGenerator(dataReady)).enter();

    // Append arcs
    //DONT FORGET ABOUT .update() - can add gradual transitions
    arc
      .append("path")
      .attr("d", arcGenerator)
      .style("fill", (d) => colorCoding.get(d.data[0]))
      // .style("fill", (_, i) => colorScale(i))
      .style("stroke", "#ffffff")
      .style("stroke-width", 0);

    // Append text labels
    arc
      .append("text")
      // .data(data_ready)
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .text((d) => d.data[0])
      .style("fill", "white")
      .style("text-anchor", "middle")
      .style("font-size", 17)
      .attr("transform", function (d) {
        return `translate(${arcGenerator.centroid(d)})`;
      });
    // .attr("transform", (d) => {
    //   const [x, y] = arcGenerator.centroid(d);
    //   return `translate(${x}, ${y})`;
    // });
  }
  return (
    <>
      <div id="pie-container" />
      <h1>{messages.length}</h1>
    </>
  );
};

export default Stats;

// const Stats = () => {
//   const [messages, setMessages] = useState([]);

//   useEffect(
//     () =>
//       onSnapshot(collection(db, "messages"), (snapshot) =>
//         setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
//       ),
//     []
//   );
//   return (
//     <div>
//       <h1>Statistics</h1>
//       <h3>Number of Messages:{messages.length}</h3>
//     </div>
//   );
// };
