document.addEventListener('DOMContentLoaded', () =>{
    const searchInput = document.getElementById('location-search');
    const findButton = document.getElementById('find-location');
    const map = L.map('map-placeholder', {zoomControl:false}).setView([42.8746, 74.5698], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    let marker = L.marker([42.8746, 74.5698]).addTo(map)
    .bindPopup('Bishkek')
    .openPopup();

    findButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if(!query) return;

        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                if(data.length > 0){
                    const {lat, lon, display_name} = data[0];
                    map.setView([lat, lon], 13);

                    if(marker){
                        map.removeLayer(marker);
                    }
                    marker = L.marker([lat,lon]).addTo(map)
                        .bindPopup(display_name)
                        .openPopup();
                }
                else{
                    alert("We couldn't found");
                }
            })

    });


});