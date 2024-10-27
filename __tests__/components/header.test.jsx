// __tests__/components/header.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../../src/components/Header';

// Mock del contexto
jest.mock('../../src/context/AppContext', () => {
    // Definimos el mock de `toggleMode` dentro del alcance del mock
    const toggleModeMock = jest.fn();
    return {
        useAppContext: () => ({
            isDarkMode: true,
            toggleMode: toggleModeMock
        })
    };
});

describe('Header component', () => {
    test('debería mostrar el título y el switch de modo', () => {
        render(<Header />);

        // Verificamos que el título esté en el documento
        const titleElement = screen.getByText(/NewsddApp/i);
        expect(titleElement).toBeInTheDocument();

        // Verificamos que el switch esté en el documento
        const switchElement = screen.getByRole('checkbox', { name: 'toggle dark mode' });
        expect(switchElement).toBeInTheDocument();
    });
});
