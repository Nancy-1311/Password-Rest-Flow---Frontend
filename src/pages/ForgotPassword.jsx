import { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    try {
      setLoading(true);

      await axios.post(
        `${process.env.REACT_APP_API}/api/auth/forgot-password`,
        { email }
      );

      alert("Reset link sent to email");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="col-md-6 mx-auto card p-4 shadow">
        <h3 className="text-center mb-3">Forgot Password</h3>

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          className="btn btn-primary w-100"
          onClick={submitHandler}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;