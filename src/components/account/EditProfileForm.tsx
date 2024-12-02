import { useContext, useState } from "react";
import { UserContext } from "./UserProvider";

interface EditProfileFormProps {
  onSubmit: (
    email: string,
    username: string,
    description: string,
    image: FileList | null,
    password: string
  ) => void;
}

function EditProfileForm({ onSubmit }: EditProfileFormProps) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imageFile, setImageFile] = useState<FileList | null>(null);

  const { userData } = useContext(UserContext);

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
          value={userData?.UserEmail}
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
          value={userData?.UserName}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-3 mt-3">
        <label htmlFor="descriptionInput" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          rows={4}
          id="descriptionInput"
          autoComplete="off"
          value={userData?.Description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="my-3">
        <label htmlFor="imageInput" className="form-label">
          Update Profile Pic
        </label>
        <input
          type="file"
          className="form-control"
          id="imageInput"
          accept="image/png, image/jpeg, image/jpg"
          onChange={(e) => {
            setImageFile(e.target.files);
          }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="passwordInput" className="form-label">
          New Password
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
          Confirm New Password
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

          if (email.trim() === "") return;
          if (username.trim() === "") return;
          if (password.trim() === "") return;
          if (password.trim() !== confirmPassword.trim()) return;

          onSubmit(email, username, description, imageFile, password);
        }}
      >
        Save
      </button>
    </form>
  );
}

export default EditProfileForm;
