const { string } = require("joi");
const { Schema, model } = require("mongoose");

const mutantSchema = new Schema({
    isMutant: Boolean,
    dna: {
        type: String,
        unique: true,
    },
})

module.exports = model('Mutant', mutantSchema); 
