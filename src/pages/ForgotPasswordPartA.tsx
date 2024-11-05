//this page will prompt the user to input their email to send the change password prompt to their email

import NavBar from "../components/nav/NavBar"


const ForgotPasswordPartA = () => {
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

export default ForgotPasswordPartA;