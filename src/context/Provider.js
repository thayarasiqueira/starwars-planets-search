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
  const [filterByNumber, setFilterByNumber] = useState({
    column: 'population',
    comparison: 'maior que',
    value: Number(0),
  });
  const [clickFilter, setClickFilter] = useState(false);

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

  function handleFilterByNumber({ target }) {
    const { name, value } = target;
    setFilterByNumber({
      ...filterByNumber,
      [name]: value,
    });
  }

  useEffect(() => {
    let newList = filteredList;
    const { column, comparison, value } = filterByNumber;
    if (comparison === 'maior que') {
      newList = newList.filter((e) => Number(e[column]) > Number(value));
    }
    if (comparison === 'igual a') {
      newList = newList.filter(
        (e) => Number(e[column]) === Number(value),
      );
    }
    if (comparison === 'menor que') {
      newList = newList.filter((e) => Number(e[column]) < Number(value));
    }
    console.log(typeof value);
    setPlanetsList(newList);
  }, [clickFilter]);

  function handleClick() {
    if (clickFilter === false) {
      setClickFilter(true);
    } else {
      setClickFilter(false);
    }
  }

  const context = {
    planetsList,
    handleChange,
    handleFilterByNumber,
    handleClick,
    filterByNumber: {
      column: 'population',
      comparison: 'maior que',
      value: 0,
    },
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
