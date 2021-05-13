import React, { useState, useEffect } from 'react';
import { fetchCountries } from '../../api';
import { FormControl, NativeSelect } from '@material-ui/core';
import styles from './CountryPicker.module.css';

const CountryPicker = ( { handleCountryChange } ) => {
    const [countriesFetched, setCountriesFetched] = useState([]);

    useEffect(() => {
        const countriesFetchedApi = async () => {
            setCountriesFetched(await fetchCountries());
        }

        countriesFetchedApi();

    },[setCountriesFetched])

    
    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e)=> {handleCountryChange(e.target.value)}} >
                <option value="">Global</option>
                {countriesFetched.map((country, i) => <option key={i} value={country} >{country}</option> )}
            </NativeSelect>
        </FormControl>
    );
}

export default CountryPicker;