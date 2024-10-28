import React from 'react';
import { render, screen, act } from '@testing-library/react';
import NewsList from '../../src/components/NewsList';
import { useAppContext } from '../../src/context/AppContext';

// Mock del contexto
jest.mock('../../src/context/AppContext');

describe('NewsList component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('debería mostrar un loader mientras se cargan las noticias', async () => {
        useAppContext.mockReturnValue({
            news: [],
            fetchNews: jest.fn().mockResolvedValueOnce(undefined),
            loading: true, // Asegúrate de que esto sea true
            error: null,
            currentPage: 1,
        });

        await act(async () => {
            render(<NewsList />);
        });

        // Verificar que el loader está presente
        expect(screen.getByTestId('loader')).toBeInTheDocument(); // Este debería funcionar si el data-testid está presente
    });

    test('debería mostrar un mensaje de error si ocurre un error al obtener noticias', async () => {
        useAppContext.mockReturnValue({
            news: [],
            fetchNews: jest.fn().mockResolvedValueOnce(undefined),
            loading: false,
            error: 'Error al cargar noticias',
            currentPage: 1,
        });

        await act(async () => {
            render(<NewsList />);
        });

        expect(screen.getByText('Error al cargar noticias')).toBeInTheDocument();
    });

    test('debería mostrar un mensaje si no hay noticias disponibles', async () => {
        useAppContext.mockReturnValue({
            news: [],
            fetchNews: jest.fn().mockResolvedValueOnce(undefined),
            loading: false,
            error: null,
            currentPage: 1,
        });

        await act(async () => {
            render(<NewsList />);
        });

        expect(screen.getByText(/no hay noticias disponibles/i)).toBeInTheDocument();
    });

    test('debería renderizar una lista de noticias cuando hay noticias disponibles', async () => {
        const mockNews = [
            {
                _id: "671d7e1d108c02e89aac9ad4",
                title: "Noticia 1",
                description: "Descripción de noticia 1",
                author: "Autor 1",
                category: "Entertainment",
                imageUrl: "",
                date: "2024-10-26T23:41:17.561Z",
            },
            {
                _id: "671d73e4108c02e89aac9a18",
                title: "Noticia 2",
                description: "Descripción de noticia 2",
                author: "Autor 2",
                category: "Technology",
                imageUrl: "",
                date: "2024-10-26T22:57:40.253Z",
            },
        ];

        useAppContext.mockReturnValue({
            news: mockNews,
            fetchNews: jest.fn().mockResolvedValueOnce(undefined),
            loading: false,
            error: null,
            currentPage: 1,
        });

        await act(async () => {
            render(<NewsList />);
        });

        expect(screen.getByText('Noticia 1')).toBeInTheDocument();
        expect(screen.getByText('Noticia 2')).toBeInTheDocument();
    });

    test('debería llamar a fetchNews al montarse el componente', async () => {
        const fetchNewsMock = jest.fn().mockResolvedValueOnce(undefined);
        useAppContext.mockReturnValue({
            news: [],
            fetchNews: fetchNewsMock,
            loading: false,
            error: null,
            currentPage: 1,
        });

        await act(async () => {
            render(<NewsList />);
        });

        expect(fetchNewsMock).toHaveBeenCalledTimes(1);
    });

    test('debería renderizar propiedades de la noticia correctamente', async () => {
        const mockNews = [
            {
                _id: "671d7e1d108c02e89aac9ad4",
                title: "Noticia 1",
                description: "Descripción de noticia 1",
                author: "Autor 1",
                category: "Entertainment",
                imageUrl: "",
                date: "2024-10-26T23:41:17.561Z",
            },
        ];

        useAppContext.mockReturnValue({
            news: mockNews,
            fetchNews: jest.fn().mockResolvedValueOnce(undefined),
            loading: false,
            error: null,
            currentPage: 1,
        });

        await act(async () => {
            render(<NewsList />);
        });

        expect(screen.getByText('Descripción de noticia 1')).toBeInTheDocument();
        expect(screen.getByText('Autor 1')).toBeInTheDocument();
    });

    test('debería mostrar el loader durante la carga', async () => {
        jest.useFakeTimers(); // Usar temporizadores falsos para simular el tiempo

        const fetchNewsMock = jest.fn().mockImplementation(() => {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(undefined);
                }, 1000); // Simulando un retraso de 1 segundo
            });
        });

        useAppContext.mockReturnValue({
            news: [],
            fetchNews: fetchNewsMock,
            loading: true,
            error: null,
            currentPage: 1,
        });

        await act(async () => {
            render(<NewsList />);
        });

        expect(screen.getByTestId('loader')).toBeInTheDocument(); // El loader debe estar visible

        act(() => {
            jest.advanceTimersByTime(1000); // Avanzar el tiempo
        });

        // Simular el estado de loading después de que fetchNews se resuelve
        useAppContext.mockReturnValue({
            news: [],
            fetchNews: fetchNewsMock,
            loading: false,
            error: null,
            currentPage: 1,
        });

        // Ahora renderizamos de nuevo
        await act(async () => {
            render(<NewsList />);
        });

        expect(screen.queryByTestId('loader')).not.toBeInTheDocument(); // El loader ya no debe estar visible
        jest.useRealTimers(); // Restablecer los temporizadores a los reales
    });
});
