const express = require('express');
const router = express.Router();
const mysql2 = require('mysql2');


/* GET home page. */
router.get('/', function (req, res, next) {
    connection.query('SELECT * from builds', function (err, rows, fields) {
        res.render('builds', {
            title: 'Galtaker',
            buildData: rows
        });
    });
});

router.post('/webhook', function (req, res, next) {
    console.log(req.body);

    console.log(req.headers.authorization)
    // check authorization header
    if (req.headers.authorization !== process.env.authorization) {
        res.status(401).send('Unauthorized');
        return;
    }


    let data = {
        build_number: req.body.buildNumber,
        started_by: req.body.startedBy,
        project_name: req.body.projectName,
        url: req.body.links.artifacts[0].files[0].href,
        build_target_name: req.body.buildTargetName,
        platform_name: req.body.platformName,
        filename: req.body.links.artifacts[0].files[0].filename,
        file_size: req.body.links.artifacts[0].files[0].size,
        build_time: new Date().toISOString().slice(0, 19).replace('T', ' '),
        share_url: req.body.links.share_url.href,
    };

    connection.query('INSERT INTO `builds` SET ?', data, function (e, result) {
        if (e) {
            console.error(e);
            return res.sendStatus(500);
        }

        console.log('Inserted build into the MySQL database');
        res.sendStatus(200);
    });
});

module.exports = router;
