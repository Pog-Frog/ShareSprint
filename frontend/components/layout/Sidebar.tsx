import { BiLogOut } from 'react-icons/bi';
import { BsHouseFill, BsBellFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import SidebarLogo from './SidebarLogo';
import SidebarItem from './SidebarItem';
import SidebarPostButton from './SidebarButton';


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
                    <SidebarItem onClick={() => { }} icon={BiLogOut} label="Logout" />
                    <SidebarPostButton />
                </div>
            </div>
        </div>
    );
}

export default Sidebar;