'use strict'
/**
 * Dataset generator
 * @author Elihu A. Cruz
 * @version 1.0.1
 */

const fs = require('fs')

// Load base dataset
let countries = JSON.parse(fs.readFileSync('./countries.json','utf8')).countries
let states    = JSON.parse(fs.readFileSync('./states.json','utf8')).states
let cities    = JSON.parse(fs.readFileSync('./cities.json','utf8')).cities

// Seleccionamos pais de busqueda
let search = 'Mexico'

// get country
let country = countries.find(country => country.name === search)

// get country states
country.states = states.filter(state => (state.country_id === country.id)? state : null)

// get cities
country.states.map(state => {
  state.cities  = cities.filter(city => (city.state_id === state.id)? city : null)
})

// write new dataset
fs.writeFile("./dataset/full_country.json", JSON.stringify(country), function(err) {
    if(err)
      return console.log(err)

    console.log("The file was saved 📔")
})

// show me :p
console.log(country)
