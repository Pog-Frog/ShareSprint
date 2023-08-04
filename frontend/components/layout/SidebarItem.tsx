import { selectAuthState } from "@/redux/reducers/auth.reducer";
import { useRouter } from "next/router";
import { use, useCallback } from "react";
import { IconType } from "react-icons/lib";
import { useSelector } from "react-redux";
import LoginModal from "../modals/LoginModal";
import useLoginModal from "@/hooks/useLoginModal";

interface SidebarItemProps {
    label: string;
    icon: IconType;
    href?: string;
    onClick?: () => void;
    auth: boolean;
}


const SidebarItem: React.FC<SidebarItemProps> = ({ label, icon: Icon, href, onClick, auth }) => {

    const router = useRouter();
    const isAuthenticated = useSelector(selectAuthState);
    const token = localStorage.getItem('token'); 
    const loginModal = useLoginModal();

    const handleClick = useCallback(() => {
        if(onClick) {
            onClick();
        }
        if(auth && !isAuthenticated && !token) {
            loginModal.onOpen();
        }else if(href) {
            router.push(href);
        }
    }, [auth, href, isAuthenticated, loginModal, onClick, router, token]);

    

    return (
        <div onClick={handleClick} className="flex flex-row items-center">
            <div className="
                relative
                rounded-full 
                h-14
                w-14
                flex
                items-center
                justify-center 
                p-4
                hover:bg-slate-300 
                hover:bg-opacity-10 
                cursor-pointer 
                lg:hidden
            ">
                <Icon size={28} color="white" />
            </div>
            <div className="
                relative
                hidden 
                lg:flex 
                items-center 
                gap-4
                p-4
                rounded-full 
                hover:bg-slate-300 
                hover:bg-opacity-10 
                cursor-pointer
            ">
                <Icon size={24} color="white" />
                <p className="hidden lg:block text-white text-xl">
                    {label}
                </p>
            </div>
        </div>
    );
}

export default SidebarItem;