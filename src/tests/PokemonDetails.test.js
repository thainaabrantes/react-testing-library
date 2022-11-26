import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa as informações detalhadas do Pokémon selecionado', () => {
  it('A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /more details/i });
    userEvent.click(link);

    const pikachuDetails = screen.getByRole('heading', { name: /pikachu details/i });
    expect(pikachuDetails).toBeInTheDocument();
  });

  it('Não deve existir o link de navegação para os detalhes do Pokémon selecionado', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /more details/i });
    userEvent.click(link);

    expect(link).not.toBeInTheDocument();
  });

  it('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /more details/i });
    userEvent.click(link);

    const sumary = screen.getByRole('heading', { name: /summary/i });
    expect(sumary).toBeInTheDocument();
  });

  it('A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado.', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /more details/i });
    userEvent.click(link);

    const paragraph = screen.queryByText(/This intelligent Pokémon roasts hard berries/i);
    expect(paragraph).toBeInTheDocument();
  });
});

describe('Testa a seção com os mapas contendo as localizações do Pokémon', () => {
  it('Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of <name>, onde <name> é o nome do Pokémon exibido', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /more details/i });
    userEvent.click(link);

    const gameLocations = screen.getByRole('heading', { name: /game locations of pikachu/i });
    expect(gameLocations).toBeInTheDocument();
  });

  it('Todas as localizações do Pokémon devem ser mostradas com o seu nome e uma imagem do mapa', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /more details/i });
    userEvent.click(link);

    const imgLocations = screen.getAllByAltText('Pikachu location');
    imgLocations.forEach((img) => {
      expect(img).toHaveAttribute('alt', 'Pikachu location');
    });
    const img1Src = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const img2Src = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    expect(imgLocations[0]).toHaveAttribute('src', img1Src);
    expect(imgLocations[1]).toHaveAttribute('src', img2Src);

    const locationName1 = screen.getByText(/kanto viridian forest/i);
    const locationName2 = screen.getByText(/kanto power plant/i);
    expect(locationName1).toBeInTheDocument();
    expect(locationName2).toBeInTheDocument();
  });
});

describe('Testa se o Pokémon pode ser favoritado através da página de detalhes', () => {
  it('A página deve exibir um checkbox com o texto "Pokémon favoritado?", que permite favoritar e desfavoritar o Pokémon', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /more details/i });
    userEvent.click(link);

    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    const checkboxText = screen.getByText(/pokémon favoritado\?/i);
    expect(checkbox && checkboxText).toBeInTheDocument();

    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
