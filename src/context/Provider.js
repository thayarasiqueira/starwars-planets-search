import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [planetsList, setPlanetsList] = useState([]);

  useEffect(() => {
    const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';

    const fetchPlanetsList = async () => {
      const response = await fetch(endpoint);
      const data = await response.json();
      const { results } = data;
      setPlanetsList(results);
    };
    fetchPlanetsList();
  });

  const context = {
    planetsList,
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
