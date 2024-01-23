"use client"

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const InputFile: React.FC<ImageUploadProps> = ({ onChange, value }) => {

  const handleUpload = useCallback((result: any) => {
    onChange(result.info.secure_url);
  }, [onChange]);

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset='lhewgfkl'
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className='relative cursor-pointer hover:opacity-70 border-dashed border-2  flex flex-col justify-center items-center w-[50vw] h-[50vh] '
          >
            <TbPhotoPlus />
            <div className='text-lg'>Click to upload</div>

            {value && (
              <div className='absolute inset-0 w-full h-full'>
                <Image alt='upload' fill style={{ objectFit: 'fill' }} src={value} />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default InputFile;