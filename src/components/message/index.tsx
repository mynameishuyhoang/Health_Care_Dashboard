import { toast } from "react-toastify";

const animation: any = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
}

export const toastMessage = (status: string, msg: string) => {
    switch (status) {
        case 'success':
            toast.success(msg, animation)
            break
        case 'error':
            toast.error(msg, animation);
            break
        case 'info':
            toast.info(msg, animation);
            break
        default:
            toast.warning(msg, animation);
            break
    }
}

