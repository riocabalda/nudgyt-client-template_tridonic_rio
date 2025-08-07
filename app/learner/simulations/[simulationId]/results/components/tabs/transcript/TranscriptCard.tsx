'use client'

import { Button } from '@/app/(shared)/components/ui/button'
import {
  Collapsible,
  CollapsibleContent
} from '@/app/(shared)/components/ui/collapsible'
import {
  ScrollAreaWithCustomScrollBar,
  ScrollBarWithCustomThumb,
  ScrollThumb
} from '@/app/(shared)/components/ui/scroll-area'
import {
  TranscriptComment,
  TranscriptType
} from '@/app/(shared)/services/learner/transcriptService'
import { cn, compactName, getFirstName } from '@/app/(shared)/utils'
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Sparkle
} from 'lucide-react'
import { ComponentProps, Fragment, useState } from 'react'
import useGetSimulationResults from '../../../hooks/useGetSimulationResults'
import useOpenTranscriptCommentsStore from '../../../hooks/useTranscriptCommentStore'

function CommentCard(props: {
  transcript: TranscriptType
  comment: TranscriptComment
  className?: string
}) {
  const { comment, className } = props

  return (
    <article
      className={cn(
        'grid gap-2 px-3 py-2',
        comment.from_type !== 'character' &&
          'bg-white border border-t-0 border-neutral-gray-200',
        comment.from_type === 'character' &&
          'bg-gradient-to-r from-product-ai-gradient-start to-product-ai-gradient-end text-white',
        className
      )}
    >
      <h4 className='flex justify-between gap-2'>
        <span className='flex items-center gap-2'>
          {comment.from_type !== 'character' && (
            <MessageCircle
              fill='currentColor'
              className='size-3 text-brandcolora'
            />
          )}
          {comment.from_type === 'character' && (
            <Sparkle fill='currentColor' className='size-3' />
          )}

          <span className='font-medium text-xs tracking-[0.03rem] uppercase'>
            {comment.from?.fullname}
          </span>
        </span>
      </h4>

      <p className='text-sm'>{comment.text}</p>
    </article>
  )
}

function CommentsCollapsibleButton(props: {
  transcript: TranscriptType
  className?: string
}) {
  const openTranscriptCommentsStore = useOpenTranscriptCommentsStore()
  const { transcript, className } = props
  const { comments } = transcript

  function openComments() {
    openTranscriptCommentsStore.setId(transcript._id)
  }

  const firstComment = comments[0]
  const otherCommenterCt = comments.length - 1

  let summaryText = firstComment?.from?.fullname ?? ''
  if (otherCommenterCt > 0) {
    summaryText = `${firstComment?.from?.fullname} +${otherCommenterCt} other`
  }
  if (otherCommenterCt > 1) {
    summaryText = `${firstComment?.from?.fullname} +${otherCommenterCt} others`
  }

  const hasComments = comments.length > 0

  return (
    <button
      onClick={openComments}
      className={cn(
        'w-full',
        'flex justify-between gap-2 px-3 py-2',
        firstComment?.from_type !== 'character' &&
          'bg-white border border-t-0  border-neutral-gray-200',
        firstComment?.from_type === 'character' &&
          'bg-gradient-to-r from-product-ai-gradient-start to-product-ai-gradient-end text-white',
        className
      )}
    >
      {hasComments ? (
        <span className='flex items-center gap-2'>
          {firstComment?.from_type !== 'character' && (
            <MessageCircle
              fill='currentColor'
              className='size-3 text-brandcolora'
            />
          )}
          {firstComment?.from_type === 'character' && (
            <Sparkle fill='currentColor' className='size-3' />
          )}

          <span className='font-medium text-xs tracking-[0.03rem] uppercase'>
            {summaryText}
          </span>
        </span>
      ) : (
        <p className='text-xs text-neutral-gray-400'>No comments</p>
      )}

      <span
        className={cn(
          firstComment?.from_type === 'character' &&
            'text-white hover:text-white hover:bg-accent/50'
        )}
      >
        <ChevronDown className='size-4 transition' />
      </span>
    </button>
  )
}

