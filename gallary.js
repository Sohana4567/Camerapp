let back=document.querySelector(".back");
back.addEventListener("click",function(){
    location.assign("./index.html");
})


setTimeout(()=>{
    if(db){
        let imageDBTransaction=db.transaction("image",'readonly');
        let imagestore=imageDBTransaction.objectStore("image");
        let  imageRequest=imagestore.getAll();
        imageRequest.onsuccess=()=>{
            let imageResult=imageRequest.result;
            let parentcontainer=document.querySelector(".parent-container");
            imageResult.forEach((imageObj)=>{
                let imageElem=document.createElement("div");
                imageElem.setAttribute("class","media-cont");
                imageElem.setAttribute("id",imageObj.id);
                let url=imageObj.url;
                imageElem.innerHTML=`
                <div class="media">
                <img src="${url}"/>
                </div>
                <div class="delete action-btn">Delete</div>
                <div class="download action-btn">DOWNLOAD</div>
                `;
                parentcontainer.appendChild(imageElem);
                let deletebtn=imageElem.querySelector(".delete");
                deletebtn.addEventListener("click",deletebutton);
                let download=imageElem.querySelector(".download");
                // download.forEach(element => {
                //     element.addEventListener("click",downloadbtn)
                //   })
               download.addEventListener("click",downloadbtn);
               let mediacont=imageElem.querySelector(".media");
               mediacont.addEventListener('click',model);
              
            })
        }
        
        let videoDBTransaction=db.transaction("video",'readonly');
        let videostore=videoDBTransaction.objectStore("video");
        let  videoRequest=videostore.getAll();
        videoRequest.onsuccess=()=>{
            let  videoResult=videoRequest.result;
            let galleryCont=document.querySelector(".gallery-cont");
            videoResult.forEach((videoObj)=>{
                let  videoElem=document.createElement("div");
                videoElem.setAttribute("class","media-cont");
                videoElem.setAttribute("id",videoObj.id);
                let url= URL.createObjectURL(videoObj.blob);
                videoElem.innerHTML=`
                <div  class="media">
                <video  autoplay  loop  src="${url}"/></video>
                </div>
                <div class="delete  action-btn">Delete</div>
                <div class="download  action-btn">DOWNLOAD</div>
                `;
                galleryCont.appendChild(videoElem);
            })
        }


        function  deletebutton(e){
            let id=e.target.parentElement.getAttribute("id");
            let type=id.split("-")[0];
            console.log("I am",type);
            if(type=="imag"){
                let imageTransaction=db.transaction("image",'readwrite');i
                let storeimage=imageTransaction.objectStore("image");
                storeimage.delete(id);
                e.target.parentElement.remove();
            }else{
                if(type=="vid"){
                    let videoTransaction=db.transaction("video",'readwrite');
                    let storevideo=videoTransaction.objectStore("video");
                    storevideo.delete(id);
                    e.target.parentElement.remove();
                }
            }
        }

        function downloadbtn(e){
            let id=e.target.parentElement.getAttribute("id");
            let type=id.split("-")[0];
            console.log("I am",type)
            if(type=="imag"){
                let imageTransaction=db.transaction("image",'readonly');
                let storeimage=imageTransaction.objectStore("image");
                let  imagesRequest=storeimage.get(id);
                imagesRequest.onsuccess=()=>{
                    let  imagesResult=imagesRequest.result;
                    let imagesurl=imagesResult.url;
                     let a = document.createElement("a");
                     a.href = imagesurl;
                     a.download = "myimage.jpg"
                     a.click();
                }
         }else{
            if(type=="vid"){
                let videoTransaction=db.transaction("video",'readonly');
                let storevideo=videoTransaction.objectStore("video");
                let  videosRequest=storevideo.get(id);
                videosRequest.onsuccess=()=>{
                    let  videosResult=videosRequest.result;
                    let  videourl=videosResult.url;
                     let a = document.createElement("a");
                     a.href = videourl;
                     a.download = "myVideo.mp4"
                     a.click();
                }
            }
         }
       }
       function model(e){
        //    console.log("I am getting model00");
        console.log("getting parent",e.target.parentElement.parentElement);
        let mediaelement=document.querySelectorAll(".media-cont");
        let actionbtnbtn=document.querySelectorAll(".action-btn")
        mediaelement.forEach((currIndex)=>{
            currIndex.classList.remove("active");
           
        })
        e.target.parentElement.parentElement.classList.add("active");
        // actionbtn.forEach((action)=>{
        //     action.classList.remove("active")
        // })
      
        // actionbtn.forEach((action)=>{
        //     e.target.action.classList.add("active")
        // })

        let actionbtn=e.target.parentElement.parentElement.querySelectorAll(".action-btn");
        //actionbtn.classList.add("active");
        actionbtnbtn.forEach((actionmovie)=>{
            actionmovie.classList.remove("active");
       })
        actionbtn.forEach((action)=>{
             action.classList.add("active");
        })
       }
    }
//   function doublemodel(e){
//      e.target.parentElement.parentElement.classList.add("inactive");
//   }
   

},1000)





