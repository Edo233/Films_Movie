let id = location.href.split('=')[1];
const API_KEY = "9b702a6b89b0278738dab62417267c49";
let root = document.getElementById('root');

fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
  .then(res => res.json())
  .then(res => console.log(res));

function person(data) {
  if (data.backdrop_path) {
    root.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`;
    root.style.backgroundSize = "cover";
    root.style.backgroundPosition = "center";
  } else {
    alert("ERRROR For PEJ");
  }

  data.forEach((elm)=>{
    root.innerHTML += `
      <div>
      <img src='${elm.poster_path}' />
      </div>
    `;
  })
}
