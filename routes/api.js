const axios = require('axios');
const express = require('express');
const dylux = require('api-dylux');
const bochil = require('@bochilteam/scraper');
const fetch = require('node-fetch');
const router = express.Router();
const { cekKey } = require('../database/db');
const { youtubePlay, youtubeMp4, youtubeMp3 } = require('../controllers/yt');
const { cakLontong, bijak, quotes, fakta, ptl, motivasi } = require('../controllers/randomtext');

router.get('/checkkey', async (req, res) => {
    const apikey = req.query.apikey;
    if (!apikey) {
        return res.status(404).send({
            status: 'error',
            message: 'Masukan Apikey Sebagai Parameter!',
        });
    }
    const check = await cekKey(apikey);
    if (!check) {
        return res.status(403).send({
            status: 'error',
            message: `Apikey ${apikey} Tidak Valid, Mohon Untuk Mendaftar Terlebih Dahulu!`,
        });
    }
    return res.status(200).send({
        status: 'success',
        apikey,
        message: 'Aktif :)',
    });
});

router.get('/ssweb', async (req, res, next) => {
    const { url } = req.query;
    if (!url) {
        return res.status(400).json({
            status: 'error',
            creator: 'Davitt',
            message: 'Masukan parameter url.',
        });
    }
    try {
        const respone = await fetch(`https://ssweb.lonte.eu.org/api/webscreen?url=${url}&mediatype=desktop&responsetype=json`);
       if (!respone.ok) throw await respone.text()
       let json = await respone.json()
       if (!json.status) throw json
       res.json({ json });
    } catch (error) {
        next(error);
    }
});

router.get('/sshp', async (req, res, next) => {
    const { url } = req.query;
    if (!url) {
        return res.status(400).json({
            status: 'error',
            creator: 'Davitt',
            message: 'Masukan parameter url.',
        });
    }
    try {
        const respone = await fetch(`https://ssweb.lonte.eu.org/api/webscreen?url=${url}&mediatype=handphone&responsetype=json`);
       if (!respone.ok) throw await respone.text()
       let json = await respone.json()
       if (!json.status) throw json
       res.json({ json });
    } catch (error) {
        next(error);
    }
});

router.get('/ytplay', youtubePlay);

router.get('/tiktok', async (req, res, next) => {
    const { url } = req.query;
    if (!url) {
        return res.status(400).json({
            status: 'error',
            creator: 'Davitt',
            message: 'Masukan parameter url.',
        });
    }
    try {
        const ttlu = await dylux.tiktok(url).catch(async (_) => await bochil.tiktokdl(url));
        res.json({ result: ttlu });
    } catch (error) {
        next(error);
    }
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
