

var f = (x)=>x;

class Node {
    
    constructor(weights, parents, value=NaN) {
        this.weights = weights;
        this.parents = parents;
        this.value = value;
        this.fixed = !Number.isNaN(this.value)
    }

    get_calculation() {
       if (this.fixed) {
            return this.value;
       }
       var sum = 0;
       for (var i=0; i<this.weights.length; i++) {
        sum+= this.weights[i] * this.parents[i].get_calculation();
       }
       this.value  = f(sum);
       return  this.value;
    }

}


class NeuralNet {

    constructor(weights) {
        this.net = [[]]
        for(var i = 0; i<weights[0].length; i++) {
            this.net[0].push(new Node([], [], 0))
        }
        this.net[0].push(new Node([], [], 1))
        for(var i = 1; i<weights.length; i++) {
            var layer = []

            for(var j = 0; j<weights[i].length; j++) {
               
                layer.push(new Node(weights[i][j], this.net[i-1]))
            }
            if (i !=weights.length-1) 
                    layer.push(new Node([], [], 1))
            this.net.push(layer)
        }

    }

    reset_net() {   
        for(var i = 0; i<this.net.length; i++) {
            for(var j = 0; j<this.net[i].length-1; j++) {
                if (!this.net[i][j].fixed)
                    this.net[i][j].value = NaN
            }
        } 
    }

    get_value(inputs) {
        this.reset_net();
        for(var i = 0; i<inputs.length; i++) {
            this.net[0][i].value = inputs[i];
        }
        var out = [];
        for(var i = 0; i < this.net[this.net.length-1].length; i++) {

            out.push(this.net[this.net.length-1][i].get_calculation())
        }
        return out;
        
    }

}