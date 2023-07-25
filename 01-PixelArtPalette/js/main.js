let gridHeight = document.getElementById("height-rng");
let heightValue = document.getElementById("height-value");
let gridWidth = document.getElementById("width-rng");
let widthValue = document.getElementById("width-value");
let createBtn = document.getElementById("create-grid");
let resetBtn = document.getElementById("reset-grid");
let colorChoice = document.getElementById("color-choice");
let paintBtn = document.getElementById("paint-btn");
let eraserBtn = document.getElementById("eraser-btn");
let grid = document.querySelector(".grid-box");

let events = {
    mouse: {
        down: "mousedown",
        up: "mouseup",
        move: "mousemove"
    },
    touch: {
        down: "touchstart",
        up: "touchend",
        move: "touchmove"
    },
};

let deviceType = "";

let draw = false;
let erase = false;

window.onload = () => {
    gridHeight.value = 25;
    gridWidth.value = 25;
};

gridWidth.addEventListener("input", () => {
    widthValue.innerHTML = gridWidth.value < 9 ? `0${gridWidth.value}` : gridWidth.value;
});

gridHeight.addEventListener("input", () => {
    heightValue.innerHTML = gridHeight.value < 9 ? `0${gridHeight.value}` : gridHeight.value;
});

resetBtn.addEventListener("click", () => {
    grid.innerHTML = "";
});

paintBtn.addEventListener("click", () => {
    erase = false;
});

eraserBtn.addEventListener("click", () => {
    erase = true;
});

const isTouchDevice = () => {
    try {
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
};

isTouchDevice();

createBtn.addEventListener("click", () => {
    grid.innerHTML = "";
    let count = 0;
    for (let i = 0; i < gridHeight.value; i++) {
        count += 2;
        let row = document.createElement("div");
        row.classList.add("gridRow");

        for (let j = 0; j < gridWidth.value; j++) {
            count += 2;
            let col = document.createElement("div");
            col.classList.add("gridCol");
            col.setAttribute("id", `gridCol${count}`);

            col.addEventListener(events[deviceType].down, () => {
                draw = true;
                if (erase) {
                    col.style.backgroundColor = "transparent";
                } else {
                    col.style.backgroundColor = colorChoice.value;
                }
            });

            col.addEventListener(events[deviceType].move, (e) => {
                let elementId = document.elementFromPoint(
                    !isTouchDevice() ? e.clientX : e.touches[0].clientX,
                    !isTouchDevice() ? e.clientY : e.touches[0].clientY,
                ).id;
                checker(elementId);
            });

            col.addEventListener(events[deviceType].up, () => {
                draw = false;
            });

            row.appendChild(col);

        }

        grid.appendChild(row);

    }
});

function checker(elementId) {
    let gridColumns = document.querySelectorAll(".gridCol");
    gridColumns.forEach((element) => {
        if (elementId == element.id) {
            if (draw && !erase) {
                element.style.backgroundColor = colorChoice.value;
            } else if (draw && erase) {
                element.style.backgroundColor = "transparent";
            }
        }
    });
}
