const cont = document.getElementById("selector--hero")
const item = document.getElementById("hero__para")

let x, y, count = 0

// set up event listener. e = mouse move event
cont.onmousemove = (function(e){
    //Throttle control
    if(count  % 2 === 0){
        //Get the center cood of container - half of height/width
        cenYPos = cont.clientHeight / 2
        cenXPos = cont.clientWidth / 2
        //Get cood of mouse
        mouseXPos = e.x
        mouseYPos = e.y
        // get difference between central pos (origin) and mouse
        // Devide controls amount of movement. Higher is less
        y = (cenYPos - mouseYPos) / 45
        x = (cenXPos - mouseXPos) / 45
        //Apply the transform using x and y
        item.style.transform = "translate3d(" + x + "px, " + y + "px, 0)"
    }
        count++
})

//On mouse leaving container- move item back to center
cont.onmouseleave = () => item.style.transform = "translate3d(0px, 0px, 0)"