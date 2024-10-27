// __tests__/components/FilterBar.test.jsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterBar from '../../src/components/FilterBar';
import { useAppContext } from '../../src/context/AppContext';

jest.mock('../../src/context/AppContext');

describe('FilterBar component', () => {
    let setSortOrderMock;

    beforeEach(() => {
        jest.clearAllMocks();

        setSortOrderMock = jest.fn(); // Inicializa el mock aquí
        useAppContext.mockReturnValue({
            fetchNews: jest.fn(),
            currentPage: 1,
            setSortOrder: setSortOrderMock,
            sortOrder: 'date_desc',
            isDarkMode: false,
        });
        process.env.REACT_APP_NEWS_CATEGORIES = 'Technology,Health,Sports';
    });

    test('debería renderizar todas las categorías', () => {
        render(<FilterBar />);

        // Verificar que todas las categorías están en el documento
        expect(screen.getByRole('button', { name: /Technology/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Health/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Sports/i })).toBeInTheDocument();
    });



    test('debería permitir seleccionar el orden de más nuevos', () => {
        render(<FilterBar />);

        // Simular clic en "Más Nuevos"
        fireEvent.click(screen.getByRole('button', { name: /Más Nuevos/i }));

        // Verificar que setSortOrder fue llamado con 'date_desc'
        expect(setSortOrderMock).toHaveBeenCalledWith('date_desc');
    });

    test('debería permitir seleccionar el orden de más viejos', () => {
        render(<FilterBar />);

        // Simular clic en "Más Viejos"
        fireEvent.click(screen.getByRole('button', { name: /Más Viejos/i }));

        // Verificar que setSortOrder fue llamado con 'date_asc'
        expect(setSortOrderMock).toHaveBeenCalledWith('date_asc');
    });

    test('debería limpiar los filtros al hacer clic en el botón de limpiar', () => {
        render(<FilterBar />);

        // Simular clic en el botón de limpiar filtros
        fireEvent.click(screen.getByRole('button', { name: /Limpiar filtros/i }));

        // Verificar que setSortOrder fue llamado con 'date_desc'
        expect(setSortOrderMock).toHaveBeenCalledWith('date_desc');
        expect(setSortOrderMock).toHaveBeenCalledTimes(1);
    });

    test('debería aplicar la clase de modo oscuro si isDarkMode es verdadero', () => {
        useAppContext.mockReturnValue({
            fetchNews: jest.fn(),
            currentPage: 1,
            setSortOrder: jest.fn(),
            sortOrder: 'date_desc',
            isDarkMode: true,
        });

        render(<FilterBar />);

        // Verificar que se aplica la clase de modo oscuro
        expect(screen.getByRole('button', { name: /Technology/i }).closest('.filter-bar')).toHaveClass('dark');
    });

    test('debería aplicar la clase de modo claro si isDarkMode es falso', () => {
        render(<FilterBar />);

        // Verificar que se aplica la clase de modo claro
        expect(screen.getByRole('button', { name: /Technology/i }).closest('.filter-bar')).toHaveClass('light');
    });
});
