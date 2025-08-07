'use client'

import React, { useRef, useState } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/app/(shared)/components/ui/dialog'
import { ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react'
import { tipsData } from './Tips'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../style.css'

function TipsModal() {
  const [open, setOpen] = useState(false)
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className='flex lg:hidden flex-col items-center gap-[10px] text-muted-foreground w-[72px]'>
          <Lightbulb size={24} strokeWidth={1.5} />
          <span className='text-[11px] font-medium'>Tips</span>
        </button>
      </DialogTrigger>
      <DialogContent className='rounded-[8px] w-[280px] p-3'>
        <DialogHeader>
          <DialogTitle className='text-sm font-semibold text-foreground text-left'>
            Tips
          </DialogTitle>
        </DialogHeader>

        <div className='w-[254px]'>
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
            <ChevronLeft size={24} strokeWidth={1.5} />
          </button>
          <div>
            <p className='text-xs text-foreground'>
              {currentSlideIndex} of {tipsData.length}
            </p>
          </div>
          <button
            className='disabled:text-muted-foreground'
            disabled={currentSlideIndex === tipsData.length}
            onClick={handleNext}
          >
            <ChevronRight size={24} strokeWidth={1.5} />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TipsModal
