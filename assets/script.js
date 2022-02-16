let search_bar = document.getElementById('search-bar');
let search_btn = document.getElementById('search-btn');

let date_header = document.getElementById('date-header');
let time_header = document.getElementById('time-header');

let todays_date = new Date();
let date_string = todays_date.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
});

function update_time_header() {
    let current_time = new Date();
    let hours = current_time.getHours();
    let minutes = current_time.getMinutes();
    let seconds = current_time.getSeconds();
    let am_pm = 'am';

    if (hours > 12) {
        hours -= 12; 
        am_pm = 'pm';
    } 

    if (minutes < 10) {minutes = '0' + minutes;}
    if (seconds < 10) {seconds = '0' + seconds;}

    let time_string = `${hours}:${minutes}:${seconds} ${am_pm}`;
    time_header.innerHTML = time_string;

    setTimeout(update_time_header, 1000);
}

function valid_url(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

function search(query) {
    if (query.length > 0) {
        if (valid_url(query)) {
            // if the query doesnt start with http, add it
            if (!query.startsWith('http')) {
                query = 'http://' + query;
            }
            window.location.href = query;
        } else {
            window.location.href = `https://google.com/search?q=${query}`;
        }
    }
}

date_header.innerHTML = date_string;

search_bar.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        search(search_bar.value);
    }
    search_bar.style.width = `${search_bar.value.length * 10}px`;
});

search_btn.addEventListener('click', () => {
    search(search_bar.value);
});

update_time_header();