import http from "http"
import fetch from "node-fetch"
import fs from "fs"

const serve = http.createServer((req, res) => {
    const url = req.url
    if (url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write("<h1>Welcome to My Home Page</h1>")
        res.write("<img src='./imgs/web.png' alt='dummy image'>")
        res.end()
    }
    else if (url === '/list') {
        fetch('https://swapi.dev/api/people')
            .then(res => res.json())
            .then(data => {
                let tableData = "<table border='1'><tr><th>ID</th><th>Name</th><th>Height</th><th>Birth Year</th><th>Gender</th><th>URL</th></tr>"
                data.results.forEach(element => {
                    tableData += `<tr><td>${element.id}</td><td>${element.name}</td><td>${element.height}</td><td>${element.birth_year}</td><td>${element.gender}</td><td>${element.url}</td></tr>`
                })
                tableData += `</table>`
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.write(tableData)
                res.end()
            })
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' })
        res.write("<h1>Page Not Found</h1>")
        res.end()
    }
}).listen(8090, console.log(`Server is listening on port 8090`))



