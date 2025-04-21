
const http = require('node:http')
const hostname = '127.0.0.1'
const port = 3000





let movies = [
    { id: 1, title: 'Superman', year: 2025 },
    { id: 2, title: 'The kill Room', year: 2023 },
    { id: 3, title: 'The Order', year: 2024 }]

let series = [
    { id: 1, title: 'Peaky Blinders', year: 2013 },
    { id: 2, title: 'Vikings', year: 2013 },
    { id: 3, title: 'The Witcher', year: 2019 }]

let songs = [
    { id: 1, title: 'Chris Brown - Residuals', year: 2024 },
    { id: 2, title: 'Monica - The boy is mine', year: 1998 },
    { id: 3, title: '2Pac -Dear Mama', year: 1995 }]


//method to handle movies endpoint
const handleMoviesEndpoint = (req, res) => {
    if (req.method === 'POST') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'applicatin/json')
        res.end(JSON.stringify({ message: 'created' }))

    } else if (req.method === 'GET') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'applicatin/json')
        res.end(JSON.stringify({ movies: movies }))

    } else if (req.method === 'DELETE') {
        movies.splice(0, 1)//remove 1st element
        res.statusCode = 200
        res.setHeader('Content-Type', 'applicatin/json')
        res.end(JSON.stringify({ message: 'deleted', movies: movies }))

    } else if (req.method === 'PUT') {
        movies[0] = { id: 1, title: 'Saw 6', year: 2022 }
        res.statusCode = 200
        res.setHeader('Content-Type', 'applicatin/json')
        res.end(JSON.stringify({ message: 'updated', movies: movies }))

    }


}

//method to handle series endpoint
const handleSeriesEndpoint = (req, res) => {
    if (req.method === 'POST') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'applicatin/json')
        res.end(JSON.stringify({ message: 'created' }))

    } else if (req.method === 'GET') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'applicatin/json')
        res.end(JSON.stringify({ series: series }))

    } else if (req.method === 'DELETE') {
        series.splice(1, 1)//remove 2nd element
        res.statusCode = 200
        res.setHeader('Content-Type', 'applicatin/json')
        res.end(JSON.stringify({ message: 'deleted', series: series }))

    } else if (req.method === 'PUT') {
        series[0] = { id: 1, title: 'Supernatural', year: 2009 }
        res.statusCode = 200
        res.setHeader('Content-Type', 'applicatin/json')
        res.end(JSON.stringify({ message: 'updated', series: series }))

    }


}

//method to handle songs endpoint
const handleSongsEndpoint = (req, res) => {
    if (req.method === 'POST') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'applicatin/json')
        res.end(JSON.stringify({ message: 'created' }))

    } else if (req.method === 'GET') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'applicatin/json')
        res.end(JSON.stringify({ songs: songs }))

    } else if (req.method === 'DELETE') {
        songs.splice(2, 1)//remove 3rd element
        res.statusCode = 200
        res.setHeader('Content-Type', 'applicatin/json')
        res.end(JSON.stringify({ message: 'deleted', songs: songs }))

    } else if (req.method === 'PUT') {
        songs[0] = { id: 1, title: 'Usher - Lovers and Friends', year: 2009 }
        res.statusCode = 200
        res.setHeader('Content-Type', 'applicatin/json')
        res.end(JSON.stringify({ message: 'updated', songs: songs }))

    }

}

const server = http.createServer((req, res) => {

    if (req.url === '/movies') {
        handleMoviesEndpoint(req, res)//calling the method


    } else if (req.url === '/series') {
        handleSeriesEndpoint(req, res)//calling the method



    } else if (req.url === '/songs') {
        handleSongsEndpoint(req, res)//calling the method



    }
    else {
        res.statusCode = 404
        res.setHeader('Content-Type', 'applicatin/json')
        res.end(JSON.stringify({ message: 'Not found' }))
    }


})

server.listen(port, hostname, () => {
    console.log('server running');



})