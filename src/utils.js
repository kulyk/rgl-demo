import _ from "lodash";

function getCellSize({ width, margin, cols, rowHeight }) {
  return {
    width: (width + margin) / cols,
    height: rowHeight,
  };
}

export function getGridBackground({ color, width, margin, cols, rowHeight }) {
  const cellSize = getCellSize({ width, margin, cols, rowHeight });
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='${
      cellSize.width * cols
    }' height='${cellSize.height}'>` +
    _(cols)
      .times(
        (i) =>
          `<rect stroke='${color}' stroke-width='1' fill='none' x='${
            Math.round(margin / 2 + i * cellSize.width) + 1.5
          }' y='${margin / 2 + 1.5}' width='${Math.round(
            cellSize.width - margin - 3
          )}' height='${cellSize.height - margin - 3}'/>`
      )
      .join("") +
    `</svg>`;
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
}

export function randomInteger(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}
