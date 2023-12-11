const baseURL = "https://api.jikan.moe/v4/anime";
let searchQuery = ""; // Replace this with the search query entered by the user


$("#searchButton").click(function () {
    // Get the search query from an input field or any other source
    searchQuery = $("#searchInput").val();

    // Make the request with the search query
    const settings = {
        url: `${baseURL}?q=${searchQuery}`,
        method: "GET",
        dataType: "json",
        success: searchSuccess,
        error: ajaxError
    };

    console.log("New URL:", settings.url);

    $.ajax(settings);
});

function searchSuccess(data) {
    // Check if there are search results
    if (data.data && data.data.length > 0) {
        // Clear previous results
        $("#output").empty();

        // Loop through all the results
        data.data.forEach((result, index) => {
            const animeInfo = {
                title: result.title_english,
                type: result.type,
                episodes: result.episodes,
                status: result.status,
                duration: result.duration,
                rating: result.rating,
                score: result.score,
                scoredBy: result.scored_by,
                rank: result.rank,
                popularity: result.popularity,
                members: result.members,
                favorites: result.favorites,
                synopsis: result.synopsis,
                background: result.background,
                season: result.season,
                year: result.year,
                imageURL: result.images.jpg.large_image_url
            };

            // Display information for each result in the #output div
            $("#output").append(`
                <div class="result">
                    <h2>${animeInfo.title}</h2>
                    <img src="${animeInfo.imageURL}" alt="${animeInfo.title}">
                    <p>Type: ${animeInfo.type}</p>
                    <p>Episodes: ${animeInfo.episodes}</p>
                    <p>Status: ${animeInfo.status}</p>
                    <p>Duration: ${animeInfo.duration}</p>
                    <p>Rating: ${animeInfo.rating}</p>
                    <p>Score: ${animeInfo.score} (Scored by ${animeInfo.scoredBy} users)</p>
                    <p>Rank: ${animeInfo.rank}</p>
                    <p>Popularity: ${animeInfo.popularity}</p>
                    <p>Members: ${animeInfo.members}</p>
                    <p>Favorites: ${animeInfo.favorites}</p>
                    <p>Synopsis: ${animeInfo.synopsis}</p>
                    <p>Background: ${animeInfo.background}</p>
                    <p>Season: ${animeInfo.season} ${animeInfo.year}</p>
                </div>
            `);
        });
    } else {
        $("#output").html("<p>No results found</p>");
    }
}

function ajaxError(request, status, error) {
    console.error("Oops:", request, status, error);
}

document.addEventListener('DOMContentLoaded', () => {
    // JavaScript code for interactivity
});
