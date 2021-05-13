import { useEffect, useCallback, useState } from "react";
import useUndo from "use-undo";
import Grid from "./Grid";
import { generateLayout } from "./utils";

function CancelDragExperiment() {
  const [isEditing, setEditing] = useState(false);

  const [
    { present: layout },
    { set: setLayout, undo, redo, canRedo, canUndo },
  ] = useUndo(generateLayout(3));

  const onDragStart = useCallback(() => {
    setEditing(true);
  }, []);

  const onDragStop = useCallback(
    (newLayout) => {
      setEditing(false);
      setLayout(newLayout);
    },
    [setLayout]
  );

  const onResizeStart = useCallback(() => {
    setEditing(true);
  }, []);

  const onResizeStop = useCallback(
    (newLayout) => {
      setEditing(false);
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
        onDragStart={onDragStart}
        onDragStop={onDragStop}
        onResizeStart={onResizeStart}
        onResizeStop={onResizeStop}
        layout={layout}
      />
    </div>
  );
}

export default CancelDragExperiment;
