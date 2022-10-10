import {datubasea} from './datubasea.js'


let indizea = 0
let DBkoLiburuak = document.getElementById('dbLib')
const URLBASE = 'https://covers.openlibrary.org/b/id/'
let izenburua  = document.getElementById('izenburua');
let irudia = document.getElementById('irudia')
let egilea = document.getElementById('egilea')
let isbn = document.getElementById('isbn')
let aurrera = document.getElementById('aurrera')
let atzera = document.getElementById('atzera')
let bilatu = document.getElementById('bilatu')

function eremuakBete(){

    izenburua.value = datubasea[indizea].izenburua
    data.value = datubasea[indizea].data
    egilea.value = datubasea[indizea].egilea
    isbn.value = datubasea[indizea].isbn
    irudia.src = URLBASE + datubasea[indizea].filename 

}

function kargatu(){

    eremuakBete()
    
    DBkoLiburuak.innerHTML = `Datubasean dauden liburu kopurua: ${datubasea.length}`

    aurrera.addEventListener('click', (event) => {
        if (indizea < datubasea.length-1)
            indizea++
        eremuakBete()
    })
    atzera.addEventListener('click', (event) => {
        if (indizea > 0)
            indizea--
        eremuakBete()
    })

    function konbertitu(Ljson) {
        let obj = Object.keys(Ljson)[0]
        return {
            "isbn": obj.split(':')[1],
            "egilea": Ljson[obj].details.authors.map((e) => e.name).join(', '),
            "data": Ljson[obj].details.publish_date,
            "izenburua": Ljson[obj].details.title,
            "filename": `${Ljson[obj].details.covers["0"]}-M.jpg`
        };
    }

    bilatu.addEventListener('click', async (event) => {
        let bilatutako = isbn.value
        let bilatutakoIndizea = datubasea.findIndex(element => element.isbn == bilatutako)
        if (bilatutakoIndizea != -1){
            indizea = bilatutakoIndizea
            eremuakBete()
        } else {
            let liburua = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${bilatutako}&format=json&jscmd=details`).then(response => response.json());
            console.log(liburua)
            datubasea.push(konbertitu(liburua))
            DBkoLiburuak.innerHTML = `Datubasean dauden liburu kopurua: ${datubasea.length}`
            indizea = datubasea.length-1
            eremuakBete()
        }
    })
}

window.onload = kargatu;

