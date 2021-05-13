import { useMemo, useState } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import ControlPanel from "./ControlPanel";
import { generateLayout, renderPlaceholderCards } from "./utils";

const CARDS_COUNT = 10;
const ASPECT_RATIO = 4 / 3;
const MIN_ROW_HEIGHT = 60;

function Grid(props) {
  const { margin, width, cols } = props;
  const rowHeight = Math.max(
    Math.floor(width / cols / ASPECT_RATIO),
    MIN_ROW_HEIGHT
  );

  return (
    <div className="Grid">
      <RGL rowHeight={rowHeight} {...props} margin={[margin, margin]} />
    </div>
  );
}

const AutoGrid = WidthProvider(Grid);

function SimpleGrid({ layout, ...props }) {
  const [{ margin, ...state }, setGridState] = useState({
    cols: 18,
    margin: 6,
    isDraggable: true,
    isResizable: true,
    isBounded: false,
    compactType: null,
    resizeHandles: ["se"],
    ...props,
  });

  const children = useMemo(
    () => renderPlaceholderCards(layout.length),
    [layout.length]
  );

  return (
    <div className="Container">
      <ControlPanel {...state} setGridProps={setGridState} />
      <AutoGrid margin={margin} layout={layout} {...state}>
        {children}
      </AutoGrid>
    </div>
  );
}

SimpleGrid.defaultProps = {
  layout: generateLayout(CARDS_COUNT),
};

export default SimpleGrid;
