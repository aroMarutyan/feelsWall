import { createStitches } from "@stitches/react";

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

//Dynamic font formula - potentially adjust for bp0. Might not be working as intended. Double-check
// const defaultFontSize = 16;
// export const dynamicFontSize = (minFontSize, maxFontSize) => {
//   const slope = (maxFontSize - minFontSize) / (bp[3] / 16 - bp[0] / 16);
//   const yAxisIntersection = (-bp[0] / 16) * slope + minFontSize;
//   return [slope, yAxisIntersection];
// };

export const dynamicFontSize = (minFontSize, maxFontSize) => {
  return (
    minFontSize +
    (maxFontSize - minFontSize) *
      ((window.innerWidth - bp[0]) / 16 / ((bp[3] - bp[0]) / 16))
  );
};

//Dynamic animation positioning. Takes into account screen size and distributes the messages using a nonlinear regression
const initScrVal = (window.innerWidth - 320) / 1120;

const regressionFormula = (zeroVal, medVal, fullVal) => {
  const regValA =
    (zeroVal * fullVal - Math.pow(medVal, 2)) /
    (zeroVal - 2 * medVal + fullVal);
  const regValB =
    Math.pow(medVal - zeroVal, 2) / (zeroVal - 2 * medVal + fullVal);
  const regValC = 2 * Math.log((fullVal - medVal) / (medVal - zeroVal));
  return [regValA, regValB, regValC];
};

const regressionFinalValue = (valA, valB, valC, valScr) => {
  return valA + valB * Math.exp(valC * valScr);
};

const msgZeroVal = 0; //x
const msgMedVal = 5; //y
const msgFullVal = 14; //z

const msgNlRegFormula = regressionFormula(msgZeroVal, msgMedVal, msgFullVal);
//Final value for the nl regression. To be used in percentages
// export const nlResVal =
//   msgNlRegFormula[0] +
//   msgNlRegFormula[1] * Math.exp(msgNlRegFormula[2] * initScrVal);

export const nlResVal = regressionFinalValue(
  msgNlRegFormula[0],
  msgNlRegFormula[1],
  msgNlRegFormula[2],
  initScrVal
);

//Inverse number relation formula
export const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

const pieMinSize = 135;
const pieMaxSize = 310;
const pieMedSize = pieMinSize + (pieMaxSize - pieMinSize) / 2 + 1;
const pieLinRegFormula = regressionFormula(pieMinSize, pieMedSize, pieMaxSize);
export const outerRadius = regressionFinalValue(
  pieLinRegFormula[0],
  pieLinRegFormula[1],
  pieLinRegFormula[2],
  initScrVal
);
export const innerRadius = 0;

///testing random stuff
// const a = 10;
// const b = 9;
// console.log(a * (a < b) + b * (b <= a));
// console.log(window.innerHeight);
