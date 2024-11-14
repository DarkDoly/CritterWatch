import { useState } from "react";
import RegisterForm from "../components/account/RegisterForm";
import NavBar from "../components/nav/NavBar";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

function Register() {
  const navigate = useNavigate();

  const [formLoading, setFormLoading] = useState(false);

  const handleRegister = (
    email: string,
    username: string,
    image: FileList | null,
    password: string
  ) => {
    setFormLoading(true);

    createUserWithEmailAndPassword(auth, email, password).then(
      async (userCredential) => {
        const user = userCredential.user;

        let imageUrl;

        if (image) {
          const file = image[0];
          const storageRef = ref(storage, "profile_pictures/" + file.name);
          const uploadTask = await uploadBytes(storageRef, file).then();
          imageUrl = await getDownloadURL(uploadTask.ref);
        }

        setDoc(doc(db, "user/", user.uid), {
          UserEmail: email,
          UserName: username,
          UserID: user.uid,
          UserImage: imageUrl,
        }).then(() => {
          navigate("/");
        });
      }
    );
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="row">
          <div className="col-4"></div>

          <div className="col-4">
            <div className="card my-5">
              <div className="card-body">
                <h5 className="card-title">Register</h5>
                {formLoading ? (
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <RegisterForm onSubmit={handleRegister} />
                )}
              </div>
            </div>
          </div>

          <div className="col-4"></div>
        </div>
      </div>
    </>
  );
}

export default Register;
