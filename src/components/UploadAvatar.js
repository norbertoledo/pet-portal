import React, {useCallback} from 'react'
import { Avatar} from 'antd';
import { useDropzone} from "react-dropzone";
import NoImage from '../assets/images/users/no_image.jpg';

export default function UploadAvatar (props){
    const {avatar, setAvatar} = props;

    const onDrop = useCallback(
        acceptedFiles => {
            const file = acceptedFiles[0];
            setAvatar(
                {
                    file,
                    preview:URL.createObjectURL(file)
                }
            )
        },
        [setAvatar]
    )

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        onDrop
    });

    return(
        <div className="upload-avatar" {...getRootProps()}>
            <input {...getInputProps()}/>
            { isDragActive ? (
                    <Avatar 
                        size={150}
                        src={NoImage}
                    />
                ) : (
                    <Avatar 
                        size={150}
                        src={avatar ?avatar.preview : NoImage}
                    />
                )
            }
        </div>
    );
}