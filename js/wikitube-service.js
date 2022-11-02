'use strict'

const TUBE_STRG_KEY = 'defaultVids'
const WIKI_STRG_KEY = 'defaultWikis'
let gTubeCache = loadFromStorage(TUBE_STRG_KEY) || {}
let gWikiCache = loadFromStorage(WIKI_STRG_KEY) || {}

function getYoutubeTop5(searchStr) {
    if (gTubeCache[searchStr]) return Promise.resolve(gTubeCache[searchStr])
    return axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=AIzaSyC1Gw-VuraXVtAPlQQbrg8bFrYEwMEPQfA&q=${searchStr}`)
        .then(res => res.data.items)
        .then(videos => videos.map(video => ({ id: video.id.videoId, img: video.snippet.thumbnails.default.url, title: video.snippet.title })))
        .then(videos => {
            gTubeCache[searchStr] = videos
            saveToStorage(TUBE_STRG_KEY, gTubeCache)
            return videos
        })
}

function getWikiData(searchStr) {
    if (gWikiCache[searchStr]) return Promise.resolve(gWikiCache[searchStr])

    return axios.get(`https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&
    srsearch=${searchStr}&format=json`)
        .then(res => res.data.query.search)
        .then(results => results.map(res => ({ title: res.title, url: `https://en.wikipedia.org/wiki/${res.title}`, snippet: res.snippet })))
        .then(results => {
            gWikiCache[searchStr] = results
            saveToStorage(WIKI_STRG_KEY, gWikiCache)
            return results
        })
}