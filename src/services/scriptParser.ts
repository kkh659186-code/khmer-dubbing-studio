export interface Line {
  id: string
  startTime: number
  endTime: number
  speaker: 'M' | 'F' | 'S' | null
  text: string
}

function parseTime(t: string): number {
  const parts = t.trim().split(':').map(Number)
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2]
  if (parts.length === 2) return parts[0] * 60 + parts[1]
  return parts[0] || 0
}

export function parseScript(input: string): Line[] {
  const lines: Line[] = []
  input.split('\n').forEach((line, idx) => {
    const clean = line.trim()
    if (!clean || clean.startsWith('#') || clean === '|' || /^[-*]{3,}$/.test(clean)) return

    const speakerMatch = clean.match(/\[([MFS])\]|\(([MFS])\)|^([MFS]):|\[ប្រុស\]|\[ស្រី\]/i)
    const speaker = speakerMatch ? (speakerMatch[1] || speakerMatch[2] || speakerMatch[3] || '').toUpperCase() : null

    const timeMatch = clean.match(/(\d{1,2}[:\d\.\s,]+)[\s\-_–—→~:]+(\d{1,2}[:\d\.\s,]+)/)
    let startTime = 0, endTime = 0

    if (timeMatch) {
      startTime = parseTime(timeMatch[1])
      endTime = parseTime(timeMatch[2])
    }

    const text = clean.replace(/\[.*?\]|\(.*?\)|[MFS]:|ប្រុស|ស្រី|\d{1,2}[:\d\.\s,]+[\s\-_–—→~:]+\d{1,2}[:\d\.\s,]+/g, '').trim()
    if (text) lines.push({ id: `${idx}`, startTime, endTime, speaker, text })
  })
  return lines
}

export function autoAlign(lines: Line[], baseOffset = 0): Line[] {
  const speed = 11.5 // chars/sec
  const breath = 0.45 // sec
  let current = baseOffset

  return lines.map((line, i) => {
    const charCount = line.text.replace(/\s/g, '').length
    let duration = charCount / speed + breath

    if (line.speaker === 'S') {
      duration = Math.max(duration, 0.5)
    }

    const start = current
    const end = start + duration

    current = end + 0.05

    return { ...line, startTime: start, endTime: end }
  })
}

function formatTime(t: number): string {
  const m = Math.floor(t / 60)
  const s = Math.floor(t % 60)
  const ms = Math.floor((t % 1) * 100)
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(ms).padStart(2, '0')}`
}

export function stringifyScript(lines: Line[]): string {
  return lines.map(l => {
    const sp = l.speaker === 'M' ? '[M]' : l.speaker === 'F' ? '[F]' : l.speaker === 'S' ? '[SILENCE]' : ''
    return `${formatTime(l.startTime)} - ${formatTime(l.endTime)} ${sp} ${l.text}`
  }).join('\n')
}
