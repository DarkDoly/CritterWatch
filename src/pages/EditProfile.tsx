import EditProfileForm from "../components/account/EditProfileForm";
import NavBar from "../components/nav/NavBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

function EditProfile() {
  const navigate = useNavigate();

  const [formLoading, setFormLoading] = useState(false);

  const handleEdit = async (
    username: string,
    description: string,
    image: FileList | null
  ) => {
    setFormLoading(true);

    if (!auth.currentUser) {
      navigate("/");
      return;
    }

    let user = auth.currentUser;

    let imageUrl;

    if (image) {
      const file = image[0];
      const storageRef = ref(storage, "profile_pictures/" + file.name);
      const uploadTask = await uploadBytes(storageRef, file).then();
      imageUrl = await getDownloadURL(uploadTask.ref);

      await updateDoc(doc(db, "user/", user.uid), {
        UserImage: imageUrl,
      });
    }

    await updateDoc(doc(db, "user/", user.uid), {
      UserName: username,
      Description: description,
    });

    navigate("/user/" + username);
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
                <h5 className="card-title">Edit Profile</h5>
                {formLoading ? (
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <EditProfileForm onSubmit={handleEdit} />
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

export default EditProfile;
