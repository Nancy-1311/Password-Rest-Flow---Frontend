import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    //  Password validation
    if (password.length < 6) {
      return alert("Password must be at least 6 characters");
    }

    try {
      setLoading(true);

      await axios.post(
        `${process.env.REACT_APP_API}/api/auth/reset-password/${token}`,
        { password }
      );

      alert("Password updated successfully");

      //  Redirect after success
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Link expired or invalid");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="col-md-6 mx-auto card p-4 shadow">
        <h3 className="text-center mb-3">Reset Password</h3>

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Enter New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn btn-success w-100"
          onClick={submitHandler}
          disabled={loading}
        >
          {loading ? "Updating..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;
