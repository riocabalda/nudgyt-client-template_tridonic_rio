'use client'

import React, { useRef, useState } from 'react'
import { Card } from '@/app/(shared)/components/ui/card'
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Lightbulb
} from 'lucide-react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../style.css'

export const tipsData = [
  'Wait for the screen to load',
  'Click on the blue arrow key to get started',
  'To start speaking click on the icon of the character, then click on the microphone icon to talk or type your message into the textbox.'
]

function Tips() {
  const [open, setOpen] = useState(true)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(1)
  const sliderRef = useRef<Slider | null>(null)

  const settings = {
    infinite: false,
    swipe: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index: number) => setCurrentSlideIndex(index + 1)
  }

  const handlePrevious = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev()
    }
  }

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext()
    }
  }
  return (
    <Card className='hidden lg:block rounded-[8px] border mt-4'>
      <header>
        <button
          className='w-full flex items-center justify-between px-[10px] py-3 rounded-t-[8px] bg-primary-blue-500 text-white'
          onClick={() => setOpen(!open)}
        >
          <span className='text-white font-semibold'>Tips</span>
          {open ? (
            <ChevronUp size={24} strokeWidth={1} />
          ) : (
            <ChevronDown size={24} strokeWidth={1} />
          )}
        </button>
      </header>
      {open && (
        <div className='px-3 py-4 border-t'>
          <div>
            <Slider ref={sliderRef} {...settings} arrows={false}>
              {tipsData.map((text) => (
                <div className='!flex gap-3' key={text}>
                  <span>
                    <Lightbulb
                      className='text-brandcolora'
                      size={24}
                      strokeWidth={1}
                    />
                  </span>
                  <p className='text-sm text-muted-foreground'>{text}</p>
                </div>
              ))}
            </Slider>
          </div>
          <div className='flex items-center justify-between mt-3'>
            <button
              className='disabled:text-muted-foreground'
              disabled={currentSlideIndex === 1}
              onClick={handlePrevious}
            >
              <ChevronLeft size={24} strokeWidth={1} />
            </button>
            <div>
              <p className='text-sm text-foreground'>
                {currentSlideIndex} of {tipsData.length}
              </p>
            </div>
            <button
              className='disabled:text-muted-foreground'
              disabled={currentSlideIndex === tipsData.length}
              onClick={handleNext}
            >
              <ChevronRight size={24} strokeWidth={1} />
            </button>
          </div>
        </div>
      )}
    </Card>
  )
}

export default Tips
