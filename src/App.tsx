import { useState } from 'react'
import Header from './components/Header'
import ScriptEditor from './components/ScriptEditor'
import AudioDashboard from './components/AudioDashboard'

function App() {
  const [script, setScript] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        <ScriptEditor script={script} setScript={setScript} />
        <div className="mt-8">
          <button
            onClick={() => { setIsGenerating(true); setProgress(0); }}
            className="w-full bg-primary text-white py-3 rounded-lg font-bold text-lg hover:bg-primary/90 transition disabled:opacity-50"
            disabled={isGenerating || !script}
          >
            🎙 បង្កើតសំឡេងស្គ្រីបទាំងមូល
          </button>
          {isGenerating && (
            <div className="mt-4">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-sm text-gray-600 mt-2">Processing... {progress}%</p>
            </div>
          )}
        </div>
        <AudioDashboard />
      </main>
    </div>
  )
}

export default App
