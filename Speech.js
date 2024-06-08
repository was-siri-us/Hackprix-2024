import React from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import 'regenerator-runtime/runtime';
export default function Speech() {
    const { transcript, browserSupportsSpeechRecognition,resetTranscript} = useSpeechRecognition();
    if (!browserSupportsSpeechRecognition) {
        console.log("hello")
        return null
    }
    const startListening = ()=>SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });

  return (
    <>
      <div>

        
        
        {/* {transcript} */}
        <div> {transcript} </div>
      </div>
      <div>
      <button onClick={startListening}>Start Listening</button>
      <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
      <button onClick={resetTranscript}>Reset</button>
      </div>
    </>
  )
}
