import React, {useEffect, useState} from 'react';
import useSpeechToText from 'react-hook-speech-to-text';

export default function SpeechToText(props) {
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  const [startTime, setStartTime] = useState(Infinity)
  const [lastPlay, setLastPlay] = useState(false)

  useEffect(()=>{startSpeechToText()})

  if (props.playing && !lastPlay){
    startSpeechToText()
    setLastPlay(!lastPlay)
  }
  else if (!props.playing && lastPlay){
    stopSpeechToText()
    setLastPlay(!lastPlay)
  }


  return (
    <div>
      <ul>
        {results.map(function(result){
          var date = new Date((result.timestamp)*1000)
          var form = "Date: "+date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
          return(<li key={result.timestamp}>{ form+ ": " + result.transcript}</li>)
        })}
        {interimResult && <li>{interimResult}</li>}
      </ul>
    </div>
  );
}