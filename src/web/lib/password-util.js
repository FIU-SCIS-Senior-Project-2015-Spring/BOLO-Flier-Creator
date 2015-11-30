/* jshint node:true */
'use strict';

var config      = require('../config.js');

var validate    = require('validate.js');

module.exports.validatePassword = function ( pass, conf ) {
        var constraints = {
            'password': config.validation.password,
            'confirmation': {
                'equality': {
                    'attribute': 'password',
                    'message': ' should match password field.'
                }
            }
        };

        return validate( {
            'password': pass,
            'confirmation': conf
        }, constraints );
};
