import { useState } from "react";

interface ForgotFormProps {
  onSubmit: (email: string) => void;
}

function ForgotForm({ onSubmit }: ForgotFormProps) {
  const [email, setEmail] = useState("");

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
      <button
        type="submit"
        className="btn btn-dark w-100"
        onClick={(e) => {
          e.preventDefault();

          onSubmit(email);
        }}
      >
        Send Reset Email
      </button>
    </form>
  );
}

export default ForgotForm;
