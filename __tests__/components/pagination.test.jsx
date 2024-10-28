// __tests__/components/Pagination.test.jsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../../src/components/Pagination';
import { useAppContext } from '../../src/context/AppContext';

jest.mock('../../src/context/AppContext');

describe('Pagination component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('no debería renderizarse si hay una sola página', () => {
        useAppContext.mockReturnValue({
            totalPages: 1,
            currentPage: 1,
            fetchNews: jest.fn(),
            setCurrentPage: jest.fn(), // Agregar mock para setCurrentPage
            isDarkMode: false,
        });

        render(<Pagination />);

        // Verificar que no se renderiza nada
        expect(screen.queryByText(/página/i)).toBeNull();
    });

    test('debería renderizar correctamente con varias páginas', () => {
        useAppContext.mockReturnValue({
            totalPages: 5,
            currentPage: 1,
            fetchNews: jest.fn(),
            setCurrentPage: jest.fn(), // Agregar mock para setCurrentPage
            isDarkMode: false,
        });

        render(<Pagination />);

        // Verificar que el texto de la página se renderiza
        expect(screen.getByText(/página 1 de 5/i)).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /anterior/i })).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: /siguiente/i })).toBeInTheDocument();
    });

    test('debería renderizar correctamente en la página media', () => {
        useAppContext.mockReturnValue({
            totalPages: 5,
            currentPage: 3,
            fetchNews: jest.fn(),
            setCurrentPage: jest.fn(), // Agregar mock para setCurrentPage
            isDarkMode: false,
        });

        render(<Pagination />);

        expect(screen.getByText(/página 3 de 5/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /anterior/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /siguiente/i })).toBeInTheDocument();
    });

    test('debería renderizar correctamente en la última página', () => {
        useAppContext.mockReturnValue({
            totalPages: 5,
            currentPage: 5,
            fetchNews: jest.fn(),
            setCurrentPage: jest.fn(), // Agregar mock para setCurrentPage
            isDarkMode: false,
        });

        render(<Pagination />);

        expect(screen.getByText(/página 5 de 5/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /anterior/i })).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /siguiente/i })).not.toBeInTheDocument();
    });

    test('debería llamar a fetchNews al hacer clic en el botón anterior', () => {
        const fetchNewsMock = jest.fn();
        const setCurrentPageMock = jest.fn(); // Mock para setCurrentPage

        useAppContext.mockReturnValue({
            totalPages: 5,
            currentPage: 2,
            fetchNews: fetchNewsMock,
            setCurrentPage: setCurrentPageMock, // Agregar mock para setCurrentPage
            isDarkMode: false,
        });

        render(<Pagination />);

        fireEvent.click(screen.getByRole('button', { name: /anterior/i }));

        // Verificar que setCurrentPage fue llamado con la página correcta
        expect(setCurrentPageMock).toHaveBeenCalledWith(1);
        // Verificar que fetchNews fue llamado con el número de página correcto
        expect(fetchNewsMock).toHaveBeenCalledWith(1);
    });

    test('debería llamar a fetchNews al hacer clic en el botón siguiente', () => {
        const fetchNewsMock = jest.fn();
        const setCurrentPageMock = jest.fn(); // Mock para setCurrentPage

        useAppContext.mockReturnValue({
            totalPages: 5,
            currentPage: 2,
            fetchNews: fetchNewsMock,
            setCurrentPage: setCurrentPageMock, // Agregar mock para setCurrentPage
            isDarkMode: false,
        });

        render(<Pagination />);

        fireEvent.click(screen.getByRole('button', { name: /siguiente/i }));

        // Verificar que setCurrentPage fue llamado con la página correcta
        expect(setCurrentPageMock).toHaveBeenCalledWith(3);
        // Verificar que fetchNews fue llamado con el número de página correcto
        expect(fetchNewsMock).toHaveBeenCalledWith(3);
    });

    test('debería aplicar la clase de modo oscuro si isDarkMode es verdadero', () => {
        useAppContext.mockReturnValue({
            totalPages: 2,
            currentPage: 1,
            fetchNews: jest.fn(),
            setCurrentPage: jest.fn(), // Agregar mock para setCurrentPage
            isDarkMode: true,
        });

        render(<Pagination />);

        // Verificar que se aplica la clase de modo oscuro
        expect(screen.getByText(/página 1 de 2/i).parentElement).toHaveClass('dark-mode');
    });

    test('debería aplicar la clase de modo claro si isDarkMode es falso', () => {
        useAppContext.mockReturnValue({
            totalPages: 2,
            currentPage: 1,
            fetchNews: jest.fn(),
            setCurrentPage: jest.fn(), // Agregar mock para setCurrentPage
            isDarkMode: false,
        });

        render(<Pagination />);

        // Verificar que se aplica la clase de modo claro
        expect(screen.getByText(/página 1 de 2/i).parentElement).toHaveClass('light-mode');
    });
});
