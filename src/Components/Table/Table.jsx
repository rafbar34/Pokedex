import React, {useState, useEffect} from 'react';
import {PokemonThumbnail} from '../PokemonThumbnail/PokemonThumnail';

export const Table = ({themeToggler, theme}) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loadMore, setLoadMore] = useState(
    'https://pokeapi.co/api/v2/pokemon?limit=10'
  );
  const [change, setChange] = useState('');
  const [prevLoad, setPrevLoad] = useState(
    'https://pokeapi.co/api/v2/pokemon?limit=10'
  );
  console.log(pokemonData);

  const createPokemonObject = (result) => {
    //Promise.all()
    result.forEach(async (pokemon) => {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      const data = await res.json();
      setPokemonData((currentList) => [...currentList, data]);
    });
  };
  const getPokemonData = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();
    createPokemonObject(data.results);
  };

  const getMorePokemonData = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();
    setLoadMore(data.next);

    data.results.forEach(async (pokemon) => {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      const data = await res.json();
      setPokemonData((currentList) => [...currentList, data]);
    });
    if (pokemonData?.length >= 1) {
      setPokemonData(pokemonData.splice(10, 19));
    }
  };
  const getPrevPokemonData = async () => {
    const res = await fetch(prevLoad);
    const data = await res.json();
    setLoadMore(data.previous);
    data.results.forEach(async (pokemon) => {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      const data = await res.json();
      setPokemonData((currentList) => [...currentList, data]);
    });
    if (pokemonData?.length >= 0) {
      setPokemonData(pokemonData.splice(10, 19));
    }
  };

  useEffect(() => {
    getPokemonData();
  }, []);

  return (
    <div className='w-full h-96 flex flex-col bgHeight items-center bg-cover bg-[url("https://i.pinimg.com/564x/59/65/bf/5965bfa91c6b42a6528f0f64badbdc5c.jpg")]'>
      <button className='theme-btn' onClick={themeToggler}>
        {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
      </button>
      <div
        className={
          theme === 'light'
            ? 'flex flex-col bg-white flex-nowrap h-full w-1/2'
            : 'flex flex-col h-full bg-black flex-nowrap w-1/2'
        }
      >
        <div className='border-green-400'>
          <div className='h-32 w-full flex items-center bg-red-600 justify-center'>
            <div className='text-center h-1/2 bg-red-500 rounded-md'>
              <input
                type='text'
                className={
                  theme === 'light'
                    ? 'text-center  text-4xl h-full rounded-md'
                    : 'text-center text-black text-4xl h-full rounded-md'
                }
                name='name'
                placeholder='enter name pokemon'
                onChange={(e) => {
                  setChange(e.target.value);
                }}
              ></input>
            </div>
          </div>
        </div>

        <div className='border-2 border-green-400'>
          {pokemonData &&
            pokemonData
              .filter((pokemon) => {
                if (change === '') {
                  return pokemon;
                } else if (
                  pokemon.name.toLowerCase().includes(change.toLowerCase())
                ) {
                  return change;
                }
              })
              .map(({id, name, sprites, types, weight, height}) => (
                <PokemonThumbnail
                  id={id}
                  name={name}
                  image={sprites.other.dream_world.front_default}
                  type={types[0].type.name}
                  key={id}
                  weight={weight}
                  height={height}
                  theme={theme}
                />
              ))}
        </div>
        <div className='btn'>
          <button className='border-2  w-1/2 h-10' onClick={getPrevPokemonData}>
            Prev(api Problem)
          </button>
          <button className='border-2  w-1/2 h-10' onClick={getMorePokemonData}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
