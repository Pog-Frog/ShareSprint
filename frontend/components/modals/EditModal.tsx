import { User } from "@/pages/api/interfaces/user.interface";
import { UserService } from "@/pages/api/services/user.service";
import { showError } from "@/redux/reducers/error.reducer";
import { showSuccess } from "@/redux/reducers/success.reducer";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "../Modal";
import useEditModal from "@/hooks/useEditModal";
import { useRouter } from "next/router";
import Input from "../Input";
import ImageUpload from "../ImageUpload";

interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose }) => {

    const dispatch = useDispatch();
    const [userId, setUserId] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const editModal = useEditModal();
    const router = useRouter();

    useEffect(() => {
        if (!username) {
            UserService.getCurrentUser().then((res) => {
                setUserId(res.data._id)
                setUsername(res.data.username)
                setBio(res.data.bio)
                setProfileImage(res.data.profileImage);
                setCoverImage(res.data.coverImage);
            }).catch((err) => {
                console.log(err)
            })
        }
    }, [username])

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        const updateUser: User = {
            username,
            bio,
            profileImage,
            coverImage
        };
        console.log(updateUser)
        setIsLoading(true);
        try {
            await UserService.updateUser(updateUser, userId)
                .then((res) => {
                    setIsLoading(false);
                    dispatch(showSuccess('Profile updated successfully'));
                    editModal.onClose();
                    router.reload();
                })
        } catch (err) {
            setIsLoading(false);
            dispatch(showError('Internal Server Error'));
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }
        , [username, bio, profileImage, coverImage, userId, dispatch, editModal, router]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <ImageUpload value={profileImage} disabled={isLoading} onChange={(image) => setProfileImage(image)} label="Upload profile image" />
            <ImageUpload value={coverImage} disabled={isLoading} onChange={(image) => setCoverImage(image)} label="Upload cover image" />
            <Input
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                disabled={isLoading}
            />
            <Input
                placeholder="Bio"
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                disabled={isLoading}
            />

        </div>
    )
    return (
        <Modal disabled={isLoading} isOpen={editModal.isOpen} title="Edit your profile" actionLabel="Save" onClose={editModal.onClose} onSubmit={onSubmit} body={bodyContent} />
    )
}

export default EditModal