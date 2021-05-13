import { useEffect, useCallback } from "react";
import useUndo from "use-undo";
import Grid from "./Grid";
import { generateLayout } from "./utils";

function CancelDragExperiment() {
  const [
    { present: layout },
    { set: setLayout, undo, redo, canRedo, canUndo },
  ] = useUndo(generateLayout(10));

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
      <button disabled={!canUndo} onClick={undo}>
        Undo (CMD + Z)
      </button>
      <button disabled={!canRedo} onClick={redo}>
        Redo (CMD + Shift + Z)
      </button>
      <Grid
        onDragStop={onDragStop}
        onResizeStop={onResizeStop}
        layout={layout}
      />
    </div>
  );
}

export default CancelDragExperiment;
