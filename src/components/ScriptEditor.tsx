import { parseScript, autoAlign, stringifyScript } from '../services/scriptParser'

interface Props {
  script: string
  setScript: (v: string) => void
}

export default function ScriptEditor({ script, setScript }: Props) {
  const parsed = parseScript(script)
  const stats = {
    total: parsed.length,
    male: parsed.filter(l => l.speaker === 'M').length,
    female: parsed.filter(l => l.speaker === 'F').length,
    totalDur: parsed.reduce((acc, l) => acc + (l.endTime - l.startTime), 0)
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-start mb-3">
        <h2 className="font-bold text-gray-800">Script Editor</h2>
        <div className="text-xs text-gray-500 space-y-1">
          <div>Total Lines: {stats.total}</div>
          <div>Duration: {stats.totalDur.toFixed(2)}s</div>
          <div>M: {stats.male} | F: {stats.female}</div>
        </div>
      </div>

      <textarea
        className="w-full h-64 p-3 border rounded-lg font-mono text-sm"
        value={script}
        onChange={(e) => setScript(e.target.value)}
        placeholder="# Paste Khmer dubbing script here...\n00:00.00 - 00:04.50 [F] សួស្តី លោកអ្នកស្រី..."
      />

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setScript(stringifyScript(autoAlign(parsed)))}
          className="text-sm bg-yellow-100 text-yellow-800 px-3 py-2 rounded hover:bg-yellow-200"
        >
          ✨ តម្រឹមម៉ោងកុំឱ្យជាន់គ្នា
        </button>
        <button
          onClick={() => setScript('00:00.00 - 00:05.00 [F] អរគុណសម្រាប់ការចូលរួម\n00:05.50 - 00:10.00 [M] សូមអរគុណត្រឡប់មកវិញ')}
          className="text-sm bg-gray-100 text-gray-800 px-3 py-2 rounded hover:bg-gray-200"
        >
          Load Sample
        </button>
        <button
          onClick={() => setScript('')}
          className="text-sm bg-red-100 text-red-800 px-3 py-2 rounded hover:bg-red-200"
        >
          Clear
        </button>
      </div>
    </div>
  )
}
