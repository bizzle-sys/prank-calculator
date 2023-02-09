const btns = document.querySelectorAll('.btn')
const display = document.querySelector('.display')

// convert to array
const btnarray = Array.from(btns)

let strtoDisplay = ""
const operator = ["+", "-", "*", "/", "%"]
// let allowDot = true
let lastoperator = ""

// load audio
const audio = new Audio("7RH2B5V-fart.mp3")

btnarray.map((item, i) => {
    item.addEventListener('click', () => {
        // reset prank animation and bg
        display.style.background = ""
        display.style.color = "black"
        display.classList.remove("prank")

        const val = item.innerText

        if (val === 'AC') {
            strtoDisplay = ""
            disp(strtoDisplay)
            return
        }
        if (val === 'C') {
            if (strtoDisplay.length) {
                strtoDisplay = strtoDisplay.slice(0, -1)
                disp(strtoDisplay)
            }
            return
        }
        if (val === '=') {
            const lastchar = strtoDisplay[strtoDisplay.length - 1]
            if (operator.includes(lastchar)) {
                strtoDisplay = strtoDisplay.slice(0, -1)
            }
            total()
            return
        }

        if (operator.includes(val)) {
            if (!strtoDisplay) {
                return
            }
            lastoperator = val
            // // allowDot = true
            const lastChar = strtoDisplay[strtoDisplay.length - 1]
            if (operator.includes(lastChar)) {
                // remove last char
                strtoDisplay = strtoDisplay.slice(0, -1)
            }
        }

        if (val === ".") {
            //     if (!allowDot) {
            //         return
            //     }
            //     allowDot = false

            // }

            // long approach
            if (lastoperator) {
                const operatorIndex = strtoDisplay.lastIndexOf(lastoperator)
                const lastNumberSet = strtoDisplay.slice(operatorIndex + 1)

                if (lastNumberSet.includes(".")) {
                    return
                }
            }
            if (!lastoperator && strtoDisplay.includes(".")) {
                return
            }


        }

        strtoDisplay += val
        disp(strtoDisplay)
    })
})

const disp = (str) => {
    display.innerText = str || "0.00"
}

const total = () => {
    const extra = randomNumber()
    const ttl = eval(strtoDisplay) + extra
    strtoDisplay = ttl
    disp(strtoDisplay)
    if (extra) {
        display.style.background = "red"
        display.style.color = "white"
        display.classList.add("prank")
        audio.play()
    }
}

const randomNumber = () => {
    const num = Math.round(Math.random() * 10)
    return num <= 3 ? num : 0
}
