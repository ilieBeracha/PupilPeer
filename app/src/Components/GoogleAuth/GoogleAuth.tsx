import "./GoogleAuth.css";
import jwtDecode from 'jwt-decode';
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { loginRedux } from "../../app/authSlice";
import { toastAlerts } from "../../helpers/toastAlerts";
import { userService } from "../../services/UserService";

function GoogleAuth(): JSX.Element {
    const dispatch = useDispatch();

    async function googleLogin(data: any) {
        const userData: any = {
            firstName: data.given_name,
            lastName: data.family_name,
            email: data.email,
            image:data.picture
        }
        try {
            const res = await userService.googleLogin(userData);
            if (res.status === 200) {
                dispatch(loginRedux(res.data))
                toastAlerts.toastSuccess("Register successfull")
            }
        } catch (e: any) {
            toastAlerts.toastError(e.response.data)

        }
    }
    return (
        <div className="GoogleAuth">
            <GoogleLogin
                onSuccess={(credentialResponse: any) => {
                    const userData:any = jwtDecode(credentialResponse.credential);
                    googleLogin(userData);
                    console.log(userData.picture)
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
                useOneTap
                type="icon"
                // auto_select={true}
            />
        </div>
    );
}

export default GoogleAuth;
