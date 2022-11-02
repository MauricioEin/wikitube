'use strict'

const DEFAULT_SEARCH = 'queen'



function onInit() {
    document.querySelector('form').addEventListener('submit', onSubmit)
    adjustVideoSize()
    window.addEventListener('resize', () => { adjustVideoSize() })


    getYoutubeTop5(DEFAULT_SEARCH)
        .then(renderVideos)
    getWikiData(DEFAULT_SEARCH)
        .then(renderWikiLinks)

        document.querySelector('.pick-color').addEventListener('submit', saveColor)
}

function adjustVideoSize() {
    const elContainer = document.querySelector('.video-container')
    const elPlayer = document.querySelector('.video-player')
    elPlayer.width = elContainer.offsetWidth
    elPlayer.height = elContainer.offsetHeight
}

function onSubmit(ev) {
    ev.preventDefault()
    const searchStr = ev.target[0].value.toLowerCase()
    getYoutubeTop5(searchStr)
        .then(renderVideos)
    getWikiData(searchStr)
        .then(renderWikiLinks)
}

function renderVideos(videos) {
    const strHTMLs = videos.map(video => `
    <article data-id="${video.id}" onclick="onSelectVideo('${video.id}')">
    <img src="${video.img}"/>
    <h4 >${video.title}</h4>
    </article>
    `)
    document.querySelector('.video-links').innerHTML = strHTMLs.join('')
    document.querySelector('.video-player').src = `https://www.youtube.com/embed/${videos[0].id}`
}

function onSelectVideo(id) {
    console.log('changing video to', id)
    document.querySelector('.video-player').src = `https://www.youtube.com/embed/${id}`
}

function renderWikiLinks(results) {
    console.log('wikires:', results)
    const strHTMLs = results.map(res => `
    <article >
    <a href="${res.url}" target="_blank">${res.title}</a>
    <p >${res.snippet}...</p>
    </article>
    `)
    document.querySelector('.wiki-links').innerHTML = strHTMLs.join('')

}

function onChangeColor() {
    console.log('color')
    // const { value: email } = await Swal.fire({
    //     title: 'Input email address',
    //     input: 'email',
    //     inputLabel: 'Your email address',
    //     inputPlaceholder: 'Enter your email address'
    // })

    // if (email) {
    //     Swal.fire(`Entered email: ${email}`)
    // }
}

function onChangeBGC(color) {
    const currBGC = document.body.style.backgroundColor
    document.body.style.backgroundColor = color
}

function saveColor(ev){
    ev.preventDefault()
    document.body.backgroundColor=ev.target[0].value
}