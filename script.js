let gallery=document.querySelector(".gallery");
gallery.addEventListener("click",function(){
  location.assign("./gallary.html");
})

var uid = new ShortUniqueId();
let video = document.querySelector("video");
let capturebtncontainer = document.querySelector(".white-button");
let capturebtn = document.querySelector(".capture-btn");
let recordbtncontainer = document.querySelector(".red-button");
let recordbtn = document.querySelector(".record-btn");
let timer = document.querySelector(".timer");
let transparentcolor = "transparent";
let chunks = [];
let constraints = {
  video: true,
  audio: false
}
let isrecord = false;
navigator.mediaDevices.getUserMedia(constraints)
  .then((stream) => {
    video.srcObject = stream;
    recorder = new MediaRecorder(stream);
    recorder.addEventListener("start", () => {
      console.log("I am getting before chunks");
      chunks = [];
      console.log("I am getting after chunks");
    })
    recorder.addEventListener("dataavailable", (e) => {
      chunks.push(e.data);
      console.log("chunks", chunks)
      console.log("recording pushed in chunks")
    })
    recorder.addEventListener("stop", () => {
      let blob = new Blob(chunks, { type: 'video/mp4' });
      console.log("Blob", blob);
      let videoURL = URL.createObjectURL(blobData);
      console.log("video", videoURL);
      let a = document.createElement("a");
      a.href = videoURL;
      a.download = "myVideo.mp4"
      a.click();
      if(db){
        let videoId=uid();
        let dbTransaction=db.transaction("video","readwrite");
        let videoStore=dbTransaction.objectStore("video");
        let videoEntry={
          id:`vid-${videoId}`,
          url:videoURL,
        }
        let addRequest=videoStore.add(videoEntry);
        addRequest.onsuccess=()=>{
         console.log("Video added to db succesfully!")
        };
      }
    })
  })

capturebtncontainer.addEventListener('click', () => {
   capturebtn.classList.add("scale-capture");
  let canvas = document.createElement("canvas");
  let tool = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  tool.drawImage(video, 0, 0, canvas.width, canvas.height);
  tool.fillStyle = transparentcolor;
  tool.fillRect(0, 0, canvas.width, canvas.height);
     let imageurl=canvas.toDataURL("image/jpeg");
  // let img=document.createElement("img");
  // let a = document.createElement("a");
  // a.download = "file.png"
  // a.href = imageurl
  // a.click()
  // a.remove()
  // img.src=imageurl;
  // document.body.append(img);

  if(db){
    let imageId=uid();
    let dbTransaction=db.transaction("image","readwrite");
    let imageStore=dbTransaction.objectStore("image");
    let imageEntry={
      id:`imag-${imageId}`,
      url:imageurl,
    }
    let addRequest=imageStore.add(imageEntry);
    addRequest.onsuccess=()=>{
     console.log("Video added to db succesfully!")
    };
  } 
  setTimeout(()=>{
    capturebtn.classList.remove("scale-capture")
  },1000);

})
recordbtncontainer.addEventListener("click", () => {
  isrecord = !isrecord;
  if (isrecord) {
    recorder.start();
    startTimer();
  } else {
    recorder.stop();
    stopTimer();
  }
})
let count = 0;
let timerID;
function startTimer() {
  timer.style.display = 'block';
  function displayTimer() {
    let totalseconds = count;
    let hours = Number.parseInt(totalseconds / 3600);
    totalseconds = totalseconds % 3600;
    let min = Number.parseInt(totalseconds / 60);
    totalseconds = totalseconds % 60;
    let seconds = totalseconds;
    hours = (hours < 10) ? `0${hours}` : hours;
    min = (min < 10) ? `0${min}` : min;
    seconds = (seconds < 10) ? `0${seconds}` : seconds;
    timer.innerText = `${hours}:${min}:${seconds}`;
    count++;

  }
  timerID = setInterval(displayTimer, 1000)
}
function stopTimer() {
  clearInterval(timerID);
  timer.innerText = "00:00:00";
  timer.style.display = "none";
}

let filtercontainer=document.querySelector(".filtercontainer");
let filterlayer=document.querySelector(".filter-layer");
let allfilter=document.querySelectorAll(".filter");
allfilter.forEach((filterElem)=>{
  filterElem.addEventListener('click',()=>{
    transparentcolor=getComputedStyle(filterElem).getPropertyValue('background-color');
    filterlayer.style.backgroundColor=transparentcolor;
  })
})






