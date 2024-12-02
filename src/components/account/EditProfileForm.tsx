import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserProvider";

interface EditProfileFormProps {
  onSubmit: (
    username: string,
    description: string,
    image: FileList | null
  ) => void;
}

function EditProfileForm({ onSubmit }: EditProfileFormProps) {
  const { userData } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<FileList | null>(null);

  useEffect(() => {
    setUsername(userData ? userData.UserName : "");
    setDescription(userData ? userData.Description : "");
  }, [userData]);

  return (
    <form>
      <div className="mb-3 mt-3">
        <label htmlFor="usernameInput" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          id="usernameInput"
          autoComplete="off"
          value={username}
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
          value={description}
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
          accept="image/png, image/jpeg, image/jpg, png, jpeg, jpg"
          onChange={(e) => {
            setImageFile(e.target.files);
          }}
        />
      </div>
      <button
        type="submit"
        className="btn w-100"
        style= {{ backgroundColor: "#f5ece5", color: "#464443" }}
        onClick={(e) => {
          e.preventDefault();

          onSubmit(username, description, imageFile);
        }}
      >
        Save
      </button>
    </form>
  );
}

export default EditProfileForm;
