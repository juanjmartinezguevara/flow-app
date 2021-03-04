import React, {useRef,useState,useEffect} from 'react';
import beat1 from '../assets/beatOne.m4a'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import datamuse from 'datamuse'
function TestAudio(props) {
   
    const [recordings,setRecordings] = useState([])
    const [rhymes,setRhymes] = useState([])
    const { transcript, resetTranscript } = useSpeechRecognition()
    const [silent,setSilent] = useState(false)
    //const [words,setWords] =useState()

    useEffect(()=>{
        const lastWord = transcript.split(' ')[transcript.split(' ').length-1]
        let retrievedRhymes=[]
        datamuse.request(`words?rel_rhy=${lastWord}&max=5`)
        .then((res)=>{
           res.forEach(element => {
               retrievedRhymes.push(` ${element.word} `)
           });
          
           setRhymes(retrievedRhymes)
           
           
           addSongLine()
        })
        
    },[silent])

    let myReq;   //animation frame ID
   

    function recordAudio(){
     
    function detectSilence(
        stream,
        onSoundEnd = _=>{},
        onSoundStart = _=>{},
        silence_delay = 100,
        min_decibels =-80
        ) {
        const ctx = new AudioContext();
        const analyser = ctx.createAnalyser();
        const streamNode = ctx.createMediaStreamSource(stream);
        

        streamNode.connect(analyser);
        analyser.minDecibels = min_decibels;
      
        const data = new Uint8Array(analyser.frequencyBinCount); // will hold our data
        let silence_start = performance.now();
        let triggered = false; // trigger only once per silence event
     
        function loop(time) {
          myReq=requestAnimationFrame(loop); // we'll loop every 60th of a second to check
          analyser.getByteFrequencyData(data); // get current data
          if (data.some(v => v)) { // if there is data above the given db limit
            if(triggered){
              triggered = false;
              onSoundStart();
              }
            silence_start = time; // set it to now
          }
          if (!triggered && time - silence_start > silence_delay) {
            onSoundEnd();
            triggered = true;
          }
   
        
       
        }
        loop();
      }


      function onSilence() {
        console.log('silence')
        setSilent(true)
        


      }
      function onSpeak() {
        console.log('speaking');
        setSilent(false)
      }
      
      navigator.mediaDevices.getUserMedia({
          audio: true
        })
        .then(stream => {
          detectSilence(stream, onSilence, onSpeak);

          var audio = document.getElementById('song').captureStream()
            document.getElementById('song').play()
          mergeStreams(stream,audio)
          SpeechRecognition.startListening({continuous:true})
          
        })
        .catch(console.error);
    }

  
//add recording to list 
const addRec =(blobby,name)=>{
    const copyRec= [...recordings]
    copyRec.push((<audio src={blobby} id={name} key={name} title={name} controls ></audio>))
    setRecordings(copyRec)
}

function mergeStreams(stream1,stream2){
    const audioContext = new AudioContext();
    console.log('started recording')
       let audioIn_01 = audioContext.createMediaStreamSource(stream1);
        let audioIn_02 = audioContext.createMediaStreamSource(stream2);
        console.log('started recording')
        let dest = audioContext.createMediaStreamDestination();
        console.log('started recording')
        audioIn_01.connect(dest);
        audioIn_02.connect(dest);
        console.log('started recording')
        const recorder = new MediaRecorder(dest.stream);
        recorder.start()
        console.log('started recording')
         
        let chunks = [];
        
      
        recorder.ondataavailable = (event) => {       
            chunks.push(event.data); 
            console.log(chunks)
            go(chunks[0])
            SpeechRecognition.stopListening()
            
        }

        document.getElementById('stop').onclick=()=>{
            recorder.stop()
            cancelAnimationFrame(myReq)
            console.log('stopped recording')
        }
  
}

function go(blob){

  const url = window.URL.createObjectURL(blob);
  addRec(url,'download')

}


const stopRecording=()=>{
    document.getElementById('song').pause()
    document.getElementById('song').currentTime=0
    cancelAnimationFrame(myReq)
}
//currently there exists a delay that needs to be offset when merged.!!!!!!!


const songLine =()=>{
    const lastLine= transcript
   return (<div>
   <p style={{color:'blue'}}>{lastLine}</p>
    <p style={{color:'red'}}>{rhymes}</p>
    </div>)
}

const [line,setLine]=useState([])

const addSongLine=()=>{
    const copyLine= [...line]
    copyLine.push(songLine())
    resetTranscript()
    setLine(copyLine)
}



    return (
        <div>
      
            <audio  id='song' src={beat1} loop={true} ></audio>
           
            <button id='stop' onClick={stopRecording}> Stop </button>
            <button onClick={recordAudio}> Record </button>
                <div id='scroller'>
                
                   {line}
                   <div id='currentList'>
                        <p style={{color:'blue'}}>{transcript}</p>
                        <p style={{color:'red'}}>{rhymes}</p>
                    </div>
                 
                </div>
            <div>
                {recordings}
            </div>
        </div>
    );
}

export default TestAudio;