function CommentsCollapsible(props: { transcript: TranscriptType }) {
  const { transcript } = props
  const { comments } = transcript
  const openTranscriptCommentsStore = useOpenTranscriptCommentsStore()

  if (transcript.from_type !== 'user') return null

  if (comments.length === 0) return null

  return (
    <Collapsible
      open={openTranscriptCommentsStore.id === transcript._id}
      className='w-full overflow-hidden group'
    >
      <CommentsCollapsibleButton
        transcript={transcript}
        className='rounded-b-[4px] group-data-[state=open]:hidden'
      />

      <CollapsibleContent>
        <ol>
          {comments.map((comment, idx) => (
            <li key={idx}>
              <CommentCard
                transcript={transcript}
                comment={comment}
                className={cn(idx === comments.length - 1 && 'rounded-b-[4px]')}
              />
            </li>
          ))}
        </ol>
      </CollapsibleContent>
    </Collapsible>
  )
}

function CommentSliderSection(props: {
  transcript: TranscriptType
  comment: TranscriptComment
}) {
  const { comment } = props

  return (
    <section className='grid gap-2'>
      <h4 className='flex items-center justify-between gap-2'>
        <span className='flex items-center gap-2'>
          {comment.from_type !== 'character' && (
            <MessageCircle
              fill='currentColor'
              className='size-3 text-brandcolora'
            />
          )}
          {comment.from_type === 'character' && (
            <Sparkle fill='currentColor' className='size-3' />
          )}

          <span className='font-medium text-xs tracking-[0.03rem] uppercase'>
            {comment.from?.fullname}
          </span>
        </span>
      </h4>

      <p className='text-sm'>{comment.text}</p>
    </section>
  )
}

function CommentsSlider(props: { transcript: TranscriptType }) {
  const { transcript } = props
  const { comments } = transcript

  const [selectedIdx, setSelectedIdx] = useState(0)

  const hasPrevComment = 0 < selectedIdx
  function prevComment() {
    if (!hasPrevComment) return
    setSelectedIdx(selectedIdx - 1)
  }

  const hasNextComment = selectedIdx < comments.length - 1
  function nextComment() {
    if (!hasNextComment) return
    setSelectedIdx(selectedIdx + 1)
  }

  const hasComments = comments.length > 0
  const hasMultipleComments = comments.length > 1

  if (!hasComments) return null

  const selectedComment = comments[selectedIdx]

  return (
    <fieldset
      className={cn(
        'grid gap-4 p-3 rounded-[4px] border border-transparent',
        hasMultipleComments && 'pb-2',
        selectedComment?.from_type !== 'character' &&
          'bg-white border-neutral-gray-400',
        selectedComment?.from_type === 'character' &&
          'bg-gradient-to-r from-product-ai-gradient-start to-product-ai-gradient-end text-white'
      )}
    >
      <div className='grid *:row-[1] *:col-[1] overflow-hidden'>
        {comments.map((comment, idx) => (
          <div
            key={comment._id}
            className={cn(
              'transition duration-500',
              selectedIdx < idx && 'translate-x-full opacity-0',
              idx < selectedIdx && '-translate-x-full opacity-0'
            )}
          >
            <CommentSliderSection transcript={transcript} comment={comment} />
          </div>
        ))}
      </div>

      {hasMultipleComments && (
        <footer className='flex justify-between items-center gap-2'>
          <Button
            variant='ghost'
            size='icon'
            disabled={!hasPrevComment}
            onClick={prevComment}
            className='p-1 disabled:opacity-25 disabled:bg-inherit disabled:hover:bg-inherit disabled:text-inherit size-fit'
          >
            <ChevronLeft className='size-5' />
          </Button>

          <p className='text-xs'>
            {selectedIdx + 1} of {comments.length}
          </p>

          <Button
            variant='ghost'
            size='icon'
            disabled={!hasNextComment}
            onClick={nextComment}
            className='p-1 disabled:opacity-25 disabled:bg-inherit disabled:hover:bg-inherit disabled:text-inherit size-fit'
          >
            <ChevronRight className='size-5' />
          </Button>
        </footer>
      )}
    </fieldset>
  )
}

function DesktopCommentsListItem(props: {
  transcripts: TranscriptType[]
  idx: number
}) {
  const { transcripts, idx } = props

  const transcript = transcripts[idx]
  if (transcript === undefined) {
    console.warn('Transcript to render comments for does not exist...?')
    return null
  }

  /** Calculate row span based on next transcripts */
  let nextUserIdx = idx + 1
  for (; nextUserIdx < transcripts.length; nextUserIdx++) {
    const nextTranscript = transcripts[nextUserIdx]
    if (nextTranscript.from_type === 'user') break
  }
  const spanCt = nextUserIdx - idx

  /** Based on Tailwind `row-span-X` */
  const gridRow = `span ${spanCt} / span ${spanCt}`

  /** Edge case for when the first transcript(s) does not come from the user */
  if (transcript.from_type !== 'user' && idx === 0) {
    return (
      <li className='mb-4 lg:mb-5 hidden lg:block' style={{ gridRow }}></li>
    )
  }

  if (transcript.from_type !== 'user') {
    return null
  }

  return (
    <li className='mb-4 lg:mb-5 hidden lg:block' style={{ gridRow }}>
      <CommentsSlider transcript={transcript} />
    </li>
  )
}

