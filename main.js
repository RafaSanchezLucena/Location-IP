import "/style.css";

const lista = document.querySelector(".lista");
const valorInput = document.querySelector("#campo__texto");
const botonEnviar = document.querySelector("#boton1");
const botonLimpiar = document.querySelector("#boton2");



const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "46b09705b0msh419e77df9426930p19b7e4jsn2eb1d4271df5",
    "X-RapidAPI-Host": "ip-geolocation-and-threat-detection.p.rapidapi.com",
  },
};

const obtenerDatos = async (ip, options) => {
  try {
    botonEnviar.setAttribute("aria-busy", "true");
    const response = await fetch(
      `https://ip-geolocation-and-threat-detection.p.rapidapi.com/${ip}`,
      options
    );
    const data = await response.json();
    lista.innerHTML = `Compañía: ${data.company.name} <br>
                        Ciudad: ${data.location.city} <br>
                        Capital: ${data.location.country["capital"]} <br>
                        Región: ${data.location.region["name"]} <br>
                        Continente: ${data.location.continent["name"]} <br>
                        Hora actual: ${data.time_zone.current_time} <br>
                        Latitud: ${data.location.latitude} <br>
                        Longitud: ${data.location.longitude} <br>

                        
                        `;
    
    botonEnviar.setAttribute("aria-busy", "false");
  } catch (error) {
    botonEnviar.setAttribute("aria-busy", "false");
    lista.innerHTML = `No se ha podido realizar la búsqueda. <br>
                      Comprueba los datos introducidos. <br>
                      `
  };
  
};


botonEnviar.addEventListener("click", () => {
  let ip = valorInput.value;
  if (ip != "") obtenerDatos(ip, options);
  else alert("Debes introducir un valor en el campo IP");
});

botonLimpiar.addEventListener("click", () => {
  valorInput.value = "";
  lista.innerHTML = "";
});