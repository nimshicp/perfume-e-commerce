import { GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../api/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function GoogleLoginButton() {

  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {

    try {

      const res = await googleLogin(credentialResponse.credential);

      const data = res.data;

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      toast.success("Logged in with Google");

      navigate("/");

    } catch {
      toast.error("Google login failed");
    }

  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => toast.error("Google Login Failed")}
    />
  );
}

export default GoogleLoginButton;