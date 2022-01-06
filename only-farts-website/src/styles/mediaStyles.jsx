import { createStitches } from "@stitches/react";

export const maxFontSize = 1.9;
export const minFontSize = 1;

//breakpoints
export const bp = [320, 640, 768, 1440];

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
export const slope =
  (maxFontSize - minFontSize) /
  (bp[3] / defaultFontSize - bp[1] / defaultFontSize);
export const yAxisIntersection =
  (-bp[1] / defaultFontSize) * slope + minFontSize;

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

// console.log(initScrVal);
// console.log(nlRegA);
// console.log(nlRegB);
// console.log(nlRegC);
// console.log(nlResVal);

///testing random stuff
// const a = 10;
// const b = 9;
// console.log(a * (a < b) + b * (b <= a));
console.log(window.innerHeight);
