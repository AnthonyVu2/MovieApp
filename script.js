//const { info } = require("console");

const APIKEY = '04c35731a5ee918f014970082a0088b1';
const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';
//let results=[];
//global.results=results;
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
let prevMovie=""

getMovies(APIURL);

async function getMovies(url){
    const resp = await fetch(url);
    const respData = await resp.json();

    
    showMovies(respData.results);
    
        
    
}
function showMovies(movies)
{
    main.innerHTML='';

    movies.forEach(movie => {
        const movieEl= document.createElement('div');
        let temp=movie.title;
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        
            <img
                id="img";
                src="${IMGPATH + movie.poster_path}";
                alt="${movie.title}";
                onclick="getMoviePage(alt); showLink(alt)";

                
        
                
            >
    
           
      
    
            <div class="movie-info">
            
            <h3>${movie.title}</h3>
            
                <span class="${getClassByRate(movie.vote_average)}">${movie.vote_average}</span>
            </div>
            <div class="overview" id="$overview">
                <a id="${movie.title}_link"></a>
                <h4>Overview:</h4>
                ${movie.overview}
            </div>
        `;
        

        main.appendChild(movieEl);
    


});
}

function getClassByRate(vote)
{
    if(vote>=8)
        return 'green';
    else if(vote>=5)
        return 'orange';
    else   
        return 'red';
}

form.addEventListener("submit", (e) =>{
    e.preventDefault();
    const searchTerm=search.value;

    if(searchTerm){
        
        getMovies(SEARCHAPI + searchTerm);
        search.value="";
    }

});

function showLink(title){
    if(prevMovie.length==0){
        prevMovie=title
    }
    if(prevMovie!==title){
        let link=document.getElementById(`${prevMovie}_link`);
        link.innerHTML=""
    }
    let link=document.getElementById(`${title}_link`);
    link.href="Movie.html"
    link.innerHTML="Read Reviews";
}
async function getMoviePage(title)
{
   
    const response = await fetch('http://localhost:5000/Reviews', {
        method: "GET",
        

    })
    const post = await response.json();
    /*post.forEach((movie)=>{
        
        if(movie.title===title)
        {
            results.push(movie);
        }
    })*/
    //console.log(results);
    let find=post.find(element=>element.title==title);
  
    
    const formData = new FormData();
    formData.append('title', title);
    if(find!==undefined)
    {
        formData.append('Review', find.Review);
        
    }
    
    const update = await fetch('http://localhost:5000/Selected', {
        method: "PUT",
        body: formData,
        
    }).catch(err => {
        console.log(err);
    });
    
    
    
   

   

    
    
    //return results;
    //let find=post.find(element=>element.title==title);
    //console.log(find.Review);
   
}




