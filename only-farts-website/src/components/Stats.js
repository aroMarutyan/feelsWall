import * as d3 from "d3";
import { useEffect } from "react";
import { colorCoding } from "../core/colorCoding";

import {
  css,
  dynamicFontSize,
  mobileTest,
  outerRadius,
  innerRadius,
} from "../styles/mediaStyles";

const Stats = ({ messages }) => {
  //Messages submitted dymanic font
  const msgMinFontSize = 1.8;
  const msgMaxFontSize = 4.6;
  const msgFontSize = dynamicFontSize(msgMinFontSize, msgMaxFontSize);
  //Pie chart dynamic font
  const chartMinFontSize = 1.3;
  const chartMaxFontSize = 2.2;
  const chartFontSize = dynamicFontSize(chartMinFontSize, chartMaxFontSize);
  //Message breakdown dynamic font
  const breakdownMinFontSize = 1.3;
  const breakdownMaxFontSize = 2.6;
  const breakdownFontSize = dynamicFontSize(
    breakdownMinFontSize,
    breakdownMaxFontSize
  );

  const gridStats = css({
    height: "95vh",
    width: "95vw",
    display: "grid",

    variants: {
      variant: {
        mobile: {
          gridTemplateColumns: "1fr",
          gridTemplateRows: "1fr 1fr 1fr",
        },
        desktop: {
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
        },
      },
    },
  });

  const pieChartStyle = css({
    variants: {
      variant: {
        desktop: {
          gridRow: "1 /span 2",
        },
      },
    },
  });

  const messagesStyle = css({
    fontSize: `clamp(${msgMinFontSize}rem, ${msgFontSize}rem, ${msgMaxFontSize}rem)`,
    color: "black",
  });

  const msgBreakdownStyle = css({
    fontSize: `clamp(${breakdownMinFontSize}rem, ${breakdownFontSize}rem, ${breakdownMaxFontSize}rem)`,
    color: "black",
    listStyle: "none",
    // alignSelf: "center",
    placeSelf: "center",
  });

  const margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50,
  };

  const width = 2 * outerRadius + margin.left + margin.right;
  const height = 2 * outerRadius + margin.top + margin.bottom;

  useEffect(() => {
    drawChart();
  }, [messages]);

  const childKiller = (parent) => {
    while (parent.firstChild) {
      parent.firstChild.remove();
    }
  };

  const dataRetriever = (messages) => {
    let arr = messages.map((entry) => {
      return entry.emotion;
    });
    let unique = [...new Set(arr)];

    let finalData = unique.map((value) => [
      value,
      arr.filter((str) => str === value).length,
    ]);
    return finalData.sort();
  };
  const dataReady = dataRetriever(messages);

  const breakdownList = document.getElementById("breakdown-list");
  const breakdownListGenerator = (arr, list) => {
    breakdownList !== null && childKiller(breakdownList);

    arr.forEach((entry) => {
      let listItem = document.createElement("li");
      listItem.innerHTML = `${entry[1]} ${
        entry[1] > 1 ? "people are" : "person is"
      } ${entry[0] === "love" ? "in" : ""} ${entry[0]}`;
      list.appendChild(listItem);
    });
  };
  dataReady && breakdownListGenerator(dataReady, breakdownList);

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

    arc
      .append("path")
      .attr("d", arcGenerator)
      .style("fill", (d) => colorCoding.get(d.data[0]))
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
      .style(
        "font-size",
        `clamp(${chartMinFontSize}rem, ${chartFontSize}rem, ${chartMaxFontSize}rem)`
      )
      .attr("transform", function (d) {
        return `translate(${arcGenerator.centroid(d)})`;
      });
  }

  return (
    <div className={gridStats({ variant: mobileTest ? "desktop" : "mobile" })}>
      <div
        id="pie-container"
        className={pieChartStyle({ variant: mobileTest && "desktop" })}
      />
      <h1 className={messagesStyle()}>Feelings Shared: {messages.length}</h1>
      <ul className={msgBreakdownStyle()} id="breakdown-list"></ul>
    </div>
  );
};

export default Stats;
