const form = document.querySelector('#searchForm');
const results = document.querySelector(".res");

form.addEventListener('submit', async function (event) {
    
    event.preventDefault();

    results.innerHTML = '';

    event.preventDefault();

    const searchTerm = form.elements.query.value;
    const config = { params: { q: searchTerm } }
    const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);

    const url =`http://api.tvmaze.com/search/shows?q=${searchTerm}`;

        // fetch(url)
        // .then(response => response.json())
        // .then((jsonData) => {
        //     const res = jsonData.map(element => element.show.url);
        //     console.log("res:");
        //     console.log(res);
        // });

    makeImages(res.data)
    form.elements.query.value = '';

    return false;
})


const makeImages = (shows) => {

    for (let result of shows) {
        if (result.show.image) {


            // const config = { params: { id: searchTerm } }
            // const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);

            const linkT = document.createElement('A');
            linkT.href = result.show.url;
            // console.log(linkT.href);
            const img = document.createElement('IMG');
            img.src = result.show.image.medium;
            

            linkT.innerHTML = "<img src=" + img.src + "><span class='caption'>" + result.show.name + "</span>";

            results.prepend(linkT)  
        }
    }
}   