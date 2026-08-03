const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const clearButton = document.getElementById("clear");
const encodedClue = "VGhlIGxldHRlciBpcyBiZWhpbmQgdGhlIE5DTSBmbGFnLg==";

// Fill most of the page
canvas.width = 600;
canvas.height = 700;

let drawing = false;
let currentColor = "black";

// Brush settings
ctx.lineWidth = 15;
ctx.lineCap = "round";


// ---------- Mouse controls ----------

canvas.addEventListener("mousedown", () => {
    drawing = true;
});

canvas.addEventListener("mouseup", () => {
    drawing = false;
    ctx.beginPath(); // stops lines connecting separate strokes
    check();
});

canvas.addEventListener("mouseleave", () => {
    drawing = false;
    ctx.beginPath();
});

canvas.addEventListener("mousemove", draw);

clearButton.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// ---------- Draw function ----------

function draw(event) {
    if (!drawing) return;

    ctx.strokeStyle = currentColor;

    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);

}

// ---------- Color buttons ----------

const buttons = document.querySelectorAll(".color");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        currentColor = button.dataset.color;
    });
});

const region = {
    x : 50,
    y : 50,
    width : 550,
    height : 550
}
function check() {
    const imageData = ctx.getImageData(
        region.x,
        region.y,
        region.width,
        region.height
    );
    let correct = 0;
    const pixels = imageData.data;
    for(let i = 0; i < pixels.length; i += 4) {
        const a = pixels[i];
        const b = pixels[i + 1];
        const c = pixels[i + 2];
        if(a > 200 && b < 50) {
            correct++;
        }
    }
    if(correct/(pixels.length / 4) > 0.5) {
        myFunction();
    }
}

function myFunction() {
        var popup = document.getElementById("myPopup");
        popup.classList.toggle("show");
        const clue = atob(encodedClue);
        document.getElementById("clue").textContent = clue;
}
