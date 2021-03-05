import React, {useRef,useState,useEffect} from 'react';
import beat1 from '../assets/beatOne.m4a'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import datamuse from 'datamuse'
import mic from '../images/mic.svg'
import play from '../images/play.svg'
import stop from '../images/stop.svg'
import trashbin from '../images/trashbin.svg'
import save from '../images/save.svg'
import replay from '../images/replay.svg'
import AudioCanvas from './AudioCanvas'

function TestAudio(props) {
   
    const [recordings,setRecordings] = useState((<li>Track 1<audio id='userRecording'></audio></li>))
    const [rhymes,setRhymes] = useState([])
    const { transcript, resetTranscript } = useSpeechRecognition()
    const [silent,setSilent] = useState(false)
    const [lock,setLock] = useState([])
    const [keyCounter,setKeyCounter] = useState(0)
    //const [words,setWords] =useState()

    useEffect(()=>{
        const lastWord = transcript.split(' ')[transcript.split(' ').length-1]
        let retrievedRhymes=[]
        datamuse.request(`words?rel_rhy=${lastWord}&max=5`)
        .then((res)=>{
           res.forEach(element => {
               retrievedRhymes.push(` ${element.word} `)       
           });
           if(retrievedRhymes.length!==0){
          
           setRhymes(retrievedRhymes)
           }
           
           
           addSongLine()
        })
        
    },[silent])

    let myReq;   //animation frame ID
   

    function recordAudio(){

    function detectSilence(
        stream,
        onSoundEnd = _=>{},
        onSoundStart = _=>{},
        silence_delay = 50,
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
    // const copyRec= [...recordings]
    // copyRec.push((<audio src={blobby} id={name} key={name} title={name}></audio>))
    
    const copyRec = (<audio src={blobby} id={'userRecording'} key={name}></audio>)
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

        document.getElementById('fixer').onclick=()=>{
            recorder.stop()
            cancelAnimationFrame(myReq)
            console.log('stopped recording')
        }
  
}
let key = 0

function go(blob){

  const url = window.URL.createObjectURL(blob);
  key++
  addRec(url,`take ${key}`)

}


const stopRecording=()=>{
    document.getElementById('song').pause()
    document.getElementById('song').currentTime=0
}
//currently there exists a delay that needs to be offset when merged.!!!!!!!


const songLine =()=>{
    const lastLine= transcript
    setKeyCounter(keyCounter+1)
   return (
   <p key={keyCounter} style={{color:'white'}}>{lastLine}</p>
)
}

const [line,setLine]=useState([])

const addSongLine=()=>{
    const copyLine= [...line]
    copyLine.push(songLine())
    resetTranscript()
    setLine(copyLine)
}

const lockSuggestion=()=>{
  const copyRhyme= [...rhymes]
  setLock(copyRhyme)
}

const handlePlayPause=()=>{
  if(document.getElementById('userRecording').paused)
  {
    document.getElementById('userRecording').play();
  }else{
    document.getElementById('userRecording').pause();
  }
}


const handleRecStop = () => {
  if (document.getElementById('song').paused) {
    // document.getElementById('record-stop').setAttribute('class', 'button-icons bi-stop')
    document.getElementById('record-stop-img').src = stop
    recordAudio()
  }
  else {
    // document.getElementById('record-stop').setAttribute('class', 'button-icons bi-record')
    document.getElementById('record-stop-img').src = mic
    stopRecording()
    document.getElementById('fixer').click();
  }
}

//resizeLines function


    return (
        <div className="TestAudio">
          <audio id='song' src={beat1} loop={true} ></audio>
          <p id='fixer'></p>
          <div className="scroll-rhymes-container" id='currentTranscript'>
            {line}
            <p style={{color:'rgb(0 255 220)'}}>{transcript}</p>
          </div>

              <div className="nav-buttons-play">

                <div className="suggestions-container">
                  <div className="suggestions sug-1">
                    <div className="custom-rhyme">
                      <div className="custom-rhyme-inner" id='suggestion' onClick={lockSuggestion}>
                        <p style={{color:'rgb(255 63 143)'}}>{rhymes}</p>
                      </div>
                    </div>
                  </div>
                  <div className="suggestions sug-2">
                    <div className="custom-rhyme">
                      <div className="custom-rhyme-inner" id='lockedRhyme'>
                        <p style={{color: 'rgb(94 202 253)'}}>{lock}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="canvas-anim-box">
                  <div className="canvas-outset">
                    <div className="canvas-inset">
                      <AudioCanvas />
                    </div>
                  </div>
                </div>
                
                <div className="playback-controls-panel">
                  <div className="playback-container">
                    <div className="playback-wrapper">
                      <div className="tracks-container">
                        <div className="tracks-inset">
                          <div className="tracks-onset">
                            <ul>
                              {recordings}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="selected-container">
                            <div><img className="button-icons" src={replay}></img></div>
                            <div><img className="button-icons" src={stop}></img></div>
                            <div><img className="button-icons" src={save}></img></div>
                      </div>
                    </div>
                  </div>
                  <div className="duration-container">
                    <div className="dur-inset">
                      <div className="dur-onset"></div>
                    </div>
                  </div>
                  <div className="nav-list-play">
                      <div className="button-icons-inset">
                        <div className="button-icons-outset" onClick={handlePlayPause} id='playButton'>
                          <img className="button-icons bi-play" src={play}></img>
                        </div>
                      </div>
                      <div className="button-icons-inset">
                        <div className="button-icons-outset">
                          <img className="button-icons bi-stop" src={stop}></img>
                        </div>
                      </div>
                      <div className="button-icons-inset">
                        <div className="button-icons-outset" id="record-stop" onClick={handleRecStop}>
                          <img className="button-icons bi-record" id="record-stop-img" src={mic}></img>
                        </div>
                      </div>
                      <div className="button-icons-inset">
                        <div className="button-icons-outset">
                          <img className="button-icons bi-play" src={trashbin}></img>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        </div>
    );
}

export default TestAudio;