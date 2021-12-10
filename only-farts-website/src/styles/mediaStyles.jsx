import { createStitches } from "@stitches/react";

export const maxFontSize = 1.9;
export const minFontSize = 1;

const bp1 = 640;
const bp2 = 768;
const bp3 = 1440;

export const { styled, css } = createStitches({
  media: {
    bp1: `(min-width: ${bp1}px)`,
    bp2: `(min-width: ${bp2}px)`,
    bp3: `(min-width: ${bp3}px)`,
  },
});

export const slope = (maxFontSize - minFontSize) / (bp3 / 16 - bp1 / 16);
export const yAxisIntersection = (-bp1 / 16) * slope + minFontSize;
