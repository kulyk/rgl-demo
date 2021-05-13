import { useEffect, useCallback, useState } from "react";
import useUndo from "use-undo";
import Grid from "./Grid";
import { generateLayout } from "./utils";

function Controls({ canRedo, canUndo, undo, redo, cardsCount, setCardsCount }) {
  return (
    <div
      style={{
        display: "flex",
        marginTop: "24px",
      }}
    >
      <div>
        <div>
          <strong>Number of cards</strong>
          <hr />
        </div>
        <input
          name="cardsCount"
          value={cardsCount}
          placeholder="Number of cards"
          onChange={(e) => {
            if (e.target.value === "") {
              setCardsCount(0);
              return;
            }

            const val = parseInt(e.target.value);
            if (Number.isSafeInteger(val)) {
              setCardsCount(val);
            }
          }}
          style={{ maxWidth: "100px" }}
        />
      </div>
      <div style={{ marginLeft: "24px" }}>
        <div>
          <strong>Tools</strong>
          <hr />
        </div>
        <button disabled={!canUndo} onClick={undo}>
          Undo (CMD + Z)
        </button>
        <button
          disabled={!canRedo}
          onClick={redo}
          style={{ marginLeft: "8px" }}
        >
          Redo (CMD + Shift + Z)
        </button>
      </div>
    </div>
  );
}

function CancelDragExperiment() {
  const [cardsCount, setCardsCount] = useState(10);
  const [
    { present: layout },
    { set: setLayout, undo, redo, canRedo, canUndo },
  ] = useUndo(generateLayout(cardsCount));

  useEffect(() => {
    setLayout(generateLayout(cardsCount));
  }, [setLayout, cardsCount]);

  const onDragStop = useCallback(
    (newLayout) => {
      setLayout(newLayout);
    },
    [setLayout]
  );

  const onResizeStop = useCallback(
    (newLayout) => {
      setLayout(newLayout);
    },
    [setLayout]
  );

  const handleHotkeys = useCallback(
    (e) => {
      if (e.key === "z" && e.metaKey) {
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      }
    },
    [undo, redo]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleHotkeys);
    return () => document.removeEventListener("keydown", handleHotkeys);
  }, [handleHotkeys]);

  return (
    <div>
      <Controls
        canRedo={canRedo}
        canUndo={canUndo}
        undo={undo}
        redo={redo}
        cardsCount={cardsCount}
        setCardsCount={setCardsCount}
      />
      <Grid
        onDragStop={onDragStop}
        onResizeStop={onResizeStop}
        layout={layout}
      />
    </div>
  );
}

export default CancelDragExperiment;
