import React, { useEffect, useRef, useState } from 'react'
import { Card } from '@/app/(shared)/components/ui/card'
import { checkSafariMicrophonePermission, cn, compactName, getFirstName } from '@/app/(shared)/utils'
import 'regenerator-runtime/runtime' // Place before 'react-speech-recognition'
import SpeechRecognition, {
  useSpeechRecognition
} from 'react-speech-recognition'
import { toast } from 'sonner'
import { Input } from '@/app/(shared)/components/ui/input'
import { useParams } from 'next/navigation'
import { useGetTranscripts } from '../hooks/useGetTranscripts'
import SubmitButton from './SubmitButton'
import SpeechButton from './SpeechButton'
import useSimulationStore from '../hooks/useSimulationStore'
import CharacterSelector from './CharacterSelector'
import { TranscriptType } from '@/app/(shared)/services/learner/transcriptService'
import useCharacterSelectionStore from '../hooks/useCharacterSelectionStore'

type MessageType = {
  sender: TranscriptType['from']
  recipient: TranscriptType['to']
  from: string
  text: string
}

function Transcript() {
  const { simulationId } = useParams()
  const [text, setText] = useState('')
  const [speechText, setSpeechText] = useState('')
  const [showSpeechBtn, setShowSpeechBtn] = useState(true)
  const [micPermission, setMicPermission] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [messages, setMessages] = useState<MessageType[]>([])
  const { data: transcriptsData } = useGetTranscripts(String(simulationId))

  const { isStarted } = useSimulationStore()

  const selectedCharacterId = useCharacterSelectionStore((store) => store.id)
  const disableCharacterSelection = useCharacterSelectionStore(
    (store) => store.disableSelection
  )

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition()

  useEffect(() => {
    if (!browserSupportsSpeechRecognition)
      toast.warning(`Browser doesn't support speech recognition.`)
  }, [])

  useEffect(() => {
    if (transcript) setSpeechText(transcript)
    if (!listening && showSpeechBtn && transcript) reset()
    if (containerRef.current)
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    if (transcript && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      )
      inputRef.current.scrollLeft = inputRef.current.scrollWidth
    }
    permissionPrompt()
  }, [transcript, listening, text, speechText, messages])

  /** Might be better to just use transcripts data directly instead of "syncing" to local state */
  useEffect(() => {
    const savedMessages = transcriptsData?.data
    if (savedMessages) {
      const newMessages: MessageType[] = savedMessages.map((message) => ({
        sender: message.from,
        recipient: message.to,
        from: message.from_type === 'character' ? 'AI' : 'Me',
        text: message.dialogue_value
      }))
      setMessages(newMessages)
    }
  }, [transcriptsData])

  const permissionPrompt = async () => {
    try {
      const isSafari = /^((?!chrome|android).)*safari/i.test(
        navigator.userAgent
      )
      if (isSafari) {
        const checkedMicPermission = await checkSafariMicrophonePermission()
        setMicPermission(checkedMicPermission)
        return
      }

      const permissionStatus = await navigator.permissions.query({
        name: 'microphone' as PermissionName
      })
      setMicPermission(permissionStatus.state)

      // Listen for changes in permission state
      permissionStatus.onchange = () => {
        setMicPermission(permissionStatus.state)
        handleStopListening()
      }
    } catch (error) {
      console.error('Error querying microphone permissions:', error)
      setMicPermission(null)
    }
  }

  const reset = () => {
    resetTranscript()
    setText('')
    setSpeechText('')
  }

  const handleStartListening = () => {
    setShowSpeechBtn(true)
    if (micPermission === 'denied')
      return toast(
        <div>
          <p>Microphone access denied.</p> <br />
          <p>Please enable microphone permissions in your browser settings.</p>
        </div>
      )
    if (!listening)
      SpeechRecognition.startListening({
        continuous: true,
        language: 'en-IN'
      })
  }

  const handleStopListening = () => {
    SpeechRecognition.abortListening()
    if (speechText) setShowSpeechBtn(false)
    setText(transcript)
    resetTranscript()
    setSpeechText('')
  }

  const handleSubmitText = async () => {
    if (window.document) {
      const descriptor = {
        AIDialogue: `${selectedCharacterId} : ${text}`
      }
      const obj = {
        cmd: 'sendToUe4',
        value: descriptor
      }

      const iframe = document.getElementById('iframe_1') as HTMLIFrameElement
      if (iframe) {
        iframe.contentWindow?.postMessage(JSON.stringify(obj), '*')
        disableCharacterSelection()
      } else {
        console.error('iframe_1 not found.')
      }
    }

    reset()
    setShowSpeechBtn(true)
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmitText()
    }
  }

  const hasSelectedCharacter = selectedCharacterId !== null
  const canInputText = isStarted && hasSelectedCharacter

  return (
    <>
      <Card
        ref={containerRef}
        className='flex flex-col gap-4 p-4 rounded-none rounded-t-[8px] border border-b-0 flex-1 overflow-y-auto scrollbar-thin'
      >
        {messages?.map((message, index) => {
          const sender = message.sender
          const recipient = message.recipient ?? null

          const isTranscriptFromAICharacter =
            sender !== null && 'name' in sender
          const isTranscriptForSpecificCharacter =
            recipient !== null && 'name' in recipient

          return (
            <div
              key={index}
              className={cn(
                'w-[220px] border border-gray-100 rounded-sm text-sm  px-3 py-2',
                message.from === 'Me'
                  ? 'self-end text-foreground bg-gray-200'
                  : 'self-start text-foreground-800 bg-white',
                'grid gap-1'
              )}
            >
              {isTranscriptFromAICharacter && (
                <h3 className='text-brandcolora text-xs uppercase font-bold'>
                  {compactName(sender.name)}
                </h3>
              )}

              <p>
                {isTranscriptForSpecificCharacter && (
                  <span className='text-brandcolora font-semibold'>
                    @{getFirstName(recipient.name)}
                  </span>
                )}{' '}
                {message.text.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </p>
            </div>
          )
        })}
      </Card>
      <Card className='rounded-none lg:rounded-b-[8px] border-t lg:border px-4 py-2'>
        <section className='py-1 lg:py-2'>
          <CharacterSelector />
        </section>

        <section className='w-full flex items-center gap-3'>
          <Input
            ref={inputRef}
            disabled={!canInputText}
            className='h-auto py-3 px-0 text-sm focus:!ring-transparent disabled:bg-white focus:ring-offset-transparent border-none'
            placeholder={
              listening && micPermission === 'granted'
                ? 'Listening...'
                : !isStarted
                  ? 'Please press play button...'
                  : !hasSelectedCharacter
                    ? 'Please select a character...'
                    : 'Write a message...'
            }
            onKeyDown={handleKeyPress}
            onChange={(e) =>
              transcript
                ? setSpeechText(e.target.value)
                : setText(e.target.value)
            }
            value={text || speechText}
          />

          {text ? (
            <SubmitButton onSubmit={handleSubmitText} />
          ) : (
            <div className='flex items-center gap-1'>
              {showSpeechBtn || !speechText ? (
                <SpeechButton
                  micPermission={micPermission}
                  handleStartListening={handleStartListening}
                  handleStopListening={handleStopListening}
                />
              ) : (
                <SubmitButton onSubmit={handleSubmitText} />
              )}
            </div>
          )}
        </section>
      </Card>
    </>
  )
}

export default Transcript
