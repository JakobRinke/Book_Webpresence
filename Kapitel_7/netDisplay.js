const canvas = document.getElementById("outputCanvas");
const ctx = canvas.getContext("2d")
const width = canvas.width;


const base_factor = 40

const convertCordX = x=>(x+base_factor)*width/(base_factor*2);
const convertCordY = x=>(-x+base_factor)*width/(base_factor*2);

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
                ctx.fillStyle = "#ff9999";
            }
            else {
                ctx.fillStyle = "#9999ff";
            }
            ctx.fillRect(convertCordX(x), convertCordY(y), densityX, densityY);
        }
    }

    for (var i = 0; i < dataPoints.length; i++) {
    
        ctx.beginPath();
        ctx.arc(convertCordX(dataPoints[i].x), convertCordY(dataPoints[i].y), 4, 0, 2 * Math.PI, false);
        ctx.fillStyle = dataPoints[i].color
        console.log(dataPoints[i])
        ctx.fill();
    } 

}

const dataPoints = []

const spr_fn = x =>  - ((2*x)/(2*x*x+1))

function construct_points(number, spread) {
    for (var i = 0; i < number; i++) {
        x_cord = (Math.random() * 2 - 1)
        y_cord = (Math.random() * 2 - 1)
        color = spr_fn(x_cord)-spread*Math.random() < y_cord?"blue":"red";
        dataPoints.push({x: x_cord*base_factor, y:y_cord*base_factor, color:color})
    }
}

construct_points(50, 0.1)