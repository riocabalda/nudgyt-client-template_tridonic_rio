'use client'

import { File, Upload } from 'lucide-react'
import { ChangeEvent, ComponentProps, useState } from 'react'
import { cn } from '../../utils'

function InputFile({
  type,
  initialFilename,
  isError,
  onChange,
  ...otherProps
}: ComponentProps<'input'> & { initialFilename?: string; isError?: boolean }) {
  const [fileName, setFileName] = useState(initialFilename || '')

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target
    if (input.files && input.files.length > 0) {
      const selectedFileName = input.files[0].name
      setFileName(selectedFileName)
    } else {
      setFileName('')
    }
    if (onChange) {
      onChange(event)
    }
  }
  return (
    <>
      <label
        htmlFor='inputFile'
        className={cn(
          'h-[50px] flex justify-between items-center w-full rounded-sm border border-input bg-white px-3 py-2 text-sm lg:text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          isError && 'border-destructive'
        )}
      >
        {fileName && <File size={20} strokeWidth={1.5} className='mr-3' />}
        <span className='flex-1 line-clamp-1'>
          {fileName ? fileName : 'Upload CSV'}
        </span>
        <Upload className='size-4 lg:size-[20px]' />
      </label>
      <input
        id='inputFile'
        type='file'
        onChange={handleFileChange}
        {...otherProps}
        className='hidden'
      />
    </>
  )
}

export default InputFile
