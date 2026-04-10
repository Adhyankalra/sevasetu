import React, { useState } from "react";
import { requestOtp, verifyOtp } from "../services/authService";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [message, setMessage] = useState("");

  const handleRequestOtp = async () => {
    const data = await requestOtp(phone);
    setSessionId(data.sessionId || "demo-session");
    setMessage("OTP sent (demo mode uses 123456)");
  };

  const handleVerifyOtp = async () => {
    const data = await verifyOtp({ phone, otp, sessionId });
    setMessage(data.message || "Login successful");
  };

  return (
    <section className="rounded-lg bg-slate-800 p-4 shadow-lg">
      <h2 className="mb-3 text-xl font-semibold">OTP Login</h2>
      <div className="grid gap-2 md:grid-cols-3">
        <input className="rounded border border-slate-600 bg-slate-900 px-3 py-2" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input className="rounded border border-slate-600 bg-slate-900 px-3 py-2" placeholder="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
        <button onClick={handleRequestOtp} className="rounded bg-cyan-500 px-3 py-2 font-medium text-slate-900">Request OTP</button>
      </div>
      <button onClick={handleVerifyOtp} className="mt-2 rounded bg-emerald-500 px-3 py-2 font-medium text-slate-900">Verify OTP</button>
      {message ? <p className="mt-2 text-sm text-slate-300">{message}</p> : null}
    </section>
  );
};

export default Login;
