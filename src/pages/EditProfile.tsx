import EditProfileForm from "../components/account/EditProfileForm";
import NavBar from "../components/nav/NavBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate();

  const [formLoading, setFormLoading] = useState(false);

  const handleEdit = (
    email: string,
    username: string,
    description: string,
    image: FileList | null,
    password: string
  ) => {
    setFormLoading(true);
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
