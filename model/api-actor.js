const params = new URLSearchParams(window.location.search);
const id_actor = params.get("id");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZTM0ZTZkZTU0NzBhNTUwZjMzY2M4MTI1ODYxMDUwNSIsInN1YiI6IjY0OWYyMzY3NmY2YTk5MDExZDg5ZjM3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._bgT1M60YMycN6XeT73r4zxpNSqy2dqutII9egxZTls",
  },
};

fetch(`https://api.themoviedb.org/3/person/${id_actor}?language=pt-BR`, options)
  .then((response) => response.json())
  .then((dadosAtor) => {
    const container = document.getElementById("container");
    const box_actor = document.getElementById("box-actor");
    const div_biography = document.getElementById("div-biography");
    const container_more_informations = document.getElementById(
      "container-more-informations"
    );
    const div_more_informations = document.getElementById("more-informations");

    document.title = dadosAtor.name;
    const picture_actor = document.querySelector("#picture-actor");
    const name_actor = document.querySelector("#name-actor");
    const birthday_actor = document.querySelector("#birthday-actor");
    const text_biography = document.querySelector("#text-biography");
    const biography = document.querySelector("#biography");
    const gender_actor = document.querySelector("#gender-actor");
    const known_for_departament = document.querySelector(
      "#known_for_departament"
    );
    const place_of_birth = document.querySelector("#place-of-birth");

    const paragraphs = dadosAtor.biography.split("\n");
    const selectedParagraphs = paragraphs.slice(0, 5); // Seleciona a partir do terceiro parágrafo em diante
    const selectedBiography = selectedParagraphs.join("\n");

    // Criar a página HTML para exibir os dados do ator
    let path = `https://image.tmdb.org/t/p/original${dadosAtor.profile_path}`;
    if (dadosAtor.profile_path == null) {
      const not_found_image = "../image/404-actor-image/404-actors.jpg";
      picture_actor.src = `${not_found_image}`;
      container.appendChild(picture_actor);
    } else {
      picture_actor.src = `${path}`;
      container.appendChild(picture_actor);
    }

    container.appendChild(box_actor);

    if (dadosAtor.name == null) {
      name_actor.innerHTML = "Nome Indisponivel";
      box_actor.appendChild(name_actor);
    } else {
      name_actor.innerHTML = `${dadosAtor.name}`;
      box_actor.appendChild(name_actor);
    }

    if (dadosAtor.biography == null || dadosAtor.biography == "") {
      biography.innerHTML = `<h2>Nenhuma biografia foi encontrada para ${dadosAtor.name}</h2>`;
      box_actor.appendChild(text_biography);
      box_actor.appendChild(biography);
    } else {
      text_biography.innerHTML = "Biografia:";
      biography.innerHTML = selectedBiography;
      box_actor.appendChild(text_biography);
      div_biography.appendChild(biography);
      box_actor.appendChild(div_biography);
    }

    container_more_informations.appendChild(div_more_informations);

    if (
      dadosAtor.known_for_department == null ||
      dadosAtor.known_for_department == ""
    ) {
      known_for_departament.innerHTML =
        "<strong>Conhecido(a) por</strong>: <br><strong>Indisponivel</strong>";
      div_more_informations.appendChild(known_for_departament);
    } else {
      known_for_departament.innerHTML = `<strong>Conhecido(a) por</strong>: <br>${dadosAtor.known_for_department}`;
      div_more_informations.appendChild(known_for_departament);
    }

    if (dadosAtor.place_of_birth == null || dadosAtor.place_of_birth == "") {
      place_of_birth.innerHTML =
        "<strong>Local de Nascimento</strong>: <br>Indisponivel";
      div_more_informations.appendChild(place_of_birth);
    } else {
      place_of_birth.innerHTML = `<strong>Local de Nascimento</strong>: <br>${dadosAtor.place_of_birth}`;
      div_more_informations.appendChild(place_of_birth);
    }

    if (dadosAtor.birthday == null || dadosAtor.birthday == "") {
      birthday_actor.innerHTML = `<strong>Nascimento</strong>: <br>Indisponivel`;
    } else {
      let Year_birthday_actor = dadosAtor.birthday.split("-");
      let Date_now = new Date().getFullYear();
      let Years_old_actor = Date_now - Year_birthday_actor[0];
      birthday_actor.innerHTML = `<strong>Nascimento</strong>: <br>${dadosAtor.birthday} (${Years_old_actor} anos)`;
    }

    div_more_informations.appendChild(birthday_actor);

    const generos = ["Não-binário", "Feminino", "Masculino"];

    if (dadosAtor.gender === 0) {
      gender_actor.innerHTML = `<strong>Genêro</strong>: <br>${generos[0]}`;
      div_more_informations.appendChild(gender_actor);
    } else if (dadosAtor.gender === 1) {
      gender_actor.innerHTML = `<strong>Genêro</strong>: <br>${generos[1]}`;
      div_more_informations.appendChild(gender_actor);
    } else if (dadosAtor.gender === 2) {
      gender_actor.innerHTML = `<strong>Genêro</strong>: <br>${generos[2]}`;
      div_more_informations.appendChild(gender_actor);
    } else {
      gender_actor.innerHTML = `<strong>Genêro</strong>: <br>Indisponivel`;
      div_more_informations.appendChild(gender_actor);
    }

    console.log(dadosAtor);
  })
  .catch((error) => {
    console.error("Erro ao obter os dados do ator:", error);
  });

