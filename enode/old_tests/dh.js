/*
    Alice                                    Bob
    ------------------------------------------------------
    a, g, p          ----- g, p, A ----->    b
    A = g^a mod p                            B = g^b mod p

    K = B^a mod p    <------- B ---------    K = A^b mod p
    ------------------------------------------------------
    Where:
    g => generator (2)
    p => prime number
    a, b => random numbers
    A, B => public keys
    K(Alice) == K(Bob) => password
*/
var bigInt = require('bigint');
var crypto = require('crypto');

var DHAGREEMENT_A_BITS = 128;
var CRYPT_PRIME_SIZE = 96; // PRIMESIZE_BYTES
var CRYPT_PRIME = new Buffer([
    0xF2,0xBF,0x52,0xC5,0x5F,0x58,0x7A,0xDD,0x53,0x71,0xA9,0x36,
    0xE8,0x86,0xEB,0x3C,0x62,0x17,0xA3,0x3E,0xC3,0x4C,0xB4,0x0D,
    0xC7,0x3A,0x41,0xA6,0x43,0xAF,0xFC,0xE7,0x21,0xFC,0x28,0x63,
    0x66,0x53,0x5B,0xDB,0xCE,0x25,0x9F,0x22,0x86,0xDA,0x4A,0x91,
    0xB2,0x07,0xCB,0xAA,0x52,0x55,0xD4,0xF6,0x1C,0xCE,0xAE,0xD4,
    0x5A,0xD5,0xE0,0x74,0x7D,0xF7,0x78,0x18,0x28,0x10,0x5F,0x34,
    0x0F,0x76,0x23,0x87,0xF8,0x8B,0x28,0x91,0x42,0xFB,0x42,0x68,
    0x8F,0x05,0x15,0x0F,0x54,0x8B,0x5F,0x43,0x6A,0xF7,0x0D,0xF3,
]);

var a = bigInt.fromBuffer(crypto.randomBytes(DHAGREEMENT_A_BITS/8));
var b = bigInt.fromBuffer(crypto.randomBytes(DHAGREEMENT_A_BITS/8));
var g = bigInt(2);
var p = bigInt.fromBuffer(CRYPT_PRIME);
var A = bigInt.powm(g, a, p);
var B = bigInt.powm(g, b, p);
var Ka = bigInt.powm(B, a, p);
var Kb = bigInt.powm(A, b, p);

console.log('Key A: '+Ka.toString(16));
console.log('Key B: '+Kb.toString(16));
