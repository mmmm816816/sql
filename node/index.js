const express = require('express');
const app = express();

const server = require('http').createServer(app);

app.use(express.static('assets'));
app.use('/css', express.static(__dirname + 'assets/css'));
app.use('/js', express.static(__dirname + 'assets/js'));
app.use('/jsm', express.static(__dirname + 'assets/jsm'));
app.use('/media', express.static(__dirname + 'assets/media'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// postgres
const pg = require('pg');
var pgPool = new pg.Pool({
    database: "postgres",
    user: "postgres",
    password: "postgres",
    host: "xxxx",
    port: 5432,
});

app.get('/pg', (req, res) => {
    res.sendFile(__dirname + '/pg.html')
});

app.get('/pg_select_dept', (req, res) => {
    const query = {
        text: 'SELECT * FROM test_plpgsql.dept'
    }
    pgPool.connect((err, client) => {
        if (err) {
            console.log(err);
        } else {
            client
                .query(query)
                .then((result) => {
                    console.log('Connected')
                    res.send(result)
                })
                .catch((e) => {
                    console.error(e.stack);
                });
        }
    });
});

app.get('/pg_select_tmp', (req, res) => {
    const query = {
        text: 'SELECT * FROM test_plpgsql.tmp'
    }
    pgPool.connect((err, client) => {
        if (err) {
            console.log(err);
        } else {
            client
                .query(query)
                .then((result) => {
                    res.send(JSON.stringify(result.rows.map(x => { return [x.name, x.age] })));
                })
                .catch((e) => {
                    console.error(e.stack);
                });
        }
    });
});

app.post('/pg_insert', (req, res) => {
    for (let i = 0; i < req.body.csvData.length; i++) {
        let query = {
            text: 'INSERT INTO test_plpgsql.tmp VALUES ($1, $2)',
            values: [req.body.csvData[i].name, req.body.csvData[i].age],
        };
        pgPool.connect((err, client) => {
            if (err) {
                console.log(err);
            } else {
                client
                    .query(query)
                    .then((result) => {
                        console.log(result)
                    })
                    .catch((e) => {
                        console.error(e.stack);
                    });
            }
        });
    }
    res.send('<h1>xxx</h1>');
});

server.listen(3000, console.log('Listening on port 3000'));