fetch(
  `https://api.themoviedb.org/3/person/${id_actor}/combined_credits?language=pt-BR`,
  options
)
  .then((response) => response.json())
  .then((data_movies) => {
    if (
      data_movies.cast &&
      Array.isArray(data_movies.cast) &&
      data_movies.cast.length > 0
    ) {
      const movies = data_movies.cast;
      const div_acting = document.getElementById("div-acting");

      // Classifique os filmes com base na contagem de votos em ordem decrescente.
      movies.sort((a, b) => b.vote_count - a.vote_count);

      // Iterar pelos filmes classificados e exibi-los em ordem.
      for (let movie = 0; movie < Math.min(movies.length, 8); movie++) {
        const path_movie = `https://image.tmdb.org/t/p/original${movies[movie].poster_path}`;
        const title = movies[movie].title || movies[movie].original_name;

        if (movies[movie].poster_path == null) {
          const movie_not_found =
            "../image/404-movie-image/movie-not-found.jpg";
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
      }

      //DIV-CHARACTERS-MOVIE
      const All_Movies = document.querySelector("#div-all-movies");
      const Informations_Movie = document.querySelector(
        "#div-informations-movie"
      );

      const data_characters = data_movies.cast;

      data_characters.forEach((characters) => {
        //console.log(characters.original_title);
        const Object_Movies = {
          title: characters.title ? characters.title : characters.original_name ? characters.original_name : " ❔ ",
          date: characters.release_date ? characters.release_date : characters.first_air_date ? characters.first_air_date : " ❔ ",
          character: characters.character ? characters.character : " ❔ "
        };

        const Date_Handling = Object_Movies.date.split("-")[0];

        try {
          const Not_Testing_All = `
          <div id="box-informations-movies">
            <label id="text-title-date-movies">${Date_Handling} - ${Object_Movies.title}</label>
            <label id="text-character-movies">🎬 como ${Object_Movies.character}</label>
            <br>
          </div>
          <hr>`;
          Informations_Movie.innerHTML += Not_Testing_All;
          All_Movies.appendChild(Informations_Movie);
        } catch (error) {
          Informations_Movie.innerHTML += `${error.message}`;
          All_Movies.appendChild(Informations_Movie);
        }

        /*
                if (characters.title == null || characters.title == "") {
                    try {
                        const Label_Title = `<label>${characters.original_name}</label><br>`;
                        Informations_Movie.innerHTML += Label_Title;
                        All_Movies.appendChild(Informations_Movie);
                    } catch (error) {
                        const Label_Title_Error = `<label>Filme Indisponivel</label><br>`;
                        Informations_Movie.innerHTML += Label_Title_Error;
                        All_Movies.appendChild(Informations_Movie);
                    }
                } else {
                    const Label_Title = `<label>${characters.title}</label><br>`;
                    Informations_Movie.innerHTML += Label_Title;
                    All_Movies.appendChild(Informations_Movie);
                }
                
                if (characters.release_date == null || characters.release_date == "") {
                    try {
                        const Label_Date = `<label>Data - ${characters.first_air_date}<br></label>`
                        Informations_Movie.innerHTML += Label_Date;
                        All_Movies.appendChild(Informations_Movie);
                    } catch (error) {
                        const Label_Date_Error = `<label>Data - Indisponivel</label><br>`
                        Informations_Movie.innerHTML += Label_Date_Error;
                        All_Movies.appendChild(Informations_Movie);
                    }
                } else {
                    const Label_Date = `<label>Data - ${characters.release_date}<br></label>`
                    Informations_Movie.innerHTML += Label_Date;
                    All_Movies.appendChild(Informations_Movie);
                }

                if (characters.character == null || characters.character == "") {
                    try {
                        const Label_Character = `<label>Personagem - ${characters.character}<br><br></label>`
                        Informations_Movie.innerHTML += Label_Character;
                        All_Movies.appendChild(Informations_Movie);
                    } catch (error) {
                        const Label_Character_Error = `<label>Personagem - Indisponivel<br><br></label>`
                        Informations_Movie.innerHTML += Label_Character;
                        All_Movies.appendChild(Informations_Movie);
                    }
                } else {
                    const Label_Character = `<label>Personagem - ${characters.character}<br><br></label>`
                    Informations_Movie.innerHTML += Label_Character;
                    All_Movies.appendChild(Informations_Movie);
                }
                */

        //Personagem -> como ${characters.character}
      });
    } else {
      console.log("Nenhum filme encontrado para este ator.");
      return (div_acting.innerHTML +=
        "<p>Nenhum filme encontrado para este ator</p>");
    }
    console.log(data_movies);
  })

  .catch((error) => {
    console.error("Erro ao obter os dados do ator:", error);
  });
