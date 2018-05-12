const cloudscraper = require('cloudscraper');
const request = require('request');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');

let read = [];
let read1 = [];
fs.readdir('/home/mendu/git/pre2/logs/', (err, files) => {
  files.forEach(file => {
    fs.readFile('/home/mendu/git/pre2/logs/' + file, (err, data) => {
      if (err) throw err;
      read = read.concat(JSON.parse(data).table);
    });
  });
});

fs.readdir('/home/mendu/git/pre2/logs1/', (err, files) => {
  files.forEach(file => {
    fs.readFile('/home/mendu/git/pre2/logs1/' + file, (err, data) => {
      if (err) throw err;
      read1 = read1.concat(JSON.parse(data).table);
    });
  });
});

setTimeout(() => {
  io.emit('data', read);
  io.emit('data1', read1);
}, 15000);

app.get('/', (req, res) => res.send('Hello World!'));
app.use(express.static('/home/mendu/git/pre2/public'));
http.listen(9000, () => console.log('Example app listening on port 2000!'));
// app.use(express.static('/home/mendu/git/pre2/public'));

let zeb = 0;
let koin = 0;
let us = 1;
let store = [];
let store1 = [];

function rate() {
  let rate = koin / us;
  console.log('kkkkkkkkkkkkkk', koin / us);
  let n = Date.now();
  io.emit('live', { rate: rate, time: n });

  if (rate > 60 && rate < 80) {
    if (rate < 64.5) {
      io.emit('play', 'dummy');
    }
    if (store.push({ time: n, rate: koin / us }) > 49) {
      fs.writeFile(
        '/home/mendu/git/pre2/logs/' + n + '.json',
        JSON.stringify({ table: store }),
        err => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(n, 'File has been created');
          store = [];
        }
      );
    }
  }
}

function ratezeb() {
  let rate = zeb / us;
  console.log('zzzzzzzzzzzzz', zeb / us);
  let n = Date.now();
  io.emit('zeb', { rate: rate, time: n });

  if (rate > 60 && rate < 80) {
    if (rate > 74.5) {
      io.emit('play', 'dummy');
    }
    if (store1.push({ time: n, rate: zeb / us }) > 49) {
      fs.writeFile(
        '/home/mendu/git/pre2/logs1/' + n + '.json',
        JSON.stringify({ table: store1 }),
        err => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(n, 'File has been created');
          store1 = [];
        }
      );
    }
  }
}

function getkoin() {
  cloudscraper.get('https://koinex.in/api/ticker/', function(
    error,
    response,
    body
  ) {
    if (error) {
      console.log('Error occurred');
    } else {
      try {
        koin = JSON.parse(body).prices.inr.ETH;
        rate();
        console.log(koin, ' KOI');
      } catch (e) {
        console.log('json shit');
      }
    }
  });
}

function getzeb() {
  request('https://www.zebapi.com/api/v1/market/ticker-new/eth/inr', function(
    error,
    response,
    body
  ) {
    try {
      zeb = JSON.parse(body).market;
      ratezeb();
      console.log(zeb, ' ZEB');
      // console.log(us, 'USD');
    } catch (e) {
      console.log(e);
    }
  });
}

function getus() {
  request('https://api.binance.com/api/v1/trades?symbol=ETHUSDT', function(
    error,
    response,
    body
  ) {
    try {
      us = JSON.parse(body)[0].price;
      rate();
      console.log(us, 'USD');
    } catch (e) {
      console.log(e);
    }
  });
}

setInterval(getkoin, 13000);
setInterval(getzeb, 13000);
setInterval(getus, 8000);
