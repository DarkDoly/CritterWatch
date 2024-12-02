import { useNavigate } from "react-router-dom";
import ForgotForm from "../components/account/ForgotForm";
import NavBar from "../components/nav/NavBar";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Firebase";

function Forgot() {
  const navigate = useNavigate();

  const handleForgot = (email: string) => {
    sendPasswordResetEmail(auth, email).then(() => {
      navigate("/signin");
    });
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
                <h5 className="card-title">Password Reset</h5>
                <ForgotForm onSubmit={handleForgot} />
              </div>
            </div>
          </div>

          <div className="col-4"></div>
        </div>
      </div>
    </>
  );
}

export default Forgot;
