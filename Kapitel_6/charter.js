

const table_b = document.getElementById("data_table_people")
const prefab = table_b.innerHTML

function generate_table() {
    table_b.innerHTML = "";
    for (var i = 0; i < people.length; i++) {
        console.log(people[i])
        var cur=prefab.replace("NAME", i.toString())
        for (var j = 0; j < people.length; j++) {
            cur = cur.replace("F"+j, people[i][j])
        } 
        table_b.innerHTML += cur;
    }
}

function reset_table() {
    table_b.innerHTML = ""
}

function table_button(t) {
    t.innerHTML=='Aufklappen'?generate_table():reset_table()
    t.innerHTML=='Aufklappen'?t.innerHTML='Einklappen':t.innerHTML='Aufklappen'

}

function get_nums() {
    var data = [0, 0, 0, 0]
    for (var i = 0; i < people.length; i++) {
        for (var j = 0; j < people.length; j++) {
            if (people[i][j]) {
                data[j]++;
            }
        } 
    }
    return data;
}

function draw_main_chart() {
    const ctx = document.getElementById('baseChart');

    new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Film 1', 'Film 2', 'Film 3', 'Film 4'],
        datasets: [{
            label: '#Anzahl der Likes',
            data: get_nums(),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
        y: {
            beginAtZero: true
        }
        },
        onClick: function(c,i) {
            e = i[0];
            if (e) {
                draw_secondary_chart(e.index)
            }
           
        }
    }
    
    });
}

function get_nums_rel(index) {
    var data = [0, 0, 0, 0]
    for (var i = 0; i < people.length; i++) {
        for (var j = 0; j < people.length; j++) {
            if (people[i][j] && people[i][index]) {
                data[j]++;
            }
        } 
    }
    data.splice(index, 1)
    return data;
}

currentcanvas = undefined;

function draw_secondary_chart(index )  {
    const labels = ['Film 1', 'Film 2', 'Film 3', 'Film 4']
    const colors = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
      ]
    labels.splice(index, 1)
    colors.splice(index, 1)
    console.log(labels)

    const ctx = document.getElementById('spec_chart');
    if (currentcanvas) {
        currentcanvas.destroy()
    } 
    currentcanvas = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '#Anzahl der Likes nach Film ' + (index + 1).toString(),
                data: get_nums_rel(index),
                backgroundColor: colors,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
            y: {
                beginAtZero: true
            }
            },           
        }
        
        });
}

generate_table()
draw_main_chart()