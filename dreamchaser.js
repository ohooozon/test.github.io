var mv;
w = window.innerWidth;
h = window.innerHeight;
var ampl;

var volhistory = [];

function preload(){
  sound = loadSound('/media/dreamchaser.mp3');
}

 function setup(){
  var cnv = createCanvas(w,h);
  cnv.mouseClicked(togglePlay);
  fft = new p5.FFT(0.9,128);
  sound.amp(0.2);
  ampl = new p5.Amplitude();


  mv = createVideo(['/media/dreamchaser.mp4',
                         '/media/dreamchaser.webm']);
  mv.hide(); 
}

function draw() {
background(0);
  image(mv,0,0); 
    filter('GRAY');
    
    
var spectrum = fft.analyze();
  noStroke();
  fill(255); 
  for (var i = 0; i< spectrum.length; i++){
    var x = map(i, 0, spectrum.length/3, 0,w);
    var he = -h +map(spectrum[i], 0, 255, h, 400);
    rect(x, h-300, w/spectrum.length, he );
  }
    
  var spectrum = fft.analyze();
 noStroke();
  fill(255); 
  for (var i = 0; i< spectrum.length; i++){
    var x = map(i, 0, spectrum.length/3, 0,w);
    var he = -h +map(spectrum[i], 0, 255, h, 400);
    rect(x, h-300, w/spectrum.length, -he );
  }

  var vol = ampl.getLevel();
  volhistory.push(vol);
  stroke(255,0,0);
  noFill();
  push();
  var currentY = map(vol, 0, 1, height, 0);
  translate(0, height / 1.2- currentY);
  beginShape();
  for (var i = 0; i < volhistory.length; i++) {
    var ya = map(volhistory[i], 0, 1, height, -100);
    vertex(i, ya);
  }
  endShape();
  pop();
  if (volhistory.length > width ) {
    volhistory.splice(0, 1);
  }

  stroke(0);
  line(volhistory.length, 0, volhistory.length, height);
    
    if(i>w){
        i=0;
    }


  text('click to play/pause', 4, 10);
    
//    
//  fill(255);
//  textAlign(CENTER);
//  textSize(40);
//  text(words[index], width/2, height/2);
//  
//  if (millis() - timestamp > 1000) {
//    index++;
//    timestamp = millis();
//    
//    if (index > words.length - 1){
//      index = 0;
//    }
 // }
}


function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
      mv.pause();
  } else {
    sound.loop();
      mv.loop();
  }
}
