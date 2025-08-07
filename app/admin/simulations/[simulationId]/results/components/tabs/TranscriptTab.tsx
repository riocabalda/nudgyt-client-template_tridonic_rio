'use client'

import useGetSimulationResults from '../../hooks/useGetSimulationResults'
import TranscriptCard from './transcript/TranscriptCard'

function TranscriptTab() {
  const { results } = useGetSimulationResults()

  const transcripts = results?.transcripts ?? []
  const hasNoTranscripts = transcripts.length === 0

  if (hasNoTranscripts) {
    return <p className='text-center text-neutral-gray-600'>No transcripts</p>
  }

  return (
    <article className='max-w-[712px] mx-auto'>
      <TranscriptCard />
    </article>
  )
}

export default TranscriptTab
