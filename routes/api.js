const express = require('express');
const router = express.Router();
const { cekKey } = require('../database/db'); 
const { youtubePlay, youtubeMp4, youtubeMp3 } = require('../controllers/yt');
const { ttMp3, ttMp4 } = require('../controllers/tt')
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

router.get('/ytplay', youtubePlay);

router.get('/tiktokmp4', ttMp4);

router.get('/tiktokmp3', ttMp3);

router.get('/ytmp4', youtubeMp4);

router.get('/ytmp3', youtubeMp3);

router.get('/caklontong', cakLontong);

router.get('/quotes', quotes);

router.get('/fakta', fakta);

router.get('/bijak', bijak);

router.get('/ptl', ptl);

router.get('/motivasi', motivasi);

module.exports = router;