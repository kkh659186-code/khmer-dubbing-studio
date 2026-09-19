import express from 'express';
import cors from 'cors';
import * as edgeTTS from 'msedge-tts';

const app = express();
app.use(cors());

const voiceMap = {
  F: 'km-KH-SreymomNeural',
  M: 'km-KH-PisethNeural',
};

app.get('/api/tts/neural', async (req, res) => {
  try {
    const { text, voice = 'F' } = req.query;
    if (!text) return res.status(400).json({ error: 'Text required' });

    const tts = new edgeTTS.TextToSpeech();
    const voiceName = voiceMap[voice as 'F' | 'M'] || voiceMap.F;
    const audio = await tts.toAudio({ text, voice: voiceName });

    res.set('Content-Type', 'audio/mpeg');
    res.send(audio);
  } catch (err) {
    res.status(500).json({ error: 'TTS failed', details: String(err) });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
