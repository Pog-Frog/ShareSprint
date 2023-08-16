import Header from "@/components/Header"
import NotificationFeed from "@/components/NotificationFeed"
import withAuth from "@/components/withAuth"



const Notifications = () => {
    return (
        <>
            <Header label="Notificaitons" showBackArrow/>
            <NotificationFeed />
        </>
    )
}

export default withAuth(Notifications)