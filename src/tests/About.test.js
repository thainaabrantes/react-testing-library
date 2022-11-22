import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('Testa se a página contém as informações sobre a Pokédex', () => {
  it('A página deve conter um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const aboutTitle = screen.getByRole('heading', { name: /about pokédex/i });
    expect(aboutTitle).toBeInTheDocument();
  });

  it('A página deve conter dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const paragraph1 = screen.getByText(/this application simulates a Pokédex, a digital encyclopedia containing all Pokémon/i);
    const paragraph2 = screen.getByText(/one can filter Pokémon by type, and see more details for each one of them/i);
    expect(paragraph1 && paragraph2).toBeInTheDocument();
  });

  it('A página deve conter a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
