export interface AudioLine {
  startTime: number
  endTime: number
  url: string
  speaker: string
}

export async function renderAudioBuffer(lines: AudioLine[], masterDuration: number): Promise<AudioBuffer> {
  const ctx = new OfflineAudioContext(1, masterDuration * 48000, 48000)

  for (const line of lines) {
    try {
      const res = await fetch(line.url)
      const arrayBuf = await res.arrayBuffer()
      const audioData = await ctx.decodeAudioData(arrayBuf)

      const start = line.startTime
      const end = Math.min(line.endTime, masterDuration)
      const duration = end - start

      const source = ctx.createBufferSource()
      source.buffer = audioData
      source.connect(ctx.destination)
      source.start(start)
      source.stop(end)

    } catch (e) {
      console.warn('Failed to process line:', line)
    }
  }

  return ctx.startRendering()
}

export async function encodeMp3(buffer: AudioBuffer, rate = 1.0): Promise<Blob> {
  // In a real app, integrate lamejs here
  // For now, returning a WAV blob as fallback
  const wav = new Blob([buffer.getChannelData(0)], { type: 'audio/wav' })
  return wav
}
