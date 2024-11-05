// Users will be taken here according to their userID,
// they will get a single opportunity to change their password, as well as verify that password by re-typing it.

import NavBar from "../components/nav/NavBar"


const ForgotPasswordPartB = () => {
    return<>
        <NavBar />
            <div>
                <div>
                    <p>Please type in a new password.
                    </p>
                </div>
                <div>
                    <input type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock"/>
                        <div id="passwordHelpBlock" className="form-text">
                            Your password must be 6 characters long.
                        </div>
                </div>
            </div>
    </>
}

export default ForgotPasswordPartB;