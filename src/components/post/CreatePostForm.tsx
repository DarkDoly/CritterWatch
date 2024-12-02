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
    <div>
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
            accept="image/png, image/jpeg, image/jpg, png, jpeg, jpg"
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
          className="btn w-100"
          style= {{ backgroundColor: "#f5ece5", color: "#464443" }}
          onClick={(e) => {
            e.preventDefault();

            if (location.trim() === "") {
              alert("Invalid location where you found the critter.");
              return;
            }

            if (!imageFiles) {
              alert("Please upload images for the post.");
              return;
            }

            if (description.trim() === "") {
              alert("Invalid description");
              return;
            }

            onSubmit(location, imageFiles, description);
          }}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default CreatePostForm;
