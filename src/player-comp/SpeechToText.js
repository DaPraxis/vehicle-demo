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

  const [startTime, setStartTime] = useState(0)
  const [lastPlay, setLastPlay] = useState(false)

  // if (props.playing && !lastPlay){
  //   startSpeechToText()
  //   setLastPlay(!lastPlay)
  // }
  // else if (!props.playing && lastPlay){
  //   stopSpeechToText()
  //   setLastPlay(!lastPlay)
  // }

  if (props.currTime>0 && !lastPlay){
    setStartTime(Date.now())
    setLastPlay(true)
  }

  props.playing? startSpeechToText():stopSpeechToText()


  return (
    <div>
      <ul>
        {results.map(function(result){
          var date = new Date(result.timestamp*1000-startTime)
          var form = date.getMinutes()*60+Math.round(date.getSeconds())+"s"
          return(<li key={result.timestamp}>{ form+ ": " + result.transcript}</li>)
        })}
        {interimResult && <li>{interimResult}</li>}
      </ul>
    </div>
  );
}