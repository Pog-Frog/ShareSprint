import { BiLogOut } from 'react-icons/bi';
import { BsHouseFill, BsBellFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import SidebarLogo from './SidebarLogo';
import SidebarItem from './SidebarItem';
import SidebarPostButton from './SidebarButton';
import { useDispatch, useSelector } from 'react-redux';
import { deleteToken, selectAuthState } from '@/redux/reducers/auth.reducer';
import { useCallback } from 'react';


const Sidebar = () => {
    const items = [
        {
            icon: BsHouseFill,
            label: 'Home',
            href: '/',
        },
        {
            icon: BsBellFill,
            label: 'Notifications',
            href: '/notifications',
            auth: true,
        },
        {
            icon: FaUser,
            label: 'Profile',
            href: '/user/123',
        },
    ]

    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectAuthState);
    const token = localStorage.getItem('token');
    
    const logoutHandler = useCallback(() => {
        dispatch(deleteToken());
    }, [dispatch]);

    return (
        <div className="col-span-1 h-full pr-4 md:pr-6">
            <div className="flex flex-col items-end">
                <div className="space-y-2 lg:w-[230px]">
                    <SidebarLogo />
                    {items.map((item) => (
                        <SidebarItem
                            key={item.label}
                            icon={item.icon}
                            label={item.label}
                            href={item.href}
                        />
                    ))}
                    {isAuthenticated && token && (<SidebarItem onClick={() => logoutHandler()} icon={BiLogOut} label="Logout" />)}
                    <SidebarPostButton />
                </div>
            </div>
        </div>
    );
}

export default Sidebar;