function TranscriptDisplay(props: { transcript: TranscriptType }) {
  const { transcript } = props
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { dialogue_value, from, from_type, comments } = transcript
  const recipient = transcript.to ?? null

  /** `from_type` will not be a sufficient check for this */
  const isTranscriptFromAICharacter = from !== null && 'name' in from
  const isTranscriptForSpecificCharacter =
    recipient !== null && 'name' in recipient

  const hasComments = comments.length > 0

  return (
    <article
      className={cn(
        'max-w-[80%] h-min',
        hasComments && 'w-full lg:w-auto',
        from_type === 'user' && 'ml-auto'
      )}
    >
      {from_type === 'character' && (
        <section
          className={cn(
            'rounded-[4px] bg-white border border-neutral-gray-400',
            'grid gap-1',
            'whitespace-pre-wrap p-3 text-sm'
          )}
        >
          {isTranscriptFromAICharacter && (
            <h3 className='text-brandcolora text-xs uppercase font-bold'>
              {compactName(from.name)}
            </h3>
          )}

          <p>{dialogue_value}</p>
        </section>
      )}

      {from_type === 'user' && (
        <section
          className={cn(
            'rounded-t-[4px] lg:rounded-[4px] bg-neutral-gray-200 border-2 border-transparent',
            !hasComments && 'rounded-[4px]',
            'grid gap-1',
            'whitespace-pre-wrap p-3 text-sm'
          )}
        >
          <p>
            {isTranscriptForSpecificCharacter && (
              <span className='text-brandcolora font-semibold'>
                @{getFirstName(recipient.name)}
              </span>
            )}{' '}
            <span>{dialogue_value}</span>
          </p>
        </section>
      )}

      <div className='lg:hidden'>
        <CommentsCollapsible transcript={transcript} />
      </div>
    </article>
  )
}

function TranscriptScrollArea() {
  const { results } = useGetSimulationResults()
  const openTranscriptCommentsStore = useOpenTranscriptCommentsStore()

  const transcripts = results?.transcripts ?? []

  const closeAnyOpenComments: ComponentProps<'li'>['onClick'] = (event) => {
    const { target, currentTarget } = event
    if (target !== currentTarget) return
    openTranscriptCommentsStore.setId(null)
  }

  return (
    <ScrollAreaWithCustomScrollBar
      className='group'
      scrollbar={
        <ScrollBarWithCustomThumb
          forceMount
          className='border-0 absolute top-0 lg:!right-[40%] lg:-translate-x-[8px] transition opacity-0 group-hover:opacity-100'
          thumb={
            <ScrollThumb className='transition-colors bg-gray-200 hover:bg-gray-300' />
          }
        />
      }
    >
      <ol className='grid lg:grid-cols-[3fr_2fr] gap-x-8 lg:px-4 lg:pb-1'>
        <>
          {/* Placeholder to make the header appear on the second column */}
          <li className='hidden lg:block'></li>

          <li className='hidden lg:block sticky top-0 z-10'>
            <header className='bg-neutral-gray-50/95 py-4'>
              <h3 className='font-semibold'>Notes and Learnings</h3>
            </header>
          </li>
        </>

        {transcripts.map((transcript, idx) => (
          <Fragment key={idx}>
            <li onClick={closeAnyOpenComments} className='mb-4 lg:mb-5 flex'>
              <TranscriptDisplay transcript={transcript} />
            </li>

            <DesktopCommentsListItem transcripts={transcripts} idx={idx} />
          </Fragment>
        ))}
      </ol>
    </ScrollAreaWithCustomScrollBar>
  )
}

function TranscriptCard() {
  return (
    <div className='overflow-hidden lg:h-[848px] lg:border lg:border-neutral-gray-400 lg:rounded-[8px] grid *:row-[1] *:col-[1]'>
      {/* Background color for transcripts, and border separator between transcripts and comments */}
      <div className='hidden lg:block h-full w-[60%] -translate-x-[6px] bg-white border-0 border-r border-neutral-gray-400'></div>

      <TranscriptScrollArea />
    </div>
  )
}

export default TranscriptCard
