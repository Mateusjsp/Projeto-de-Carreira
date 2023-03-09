const movies = document.querySelector(".movies")
let itemIndex = 0;
let carousel0 = [];
let carousel1 = [];
let carousel2 = [];
let carouselMovies = [carousel0, carousel1, carousel2];



async function loadData() {

  try {
    const response = await api.get('/discover/movie?language=pt-BR&include_adult=false');
    loadMoviesArray(response.data.results);
    loadCarousel();
    preLoad()
    
    
} catch (error) {
  const all = document.querySelector("body")
  const cathError = document.createElement("span")
  cathError.classList.add("cathError");
  all.textContent = ""
  cathError.textContent = "Plataforma em Manutenção"

  all.appendChild(cathError)
          
};
}

function preLoad(){

  for ( item of carousel0) {
  const banner = document.createElement("div");
    movies.appendChild(banner) 
    banner.classList.add("movie"); 
    banner.style.backgroundImage = `url(${item.poster_path})`;
    banner.addEventListener("click", () => {
      modal(id);
    });
    
    const divInfo = document.createElement("div");
    banner.appendChild(divInfo);
    divInfo.classList.add("movie__info")  
    
    const title = document.createElement("span");
    divInfo.appendChild(title);
    title.classList.add("movie__title")    
    
    title.textContent = item.title;
    
    const rating = document.createElement("span");
    divInfo.appendChild(rating);
    rating.classList.add("movie__rating")    
    
    rating.textContent = item.vote_average;
    
    const star = document.createElement("img");
    rating.appendChild(star);
    star.classList.add("movie__rating")  
    star.src = "assets/estrela.svg" 

    const id = document.createElement("span")
    divInfo.appendChild(id);
    id.textContent = item.id;
    id.hidden = true
  }

}

function clearModal () {
  const body = document.querySelector("body");
  const divModal = document.querySelector(".modal" , ".hidden");
  
  body.addEventListener("click", (event) => {
    
    if (!divModal.contains(event.target)) {
      divModal.style.display = "none";
    }
  });
  }

loadData();
dayMovie ();


function loadMoviesArray(library) {
  
  let index = 0
  
  
  for( let selected of library){
    if (index <18 ){
      index++
      if( index <= 6 ){ 
        carousel0.push(selected)
      }
    
      if( index > 6 && index <= 12 ){ 
        carousel1.push(selected)
      }
      if( index > 12 && index <= 18 ){ 
        carousel2.push(selected)
      }

}}}

function loadCarousel () {

const prevBtn = document.querySelector('.btn-prev');
const nextBtn = document.querySelector('.btn-next');
let itemIndex = 0;
let selected = carousel0;
const totalItems = 3;
  
function moveToNextItem() {
  if (itemIndex === totalItems - 1) {
    itemIndex = 0;
  } else {
    itemIndex++;
  }

  updateSelected();
}

function moveToPrevItem() {
  if (itemIndex === 0) {
    itemIndex = totalItems - 1;
  } else {
    itemIndex--;
   
  }

  updateSelected();
}

 function updateSelected() {
  
  
  if (itemIndex === 0) {
    selected = carousel0;
  } else if (itemIndex === 1) {
    selected = carousel1;
  } else if (itemIndex === 2) {
    selected = carousel2;
  }
  movies.innerHTML = '';
  for ( item of selected) {
    
  
    const banner = document.createElement("div");
    movies.appendChild(banner) 
    banner.classList.add("movie"); 
    banner.style.backgroundImage = `url(${item.poster_path})`;
    banner.addEventListener("click", () => {
      modal(id);
    });
    
    const divInfo = document.createElement("div");
    banner.appendChild(divInfo);
    divInfo.classList.add("movie__info")  
    
    const title = document.createElement("span");
    divInfo.appendChild(title);
    title.classList.add("movie__title")    
    
    title.textContent = item.title;
    
    const rating = document.createElement("span");
    divInfo.appendChild(rating);
    rating.classList.add("movie__rating")    
    
    rating.textContent = item.vote_average;
    
    const star = document.createElement("img");
    rating.appendChild(star);
    star.classList.add("movie__rating")  
    star.src = "assets/estrela.svg" 

    const id = document.createElement("span")
    divInfo.appendChild(id);
    id.textContent = item.id;
    id.hidden = true
   
  }
}

nextBtn.addEventListener('click', moveToNextItem);
prevBtn.addEventListener('click', moveToPrevItem);

}

async function dayMovie (){
  try {
    const responseDayMovie = await api.get('/movie/436969?language=pt-BR');
    const responseLink = await api.get('movie/436969/videos?language=pt-BR')
    
    loadDayMovie (responseDayMovie.data, responseLink)

    
       
    
} catch (error) {
  const all = document.querySelector("body")
  const cathError = document.createElement("span")
  cathError.classList.add("cathError");
  all.textContent = ""
  cathError.textContent = "Plataforma em Manutenção"
  all.appendChild(cathError)
          
};


}

function loadDayMovie (infoDayMovie, responseLink){

const backgroudImage = document.querySelector(".highlight__video")
const highlightTitle = document.querySelector(".highlight__title")
const highlightRating = document.querySelector(".highlight__rating")
const highlightGenres = document.querySelector(".highlight__genres")
const highlightLauch = document.querySelector(".highlight__launch")
const highlightDescription = document.querySelector(".highlight__description")
const highlightVideoLink = document.querySelector(".highlight__video-link")


backgroudImage.style.backgroundImage = `url(${infoDayMovie.backdrop_path})`;
backgroudImage.style.backgroundSize = "cover"

highlightTitle.textContent = infoDayMovie.title;
highlightRating.textContent = infoDayMovie.vote_average.toFixed(1);

infoDayMovie.genres.forEach((genero) => {
highlightGenres.textContent += genero.name + " ";
});

highlightLauch.textContent = infoDayMovie.release_date ;
highlightDescription.textContent = infoDayMovie.overview ;
highlightVideoLink.setAttribute("target", "_blank");
highlightVideoLink.setAttribute("href", `https://www.youtube.com/watch?v=${responseLink.data.results[0].key}`);

}

function modal(selected) {
  const modalMovies = document.querySelector(".movies");
  const hiddenOff = document.querySelector(".modal", ".hidden");
  const modalClose = document.querySelector(".modal__close"); 
 
  modalMovies.addEventListener('click', () => {
    hiddenOff.classList.remove("hidden");
    
    fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${selected.textContent}?language=pt-BR`)
  .then(response => response.json())
  .then(data => {
    
    const modalTitle = document.querySelector(".modal__title")
    modalTitle.textContent = data.title;
    const modalImg = document.querySelector(".modal__img")
    modalImg.style.backgroundImage = `url(${data.backdrop_path})`;
    modalImg.style.backgroundSize = "cover";

    const modalDescription = document.querySelector(".modal__description")
    modalDescription.textContent = data.overview;
    const modalAverage = document.querySelector(".modal__average")
    modalAverage.textContent = data.vote_average.toFixed(1);

  
  })
  .catch(error => {
    const all = document.querySelector("body")
    const cathError = document.createElement("span")
    cathError.classList.add("cathError");
    all.textContent = ""
    cathError.textContent = "Plataforma em Manutenção"
    all.appendChild(cathError)
  });
       
  });

  modalClose.addEventListener("click", function(event) {
  
    if (event.target !== hiddenOff || !hiddenOff.contains(event.target)) {
    hiddenOff.classList.add("hidden");
    }
  });
}
