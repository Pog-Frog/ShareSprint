import useUser from "@/hooks/useUser";
import { Notification } from "@/pages/api/interfaces/notificaiton.interface";
import { NotificationService } from "@/pages/api/services/notification.service";
import { useEffect, useState } from "react";
import { BsBell, BsBellFill } from "react-icons/bs";

const NotificationFeed = () => {

    const { data: currentUser, mutate: mutateUser } = useUser();
    const [notifications, setNotifications] = useState([] as Notification[]);

    useEffect(() => {
        NotificationService.getNotifications()
            .then((res) => {
                setNotifications(res.data);
                console.log(res.data);
                mutateUser();
            })
            .catch((err) => {
                console.log(err);
            })
    }, [mutateUser])

    return (
        <div className="flex flex-col">
            {notifications.map((notification) => (
                <div key={notification?._id} className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800">
                    {notification?.new ? (
                        <BsBellFill className="text-blue-500" />
                    ) : (
                        <BsBell className="text-gray-500" />
                    )}
                    <p className="text-white">
                        {notification?.body}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default NotificationFeed;