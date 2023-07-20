const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZTM0ZTZkZTU0NzBhNTUwZjMzY2M4MTI1ODYxMDUwNSIsInN1YiI6IjY0OWYyMzY3NmY2YTk5MDExZDg5ZjM3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._bgT1M60YMycN6XeT73r4zxpNSqy2dqutII9egxZTls'
    }
};

// Variáveis de controle da página atual e quantidade de itens por página
let currentPage = 1;

function renderResults(data) {
    const resultsContainer = document.getElementById('results');
    
    // Limpar o conteúdo anterior do container de resultados
    resultsContainer.innerHTML = '';
    
    // Iterar sobre os dados e criar elementos para cada item
    data.results.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.setAttribute('class', 'actors');
      const img = document.createElement('img');
      const img_path =  `https://image.tmdb.org/t/p/original${item.profile_path}`;
      img.setAttribute('src', img_path)
      itemElement.textContent = item.name;
      
      // Adicionar o item ao container de resultados
      itemElement.appendChild(img)
      resultsContainer.appendChild(itemElement);
    });
}

function CreateURL(data){
  const window_url = window.location.href;
  const my_url = new URL(window_url);
  const number_page = new URL(`/page/${data.page}`, my_url);
  console.log(number_page.href);
}

// Função para fazer a solicitação à API
function fetchAPI(currentPage) {
  const url = `https://api.themoviedb.org/3/person/popular?language=pt-BR&page=${currentPage}`;
  
  // Fazer a solicitação HTTP para a API
  fetch(url, options)
    .then(response => response.json())
    .then(data => {
      // Tratar os dados retornados
      // Renderizar os dados na página
      CreateURL(data)
      console.log(data)
      renderResults(data);
    })
    .catch(error => {
      console.error('Ocorreu um erro:', error);
    });
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
  MaxVisible: 5
}

const controller = {
  next(){
    states.page++; // Decrementa o valor da página atual
    fetchAPI(states.page); // Chama a função fetchAPI com a nova página atual
  },
  prev(){
      if (states.page > 1) {
        states.page--; // Decrementa o valor da página atual
        fetchAPI(states.page); // Chama a função fetchAPI com a nova página atual
    }
  },
  goTo(page){
    states.page = +page;
    fetchAPI(states.page);
  },
  createListener(){
    html.get('#first').addEventListener('click', () =>{
      controller.goTo(states.total_page)
      fetchAPI(states.page)
    }),
    html.get('#last').addEventListener('click', () =>{
      controller.goTo(1)
      fetchAPI(states.page)
    })
    html.get('#next').addEventListener('click', () =>{
      controller.next()
      fetchAPI(states.page)
    })
    html.get('#prev').addEventListener('click', () =>{
      controller.prev()
      fetchAPI(states.page)
    })
  }
}

const NumberButtons = {
  element: html.get('#pagination #number-button'),
  create(number){
    const a_href = document.createElement('a');

    a_href.innerHTML = number;
    a_href.href = "#";
    a_href.addEventListener('click', (event)=>{
      const page = event.target.innerText

      controller.goTo(page)
      fetchAPI(states.page);
      NumberButtons.update();
    })

    NumberButtons.element.appendChild(a_href);

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

NumberButtons.update();

// Função para atualizar a página com base na nova página solicitada


// Função para criar os elementos de navegação
// Modificação da função createPaginationNavigation para incluir opções de próxima e anterior
function createPaginationNavigation(totalPages) {
    const navigationContainer = document.getElementById('pagination');
    const first = document.getElementById('first');
    const last = document.getElementById('last');
    const next = document.getElementById('next');
    const prev = document.getElementById('prev');

    const number_buttons = document.getElementById('number-button');
    // Limpar o conteúdo anterior do container de navegação
    navigationContainer.innerHTML = '';
  
    // Criar o elemento de link para a página anterior
    //const previousLink = document.createElement('a');
    next.href = `#`;
    //next.textContent = 'Anterior';
    //previousLink.addEventListener('click', controller.prev);
    navigationContainer.appendChild(last)
    navigationContainer.appendChild(prev);
    
  
    // Criar os elementos de navegação para as páginas
    /*
    for (let i = 1; i <= 10; i++) {
      const pageLink = document.createElement('a');
      pageLink.href = '#';
      pageLink.textContent = i;
      pageLink.addEventListener('click', () => controller.goTo(i));
      navigationContainer.appendChild(pageLink);
    }
    */
  
    // Criar o elemento de link para a próxima página
    //const nextLink = document.createElement('a');
    prev.href = '#';
    navigationContainer.appendChild(number_buttons);
    //nextLink.textContent = 'Próxima';
    //nextLink.addEventListener('click', controller.next);
    //navigationContainer.appendChild(nextLink);
    navigationContainer.appendChild(next);
    navigationContainer.appendChild(first)
  }
  
  // ...
  
  // Exemplo de uso
  fetchAPI(states.page);
  
  // Suponha que a resposta da API inclua um campo "totalPages" com o número total de páginas disponíveis
  const totalPages = 100;
  controller.createListener()

  // Criar os elementos de navegação
  createPaginationNavigation(totalPages);
  

