const canvas = document.getElementById("outputCanvas");
const ctx = canvas.getContext("2d")
const width = canvas.width;

const convertCordX = x=>(x+1)*width;
const convertCordY = x=>(-x+1)*width;

const density = 0.02;
const densityX = density*width;
const densityY = density*width;
function updateDisplay() {
    for(var x = -1; x < 1; x+=density) {
        for(var y = -1; y < 1; y+=density) {
            var value = Net.get_value([x, y])[0];
            //console.log(x + "   "  + y + "  -> " + value)
            if (value < 0) {
                ctx.fillStyle = "red";
            }
            else {
                ctx.fillStyle = "blue";
            }
            ctx.fillRect(convertCordX(x), convertCordY(y), densityX, densityY);
        }
    }
}