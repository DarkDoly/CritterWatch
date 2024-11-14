//this page will prompt the user to input their email to send the change password prompt to their email

import NavBar from "../components/nav/NavBar"


const ForgotPasswordPartA = () => {
    return<>
        <NavBar />
            <div className="container-sm border border-primary">
                <div>
                    <p>Please type in your email.
                    </p>
                </div>
                <div>
                    <input type="email" id="exampleFormControlInput1" className="form-control" placeholder="name@example.com"/>
                </div>
            </div>
    </>
}

export default ForgotPasswordPartA;