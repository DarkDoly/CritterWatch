import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import NavBar from "../components/nav/NavBar";
import CreatePostForm from "../components/post/CreatePostForm";
import { auth, db, storage } from "../Firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function CreatePost() {
  const navigate = useNavigate();

  const [formLoading, setFormLoading] = useState(false);

  const handleCreatePost = async (
    location: string,
    imageFiles: FileList,
    description: string
  ) => {
    setFormLoading(true);

    const imageUrls: String[] = [];

    for (const file of imageFiles) {
      const storageRef = ref(storage, "images/" + file.name);
      const uploadTask = await uploadBytes(storageRef, file).then();
      const downloadUrl = await getDownloadURL(uploadTask.ref);

      imageUrls.push(downloadUrl);
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        addDoc(collection(db, "post"), {
          content: description,
          createdAt: Timestamp.now(),
          imageUrls: imageUrls,
          likes: [],
          relativeLocation: location,
          userId: auth.currentUser?.uid,
          coordinates: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        }).then((doc) => {
          navigate("/post/" + doc.id);
        });
      },
      (error) => {
        alert(
          "Location permissions must be enabled to create post: " +
            error.message
        );

        navigate("/");
      }
    );
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="row">
          <div className="col-3"></div>

          <div className="col-6">
            <div className="card my-5">
              <div className="card-body">
                <h5 className="card-title">Create a post</h5>
                {formLoading ? (
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <CreatePostForm onSubmit={handleCreatePost} />
                )}
              </div>
            </div>
          </div>

          <div className="col-3"></div>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
