mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 8 // starting zoom
});

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset: 5})
        .setHTML(
            `<h4>${campground.title}</h4>
            <p>${campground.location}</p>`
        )
    )
    .addTo(map)

const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-right');