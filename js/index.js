var search = document.getElementById('searchInput');
var findBtn = document.getElementById('findButton')
var term = ''
// getWeather('cairo')
// findBtn.addEventListener('click', function () {
//     let term = search.value
//     getWeather(term)
// })

search.addEventListener('input', function () {
    term = search.value;
    if (term) {
        getWeather(term)
    }
})
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude
        if (!term) {
            getWeather(`${lat},${lon}`)
        }
    },
        function (error) {
            console.log('errror')
        }
    )
}
var weather = []
async function getWeather(term) {
    try {
        if (term) {
            var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=40cf4636b04e481bb1d191617240412&q=${term}&days=3&aqi=no&alerts=no`)
            var finalResponse = await response.json()

            var currLocation = finalResponse.location
            var weacurrent = finalResponse.current
            weather = finalResponse.forecast.forecastday
            display(currLocation, weacurrent)
        }
        console.log(weather)
    } catch (error) {
        console.log('errooor')
    }
}

function display(currLocation, weacurrent) {


    var currDate = weather[0]
    var date = new Date(currDate.date)
    var nameOfDay = date.toLocaleDateString('en-US', { weekday: 'long' })
    var dateOfDay = `${date.getDate()}${date.toLocaleString('en-US', { month: 'short' })}`



    var tommorowDate = weather[1]
    var tommodate = new Date(tommorowDate.date)
    var tommorOfDay = tommodate.toLocaleDateString('en-US', { weekday: 'long' })


    var afterDate = weather[2]
    var afdate = new Date(afterDate.date)
    var afterOfDay = afdate.toLocaleDateString('en-US', { weekday: 'long' })

    // console.log(date)
    var items =
        ` <div class="col-lg-4 p-0">
                        <div class="card h-100 text-secondary">
                            <div class="card-header d-flex justify-content-between">
                                <div>
                                    <p>${nameOfDay}</p>
                                </div>
                                <div>
                                    <p>${dateOfDay}</p>
                                </div>
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">${currLocation.name}</h5>
                                <h1 class="card-text">${weacurrent.temp_c}</h1>
                                <img src="${weacurrent.condition.icon}" alt="">
                                <p class="text-skyblue">${weacurrent.condition.text}</p>
                                <div class="d-flex text-secondary">
                                    <div class="pe-3">
                                        <i class="fa-solid fa-umbrella"></i>
                                        <span>20%</span>
                                    </div>
                                    <div class="pe-3">
                                        <i class="fa-solid fa-wind"></i>
                                        <span>18km/h</span>
                                    </div>
                                    <div>
                                        <i class="fa-solid fa-compass"></i>
                                        <span>East</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 p-0">
                        <div class="card text-center h-100 text-secondary">
                            <div class="card-header">
                                <p>${tommorOfDay}</p>
                            </div>
                            <div class="card-body">
                                <img src="${tommorowDate.day.condition.icon}" class="w-25" alt="">
                                <h5 class="card-text">${tommorowDate.day.maxtemp_c}</h5>
                                <p class="text-secondary">${tommorowDate.day.mintemp_c}</p>
                                <p class="text-skyblue">${tommorowDate.day.condition.text}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 p-0">
                        <div class="card text-center h-100 text-secondary">
                            <div class="card-header">
                                <p>${afterOfDay}</p>
                            </div>
                            <div class="card-body">
                               <img src="${afterDate.day.condition.icon}" class="w-25" alt="">
                                <h5 class="card-text">${afterDate.day.maxtemp_c}</h5>
                                <p class="text-secondary">${afterDate.day.mintemp_c}</p>
                                <p class="text-skyblue">${afterDate.day.condition.text}</p>
                            </div>
                        </div>
                    </div>`
    document.getElementById('data').innerHTML = items;
}



