import useLoginModal from "@/hooks/useLoginModal";
import { selectAuthState } from "@/redux/reducers/auth.reducer";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { FaFeather } from "react-icons/fa";
import { useSelector } from "react-redux";

const SidebarPostButton = () => {

    const router = useRouter();

    const loginModal = useLoginModal();

    const isAuthenticated = useSelector(selectAuthState);
    const token = localStorage.getItem('token');

    const onClick = useCallback(() => {
        if(!isAuthenticated || !token) {
            loginModal.onOpen();
        }
    }, [isAuthenticated, loginModal, token]);

    return (
        <div onClick={onClick}>
            <div className="mt-6 lg:hidden h-14 w-14 p-4 flex items-center justify-center bg-sky-500 hover:bg-opacity-80 transition cursor-pointer">
                <FaFeather size={24} color="white" />
            </div>

            <div className="mt-6 hidden lg:block px-4 py-2 rounded-full bg-sky-500 hover:bg-opacity-90 transition cursor-pointer">
                <p className="hidden lg:block text-center font-bold text-white text-[20px]">
                    Post
                </p>
            </div>
        </div>
    );

}

export default SidebarPostButton;