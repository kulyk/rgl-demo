import { useMemo, useState } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import ControlPanel from "./ControlPanel";
import { getGridBackground, randomInteger } from "./utils";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./styles.css";

const CARDS_COUNT = 10;
const ASPECT_RATIO = 4 / 3;
const MIN_ROW_HEIGHT = 60;

function Grid({ isDraggable, margin, width, cols, ...props }) {
  const rowHeight = Math.max(
    Math.floor(width / cols / ASPECT_RATIO),
    MIN_ROW_HEIGHT
  );

  return (
    <div
      className="Grid"
      style={{
        backgroundImage: isDraggable
          ? getGridBackground({ color: "#fafafa", margin, rowHeight, ...props })
          : "",
      }}
    >
      <RGL
        cols={cols}
        isDraggable={isDraggable}
        width={width}
        rowHeight={rowHeight}
        margin={[margin, margin]}
        {...props}
      />
    </div>
  );
}

const AutoGrid = WidthProvider(Grid);

function App() {
  const [{ margin, ...state }, setGridState] = useState({
    cols: 18,
    margin: 6,
    rowHeight: 150,
    isDraggable: true,
    isResizable: true,
    isBounded: false,
    compactType: null,
    resizeHandles: ["se"],
  });

  const children = useMemo(() => {
    return new Array(CARDS_COUNT).fill(undefined).map((val, i) => {
      const x = (i * 3) % 18;
      const w = 3;
      const h = randomInteger(1, 3);
      return (
        <div
          key={i}
          className="GridCard"
          data-grid={{ x, y: Math.floor(i / 6) * h, w, h }}
        >
          <div style={{ margin: "8px" }}>
            <span className="GridCard__Name">{`Card ${i + 1}`}</span>
          </div>
        </div>
      );
    });
  }, []);

  return (
    <div className="App">
      <div className="Container">
        <ControlPanel {...state} setGridProps={setGridState} />
        <AutoGrid margin={margin} {...state}>
          {children}
        </AutoGrid>
      </div>
    </div>
  );
}

export default App;
