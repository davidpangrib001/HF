const express = require('express');
const dylux = require ('api-dylux');
const bochil = require('@bochilteam/scraper');
const fetch = require('node-fetch');
const router = express.Router();
const { cekKey } = require('../database/db'); 
const { youtubePlay, youtubeMp4, youtubeMp3 } = require('../controllers/yt');
const { cakLontong, bijak, quotes, fakta, ptl, motivasi } = require('../controllers/randomtext');

router.get('/checkkey', async (req, res) => {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Masukan Apikey Sebagai Parameter!`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `Apikey ${apikey} Tidak Valid, Mohon Untuk Mendaftar Terlebih Dahulu!`
    });
    res.send({status: 200, apikey: apikey, response: 'Aktif :)'});
});

router.get('/ssweb', async (req, res, next) => {
    let url = req.query.url
    if (!url) return res.json({
        status: false,
        creator: 'Davitt',
        message: "masukan parameter url"
    })
    let anjass = await fetch(`https://ssweb.lonte.eu.org/api/webscreen?url=${url}&mediatype=desktop&responsetype=image`)
    .then((data) => {
            res.set({
                'Content-Type': 'image/png'
            })
            res.send(data)
        })
        }

router.get('/ytplay', youtubePlay);

router.get('/tiktok', async (req, res, next) => {
    let url = req.query.url
    if (!url) return res.json({
        status: false,
        creator: `Davitt`,
        message: "masukan parameter url"
    })
    let ttlu = await dylux.tiktok(url).catch(async _ => await bochil.tiktokdl(url))
    var result = ttlu;
    res.json({
            result
        })

});

router.get('/ytmp4', youtubeMp4);

router.get('/ytmp3', youtubeMp3);

router.get('/caklontong', cakLontong);

router.get('/quotes', quotes);

router.get('/fakta', fakta);

router.get('/bijak', bijak);

router.get('/ptl', ptl);

router.get('/motivasi', motivasi);

module.exports = router;
