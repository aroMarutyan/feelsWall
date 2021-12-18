import { createStitches } from "@stitches/react";

export const maxFontSize = 1.9;
export const minFontSize = 1;

const bp0 = 320;
const bp1 = 640;
const bp2 = 768;
const bp3 = 1440;

export const { styled, css } = createStitches({
  media: {
    bp0: `(min-width: ${bp0}px)`,
    bp1: `(min-width: ${bp1}px)`,
    bp2: `(min-width: ${bp2}px)`,
    bp3: `(min-width: ${bp3}px)`,
  },
});

//Dynamic font formula
export const slope = (maxFontSize - minFontSize) / (bp3 / 16 - bp1 / 16);
export const yAxisIntersection = (-bp1 / 16) * slope + minFontSize;

//Dynamic animation positioning. Takes into account screen size and distributes the messages using a nonlinear regression
const initScrVal = (window.innerWidth - 320) / 1120;
const zeroVal = 0; //x
const medVal = 15; //y
const fullVal = 45; //z

const nlRegA =
  (zeroVal * fullVal - Math.pow(medVal, 2)) / (zeroVal - 2 * medVal + fullVal);
const nlRegB = Math.pow(medVal - zeroVal, 2) / (zeroVal - 2 * medVal + fullVal);
const nlRegC = 2 * Math.log((fullVal - medVal) / (medVal - zeroVal));

//Final value for the nl regression. To be used in percentages
export const nlResVal = nlRegA + nlRegB * Math.exp(nlRegC * initScrVal);

console.log(initScrVal);
console.log(nlRegA);
console.log(nlRegB);
console.log(nlRegC);
console.log(nlResVal);
