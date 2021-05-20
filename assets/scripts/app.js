//If the device is not a touchscreen - import the parallax file into the html
if(!('ontouchstart' in document.documentElement)){ 
    (function (){
        let js = document.createElement("script")
        js.src = "assets/scripts/parallax.js"
        document.querySelector('body').appendChild(js)
        //Only use the rellax library when it isnt a touchscreen device. at 740px, a style query breaks if there isnt a rellax.
        if(window.innerWidth > 740){
            new Rellax('.rellax');
        }
    })()
    //In the interest of processing power on phones, dont use the flip word feature
}else{
//This flips a random amount of random words from the skills container
//Adds class to flip the word, reverses the word's order of letters to make it readable
    (function(){
        let cont = document.getElementById("skillsText").children
        //Random amount of words. Where min is 4 and amount of items in container is max
        let numOfWords = Math.floor(Math.random() * (cont.length - 4 + 1) + 4)

        for(i = 0; i < numOfWords; i++){
            //Random word from cont
            let randSpan = cont[Math.floor( Math.random() * cont.length)]
            //If this word HASNT been flipped before
            if(randSpan.className != "skill__flip"){
                //Get the innertext of the span. Remove the ">" at the end of the string
                let str = randSpan.textContent.slice(0, -1)
                //Make span into array with split(), reverse that array, then join them again into string
                str = str.split("").reverse().join("");
                //Replace the text content with the flipped word. Add back the ">"
                randSpan.textContent = "<" + str
                //add className to span to flip word
                randSpan.classList.toggle("skill__flip")
            }
        }
    }())
}

// Loop through each step item and add a transition delay of increasing amounts
(function(){
    let stepItemArr = document.getElementsByClassName("steps")
    for(i = 0; i < stepItemArr.length; i++){
        //Use the step item's indexOf to quantify amount of delay
        stepItemArr[i].style.transitionDelay = (i / 5) + "s"
    }
})()

//On phone, hover doesnt work. Instead, just press the card
function cardFlip(card){
    var card1 = document.getElementById(card)
    card1.children[0].classList.toggle("flipFront")
    card1.children[1].classList.toggle("flipBack")
}