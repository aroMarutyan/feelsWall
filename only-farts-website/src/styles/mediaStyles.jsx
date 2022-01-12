import { createStitches } from "@stitches/react";

// export const maxFontSize = 2.7;
// export const minFontSize = 1.3;

//breakpoints
export const bp = [320, 640, 768, 1440];
//If mobile
export const mobileTest = window.innerWidth > bp[1];

export const { styled, css } = createStitches({
  media: {
    bp0: `(min-width: ${bp[0]}px)`,
    bp1: `(min-width: ${bp[1]}px)`,
    bp2: `(min-width: ${bp[2]}px)`,
    bp3: `(min-width: ${bp[3]}px)`,
  },
});

//Dynamic font formula - potentially adjust for bp0
const defaultFontSize = 16;
export const dynamicFontSize = (minFontSize, maxFontSize) => {
  const slope =
    (maxFontSize - minFontSize) /
    (bp[3] / defaultFontSize - bp[1] / defaultFontSize);
  const yAxisIntersection = (-bp[1] / defaultFontSize) * slope + minFontSize;
  return [slope, yAxisIntersection];
};

//Dynamic animation positioning. Takes into account screen size and distributes the messages using a nonlinear regression
const initScrVal = (window.innerWidth - 320) / 1120;
const zeroVal = 0; //x
const medVal = 5; //y
const fullVal = 14; //z

const nlRegA =
  (zeroVal * fullVal - Math.pow(medVal, 2)) / (zeroVal - 2 * medVal + fullVal);
const nlRegB = Math.pow(medVal - zeroVal, 2) / (zeroVal - 2 * medVal + fullVal);
const nlRegC = 2 * Math.log((fullVal - medVal) / (medVal - zeroVal));

//Final value for the nl regression. To be used in percentages
export const nlResVal = nlRegA + nlRegB * Math.exp(nlRegC * initScrVal);

//Inverse number relation formula
export const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

///testing random stuff
// const a = 10;
// const b = 9;
// console.log(a * (a < b) + b * (b <= a));
// console.log(window.innerHeight);
