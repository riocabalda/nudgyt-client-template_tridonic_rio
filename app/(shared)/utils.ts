import { type ClassValue, clsx } from 'clsx'
import moment from 'moment-timezone'
import { twMerge } from 'tailwind-merge'
import { SimulationType } from './services/learner/simulationService'
import { ScenarioType } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function removeUrlQueryParams(url: string) {
  return url.replace(/\?.*$/, '')
}

export function isUrl(url: string) {
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i
  return urlRegex.test(url)
}

export function removeSeconds(time: string) {
  const [, , s] = time.split(':')
  if (!s) return time
  return time.replace(/:\d{2}$/, '')
}

export function calculateTotalHours(startTime: string, endTime: string) {
  const [startHour, startMinute] = startTime.split(':').map(Number)
  const [endHour, endMinute] = endTime.split(':').map(Number)

  const totalMinutes = (endHour - startHour) * 60 + (endMinute - startMinute)

  const totalHours = (totalMinutes / 60).toFixed(2).replace(/\.00$/, '')

  return totalHours
}

export function convertTo12HourFormat(time: string) {
  const [hours, minutes] = time.split(':').map(Number)

  const period = hours >= 12 ? 'PM' : 'AM'

  // Convert hours to 12-hour format
  let hours12 = hours % 12
  hours12 = hours12 || 12 // '0' should be converted to '12'

  const formattedTime = `${hours12}:${
    minutes < 10 ? '0' : ''
  }${minutes} ${period}`

  return formattedTime
}

export function formatDateTime(dateTimeStr: string, timeZone?: string) {
  // Parse the input datetime string as UTC
  const datetime = moment.utc(dateTimeStr)

  // Convert to the specified timezone and format
  return datetime
    .tz(timeZone || moment.tz.guess())
    .format('MMM DD, YYYY, hh:mm A')
}

export function convertUtcToLocal(utcDate: string, format: string) {
  // Convert utc to local
  const localTime = moment.utc(utcDate).tz(moment.tz.guess())

  // Format the date
  const formattedDate = localTime.format(format)

  return formattedDate
}

export function convertNumberToTime(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000)
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  return [hours, minutes, secs]
    .map((val) => String(val).padStart(2, '0'))
    .join(':')
}

export function addCommas(number: number) {
  return number.toLocaleString()
}

export function addCommasWithCents(number: number) {
  return number.toLocaleString(undefined, {
    minimumFractionDigits: 2
  })
}

export function addTimeToDate(date: string, time: string) {
  // Parse the time string
  const [hours, minutes, seconds] = time.split(':').map(Number)

  // Convert hours, minutes, and seconds to milliseconds
  const millisecondsToAdd = (hours * 3600 + minutes * 60 + seconds) * 1000

  // Add milliseconds to the date
  return new Date(new Date(date).getTime() + millisecondsToAdd)
}

export function padStartTime(time: string) {
  const [hours, minutes, seconds] = time.split(':')
  return `${hours.padStart(2, '0')}:${minutes.padStart(
    2,
    '0'
  )}:${seconds.padStart(2, '0')}`
}

export function timeStringToMillisec(time: string) {
  // Split the time string into hours, minutes, and seconds
  const [hours, minutes, seconds] = time.split(':').map(Number)

  // Calculate the total milliseconds
  const totalMilliseconds = (hours * 60 * 60 + minutes * 60 + seconds) * 1000

  return totalMilliseconds
}

export function timeToSeconds(time: string) {
  const parts = time.split(':')
  const hours = parseInt(parts[0])
  const minutes = parseInt(parts[1])
  const seconds = parseInt(parts[2])

  const totalSeconds = hours * 3600 + minutes * 60 + seconds
  return totalSeconds
}

export function calcTimeProgress(
  totalSeconds: number,
  remainingSeconds: number
) {
  return 100 - (100 * remainingSeconds) / totalSeconds
}

export function generateAvatarInitials(name: string): string {
  const nameArray: string[] = name.trim().split(' ')

  let initials: string = ''

  // Add the first character of the first word to initials
  if (nameArray.length > 0) {
    initials += nameArray[0].charAt(0).toUpperCase()
  }

  // Add the first character of the last word to initials
  if (nameArray.length > 1) {
    initials += nameArray[nameArray.length - 1].charAt(0).toUpperCase()
  }

  return initials
}

export function isTimeLessThan(timeString1: string, timeString2: string) {
  const [hours1, minutes1, seconds1] = timeString1.split(':').map(Number)

  const [hours2, minutes2, seconds2] = timeString2.split(':').map(Number)

  const totalSeconds1 = hours1 * 3600 + minutes1 * 60 + seconds1
  const totalSeconds2 = hours2 * 3600 + minutes2 * 60 + seconds2

  return totalSeconds1 < totalSeconds2
}

