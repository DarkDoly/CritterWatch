import { useState } from "react";

interface RegisterFormProps {
  onSubmit: (
    email: string,
    username: string,
    image: FileList | null,
    password: string
  ) => void;
}

function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imageFile, setImageFile] = useState<FileList | null>(null);

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
      <div className="mb-3 mt-3">
        <label htmlFor="usernameInput" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          id="usernameInput"
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="my-3">
        <label htmlFor="imageInput" className="form-label">
          Profile Pic
        </label>
        <input
          type="file"
          className="form-control"
          id="imageInput"
          accept="image/png, image/jpeg, image/jpg, png, jpeg, jpg"
          onChange={(e) => {
            setImageFile(e.target.files);
          }}
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
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="confirmPasswordInput" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          className="form-control"
          id="confirmPasswordInput"
          autoComplete="off"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="btn btn-dark w-100"
        onClick={(e) => {
          e.preventDefault();

          if (email.trim() === "") {
            alert("Invalid email.");
            return;
          }

          if (username.trim() === "") {
            alert("Invalid username.");
            return;
          }

          if (password.trim() === "") return;

          if (password.trim() !== confirmPassword.trim()) {
            alert("Passwords do not match.");

            return;
          }

          onSubmit(email, username, imageFile, password);
        }}
      >
        Register
      </button>
    </form>
  );
}

export default RegisterForm;
