const params = new URLSearchParams(window.location.search);
const id_actor = params.get('id');

const options = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZTM0ZTZkZTU0NzBhNTUwZjMzY2M4MTI1ODYxMDUwNSIsInN1YiI6IjY0OWYyMzY3NmY2YTk5MDExZDg5ZjM3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._bgT1M60YMycN6XeT73r4zxpNSqy2dqutII9egxZTls'
    }
};


fetch(`https://api.themoviedb.org/3/person/${id_actor}?language=pt-BR`, options)
    .then(response => response.json())
    .then(dadosAtor => {
        const container = document.getElementById('container');
        const box_actor = document.getElementById('box-actor');
        
        document.title = dadosAtor.name
        const picture_actor = document.querySelector('#picture-actor');
        const name_actor = document.querySelector('#name-actor');
        const birthday_actor = document.querySelector('#birthday-actor');
        const text_biography = document.querySelector('#text-biography');
        const biography = document.querySelector('#biography');
        const gender_actor = document.querySelector('#gender-actor');
        const known_for_departament = document.querySelector('#known_for_departament');
        
        const paragraphs = dadosAtor.biography.split("\n");
        const selectedParagraphs = paragraphs.slice(0, 5); // Seleciona a partir do terceiro parágrafo em diante
        const selectedBiography = selectedParagraphs.join("\n");

        // Criar a página HTML para exibir os dados do ator
        let path = `https://image.tmdb.org/t/p/original${dadosAtor.profile_path}`
        if (dadosAtor.profile_path == null) {
            const not_found_image = "../image/404-actor-image/404-actors.jpg";
            picture_actor.src = `${not_found_image}`;
            container.appendChild(picture_actor)
        }else{
            picture_actor.src = `${path}`
            container.appendChild(picture_actor)
        }

        container.appendChild(box_actor)

        if (dadosAtor.name == null) {
            name_actor.innerHTML = "Nome Indisponivel";
            box_actor.appendChild(name_actor);
        } else {
            name_actor.innerHTML = `${dadosAtor.name}`
            box_actor.appendChild(name_actor)
        }

        if (dadosAtor.birthday == null || dadosAtor.birthday == "") {
            birthday_actor.innerHTML = `Nascimento: `;
        } else {
            birthday_actor.innerHTML = `Nascimento: ${dadosAtor.birthday}`;
        }

        box_actor.appendChild(birthday_actor);

        const generos = ['Não-binário', 'Feminino', "Masculino"];

        if (dadosAtor.gender === 0) {
            gender_actor.innerHTML =  `Genêro: ${generos[0]}`
            box_actor.appendChild(gender_actor)
        }else if (dadosAtor.gender === 1){
            gender_actor.innerHTML =  `Genêro: ${generos[1]}`
            box_actor.appendChild(gender_actor)
        }else if(dadosAtor.gender === 2){
            gender_actor.innerHTML =  `Genêro: ${generos[2]}`
            box_actor.appendChild(gender_actor)
        } else {
            gender_actor.innerHTML =  `Genêro Indisponivel`
            box_actor.appendChild(gender_actor)
        }

        if (dadosAtor.biography == null || dadosAtor.biography == "") {
            biography.innerHTML =   `<h2>Nenhuma biografia foi encontrada para ${dadosAtor.name}</h2>`
            box_actor.appendChild(text_biography);
            box_actor.appendChild(biography);
        } else {
            text_biography.innerHTML = "Biografia:";
            box_actor.appendChild(text_biography);
            biography.innerHTML = selectedBiography;
            box_actor.appendChild(biography);
        }
        
        //const paginaHTML = ;
        // Exibir a página HTML na janela do navegador
        //container.innerHTML += paginaHTML;
        console.log(dadosAtor);

        //Caso não haja nenhuma biografia para o ator ou atriz
        
    })
    .catch(error => {
    console.error('Erro ao obter os dados do ator:', error);
    });
fetch(`https://api.themoviedb.org/3/person/${id_actor}/combined_credits?language=pt-BR`, options)
    .then(response => response.json())
    .then(data_movies => {
       

        if (data_movies.cast && Array.isArray(data_movies.cast) && data_movies.cast.length > 0) {
            // Suponha que você tenha uma lista de filmes da API chamada 'movies' com objetos que possuem título e contagem de votos.
            const movies = data_movies.cast;
            const div_acting = document.getElementById('div-acting');

            // Classifique os filmes com base na contagem de votos em ordem decrescente.
            movies.sort((a, b) => b.vote_count - a.vote_count);

            // Iterar pelos filmes classificados e exibi-los em ordem.
            for (let movie = 0; movie < Math.min(movies.length, 8); movie++) {
            const path_movie = `https://image.tmdb.org/t/p/original${movies[movie].poster_path}`;
            const title = movies[movie].title || movies[movie].original_name;

            if (movies[movie].poster_path == null) {
                const movie_not_found = "../image/404-movie-image/movie-not-found.jpg";
                const no_found = `
                <div id='movies'>
                    <img id='movie-path' src='${movie_not_found}'></img>
                    <label id='text'>${title}</label>
                </div>
                `;
                div_acting.innerHTML += no_found;
            } else {
                const pgHTML = `
                <div id='movies'>
                    <img id='movie-path' src='${path_movie}'></img>
                    <label id='text'>${title}</label>
                </div>
                `;
                div_acting.innerHTML += pgHTML;
            }

            console.log(`Contagem de Votos do ${title} -> ${movies[movie].vote_count}`);
            }

          } else {
            console.log('Nenhum filme encontrado para este ator.');
            return div_acting.innerHTML += '<p>Nenhum filme encontrado para este ator</p>';
          }
          console.log(data_movies)
        })
    .catch(error => {
    console.error('Erro ao obter os dados do ator:', error);
    });