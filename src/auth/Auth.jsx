
import { SignedIn, SignedOut, SignInButton ,SignUpButton} from "@clerk/clerk-react";
import {Navigate} from "react-router-dom"
function Auth() {
  return (
    <div className="navbar">
        <h2>FinT</h2>
        
        {/* <Link to="/">Dashboard</Link> */}
        <div className="sign-in-container">
          <SignedOut>
            <SignUpButton mode="modal" />
            <SignInButton mode="modal" />
          </SignedOut>
          <SignedIn>
            <Navigate to={"/"} />
          </SignedIn>
        </div>
      </div>
     
      
  )
}

export default Auth
