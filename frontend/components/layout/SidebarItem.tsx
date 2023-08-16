import { selectAuthState } from "@/redux/reducers/auth.reducer";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { IconType } from "react-icons/lib";
import { useSelector } from "react-redux";
import useLoginModal from "@/hooks/useLoginModal";
import { BsDot } from "react-icons/bs";

interface SidebarItemProps {
    label: string;
    icon: IconType;
    href?: string;
    onClick?: () => void;
    auth: boolean;
    alert?: boolean;
}


const SidebarItem: React.FC<SidebarItemProps> = ({ label, icon: Icon, href, onClick, auth, alert }) => {

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
        <div onClick={handleClick} className="flex flex-row items-center pb-5">
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
                {alert ? <BsDot className="text-sky-500 absolute -top-4 left-0" size={70}/> : null}
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
                {alert ? <BsDot className="text-sky-500 absolute -top-4 left-0" size={70}/> : null}
            </div>
        </div>
    );
}

export default SidebarItem;