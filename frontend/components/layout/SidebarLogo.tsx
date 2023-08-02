import { useRouter } from "next/router";
import { TbSocial } from "react-icons/tb";
import { COMPANY_NAME } from "@/config";

const SidebarLogo = () => {
    const router = useRouter();

    return (
        <>
            <div
                onClick={() => router.push('/')}
                className="
                    rounded-full 
                    w-14
                    p-4 
                    flex 
                    items-center 
                    pt-10
            ">
                <div className="
                relative
                hidden 
                lg:flex 
                items-center 
                pb-4
                gap-4
                rounded-full
                hover:bg-slate-300 
                hover:bg-opacity-10 
                cursor-pointer
            ">
                    <TbSocial size={40} color="white" />
                    <p className="hidden lg:block text-white text-2xl font-bold">
                        {COMPANY_NAME}
                    </p>
                </div>
            </div>

        </>

    );
}

export default SidebarLogo;