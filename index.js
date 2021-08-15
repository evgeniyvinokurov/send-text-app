const app = require('./express/app');

app.get('/', function (req, res) {
    res.sendFile('index.html', { root: './client-app/views/' })
})

console.log("start listen on 2000");
app.listen(2000);