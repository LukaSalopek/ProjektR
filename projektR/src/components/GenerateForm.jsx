import { useState } from "react";
import { generateSimulation } from "../components/simulatorApi.jsx";

export default function GenerateForm() {
  const [users, setUsers] = useState(1);
  const [events, setEvents] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const blob = await generateSimulation(users, events);

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "simulation.csv";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Generate Simulation</h2>

      <label>
        Users:
        <input
          type="number"
          value={users}
          onChange={(e) => setUsers(e.target.value)}
        />
      </label>

      <label>
        Events:
        <input
          type="number"
          value={events}
          onChange={(e) => setEvents(e.target.value)}
        />
      </label>

      <button disabled={loading}>
        {loading ? "Generating..." : "Generate"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
