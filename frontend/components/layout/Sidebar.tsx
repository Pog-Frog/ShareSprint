import { BiLogOut } from 'react-icons/bi';
import { BsHouseFill, BsBellFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import SidebarLogo from './SidebarLogo';
import SidebarItem from './SidebarItem';
import SidebarPostButton from './SidebarButton';
import { useDispatch, useSelector } from 'react-redux';
import { deleteToken, selectAuthState } from '@/redux/reducers/auth.reducer';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { showSuccess } from '@/redux/reducers/success.reducer';
import { User } from '@/pages/api/interfaces/user.interface';
import { UserService } from '@/pages/api/services/user.service';


const Sidebar = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectAuthState);
    const token = localStorage.getItem('token');

    const [user, setUser] = useState({} as User);

    useEffect(() => {
        if (token) {
            UserService.getCurrentUser().then((res) => {
                setUser(res.data)
            }).catch((err) => {
                console.log(err)
            })
        }
    }, [setUser, token])

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
            href: '/notifications',
            auth: true,
        },
        {
            icon: FaUser,
            label: 'Profile',
            href: `/users/${user._id}`,
            auth: true,
        },
    ]

    const logoutHandler = useCallback(() => {
        dispatch(deleteToken());
        dispatch(showSuccess('Logged out successfully'));
        router.reload();
    }, [dispatch, router]);

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
                            auth={item.auth}
                            href={item.href}
                        />
                    ))}
                    {isAuthenticated && token && (<SidebarItem onClick={() => logoutHandler()} icon={BiLogOut} label="Logout" auth />)}
                    <SidebarPostButton />
                </div>
            </div>
        </div>
    );
}

export default Sidebar;