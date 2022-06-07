import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
// import response from '../testData';

function Provider({ children }) {
  const [planetsList, setPlanetsList] = useState([]);
  const [inputPlanet, setInputPlanet] = useState('');

  function handleChange({ target }) {
    setInputPlanet(target.value);
  }

  useEffect(() => {
    if (planetsList.length === 0) {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';

      const fetchPlanetsList = async () => {
        const response = await fetch(endpoint);
        const data = await response.json();
        const { results } = data;
        setPlanetsList(results);
      };
      fetchPlanetsList();
    }
  });

  useEffect(() => {
    if (inputPlanet !== '') {
      const newList = planetsList.filter((e) => e.name.includes(inputPlanet));
      setPlanetsList(newList);
    }
  }, [inputPlanet]);

  const context = {
    planetsList,
    setPlanetsList,
    handleChange,
  };

  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
