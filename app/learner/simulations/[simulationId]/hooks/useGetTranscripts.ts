import transcriptService from '@/app/(shared)/services/learner/transcriptService'
import useSWR from 'swr'

export function useGetTranscripts(simulationId: string) {
  const { data, isLoading, error, mutate } = useSWR(
    `/learner/transcripts/${simulationId}`,
    () =>
      transcriptService
        .getTranscripts(String(simulationId))
        .then((res) => res.data)
  )

  return { data, isLoading, error, mutate }
}
