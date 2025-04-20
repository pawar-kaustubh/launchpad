import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      setTimeout(() => navigate("/usertype"), 100); 
      console.log("working")
    } catch (error) {
      console.log("could not sign in with google", error);
    }
  };
  return (
    <StyledWrapper>
      <div className="social-accounts">
        <button className="social-button google" onClick={handleGoogleClick} type="button">
          <svg
            viewBox="0 0 488 512"
            height="1em"
            xmlns="http://www.w3.org/2000/svg"
            className="svg"
          >
            <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
          </svg>
        </button>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`

.social-account-container {
  margin-top: 25px;
}
  .social-account-container .title {
    display: block;
    text-align: center;
    font-size: 10px;
    color: rgb(170, 170, 170);
  }

    .social-account-container .social-accounts {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 5px;
  }
    
  .social-account-container .social-accounts .social-button {
    background: linear-gradient(
      45deg,
      rgb(0, 0, 0) 0%,
      rgb(112, 112, 112) 100%
    );
     .social-account-container .social-accounts .social-button .svg {
    fill: white;
    margin: auto;
  }
      .social-account-container .social-accounts .social-button:hover {
    transform: scale(1.2);
  }
      .social-account-container .social-accounts .social-button:active {
    transform: scale(0.9);
  }

  `;
