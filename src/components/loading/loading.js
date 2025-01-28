import "./loading.css";

export default function Loading() {
  return (
    <div className="loading">
      <span style={{ "--i": 0 }} className="dots"></span>
      <span style={{ "--i": 1 }} className="dots"></span>
      <span style={{ "--i": 2 }} className="dots"></span>
      <span style={{ "--i": 3 }} className="dots"></span>
      <span style={{ "--i": 4 }} className="dots"></span>
    </div>
  );
}
