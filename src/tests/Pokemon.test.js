import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
  it('O nome correto do Pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<App />);

    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu.innerHTML).toBe('Pikachu');
  });

  it('O tipo correto do Pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<App />);

    const type = screen.getByTestId('pokemon-type');
    expect(type.innerHTML).toBe('Electric');
  });

  it('O peso médio do Pokémon deve ser exibido com um texto no formato "Average weight: <value> <measurementUnit>"', () => {
    renderWithRouter(<App />);

    const averageWeight = screen.getByText(/average weight: 6\.0 kg/i);
    expect(averageWeight.innerHTML).toBe('Average weight: 6.0 kg');
  });

  it('A imagem do Pokémon deve ser exibida e deve conter um atributo src com a URL e o atributo alt com o texto "<name> sprite".', () => {
    renderWithRouter(<App />);

    const img = screen.getByRole('img', { name: /pikachu sprite/i });
    const url = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', url);
    expect(img).toHaveAttribute('alt', 'Pikachu sprite');
  });
});

describe('Testa o link de navegação para exibir detalhes do Pokémon', () => {
  it('O card deve conter um link que deve possuir a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /more details/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/pokemon/25');
  });

  it('Ao clicar no link de navegação do Pokémon, a aplicação deve ser redirecionada para a página de detalhes do Pokémon', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /more details/i });
    userEvent.click(link);
    const pikachuDetails = screen.getByRole('heading', { name: /pikachu details/i });
    expect(pikachuDetails).toBeInTheDocument();
  });

  it('A URL exibida no navegador deve mudar para /pokemon/<id>, onde <id> é o id do Pokémon cujos detalhes se deseja ver', () => {
    const { history } = renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /more details/i });
    userEvent.click(link);
    expect(history.location.pathname).toBe('/pokemon/25');
  });
});

describe('Testa se existe um ícone de estrela nos Pokémon favoritados', () => {
  it('Deve ser uma imagem com o atributo src /star-icon.svg e o atributo alt igual a "<Pokemon> is marked as favorite"', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /more details/i });
    userEvent.click(link);

    const favoritePokemon = screen.getByText(/pokémon favoritado\?/i);
    userEvent.click(favoritePokemon);

    const favoriteIcon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteIcon).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
