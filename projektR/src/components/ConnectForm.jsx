import { useState } from "react";
import { connectManual } from "../components/simulatorApi.jsx";

export default function ConnectForm() {
  const [form, setForm] = useState({
    imei: "",
    x: "",
    y: "",
    timestamp: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await connectManual(form);
    alert("Connect sent!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Manual Connect</h2>

      <input name="imei" placeholder="IMEI" onChange={handleChange} />
      <input name="x" placeholder="X" onChange={handleChange} />
      <input name="y" placeholder="Y" onChange={handleChange} />
      <input name="timestamp" placeholder="Timestamp" onChange={handleChange} />

      <button>Send</button>
    </form>
  );
}
