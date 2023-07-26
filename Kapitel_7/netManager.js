const hiddenLayersInputs = document.getElementById("hiddenLayerNum")

const weightInputs = [[
        document.getElementById("hiddenRange00"),
        document.getElementById("hiddenRange01"),
        document.getElementById("hiddenRange10"),
        document.getElementById("hiddenRange11"),
    ], [
        document.getElementById("entryRange0"),
        document.getElementById("entryRange1"),
    ]
]

function update_activation(el) {
    console.log(el.value);
    eval(el.value)
    update_net();
}
var Net = new NeuralNet([[0, 0],[[0.2, 0.4]]]);

function update_net() {

    switch(parseInt(hiddenLayersInputs.value)) {
        case 0:
            Net = new NeuralNet([[0, 0], [[weightInputs[1][0].value, weightInputs[1][1].value]]]);
            weightInputs[0][0].disabled = true; 
            weightInputs[0][1].disabled = true; 
            weightInputs[0][2].disabled = true; 
            weightInputs[0][3].disabled = true; 
            weightInputs[1][0].disabled = false; 
            weightInputs[1][1].disabled = false;   
            break;
        case 1:
            Net = new NeuralNet([[0, 0],[[weightInputs[0][0].value, weightInputs[0][1].value]], [[weightInputs[1][0].value]]]);
            weightInputs[0][0].disabled = false; 
            weightInputs[0][1].disabled = false; 
            weightInputs[0][2].disabled = true; 
            weightInputs[0][3].disabled = true; 
            weightInputs[1][0].disabled = false; 
            weightInputs[1][1].disabled = true; 
            break;
        case 2:
            Net = new NeuralNet([[0, 0],[[weightInputs[0][0].value, weightInputs[0][1].value], [weightInputs[0][2].value, weightInputs[0][3].value]], [[weightInputs[1][0].value, weightInputs[1][1].value]]]);
            weightInputs[0][0].disabled = false; 
            weightInputs[0][1].disabled = false; 
            weightInputs[0][2].disabled = false; 
            weightInputs[0][3].disabled = false; 
            weightInputs[1][0].disabled = false; 
            weightInputs[1][1].disabled = false; 
            break;
    }
    updateDisplay();
}

update_net();
update_activation(document.getElementById("aktfn"))