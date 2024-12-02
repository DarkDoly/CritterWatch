import { useState } from "react";

interface CreatePostFormProps {
  onSubmit: (
    location: string,
    imageFiles: FileList,
    description: string
  ) => void;
}

function CreatePostForm({ onSubmit }: CreatePostFormProps) {
  const [location, setLocation] = useState("");
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);
  const [description, setDescription] = useState("");

  return (
    <form>
      <div className="my-3">
        <label htmlFor="locationInput" className="form-label">
          Where did you find this critter?
        </label>
        <input
          type="text"
          className="form-control"
          id="locationInput"
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="my-3">
        <label htmlFor="imageInput" className="form-label">
          Images
        </label>
        <input
          type="file"
          className="form-control"
          id="imageInput"
          accept="image/png, image/jpeg, image/jpg"
          multiple
          onChange={(e) => {
            setImageFiles(e.target.files);
          }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="descriptionInput" className="form-label">
          Description
        </label>
        <textarea
          id="descriptionInput"
          className="form-control"
          placeholder="Something cool about your critter"
          rows={5}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <button
        type="submit"
        className="btn btn-dark w-100"
        onClick={(e) => {
          e.preventDefault();

          if (location.trim() === "") return;
          if (!imageFiles) return;
          if (description.trim() === "") return;

          onSubmit(location, imageFiles, description);
        }}
      >
        Post
      </button>
    </form>
  );
}

export default CreatePostForm;