export function getCurrentDateTime() {
  const currentDate = new Date()

  // Get the date components
  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0')
  const day = String(currentDate.getDate()).padStart(2, '0')

  // Get the time components
  const hours = String(currentDate.getHours()).padStart(2, '0')
  const minutes = String(currentDate.getMinutes()).padStart(2, '0')
  const seconds = String(currentDate.getSeconds()).padStart(2, '0')

  // Concatenate the components into the desired format
  const currentDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

  return currentDateTime
}

export function isCourseCompleted(
  dateString: string,
  timezone = 'Asia/Singapore'
) {
  const date = moment.tz(dateString, timezone)
  const currentDate = moment().tz(timezone)
  return date.isBefore(currentDate)
}

export function isCaptureStreamSupported() {
  const video = document.createElement('video')
  return 'captureStream' in video || 'mozCaptureStream' in video
}

export function maskEmail(email: string): string {
  const [localPart, domain] = email.split('@')

  if (localPart.length <= 2) {
    // If local part is too short to mask, return the email as is
    return email
  }

  const firstChar = localPart[0]
  const lastChar = localPart[localPart.length - 1]
  const maskedLocalPart = `${firstChar}${'*'.repeat(
    localPart.length - 2
  )}${lastChar}`

  return `${maskedLocalPart}@${domain}`
}

export function truncateText(text: string, limit: number) {
  if (text.length <= limit) {
    return text
  }
  return text.slice(0, limit) + '...'
}

export function capitalize(string: string) {
  return (
    string.charAt(0).toUpperCase() + string.slice(1).replace(/([A-Z])/g, ' $1')
  )
}

export function aOrAn(word: string) {
  if (!word) return ''

  const lowerCaseWord = word.toLowerCase()

  return ['a', 'e', 'i', 'o', 'u'].includes(lowerCaseWord[0]) ? 'an' : 'a'
}

export function hasStringData(data: string | null | undefined): data is string {
  const trimmed = data?.trim()
  if (
    trimmed === null ||
    trimmed === undefined ||
    trimmed === '' ||
    trimmed === 'null' ||
    trimmed === 'undefined'
  )
    return false

  return true
}

/** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder#description */
export function modulo(n: number, d: number) {
  return ((n % d) + d) % d
}

/**
 * Access `sequence` item at `idx` with automatic "wrapping around" in case of excess or negative index
 *
 * `Array.prototype.at()` supports negative indices but not excess indices
 *
 * ```ts
 * wrappedAccess([1, 2, 3], 0)  // 1
 * wrappedAccess([1, 2, 3], 4)  // 2
 * wrappedAccess([1, 2, 3], -1) // 3
 * ```
 */
export function wrappedAccess<T>(
  sequence: ArrayLike<T>,
  idx: number
): T | undefined {
  const effectiveIdx = modulo(idx, sequence.length)
  const item = sequence[effectiveIdx]

  return item
}

export function calcTimeDiffInMillisec(
  startDateTime: string,
  endDateTime: string
): number {
  // Parse the UTC datetime strings into moment objects
  const startMoment = moment.utc(startDateTime)
  const endMoment = moment.utc(endDateTime)

  // Calculate the difference in milliseconds
  const diffMilliseconds: number = endMoment.diff(startMoment)

  return diffMilliseconds
}

export function getSimulationUsedTime(simulation: SimulationType) {
  if (simulation.resumed_at?.length) {
    let timeUsed = 0
    const parsedResumeValues = simulation.resumed_at
    const parsedPauseValues = simulation.paused_at

    timeUsed += calcTimeDiffInMillisec(
      simulation.started_at as string,
      parsedPauseValues[0]
    )

    parsedResumeValues.forEach((resumedAt, i) => {
      if (!!parsedPauseValues[i + 1]) {
        timeUsed += calcTimeDiffInMillisec(resumedAt, parsedPauseValues[i + 1])
      } else {
        if (simulation.ended_at === null) {
          timeUsed += calcTimeDiffInMillisec(
            resumedAt,
            moment.utc().toISOString()
          )
        } else {
          timeUsed += calcTimeDiffInMillisec(resumedAt, simulation.ended_at)
        }
      }
    })
    return timeUsed
  }
  if (simulation.paused_at?.length) {
    const parsedPauseValues = simulation.paused_at
    const timeUsed = calcTimeDiffInMillisec(
      simulation.started_at as string,
      parsedPauseValues[0]
    )
    return timeUsed
  }
  if (simulation.ended_at !== null) {
    const timeUsed = calcTimeDiffInMillisec(
      simulation.started_at as string,
      simulation.ended_at
    )
    return timeUsed
  }
  if (simulation.started_at !== null) {
    const timeUsed = calcTimeDiffInMillisec(
      simulation.started_at,
      moment.utc().toISOString()
    )
    return timeUsed
  }
  return 0
}

