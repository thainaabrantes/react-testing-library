import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o conjunto de links no topo da aplicação', () => {
  it('O topo da aplicação deve conter um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const navLink = screen.getByRole('navigation');
    expect(navLink).toBeInTheDocument();
  });

  it('O primeiro link deve possuir o texto Home', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
  });

  it('O segundo link deve possuir o texto About', () => {
    renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
  });

  it('O terceiro link deve possuir o texto Favorite Pokémon', () => {
    renderWithRouter(<App />);

    const favoritePokemonLink = screen.getByRole('link', { name: /favorite pokémon/i });
    expect(favoritePokemonLink).toBeInTheDocument();
  });
});

describe('Testa o redirecionamento da aplicação', () => {
  it('A aplicação deve ser redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('A aplicação deve ser redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('A aplicação deve ser redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const favoritePokemonLink = screen.getByRole('link', { name: /favorite pokémon/i });
    expect(favoritePokemonLink).toBeInTheDocument();
    userEvent.click(favoritePokemonLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('A aplicação deve ser redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    act(() => { history.push('/pagina-inexistente/'); });

    const notFoundTitle = screen.getByRole('heading', { name: /page requested not found/i });
    expect(notFoundTitle).toBeInTheDocument();
  });
});
