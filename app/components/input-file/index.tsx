import React from 'react'
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function InputFile({uploadRef, handleFileChange} : Props) {
    return (
    <>
    <input ref={uploadRef}  className='invisible' type="file" accept=".txt" onChange={handleFileChange} />
          <FontAwesomeIcon
            className='cursor-pointer ml-2'
            onClick={()=> uploadRef.current?.click()}
            size='3x'
            icon={faFileUpload}
          />
          <span onClick={()=> uploadRef.current?.click()}>Upload file</span>
    </>)
};


type Props = {
    uploadRef: React.RefObject<HTMLInputElement>,
    handleFileChange :(e: React.ChangeEvent<HTMLInputElement>) => void
}