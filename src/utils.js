function randomInteger(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

export function generateLayout(count) {
  return new Array(count).fill(undefined).map((val, i) => {
    const w = 3;
    const h = randomInteger(2, 5);
    const x = (i * 3) % 18;
    const y = Math.floor(i / 6) * h;
    return { i: String(i), x, y, w, h };
  });
}

function GridCard({ children }) {
  return (
    <div>
      <div style={{ margin: "8px" }}>
        <span className="GridCard__Name">{children}</span>
      </div>
    </div>
  );
}

export function renderPlaceholderCards(count) {
  return new Array(count).fill(undefined).map((val, i) => (
    <div key={String(i)} className="GridCard">
      <GridCard>{`Card ${i + 1}`}</GridCard>
    </div>
  ));
}
