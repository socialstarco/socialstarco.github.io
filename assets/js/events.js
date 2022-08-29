let events = []

function feedData(list) {
    let to_be_fed= '';
    list.forEach((event) =>{
        const price = event.category==="A" ?  "5,000" : event.category==="B" ? "7,500" : event.category==="C" ? "10,000" : "15,000";

        to_be_fed += `<div class="course col-xl-3 col-lg-4 col-md-6 category-` + event.category + ` genre-` + event.genre.toLowerCase().replace('_','-') + `">
            <div class="img-card" class="img-fluid">
                <div class="slide-card" style='background-image: url("`+ event.picture_url + `")' class="img-fluid" alt="`+ event.title + `"></div>
            </div>
            <div class="row">
                <div class="col-10">
                    <p class="title">`+ event.title + `</p>
                    <p class="description">Rs. `+ price + `/team</p>
                </div>
                <div class="col-2 icon"><i class="bi bi-arrow-right-square-fill h4"></i></div>
            </div>
        </div>`;
    })
    document.getElementById("events-row").innerHTML = to_be_fed;
}

function loadData() {
    fetch("/assets/js/events.json")
    .then(async (response) => {
        return response.json();
    })
    .then(data => {    
        events = data;
        feedData(events)
    });
}

loadData();

document.getElementById("eventPrice").addEventListener("change", function(e) {
    const newCat = e.target.value;
    
    //Reset
    document.getElementById("events-row").classList.add('active');
    document.getElementById("eventCategory").value = '';

    const cols = document.getElementsByClassName('course');
    for (let i = 0; i < cols.length; i++) {
        cols[i].classList.remove('active');
    }
    const new_cols = document.getElementsByClassName('category-'+newCat);
    for (let i = 0; i < new_cols.length; i++) {
        new_cols[i].classList.add('active');
    }
});
document.getElementById("eventCategory").addEventListener("change", function(e) {
    const newCat = e.target.value.toLowerCase().replace(' ','-');
    
    //Reset
    document.getElementById("events-row").classList.add('active');
    document.getElementById("eventPrice").value = '';

    const cols = document.getElementsByClassName('course');
    for (let i = 0; i < cols.length; i++) {
        cols[i].classList.remove('active');
    }
    const new_cols = document.getElementsByClassName('genre-'+newCat);
    for (let i = 0; i < new_cols.length; i++) {
        new_cols[i].classList.add('active');
    }
});