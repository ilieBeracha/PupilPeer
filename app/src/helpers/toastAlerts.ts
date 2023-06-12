import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ToastAlerts{
    toastSuccess(message:string){
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT,
            style: {
                background: "#4BB543",
                color: "#fff",
                borderRadius: "5px",
                padding: "10px",
                fontWeight: "bold",
                fontSize: "16px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)"
            }
        });
    }

    toastError(message:string){
        toast.error(message, {
            position: toast.POSITION.TOP_RIGHT,
            style: {
                background: "#FF4136",
                color: "#fff",
                borderRadius: "5px",
                padding: "10px",
                fontWeight: "bold",
                fontSize: "16px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)"
            }
        });
    }

    toastInfo(message:string){
        toast.info(message, {
            position: toast.POSITION.TOP_RIGHT,
            style: {
                background: "#0074D9",
                color: "#fff",
                borderRadius: "5px",
                padding: "10px",
                fontWeight: "bold",
                fontSize: "16px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)"
            }
        });
    }
}

export const toastAlerts = new ToastAlerts();
