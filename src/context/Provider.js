import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
// import response from '../testData';

const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';

function Provider({ children }) {
  const [planetsList, setPlanetsList] = useState([]);
  const [inputPlanet, setInputPlanet] = useState('');

  function handleChange({ target }) {
    setInputPlanet(target.value);
  }

  async function fetchPlanetsList() {
    const response = await fetch(endpoint);
    const data = await response.json();
    const { results } = data;
    setPlanetsList(results);
  }

  useEffect(() => {
    fetchPlanetsList();
  });

  useEffect(() => {
    if (inputPlanet !== '') {
      const newList = planetsList.filter((e) => e.name.includes(inputPlanet));
      setPlanetsList(newList);
    } else {
      fetchPlanetsList();
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
