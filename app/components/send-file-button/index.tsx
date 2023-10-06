import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function SendFileButton ({selectedFile, handleUpload} : Props) {
    return <button 
    disabled={!selectedFile} 
    onClick={handleUpload} 
    className={`${selectedFile ? 'bg-stone-50' : 'bg-neutral-800'} flex items-center rounded-full pt-5 pb-3 pl-5 pr-5 text-stone-700`}
    style={{ margin: '0 auto' }}>
    Send   
      <FontAwesomeIcon
      className='cursor-pointer ml-1'
      size='1x'
      icon={selectedFile ? faLockOpen : faLock}
    />
  </button>
};


type Props = {
    selectedFile: File | null
    handleUpload: () => Promise<void>
}