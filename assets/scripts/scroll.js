//This all controls the animations on scroll.
//Add item you want to this obj with its id. Then make a class with "id + --scrolled" for the animation
let toBeAnimated = {
    greet: {id:"greetID"},
    tech: {id:"techCont"},
    rob: {id:"robCont"},
    contact: {id:"contactID"}
}
//Some animations we dont want to do on a phone, use this var 
const touchScreen = ("ontouchstart" in document.documentElement)

const thumb = document.getElementById("progressBar__thumb")
const skillsImg = document.getElementById("selector--skills")
const skillsTxt = document.getElementById("skillsText")
const doom = document.getElementById("doomcover");

//For each item in the toBeAnimated obj, store the offset from top of vp, dictating when an animation should take place
//Get the elements offsettop. this gives the distance to the top of the parent node. Loop through each of its parent nodes until there are no more, adding to the distance to top with each of them.
(function(){
    for(i in toBeAnimated){ 
        // toBeAnimated[i].eleTop = getOffsetTop(document.getElementById(toBeAnimated[i].id))
        let ele = document.getElementById(toBeAnimated[i].id)
        let distance = 0
        if(ele.offsetParent){
            do{
                distance += ele.offsetTop
                ele = ele.offsetParent
            } while(ele)
        }
        toBeAnimated[i].eleTop = (distance < 0 ? 0 : distance)
    }
}())

//check if given element is in viewport
function isInViewport(el){
    let rect = el.getBoundingClientRect()
    //500 and 100 are for increased bounds
    return(!(rect.top >= 500 || rect.bottom <= ((window.innerHeight) - 100)))
}

window.addEventListener("scroll", function(){
    let winScroll = document.documentElement.scrollTop || document.body.scrollTop
    let vh = window.innerHeight / 2
    let scrollPercentage = ((winScroll / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100)

    //Throttle scroll
    if(winScroll % 6 == 0){
        for(i in toBeAnimated){
            //vh * 1.3 dictates when on the page the animation is triggered
            if(winScroll > (toBeAnimated[i].eleTop - (vh * 1.3))){
                document.getElementById(toBeAnimated[i].id).className += (" " + toBeAnimated[i].id + "--scrolled")
                delete toBeAnimated[i]
            }
        }
        //If the doom section is in view, add hue rotate animation
        if(isInViewport(doom))(doom.style.animation = "doomback 5s infinite")
        else(doom.style.animation = "none")

        //Header progress bar
        thumb.style.width = scrollPercentage + "%"
    }
    //Only zoom image when the innerWidth is more than the height. Image is square, and we base back size on width of vp
    //No throttle to make the zoom of the skills img smooth
    if(!(touchScreen)){
        if(isInViewport(skillsImg)){
            console.log("the width is higher than the height")
            //Increase the background image size according to the amount of screen scrolled
            skillsImg.style.backgroundSize = 65 + scrollPercentage + "% auto"
            //rotate the text
            skillsTxt.style.transform = "rotate("+ ((scrollPercentage / 4) - 10) +"deg)"
        }
    }
})