'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type TUseGetParamsFromURLProps = {
  keysToCheck: string[]
}

export default function useGetParamsFromURL<T extends object>({
  keysToCheck
}: TUseGetParamsFromURLProps) {
  const searchParams = useSearchParams()
  const paramObj: T = searchParams.toString()
    ? JSON.parse(
        '{"' +
          decodeURI(
            searchParams.toString().replace(/&/g, '","').replace(/=/g, '":"')
          ) +
          '"}'
      )
    : {}
  const paramKeys = Object.keys(paramObj)
  const [isURLTampered, setIsURLTampered] = useState<boolean>(false)

  useEffect(() => {
    for (const key of paramKeys) {
      if (!keysToCheck.includes(key)) {
        setIsURLTampered(true)
        break
      } else {
        setIsURLTampered(false)
      }
    }
  }, [searchParams.toString()])

  return { isURLTampered, paramJson: paramObj, searchParams }
}
