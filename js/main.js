$('#searchForm').on('keyup', (event) => {
    let searchText = $('#searchText').val();
    getMovie(searchText);
    event.preventDefault()
})


function getMovie(searchText) {
    $.getJSON('js/film.json', function (data) {
        console.log(data)
        let output = '';
        let regex = new RegExp(searchText, "i");
        $.each(data, function (key, val) {
            if (val.name.search(regex) != -1 || val.original.search(regex) != -1) {
                output += `
                <div class="col-md-3">
                    <div class="well text-center">
                        <img src="${val.img}">
                        <h5>${val.name}<br>${val.original}</h5>
                        <a onclick="movieSelected('${val.id}')" class="btn btn-primary" href="#">Подробнее</a>
                    </div>
                </div>
            `;
            }
        });
        $('#movies').html(output)
    });
}

 function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovies() {
    let movieId = sessionStorage.getItem('movieId');
    $.getJSON('js/film.json',function (data) {
        console.log(data)
        let output = '';
        $.each(data, function (key, val) {
            if(movieId==val.id){
                output += `
                <div class="row">
                    <div class="col-md-4">
                        <img src="${val.img}" class="thumbnail">
                    </div>
                    <div class="col-md-8">
                        <h2>${val.name}</h2>
                        <ul class="list-group">
                            <li class="list-group-item"><strong>Жанр:</strong>${val.genres[0].name},${val.genres[1].name},${val.genres[2].name},</li>
                            <li class="list-group-item"><strong>Год:</strong>${val.year}</li>
                            <li class="list-group-item"><strong>Рейтинг:</strong>${val.ratings[1].rate},${val.ratings[0].rate}</li>
                            <li class="list-group-item"><strong>Страна:</strong>${val.countries[0].name}</li>
                            <li class="list-group-item"><strong>Сайт:</strong><a href="${val.site}" target="_blank" >${val.site}</a></li>
                            <li class="list-group-item"><strong>Актеры:</strong>${val.persons[0].name},${val.persons[1].name},${val.persons[2].name},${val.persons[3].name}</li>
                        </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="well">
                        <h3>Описание</h3>
                        ${val.description}
                        <hr>
                        <a href="http://imdb.com/" target="_blank" class="btn btn-primary">View IMDB</a>
                        <a href="index.html" class="btn btn-default">Go back to search</a>
                    </div>
                </div>    
            `;
            }
        });
        $('#movie').html(output)
    });
}