import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemon from '../pages/FavoritePokemon';
import App from '../App';

describe('Testa o componente <FavoritePokemon.js />', () => {
  it('Deve ser exibida na tela a mensagem "No favorite pokemon found", caso a pessoa não tenha Pokémon favoritos', () => {
    renderWithRouter(<FavoritePokemon />);
    const noFavoriteFound = screen.getByText(/no favorite pokémon found/i);
    expect(noFavoriteFound).toBeInTheDocument();
  });

  it('Deve ser exibido todos os cards de Pokémon favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');

    const eletricPokemon = screen.getByRole('button', { name: /electric/i });
    userEvent.click(eletricPokemon);

    const pikachuMoreDetailsButton = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pikachuMoreDetailsButton);

    const checkboxPikachu = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkboxPikachu);
    expect(checkboxPikachu).toBeChecked();

    userEvent.click(homeLink);

    const firePokemon = screen.getByRole('button', { name: /fire/i });
    userEvent.click(firePokemon);

    const charmanderMoreDetailsButton = screen.getByRole('link', { name: /more details/i });
    userEvent.click(charmanderMoreDetailsButton);

    const checkboxCharmander = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkboxCharmander);
    expect(checkboxCharmander).toBeChecked();

    const favoritePokemonLink = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(favoritePokemonLink);

    const pikachuText = screen.getByText(/pikachu/i);
    const charmanderText = screen.getByText(/charmander/i);
    expect(pikachuText && charmanderText).toBeInTheDocument();
  });
});
