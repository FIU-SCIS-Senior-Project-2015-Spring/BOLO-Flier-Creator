/* jshint node: true, mocha: true, expr: true */
'use strict';

var expect = require('chai').expect;

var path = require('path');
var Promise = require('promise');

var src = path.resolve( __dirname, '../../src' );
var UserFixture = require('../lib/user-entity-fixture');
var AdapterFactory = require( path.join( src, 'core/adapters' ) );

require('dotenv').config({ path: path.resolve( __dirname, '../../.env' ) });


/* == Test Spec ============================================================= */
describe( 'cloudant user storage adapter', function () {
    var user, insertedUserID;
    var userRepository;

    this.timeout( 5000 );

    before( function () {
        userRepository = AdapterFactory.create( 'persistence', 'cloudant-user-repository' );
    });

    beforeEach( function () {
        user = UserFixture.create();
    });

    it( 'inserts a user', function () {
        /* act */
        var userPromise = userRepository.insert( user );

        /* assert */
        return userPromise
            .then( function ( newuser ) {
                expect( user.diff( newuser ) ).to.be.length( 1 )
                    .and.to.contain( 'id' );
                insertedUserID = newuser.data.id;
            });
    });

    it( 'gets a single user by id', function () {
        /* act */
        var userPromise = userRepository.getById( insertedUserID );

        /* assert */
        return userPromise
            .then( function ( found ) {
                expect( found.data.id ).to.equal( insertedUserID );
            });
    });

    /*
     * Assumption: usernames are unique.
     *
     * This may be an issue when trying to deal with usernames for
     * different agencies that 'might' need to preserve uesrnames from
     * other systems.
     */
    it( 'queries by username', function () {
        /* act */
        var userPromise = userRepository.getByUsername( user.data.username );

        /* assert */
        return userPromise
            .then( function ( found ) {
                expect( found.data.username ).to.equal( user.data.username );
            })
            .catch( function ( error ) {
                throw error;
            });
    });

    it( 'removes a user', function () {
        /* act */
        var responsePromise = userRepository.remove( insertedUserID );

        /* assert */
        return responsePromise
            .then( function ( response ) {
                expect( response.ok ).to.be.true;
                expect( response.id ).to.be.equal( insertedUserID );
            });
    });

});
