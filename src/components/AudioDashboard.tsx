import { useState } from 'react'

export default function AudioDashboard() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow p-4 mt-8">
      <h2 className="font-bold text-gray-800 mb-4">Audio Dashboard</h2>

      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 bg-primary text-white rounded-full hover:bg-primary/90"
        >
          {isPlaying ? '⏸' : '▶️'}
        </button>
        <div className="flex-1">
          <div className="h-2 bg-gray-200 rounded-full">
            <div className="h-full bg-primary rounded-full" style={{ width: '45%' }} />
          </div>
        </div>
        <span className="text-sm text-gray-600">00:27.00 / 01:00.00</span>
      </div>

      <div className="flex gap-2">
        <button className="text-sm bg-gray-100 px-3 py-1 rounded">Download MP3</button>
        <button className="text-sm bg-gray-100 px-3 py-1 rounded">Playback: 1x</button>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-sm text-gray-700 mb-2">Timeline Inspector</h3>
        <div className="space-y-2 max-h-64 overflow-auto">
          {[{ t: '00:00.00', sp: 'F', txt: 'សួស្តី' }, { t: '00:05.00', sp: 'M', txt: 'សួស្តីត្រឡប់' }].map((l, i) => (
            <div key={i} className="flex items-center text-sm border-b pb-1">
              <span className="w-20 font-mono text-gray-500">{l.t}</span>
              <span className="bg-gray-200 w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">{l.sp}</span>
              <span>{l.txt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
