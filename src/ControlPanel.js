function ControlPanel({ compactType, setGridProps }) {
  return (
    <div>
      <div>
        <label htmlFor="compactType">Compact Type</label>
        <select
          name="compactType"
          id="compactType"
          value={compactType || ""}
          onChange={(event) => {
            setGridProps((state) => ({
              ...state,
              compactType: event.target.value || null,
            }));
          }}
          style={{ marginLeft: "8px" }}
        >
          <option value="vertical">Vertical</option>
          <option value="horizontal">Horizontal</option>
          <option value="">None</option>
        </select>
      </div>
    </div>
  );
}

export default ControlPanel;
