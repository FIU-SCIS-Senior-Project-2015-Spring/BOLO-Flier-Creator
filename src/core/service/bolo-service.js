/* jshint node: true */
'use strict';

var Bolo = require('../domain/bolo.js');
var Promise = require('promise');


/** @module core/ports */
module.exports = BoloService;


/**
 * Creates a new instance of {BoloService}.
 *
 * @class
 * @classdesc Provides an API for client adapters to interact with user facing
 * functionality.
 *
 * @param {BoloRepository} - Object implementing the Storage Port Interface.
 * @param {MediaAdapter} - Object implementing the Media Port Interface.
 */
function BoloService ( boloRepository ) {
    this.boloRepository = boloRepository;
}


/**
 * Create a new BOLO in the system.
 *
 * @param {object} boloData - Data for the new BOLO
 * @param {object} attachments - BOLO Attachments
 *                               valid keys = { image, video, audio }
 */
BoloService.prototype.createBolo = function ( boloData, attachments ) {
    var bolo = new Bolo( boloData );

    if ( ! bolo.isValid() ) {
        Promise.reject( new Error( "invalid bolo data" ) );
    }

    //return this.boloRepository.insert( bolo, attachments )
    return this.boloRepository.insert( bolo )
        .then( function ( value ) {
            return Promise.resolve( { success: true } );
        })
        .catch( function ( error ) {
            return Promise.resolve( { success: false, error: error.message } );
        });
};

BoloService.prototype.updateBolo = function ( boloData, attachments ) {
    var bolo = new Bolo( boloData );

    if ( ! bolo.isValid() ) throw new Error( "invalid bolo data" );

    return this.boloRepository.update( bolo )
        .then( function ( value ) {
            return Promise.resolve( { success: true } );
        })
        .catch( function ( error ) {
            return Promise.resolve( { success: false, error: error.message } );
        });
};

/**
 * Retrieve a collection of bolos
 */
BoloService.prototype.getBolos = function () {
    var context = this;
    return context.boloRepository.getBolos();
};

BoloService.prototype.getBolo = function (id) {
    var context = this;
    return context.boloRepository.getBolo(id);
};

BoloService.prototype.removeBolo = function ( id ) {
    return this.boloRepository.delete( id );
};

