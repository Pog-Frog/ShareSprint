import Image from 'next/image';
import { useState } from 'react';
import { CldUploadButton } from 'next-cloudinary';

interface ImageUploadProps {
    onChange: (base64: string) => void;
    label: string;
    value?: string;
    disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, label, value, disabled }) => {
    const [image, setImage] = useState(value || '');

    const handleUpload = (result: any) => {
        const secureUrl = result.info.secure_url;
        setImage(secureUrl);
        onChange(secureUrl);
    };

    return (
        <CldUploadButton
            options={{ maxFiles: 1 }}
            onUpload={handleUpload}
            uploadPreset="rxusnawo"
        >
            <div className="w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-300 hover:border-neutral-400 hover:text-neutral-700">
                {image ? (
                    <div className='flex items-center justify-center'>
                        <Image src={image} width={200} height={200} alt={'Uploaded image'} />
                    </div>
                ) : (
                    <p className='text-white'>{label}</p>
                )}
            </div>
        </CldUploadButton>
    );
};

export default ImageUpload;