export function millisecondsToSeconds(milliseconds: number) {
  return Math.floor(milliseconds / 1000)
}

export function sendToEagle3d(descriptor: Record<string, any>) {
  const obj = {
    cmd: 'sendToUe4',
    value: descriptor
  }

  const iframe = document.getElementById('iframe_1') as HTMLIFrameElement
  if (iframe) {
    iframe.contentWindow?.postMessage(JSON.stringify(obj), '*')
  } else {
    console.error('iframe_1 not found.')
  }
}

export function replaceLongSpacesWithNewline(text: string) {
  return text.replace(/\s{2,}/g, '\\n')
}

export function millisecondsToTimeString(
  ms: number | undefined | null,
  isFullHour = true
): {
  timeString: string
  totalMinutes: number
} {
  // Ensure ms is a positive number
  if (!ms) {
    return { timeString: '00:00:00', totalMinutes: 0 }
  }

  // Calculate total seconds from milliseconds
  const totalSeconds = Math.floor(ms / 1000)

  // Calculate hours, minutes, and seconds
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  // Format hours, minutes, and seconds with leading zeros if needed
  const hoursFormatted =
    hours > 0 || isFullHour ? hours.toString().padStart(2, '0') + ':' : ''
  const minutesFormatted =
    hours > 0
      ? minutes.toString().padStart(2, '0')
      : minutes.toString().padStart(2, '0')
  const secondsFormatted = seconds.toString().padStart(2, '0')

  if (
    isNaN(Number(hoursFormatted.replace(':', ''))) ||
    isNaN(Number(minutesFormatted.replace(':', ''))) ||
    isNaN(Number(secondsFormatted.replace(':', '')))
  ) {
    return { timeString: '00:00:00', totalMinutes: 0 }
  }

  // Create the time string
  const timeString = `${hoursFormatted}${minutesFormatted}:${secondsFormatted}`

  // Calculate total minutes
  const totalMinutes = hours * 60 + minutes + seconds / 60

  return { timeString, totalMinutes }
}

/**
 * Can also use Moment.js
 *
 * https://stackoverflow.com/a/76265684
 */
export function formatOrdinalNumber(
  num: number,
  rules = new Intl.PluralRules(undefined, { type: 'ordinal' })
): string {
  const category = rules.select(num)
  if (category === 'one') return `${num}st`
  if (category === 'two') return `${num}nd`
  if (category === 'few') return `${num}rd`
  return `${num}th`
}

/** Converts e.g. `Emilio Rossi` to `Emilio R.` */
export function compactName(name: string) {
  const parts = name.trim().split(' ')
  if (parts.length < 2) {
    return name
  }

  const lastPart = parts.at(-1)
  if (lastPart === undefined) {
    return name
  }

  const lastPartInitial = lastPart[0]
  if (lastPartInitial === undefined) {
    return name
  }

  const firstParts = parts.slice(0, -1)
  const firstPartsStr = firstParts.join(' ')

  const compact = `${firstPartsStr} ${lastPartInitial}.`

  return compact
}

/** Gets e.g. `Emilio` from `Emilio Rossi */
export function getFirstName(name: string) {
  const parts = name.trim().split(' ')
  if (parts.length < 1) {
    return name
  }

  const firstName = parts[0]

  return firstName
}

/** Useful for constructing URL search params objects */
export function stringifyRecordValues(
  record: Record<string, unknown>
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => [key, JSON.stringify(value)])
  )
}

export function getDisplayScenarioTitle(
  scenarioData: Pick<
    ScenarioType,
    'scenario_number' | 'title' | 'is_standalone'
  >,
  prefix: 'Scenario' | 'Pitch' = 'Scenario'
) {
  if (scenarioData.is_standalone) {
    return scenarioData.title
  }

  return `${prefix} ${scenarioData.scenario_number}: ${scenarioData.title}`
}

export function separateScenarioTypes(allScenarios: ScenarioType[]) {
  const regularScenarios: ScenarioType[] = []
  const standaloneScenarios: ScenarioType[] = []

  for (const scenario of allScenarios) {
    if (scenario.is_standalone) {
      standaloneScenarios.push(scenario)

      continue
    }

    regularScenarios.push(scenario)
  }

  return { regularScenarios, standaloneScenarios }
}

export async function checkSafariMicrophonePermission() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    stream.getTracks().forEach((track) => track.stop())
    return 'granted'
  } catch (err: any) {
    if (err.name === 'NotAllowedError') return 'denied'
    if (err.name === 'NotFoundError') return 'not-found'
    return 'error'
  }
}
