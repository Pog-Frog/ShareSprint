import { BiLogOut } from 'react-icons/bi';
import { BsHouseFill, BsBellFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import SidebarLogo from './SidebarLogo';
import SidebarItem from './SidebarItem';
import SidebarPostButton from './SidebarButton';
import { useDispatch, useSelector } from 'react-redux';
import { deleteToken, selectAuthState } from '@/redux/reducers/auth.reducer';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { showSuccess } from '@/redux/reducers/success.reducer';
import useUser from '@/hooks/useUser';
import { ClipLoader } from "react-spinners"


const Sidebar = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectAuthState);
    const token = localStorage.getItem('token');

    const { data: user, error, isLoading } = useUser();

    const items = [
        {
            icon: BsHouseFill,
            label: 'Home',
            href: '/',
            auth: false,
        },
        {
            icon: BsBellFill,
            label: 'Notifications',
            href: user ? '/notifications' : '/',
            auth: true,
            alert: user ? user?.has_notifications : false,
        },
        {
            icon: FaUser,
            label: 'Profile',
            href: user ? `/users/${user._id}` : '/profile',
            auth: true,
        },
    ]

    const logoutHandler = useCallback(() => {
        dispatch(deleteToken());
        dispatch(showSuccess('Logged out successfully'));
        router.reload();
    }, [dispatch, router]);

    if (isLoading || !user && !error) {
        return (
            <div className="col-span-1 h-full pr-4 md:pr-6">
                <div className="flex flex-col items-end">
                    <div className="space-y-2 lg:w-[230px]">
                        <SidebarLogo />
                        <div className='pt-5'>
                            <ClipLoader color="#ffffff" />
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (

            <div className="col-span-1 h-full pr-4 md:pr-6">
                <div className="flex flex-col items-end">
                    <div className="space-y-2 lg:w-[230px]">
                        <SidebarLogo />
                        <div className='pt-5'>
                            {items.map((item) => (
                                <SidebarItem
                                    key={item.label}
                                    icon={item.icon}
                                    label={item.label}
                                    auth={item.auth}
                                    href={item.href}
                                    alert={item.alert}
                                />
                            ))}
                        </div>

                        {isAuthenticated && token && (<SidebarItem onClick={() => logoutHandler()} icon={BiLogOut} label="Logout" auth />)}
                        <SidebarPostButton />
                    </div>
                </div>
            </div>
        );
    }
}

export default Sidebar;