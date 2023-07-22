const options = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZTM0ZTZkZTU0NzBhNTUwZjMzY2M4MTI1ODYxMDUwNSIsInN1YiI6IjY0OWYyMzY3NmY2YTk5MDExZDg5ZjM3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._bgT1M60YMycN6XeT73r4zxpNSqy2dqutII9egxZTls'
    }
};

function renderResults(data) {
    let resultados = data.results; //Retornar todos os dados da API 

    const div_grid = document.getElementById('grid-container');//Determina o id do elemento div no index.html
    

    div_grid.innerHTML= " ";

    resultados.forEach(resultado => {
        const id_actor = resultado.id;

        const div_actor = document.createElement('div');
        div_actor.setAttribute('class', 'text-name-actor');
        const div = document.createElement('div'); //Cria um novo elemento div
        div.setAttribute('class', 'grid-item'); //Atribui o nome 'grid-item' ao class do div criado
        const a_href = document.createElement('a'); //Cria um elemento de linkagem ('a')
        a_href.setAttribute('target', '_blank')
        a_href.setAttribute('href', `/view/api-actor.html?id=${id_actor}`); // Define o href como "javascript:void(0)" para evitar que a página seja recarregada
        


        //Definição de Variaveis com base na variavel "Resultados" onde retorna todos os dados da API 
        const nome = resultado.name;
        const path = `https://image.tmdb.org/t/p/original${resultado.profile_path}`;
        let movies_name_title = resultado.known_for[0].title;
        let movies_name_original_name = resultado.known_for[0].original_name

        //Criação de elementos HTML
        const txt_nome = document.createElement('p')
        const txt_movie = document.createElement('p');
        const png = document.createElement('img');
        
        //Condição caso não tenha foto (caminho seja nulo)
        if (resultado.profile_path === null) {
            const not_found_image = "image/404-actor-image/404-actors.jpg";
            png.setAttribute("src", not_found_image);
            png.setAttribute("title", nome);
        } else {
            png.setAttribute("src", path);
            png.setAttribute("title", nome);
        }
        //Adicionando as variaveis criadas dentro dos elementos HTML
        txt_nome.textContent = `${nome}`
        if (movies_name_title = resultado.known_for[0].title) {
            txt_movie.textContent = `${movies_name_title}`
        }else if(movies_name_original_name = resultado.known_for[0].original_name){
            txt_movie.textContent = `${movies_name_original_name}`
        }else{
            return "";
        }
        
        
        
        //Adicionando as variaveis criadas dentro da variavel DIV
        div_grid.appendChild(div);
        div.appendChild(a_href)
        a_href.appendChild(png);
        a_href.appendChild(div_actor)
        div_actor.appendChild(txt_nome)
        div.appendChild(txt_movie)
    });
}

async function fetchActors(currentPage) {
    const url = `https://api.themoviedb.org/3/person/popular?language=pt-BR&page=${currentPage}`;
  
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data.results);
      renderResults(data);
    } catch (err) {
      console.log(err);
    }
} 

const html = {
    get(element) {
        return document.querySelector(element)
    }
}
  
const states = {
    page: 1,
    total_page: 500,
    total_results: 1000,
    MaxVisible: 10
}

const controller = {
    next(){
        states.page++; // Decrementa o valor da página atual
        fetchActors(states.page); // Chama a função fetchAPI com a nova página atual
    },
    prev(){
        if (states.page > 1) {
            states.page--; // Decrementa o valor da página atual
            fetchActors(states.page); // Chama a função fetchAPI com a nova página atual
        }
    },
    goTo(page){
        states.page = +page;//+page para transforma-la em number
        fetchActors(states.page);
    },
    createListener(){
        html.get('#first').addEventListener('click', () =>{
        controller.goTo(states.total_page)
        fetchActors(states.page)
        }),
        html.get('#last').addEventListener('click', () =>{
        controller.goTo(1)//função para retornar ao primeiro
        fetchActors(states.page)
        })
        html.get('#next').addEventListener('click', () =>{
        controller.next()
        fetchActors(states.page)
        })
        html.get('#prev').addEventListener('click', () =>{
        controller.prev()
        fetchActors(states.page)
        })
    }
}
  
const NumberButtons = {
element: html.get('#pagination #number-button'),
create(number){
    const div_navigationContainer = document.createElement('div');
    div_navigationContainer.setAttribute('class', 'numbers-pagination');
    const a_href = document.createElement('a');

    a_href.innerHTML = number;
    a_href.href = "#";
    a_href.addEventListener('click', (event)=>{

    const page = event.target.innerText

    controller.goTo(page)
    fetchActors(states.page);
    NumberButtons.update();
    })

    NumberButtons.element.appendChild(div_navigationContainer);
    div_navigationContainer.appendChild(a_href)
},
update(){
    NumberButtons.element.innerHTML = " ";
    const { MaxLeft, MaxRight } = NumberButtons.CalculateMaxVisible();

    console.log(MaxLeft, MaxRight);

    for(let page = MaxLeft; page <= MaxRight; page++){
        NumberButtons.create(page);
    }
},
CalculateMaxVisible(){
    const {MaxVisible} = states;

    let MaxLeft = (states.page - Math.floor(MaxVisible / 2))
    let MaxRight = (states.page + Math.floor(MaxVisible / 2))
    if (MaxLeft < 1) {
        MaxLeft = 1;
        MaxRight = MaxVisible;
    }

    if (MaxRight > states.total_page){
        MaxLeft = states.total_page - (MaxVisible - 1);
        MaxRight = states.total_page

    if(MaxLeft < 1) MaxLeft = 1;
    }
    return {MaxLeft, MaxRight}
    }
}

function createPaginationNavigation() {
    const navigationContainer = document.getElementById('pagination');
   
    const first = document.getElementById('first');
    const last = document.getElementById('last');
    const next = document.getElementById('next');
    const prev = document.getElementById('prev');

    const number_buttons = document.getElementById('number-button');

    navigationContainer.innerHTML = '';
    next.href = `#`;
    navigationContainer.appendChild(last)
    navigationContainer.appendChild(prev);
    prev.href = '#';
    navigationContainer.appendChild(number_buttons);

    navigationContainer.appendChild(next);
    navigationContainer.appendChild(first)
}

function init(){
    NumberButtons.update();
    createPaginationNavigation();
    fetchActors(states.page);
    controller.createListener();
}

init();

