
// MEDIA QUERY BREAK POINT FOR THE SLIDESHOW HERO IMAGES
let isLarge;
let mediaQuery=window.matchMedia("(min-width:380px)");
mediaQuery.addListener(screenBreakpoint);
function screenBreakpoint(screenSize){
    if(screenSize.matches){
        let i=0;
        isLarge=true;
        
while(i<3){
    document.querySelectorAll(".slide")[i].src=`./images/desktop-image-hero-${i+1}.jpg`;
    i++;
}

document.getElementById("last-pic-clone").src="./images/desktop-image-hero-3.jpg";
document.getElementById("first-pic-clone").src="./images/desktop-image-hero-1.jpg";
}
else{
    let i=0;
        isLarge=false;
    while(i<3){
        document.querySelectorAll(".slide")[i].src=`./images/mobile-image-hero-${i+1}.jpg`;
        i++;
    }
            document.getElementById("last-pic-clone").src="./images/mobile-image-hero-3.jpg";
        document.getElementById("first-pic-clone").src="./images/mobile-image-hero-1.jpg";

    }

}
screenBreakpoint(mediaQuery)
// Nav menue functionality
let linkItemsOverlay=document.querySelector(".link-menue-overlay-background");
let linkMenue=document.querySelector(".links-menue");
let hamburger=document.querySelector(".hamburger-btn");
// event listener for the nav menue open and close
hamburger.addEventListener("click",hamburgerOpen);
function hamburgerOpen(e){
    hamburger.classList.toggle("opened-hamburger");
    linkItemsOverlay.classList.toggle("visible-link-menue-overlay-background");
    linkMenue.classList.toggle("links-menue-opened");
   
}
// hero slideshow 
let slidePics=document.querySelector(".slide-pics");
let pics=document.querySelectorAll(".slide-pic");
let prevBtn=document.querySelector(".prev-btn");
let nextBtn=document.querySelector(".next-btn");

let counter=1;
let size;
if(isLarge){
    size=850;
}
else{
    size=375;
}


slidePics.style.transform=`translateX(-${counter*size}px)`;

// slide markup text
const markupContainer=document.querySelector(".slide-markups");
const markupTexts=document.querySelectorAll(".slide-markup_text");
let textCounter=0;
nextBtn.addEventListener("click",moveSlideForward);
// function to move slide forward
function moveSlideForward(e){
    if(isLarge){
        size=850;
    }
    else{
        size=375;
    }
    if(counter==pics.length-1){return;}
    slidePics.style.transition="transform 1s ease-in-out";
    counter ++;
    slidePics.style.transform=`translateX(-${counter*size}px)`;
    //
    markupTexts.forEach((markupText)=>{
        markupText.classList.remove("active-markup");
    })
    //
    if (textCounter==markupTexts.length-1){
        textCounter=-1;
    }
    textCounter++;
    markupTexts.forEach((markupText)=>{
        if(Array.from(markupTexts).indexOf(markupText)==textCounter){
            markupText.classList.add("active-markup");
        }
        
    })
}
// slide timer
setInterval(moveSlideForward,10000);
// MOVE SLIDE BACKWARDS

prevBtn.addEventListener("click",moveSlideBackward);
   
function moveSlideBackward(){
    if(isLarge){
        size=850;
    }
    else{
        size=375;
    }
    if(counter<=0){return;}
    slidePics.style.transition="transform 1s ease-in-out";
    counter --;
    slidePics.style.transform=`translateX(-${counter*size}px)`;
    //
    markupTexts.forEach((markupText)=>{
        markupText.classList.remove("active-markup");
    })
    //
    if (textCounter==0){
        textCounter=markupTexts.length-1;
    }
    else{
    textCounter--;}
    markupTexts.forEach((markupText)=>{
if(Array.from(markupTexts).indexOf(markupText)==textCounter){
    markupText.classList.add("active-markup");
}
    });
}

    
slidePics.addEventListener("transitionend",()=>{
    if (pics[counter].id=="last-pic-clone"){
        slidePics.style.transition="none";
        counter=pics.length-2;
        slidePics.style.transform=`translateX(-${counter*size}px)`;
    }
   else if (pics[counter].id=="first-pic-clone"){
        slidePics.style.transition="none";
        counter=pics.length-counter;
        slidePics.style.transform=`translateX(-${counter*size}px)`;
    }
})
document.body.addEventListener("keydown",()=>{
    if(event.key=="ArrowRight"){
        moveSlideForward();
    }
   else if(event.key=="ArrowLeft"){
        moveSlideBackward();
    }
})