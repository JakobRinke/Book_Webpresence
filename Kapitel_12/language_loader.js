const text_inp = document.getElementById("inpText");
const ngram_size_inp = document.getElementById("nGrammSize");
const language_table = document.getElementById("Langs");
const table_prefab = language_table.innerHTML
language_table.innerHTML = ""

var langs={}

async function fetch_langs() {
    const resp = await fetch("./langs.json") ;
    langs = await resp.json()
}

function get_d_dict() {
    langdict = {}
    Object.keys(langs).forEach(key => {
        langdict[key] = 0
    });
    //langdict["Keine"] = 0
    return langdict
}

function load_lang() {
    const text = text_inp.value
    const n_size = parseInt(ngram_size_inp.value)
    langdict =  get_d_dict()
    for (var i = 0; i < text.length-n_size; i++) {
        var ngram = text.substring(i, (i + n_size));
        

        var max_lang = "Keine"
        var max = 1
        Object.keys(langs).forEach(lang => {
            if (max < langs[lang][n_size][ngram]) {
                max = langs[lang][n_size][ngram]
                max_lang = lang
            }
        }) 
        if (max_lang != "Keine") {
            langdict[max_lang]+=1;
        }
        

        /*
        Object.keys(langs).forEach(lang => {
            if (1 < langs[lang][n_size][ngram]) {
                langdict[lang] += langs[lang][n_size][ngram] 
            }
            
        }) 
        */
    }
    overvall = 0
    Object.values(langdict).forEach(v => {
       overvall += v;
    }) 
    Object.keys(langdict).forEach(key => {
        langdict[key] /= overvall / 100;
    });
    fill_table(langdict)
}

function fill_table(langdict) {
    language_table.innerHTML = ""
    const keysSorted = Object.keys(langdict).sort(function(a,b){return langdict[b]-langdict[a]})
    keysSorted.forEach(key => {
        language_table.innerHTML += table_prefab.replace(/LANG/, key)
                                    .replace(/PROP/, Math.round(langdict[key], 1)+"%")
      }); 
}


fetch_langs().then(load_lang)
