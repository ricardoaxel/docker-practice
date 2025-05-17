import { useState } from "react";

type Screen = "register" | "login" | "welcome";

const URL = "http://44.202.243.182:4000";

export default function App() {
  const [screen, setScreen] = useState<Screen>("login");
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setError(null);
    setLoading(false);
  };

  const onSuccess = (jwtToken: string) => {
    setToken(jwtToken);
    setScreen("welcome");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      // Auto-login after register
      const loginRes = await fetch(`${URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!loginRes.ok) {
        const data = await loginRes.json();
        setError(data.message || "Login after register failed");
        setLoading(false);
        return;
      }

      const data = await loginRes.json();
      onSuccess(data.token);
      resetForm();
    } catch (err) {
      setError("Network error");
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      const data = await res.json();
      onSuccess(data.token);
      resetForm();
    } catch (err) {
      setError("Network error");
      setLoading(false);
    }
  };

  if (token && screen === "welcome") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded shadow-md max-w-sm w-full text-center">
          <h1 className="text-3xl font-bold mb-4">Welcome!</h1>
          <p className="break-words mb-6">
            Your token:
            <br />
            <code className="bg-gray-100 p-2 rounded">{token}</code>
          </p>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={() => {
              setToken(null);
              setScreen("login");
            }}
          >
            Logout 4
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1>TEST 3</h1>
      <div className="mb-4">
        <button
          className={`px-4 py-2 rounded-l ${
            screen === "login" ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}
          onClick={() => {
            setScreen("login");
            resetForm();
          }}
        >
          Login 3
        </button>
        <button
          className={`px-4 py-2 rounded-r ${
            screen === "register" ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}
          onClick={() => {
            setScreen("register");
            resetForm();
          }}
        >
          Register 3
        </button>
      </div>

      {screen === "register" && (
        <form
          onSubmit={handleRegister}
          className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        >
          <h2 className="text-2xl mb-4 font-semibold">Register 3</h2>
          {error && <div className="mb-3 text-red-600">{error}</div>}
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded w-full mb-3"
          />
          <input
            type="password"
            placeholder="Password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded w-full mb-3"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 rounded w-full hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      )}

      {screen === "login" && (
        <form
          onSubmit={handleLogin}
          className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        >
          <h2 className="text-2xl mb-4 font-semibold">Login 3</h2>
          {error && <div className="mb-3 text-red-600">{error}</div>}
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded w-full mb-3"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded w-full mb-3"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 rounded w-full hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      )}
    </div>
  );
}
