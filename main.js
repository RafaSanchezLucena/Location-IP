import "/style.css";

const div = document.querySelector(".container__datos");
const valorInput = document.querySelector("#campo__texto");
const botonEnviar = document.querySelector("#boton1");
const botonLimpiar = document.querySelector("#boton2");


// Las "options" son copiadas desde la documentación de la API.
const OPTIONS = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "46b09705b0msh419e77df9426930p19b7e4jsn2eb1d4271df5",
    "X-RapidAPI-Host": "ip-geolocation-and-threat-detection.p.rapidapi.com",
  },
};

const obtenerDatos = async (ip, OPTIONS) => {
  try {
    botonEnviar.setAttribute("aria-busy", "true");  //Aparece el spinner cuando comienza la búsqueda.
    const response = await fetch(
      `https://ip-geolocation-and-threat-detection.p.rapidapi.com/${ip}`,
      OPTIONS
    );

    // Se asigna a las varibles los datos que obtenemos de la API.
    const data = await response.json();
    let {company, location, time_zone} = data;
    let {name: nombre} = company;
    let {city, country, region, continent, latitude, longitude} = location;
    let {name : nombre_continente} = continent;
    let {capital} = country;
    let {name} = region;
    let {current_time} = time_zone;

    div.innerHTML = `Compañía: ${nombre} <br>
                        Ciudad: ${city} <br>
                        Capital: ${capital} <br>
                        Región: ${name} <br>
                        Continente: ${nombre_continente} <br>
                        Hora actual: ${current_time} <br>
                        Coordenadas: ${latitude}, ${longitude} <br>
                        `;
    
    botonEnviar.setAttribute("aria-busy", "false"); //Desactiva el spinner cuando se completa la búsqueda.
  } catch (error) {
    botonEnviar.setAttribute("aria-busy", "false");
    div.innerHTML = `No se ha podido completar la búsqueda. <br>
                      Comprueba los datos introducidos. <br>
                      `
  };
  
};

// Nos avisa de que el campo de la IP debe contener datos.
botonEnviar.addEventListener("click", () => {
  let ip = valorInput.value;
  if (ip != "") obtenerDatos(ip, OPTIONS);
  else alert("Debes introducir un valor en el campo IP");
});

botonLimpiar.addEventListener("click", () => {
  valorInput.value = "";
  div.innerHTML = "";
});