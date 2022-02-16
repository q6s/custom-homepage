let favourites_div = document.getElementById('favourites-div');
let favourites_row = document.getElementById('favourites-row');
let add_favourite_btn = document.getElementById('add-favourite-btn');

function get_favourites() {
    let favourites = JSON.parse(localStorage.getItem('favourites'));
    return favourites;
}

function add_favourite(url) {
    let favourites = JSON.parse(localStorage.getItem('favourites'));
    // only allow 8 favourites
    if (favourites.length < 24) {
        if (!favourites.includes(url)) {
            if (!url.startsWith('http')) {
                url = 'https://' + url;
            }
            favourites.push(url);
            localStorage.setItem('favourites', JSON.stringify(favourites));
        }
    } else {
        alert('You can only have 24 favourites');
    }
}

function remove_favourite(url) {
    let favourites = get_favourites();
    let index = favourites.indexOf(url);
    if (index > -1) {
        favourites.splice(index, 1);
        localStorage.setItem('favourites', JSON.stringify(favourites));
    }
    update_favourites();
}

function check_favourites() {
    if (!localStorage.getItem('favourites')) {
        localStorage.setItem('favourites', JSON.stringify([]));
    }
}

function add_favourite_popup() {
    let link = prompt('Enter the URL of the website you want to add to your favourites');
    if (link) {
        add_favourite(link);
        update_favourites();
    }
}

function get_favicon(url) {
    return `${url}/favicon.ico`;
}

function update_favourites() {
    let favourites = get_favourites();

    // delete everything in the favourites row except first child
    for (let i = favourites_row.children.length - 1; i > 0; i--) {
        favourites_row.removeChild(favourites_row.children[i]);
    }

    favourites.forEach((favourite) => {
        if (!favourite.startsWith('http')) {
            favourite = 'https://' + favourite;
        }

        let favicon = get_favicon(favourite);
        let col = document.createElement('div');
        col.className = 'col-md-3 mb-4 p-0';
        col.style.position = 'relative';
        col.innerHTML = `
        <div class="favourite-item">
            <a href="${favourite}"><img src="${favicon}" style="width: 32px;"></a>
        </div>
        `

        // add event listener to col, if its right clicked, remove favourite
        col.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            remove_favourite(favourite);
        });

        favourites_row.appendChild(col);
    });
}

check_favourites();
update_favourites();