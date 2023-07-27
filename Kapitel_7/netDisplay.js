const canvas = document.getElementById("outputCanvas");
const ctx = canvas.getContext("2d")
const width = canvas.width;


const base_factor = 40

const convertCordX = x=>(x+1)*width/(base_factor*2);
const convertCordY = x=>(-x+1)*width/(base_factor*2);

const density = 0.01 * base_factor;
// const density = 0.1;

const densityX = density*width;
const densityY = density*width;
function updateDisplay() {
    for(var x = -base_factor*2; x < base_factor*2; x+=density) {
        for(var y = -base_factor*2; y < base_factor*2; y+=density) {
            var value = Net.get_value([x, y])[0];
           // console.log(x + "   "  + y + "  -> " + value)
            if (value > 0.5) {
                ctx.fillStyle = "red";
            }
            else {
                ctx.fillStyle = "blue";
            }
            ctx.fillRect(convertCordX(x), convertCordY(y), densityX, densityY);
        }
    }
    console.log(f(2))
    console.log("updated")
}