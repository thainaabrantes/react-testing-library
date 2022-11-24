import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../pages/Pokedex';

const pokemonList = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
  },
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      value: '8.5',
      measurementUnit: 'kg',
    },
  },
  {
    id: 78,
    name: 'Rapidash',
    type: 'Fire',
    averageWeight: {
      value: '95.0',
      measurementUnit: 'kg',
    },
  },
];

const isPokemonFavoriteById = {
  25: false,
  4: false,
  78: false,
};

describe('Testa o componente <Pokedex.js />', () => {
  it('A página deve conter um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const h2 = screen.getByRole('heading', { name: /encountered pokémon/i });
    expect(h2).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const pokemonLinkArray = screen.getAllByRole('link');
    expect(pokemonLinkArray).toHaveLength(1);
  });
});

describe('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
  it('O botão deve conter o texto Próximo Pokémon', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const nextPokemonButton = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextPokemonButton).toBeInTheDocument();
    expect(nextPokemonButton.innerHTML).toBe('Próximo Pokémon');
  });

  it('Os próximos Pokémon da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const pikachuName = screen.getByText(/pikachu/i);
    expect(pikachuName).toBeInTheDocument();
    const nextPokemonButton = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextPokemonButton);
    const charmanderName = screen.getByText(/charmander/i);
    expect(charmanderName).toBeInTheDocument();
    userEvent.click(nextPokemonButton);
    const rapidashName = screen.getByText(/rapidash/i);
    expect(rapidashName).toBeInTheDocument();
  });

  it('O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista.', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const pikachuName = screen.getByText(/pikachu/i);
    expect(pikachuName).toBeInTheDocument();
    const nextPokemonButton = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextPokemonButton);
    const charmanderName = screen.getByText(/charmander/i);
    expect(charmanderName).toBeInTheDocument();
    userEvent.click(nextPokemonButton);
    const rapidashName = screen.getByText(/rapidash/i);
    expect(rapidashName).toBeInTheDocument();
    userEvent.click(nextPokemonButton);
    const pikachuName2 = screen.getByText(/pikachu/i);
    expect(pikachuName2).toBeInTheDocument();
  });
});

describe('Testa se a Pokédex tem os botões de filtro', () => {
  it('Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição, com o texto correspondente ao nome do tipo, ex. Psychic', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    expect(typeButtons[0].innerHTML).toBe('Electric');
    expect(typeButtons[1].innerHTML).toBe('Fire');
  });

  it('O botão All precisa estar sempre visível', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toBeInTheDocument();
  });

  it('A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos Pokémon daquele tipo', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const fireButton = screen.getByRole('button', { name: /fire/i });
    const nextPokemonButton = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(fireButton);
    const charmanderPokemon = screen.getByText(/charmander/i);
    expect(charmanderPokemon).toBeInTheDocument();
    userEvent.click(nextPokemonButton);
    const rapidashPokemon = screen.getByText(/rapidash/i);
    expect(rapidashPokemon).toBeInTheDocument();
    userEvent.click(nextPokemonButton);
    const charmanderPokemon2 = screen.getByText(/charmander/i);
    expect(charmanderPokemon2).toBeInTheDocument();
  });
});

describe('Testa se a Pokédex contém um botão para resetar o filtro', () => {
  it('Ao carregar a página, o filtro selecionado deverá ser All e o seu texto deve ser All', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toBeInTheDocument();
    expect(buttonAll.innerHTML).toBe('All');
  });

  it('A Pokedéx deverá mostrar os Pokémon normalmente (sem filtros) quando o botão All for clicado', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const buttonAll = screen.getByRole('button', { name: /all/i });
    userEvent.click(buttonAll);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
