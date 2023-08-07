import Image from 'next/image';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';


interface ImageUploadProps {
    onChange: (base64: string) => void;
    label: string;
    value?: string;
    disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, label, value, disabled }) => {
    const [base64, setBase64] = useState(value || '');
    const handleChange = useCallback((base64: string) => {
        setBase64(base64);
        onChange(base64);
    }
        , [onChange]);

    const handleDrop = useCallback((files: any) => {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (event: any) => {
            setBase64(event.target.result);
            handleChange(event.target.result);
        }
        reader.readAsDataURL(file);

    }
        , [handleChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        maxFiles: 1,
        onDrop: handleDrop,
        disabled,
        accept: { 'image/jpeg': [], 'image/png': [] }
    });

    return (
        <div
            {...getRootProps({
                className: "w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-300 hover:border-neutral-400 hover:text-neutral-700"
            })}
        >
            <input {...getInputProps()} />
            {
                base64 ?
                    (
                        <div className='flex items-center justify-center'>
                            <Image src={base64} width={200} height={200} alt={'Uploaded image'} />
                        </div>
                    ) : (
                        <p className='text-white'>{label}</p>
                    )
            }
        </div>
    )


}


export default ImageUpload;