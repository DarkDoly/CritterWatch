import { useState } from "react";
import { Link } from "react-router-dom";

interface SignInFormProps {
  onSubmit: (email: string, password: string) => void;
}

function SignInForm({ onSubmit }: SignInFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form>
      <div className="mb-3 mt-3">
        <label htmlFor="emailInput" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="emailInput"
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="passwordInput" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="passwordInput"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="btn btn-dark"
        onClick={(e) => {
          e.preventDefault();

          onSubmit(email, password);
        }}
      >
        Sign In
      </button>
      <div className="mt-2">
        <Link to={"/forgot"} className="text-dark">
          Forgot password?
        </Link>
      </div>
    </form>
  );
}

export default SignInForm;
