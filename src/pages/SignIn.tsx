import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/nav/NavBar";
import SignInForm from "../components/account/SignInForm";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSignIn = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Login successful");

        navigate(from);
      })
      .catch((error) => {
        console.log("Failed to login");
        console.log(error.code, error.message);

        alert("Invalid email or password!");
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
                <h5 className="card-title" >Sign In</h5>
                <SignInForm onSubmit={handleSignIn} />
              </div>
            </div>
          </div>

          <div className="col-4"></div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
