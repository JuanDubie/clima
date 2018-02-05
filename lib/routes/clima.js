'use strict';
const express = require('express');
const router = express.Router();
const request =require("request");

router.get('/clima', function(req, res) {
    
    function Mrequest(pagina, callback) {
        request({
            url: pagina,
            method: "GET",
            json: true,
        }, callback);
    }
    
    let pagina_current='http://api.apixu.com/v1/forecast.json?key='+process.env.APIKEY+'&q=Buenos_Aires&lang=es&days=2';
    
    Mrequest(pagina_current, function(error, response, body) {
        if (error) {
            console.error('Error getInfo: ', error);
            return;
        }

    let temperatura_max;
    let temperatura_min;
    temperatura_max =(body.forecast.forecastday[1].day.maxtemp_c + body.forecast.forecastday[0].day.maxtemp_c)/2
    temperatura_min = (body.forecast.forecastday[0].day.mintemp_c + body.forecast.forecastday[0].day.mintemp_c)/2
        
    let info=[{
        temp_actual:body.current.temp_c,
        humedad:body.current.humidity,
        tiempo_text:body.current.condition.text,
        temperatura_max:temperatura_max,
        temperatura_min:temperatura_min  
    }]
 
    res.status(200).json({
        clima: info
    });

    });
    

});

module.exports = router;
