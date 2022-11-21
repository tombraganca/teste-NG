import toast from "react-hot-toast";

export function Notify(props: { message: string, type: 'success' | 'error' | 'loading' }) {

    if (props.type === 'success') {
        toast.success(props.message);
    }

    if (props.type === 'error') {
        toast.error(props.message);
    }

    if (props.type === 'loading') {
        toast.loading(props.message);
    }

    return null;
} 