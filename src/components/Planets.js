import React, { useContext } from 'react';
import Context from '../context/Context';

function Planets() {
  const {
    planetsList,
    handleChange,
    handleFilterByNumber,
    handleClick,
    filterByNumber,
    search,
    filterColumn,
    handleRemoveAll,
    handleRemove,
  } = useContext(Context);
  const { value } = filterByNumber;
  console.log(filterColumn.length);
  return (
    <section>
      <input data-testid="name-filter" type="text" onChange={ handleChange } />
      <select
        data-testid="column-filter"
        onChange={ handleFilterByNumber }
        name="column"
      >
        {filterColumn.map((e, index) => (
          <option key={ index }>{ e }</option>
        ))}
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ handleFilterByNumber }
        name="comparison"
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        onChange={ handleFilterByNumber }
        name="value"
        value={ value }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ handleClick }
      >
        Filtrar
      </button>
      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ handleRemoveAll }
      >
        Remover Filtros
      </button>
      {search.length === 0 ? null : search.map((e, index) => (
        <div data-testid="filter" key={ index }>
          <span>
            {`${e.column} ${e.comparison} ${e.value} `}
          </span>
          <button type="button" onClick={ handleRemove }>X</button>
        </div>
      ))}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {planetsList.map((e, index) => (
            <tr key={ index }>
              <td>{ e.name }</td>
              <td>{ e.rotation_period }</td>
              <td>{ e.orbital_period }</td>
              <td>{ e.diameter}</td>
              <td>{ e.climate }</td>
              <td>{ e.gravity }</td>
              <td>{ e.terrain }</td>
              <td>{ e.surface_water }</td>
              <td>{ e.population }</td>
              <td>{ e.films }</td>
              <td>{ e.created }</td>
              <td>{ e.edited }</td>
              <td>{ e.url }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Planets;
