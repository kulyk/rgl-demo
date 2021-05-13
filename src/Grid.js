import { useMemo, useState } from "react";
import { Responsive as ResponsiveGrid, WidthProvider } from "react-grid-layout";

import ControlPanel from "./ControlPanel";
import { generateLayout, renderPlaceholderCards } from "./utils";

const CARDS_COUNT = 10;

function Grid(props) {
  const { margin } = props;
  return (
    <div className="Grid">
      <ResponsiveGrid {...props} margin={[margin, margin]} />
    </div>
  );
}

const AutoGrid = WidthProvider(Grid);

function SimpleGrid({ layout, ...props }) {
  const [{ cols, margin, ...state }, setGridState] = useState({
    margin: 6,
    compactType: null,
    ...props,
  });

  const children = useMemo(
    () => renderPlaceholderCards(layout.length),
    [layout.length]
  );

  return (
    <div className="Container">
      <ControlPanel {...state} setGridProps={setGridState} />
      <AutoGrid
        cols={{ lg: 18, md: 12, sm: 6, xs: 2, xxs: 1 }}
        margin={margin}
        layouts={{
          lg: layout,
        }}
        {...state}
      >
        {children}
      </AutoGrid>
    </div>
  );
}

SimpleGrid.defaultProps = {
  layout: generateLayout(CARDS_COUNT),
};

export default SimpleGrid;
