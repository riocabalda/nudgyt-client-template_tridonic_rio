import { Button } from '@/app/(shared)/components/ui/button'
import { Mail } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/app/(shared)/components/ui/tooltip'

function BuyAdditionalTimeButton() {
  const subject = 'Buy Additional Time'
  const mailtoLink = `mailto:info@nudgyt.com?subject=${encodeURIComponent(subject)}`

  const handleRedirectToEmail = () => {
    window.location.href = mailtoLink
  }
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button
            className='flex gap-6 items-center w-full lg:w-auto'
            onClick={handleRedirectToEmail}
          >
            <span>Buy additional time</span> <Mail />
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side='bottom'
          className='p-0 bg-transparent border-0 shadow-none'
        >
          <div className='max-w-[170px] mt-1 flex flex-col items-center'>
            <div className='w-0 h-0 border-l-[8px] border-l-transparent border-b-[10  px] border-b-neutral-800 border-r-[8px] border-r-transparent'></div>
            <div className='bg-neutral-800 w-full p-3 rounded-md'>
              <p className='text-white text-center text-xs'>
                You will be redirected to your email
              </p>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default BuyAdditionalTimeButton
