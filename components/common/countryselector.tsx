'use client'

import countries from '../../neoney_datas/countries.json'
import Select from 'react-select';
import { useState } from 'react';


export default function CountrySelector() {


let countriesoptions = [{}] 

let [country, setCountry] = useState({});
let [citiesoptions, setCityoptions] = useState([{}]);
let [city, setCity] = useState({})

countries.map((item) => {

  countriesoptions.push({

      value: item.iso3, 
      label : item.name
    
    })
 
} )

const handelCountryChange = async (countrySelected : any) => {

setCountry(countrySelected);
setCity('')

let cityArray = [{}];

await countries.map((item) => {

  if (item.iso3 == countrySelected.value) {

    item.cities.map((item2) => {

      cityArray.push({

        value: item2, 
        label : item2

    })
    
    })

    setCityoptions(cityArray);

  }  
 
} )


} 

const handelCityChange = (citySelected : any) => {

setCity(citySelected);

} 


  return (
  
    <main>

    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
    Pays
    </label>

    <div className="block w-full mt-2 rounded-md py-1.5 text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"> 

    <Select options={countriesoptions} onChange={handelCountryChange} value={country}/>

    </div>

    <label htmlFor="country" className="block mt-2 text-sm font-medium leading-6 text-gray-900">
    Ville
    </label>

    <div className="block w-full mt-2 rounded-md py-1.5 text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"> 
    
    <Select options={citiesoptions} onChange={handelCityChange} value={city}/>
    
    </div>

    </main>
      
  )
      
    
  }
  