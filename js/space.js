const btnBuscar = document.getElementById("btnBuscar");
const container = document.getElementById("contenedor");

document.addEventListener("DOMContentLoaded", ()=>{
  

  btnBuscar.addEventListener("click", ()=>{
    const inputBuscar = document.getElementById("inputBuscar").value;
    //console.log("entra")
    //verificamos que el campo de busqueda no esta vacio
    if(inputBuscar.trim() !== '') {
        fetch(`https://images-api.nasa.gov/search?q=${inputBuscar}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                displayResults(data.collection.items);
            })
            .catch(error => {
                console.error(`Error al cargar resultados:`, error);
            });
    } else {
        alert('El campo de búsqueda está vacío');
    };

    
  });

});


function displayResults(results){
    //Borramos resultados de busqueda anteriores
    container.innerHTML = "";
    //al contenedor le damos la clase row para trabajar con filas
        container.classList.add("row");
    //console.log(container);
    results.forEach(result => {
        const title = result.data[0].title;
        const description = result.data[0].description
        const img = result.links[0].href;
        const date = result.data[0].date_created;
        

       

        //Creamos un div para cada una de las tarjetas
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col-md-4', 'mb-4'); // con estas clases dividimos la cuadricula de bootstrap de 12 columnas en 3 partes de 4 columnas.

        cardDiv.innerHTML = `
        <div class="card" style="width: 18rem;">
             <img src="${img}" class="card-img-top" alt="...">
             <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description}.</p>
             </div>
             <div class="card-footer">
                ${new Date(date).toLocaleDateString()}
             </div>
        </div>
        `//${new Date(fecha).toLocaleDateString() convertimos el formato de la fecha a string
        //Agregamos nuestra tarjeta al contenedor 

        container.appendChild(cardDiv);
        
    });
}