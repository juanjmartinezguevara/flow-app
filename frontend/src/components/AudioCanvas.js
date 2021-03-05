import React from 'react';

function AudioCanvas(props) {
   function displayCanvas(){
    navigator.mediaDevices.getUserMedia({
      audio: true
    })
    .then(stream => {
      var context = new AudioContext();
      var src = context.createMediaStreamSource(stream);
      var analyser = context.createAnalyser();
  
      var canvas = document.getElementById('canvas')

    
     
      var ctx = canvas.getContext("2d");
  
      src.connect(analyser);
      
  
      analyser.fftSize = 256;
  
      var bufferLength = analyser.frequencyBinCount;
     
  
      var dataArray = new Uint8Array(bufferLength);
  
      var WIDTH = canvas.width;
      var HEIGHT = canvas.height;
  
      var barWidth = (WIDTH / bufferLength) * 2.5;
      var barHeight;
      var x = 0;
  
      function renderFrame() {
        requestAnimationFrame(renderFrame);
  
        x = 0;
  
        analyser.getByteFrequencyData(dataArray);
  
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        
        
        
        for (var i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i]*0.6;
      

            
            ///topcanvas
            // barHeight + (10 * (i/bufferLength));
          var b = 50 + (2 * (i/bufferLength))
          var g = 150 * (3 * (i/bufferLength));
          var r = 150;
        
          ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
          ctx.fillRect(x, (HEIGHT - barHeight)*0.5, barWidth, barHeight);
  
          x += barWidth + 1;
        
      
      }
      
    };
   
      renderFrame();
  })

   
    
      
}

       
         
      const oneOrTwo=()=>{
         
            return (
                <div className="canvas-container">
                  <canvas id="canvas" onClick={displayCanvas}></canvas>
                 
                </div>
                  )
          
      }
      
   

return (
  oneOrTwo()
);
}
export default AudioCanvas;