import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
// import response from '../testData';

const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';

function Provider({ children }) {
  const [planetsList, setPlanetsList] = useState([]);
  const [inputPlanet, setInputPlanet] = useState({
    filterByName: {
      name: '',
    },
  });
  const [filteredList, setFilteredList] = useState([]);

  function handleChange({ target }) {
    setInputPlanet({
      filterByName: {
        name: target.value.toLowerCase(),
      },
    });
  }

  useEffect(() => {
    const fetchPlanetsList = async () => {
      const response = await fetch(endpoint);
      const data = await response.json();
      const { results } = data;
      setPlanetsList(results);
      setFilteredList(results);
    };
    fetchPlanetsList();
  }, []);

  useEffect(() => {
    if (inputPlanet.filterByName.name === '') {
      setPlanetsList(filteredList);
    } else {
      const newList = planetsList.filter(
        (e) => e.name.toLowerCase().includes(inputPlanet.filterByName.name),
      );
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
