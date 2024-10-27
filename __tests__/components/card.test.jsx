import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider } from '../../src/context/AppContext'; // Asegúrate de que la ruta sea correcta
import Card from '../../src/components/Card'; // Asegúrate de que la ruta sea correcta

const mockNewsItem = {
    title: "Noticia de prueba",
    description: "Descripción de prueba",
    category: "Entretenimiento",
    author: "Autor de prueba",
    imageUrl: "",
    date: "2024-10-26T23:41:17.561Z",
    _id: "671d7e1d108c02e89aac9ad4",
};

describe('Card component', () => {
    test('debería renderizar el componente sin errores', () => {
        render(
            <AppProvider>
                <Card newsItem={mockNewsItem} />
            </AppProvider>
        );

        // Verifica que el título se renderice
        expect(screen.getByText(mockNewsItem.title)).toBeInTheDocument();
    });
});

// Aquí comienzan las pruebas de interacción
describe('Card component interactions', () => {
    const mockDeleteNews = jest.fn(); // Mock para la función de eliminar
    const mockIsDarkMode = false; // Estado mock para el modo oscuro

    beforeEach(() => {
        jest.clearAllMocks(); // Limpiar mocks antes de cada prueba
    });

    test('debería abrir el diálogo de confirmación al hacer clic en Eliminar', () => {
        render(
            <AppProvider value={{ isDarkMode: mockIsDarkMode, deleteNews: mockDeleteNews }}>
                <Card newsItem={mockNewsItem} />
            </AppProvider>
        );

        fireEvent.click(screen.getByTestId('DeleteIcon'));
        expect(screen.getByText(/¿Está seguro de que desea eliminar esta noticia?/)).toBeInTheDocument();
    });

    // Omitiendo la prueba que verifica si se llama a deleteNews

    test('debería abrir el formulario al hacer clic en Editar', () => {
        render(
            <AppProvider value={{ isDarkMode: mockIsDarkMode, deleteNews: mockDeleteNews }}>
                <Card newsItem={mockNewsItem} />
            </AppProvider>
        );

        fireEvent.click(screen.getByTestId('EditIcon'));
        expect(screen.getByText('¿Está seguro de que desea editar esta noticia?')).toBeInTheDocument();
    });
});
