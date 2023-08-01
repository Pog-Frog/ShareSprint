import { IconType } from "react-icons/lib";

interface SidebarItemProps {
    label: string;
    icon: IconType;
    href?: string;
    onClick?: () => void;
}


const SidebarItem: React.FC<SidebarItemProps> = ({ label, icon: Icon, href, onClick }) => {
    return (
        <div className="flex flex-row items-center">
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
                items-row 
                gap-4 
                p-4 
                rounded-full 
                hover:bg-slate-300 
                hover:bg-opacity-10 
                cursor-pointer
                items-center
            ">
                <p className="hidden lg:block text-white text-xl">
                    {label}
                </p>
            </div>
        </div>
    );
}

export default SidebarItem;