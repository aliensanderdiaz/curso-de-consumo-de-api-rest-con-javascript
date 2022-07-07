// const URL = 'https://api.thecatapi.com/v1/images/search';
const API_KEY = '9e47be2a-c4f9-40b8-a6a2-675f50e63be9'


const URL = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=' + API_KEY;
const URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites?api_key=' + API_KEY;
const URL_FAVORITES_NO_API_KEY = 'https://api.thecatapi.com/v1/favourites';
const URL_DELETE_FAVORITES = 'https://api.thecatapi.com/v1/favourites';

const URL_UPLOAD_IMAGES = 'https://api.thecatapi.com/v1/images/upload';


const img1 = document.querySelector('#img1')
const img2 = document.querySelector('#img2')
const btn1 = document.querySelector('#btn1')
const btn2 = document.querySelector('#btn2')

const spanError = document.querySelector('#error')
const sinFavoritos = document.querySelector('#sinFavoritos')

// fetch(URL)
//     .then(res => res.json())
//     .then(data => {
//         img.src = data[0].url
//     })

const anotherImg = async function () {
    const res = await fetch(URL)

    if (res.status !== 200) {
        spanError.innerHTML = 'Hubo un error'
    } else {
        const data = await res.json()
        img1.src = data[0].url;
        img2.src = data[1].url;
        // btn1.onclick = () => saveFavoritesMichis(data[0].id);
        // btn2.onclick = () => saveFavoritesMichis(data[1].id);
        btn1.onclick = () => saveFavoritesMichisWithAxios(data[0].id);
        btn2.onclick = () => saveFavoritesMichisWithAxios(data[1].id);
    }
}

anotherImg()

const favoritesMichis = async function () {
    // const res = await fetch(URL_FAVORITES)
    const res = await fetch(URL_FAVORITES_NO_API_KEY, {
        headers: {
            'x-api-key': API_KEY
        }
    })
    if (res.status !== 200) {
        spanError.innerHTML = 'Hubo un error'
    } else {
        const data = await res.json()
        console.log({
            data,
            funcion: 'favoritesMichis'
        })
        const favoritesMichis = document.getElementById('favoritesMichis')
        favoritesMichis.innerHTML = ''
        data.forEach(michi => {

            const article = document.createElement('article')
            const img = document.createElement('img')
            const button = document.createElement('button')
            button.onclick = () => deleteFavoritesMichis(michi.id)
            const buttonTxt = document.createTextNode('Eliminar Michi')

            button.appendChild(buttonTxt)
            img.src = michi.image.url
            img.width = 300

            article.appendChild(img)
            article.appendChild(button)
            favoritesMichis.appendChild(article)
        })
    }
}

favoritesMichis()


const saveFavoritesMichis = async function (id) {
    // const res = await fetch(URL_FAVORITES, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         image_id: id
    //     })
    // })
    const res = await fetch(URL_FAVORITES_NO_API_KEY, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
        },
        body: JSON.stringify({
            image_id: id
        })
    })
    if (res.status !== 200) {
        spanError.innerHTML = 'Hubo un error en save favorite'
    } else {

        favoritesMichis()

    }
}


const deleteFavoritesMichis = async function (id) {
    // const res = await fetch(URL_DELETE_FAVORITES + '/' + id + '?api_key=' + API_KEY, {
    //     method: 'DELETE'
    // })
    const res = await fetch(URL_DELETE_FAVORITES + '/' + id, {
        method: 'DELETE',
        headers: {
            'x-api-key': API_KEY
        }
    })
    if (res.status !== 200) {
        spanError.innerHTML = 'Hubo un error en delete favorite'
    } else {

        favoritesMichis()

    }
}

// saveFavoritesMichis()

const uploadMichiPhoto = async function () {
    const form = document.getElementById('uploadingForm')
    const formData = new FormData(form)

    console.log({
        formData,
        file: formData.get('file')
    })

    const res = await fetch(URL_UPLOAD_IMAGES, {
        method: 'POST',
        headers: {
            // 'Content-Type': 'multipart/form-data',
            'X-API-KEY': API_KEY
        },
        body: formData
    })

    const data = await res.json()

    console.log({
        res, data
    })
}

const instance = axios.create({
    baseURL: 'https://api.thecatapi.com/v1'
});

instance.defaults.headers.common['x-api-key'] = API_KEY;

const saveFavoritesMichisWithAxios = async function (id) {

    const { data, status } = await instance.post('/favourites', {
        image_id: id
    })
    if (status !== 200) {
        spanError.innerHTML = 'Hubo un error en save favorite'
    } else {

        favoritesMichis()

    }
}