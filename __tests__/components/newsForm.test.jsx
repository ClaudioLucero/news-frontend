// __tests__/components/NewsForm.test.jsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NewsForm from '../../src/components/NewsForm';
import { useAppContext } from '../../src/context/AppContext';

jest.mock('../../src/context/AppContext');

describe('NewsForm component', () => {
    const onCloseMock = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        // Mock del contexto
        useAppContext.mockReturnValue({
            isDarkMode: false,
            addNews: jest.fn().mockResolvedValue(true),
            editNews: jest.fn().mockResolvedValue(true),
            loading: false,
        });
        process.env.REACT_APP_NEWS_CATEGORIES = 'Technology,Health,Sports'; // Simular categorías
    });

    test('debería renderizar el formulario correctamente', () => {
        render(<NewsForm initialData={{}} onClose={onCloseMock} />);

        // Verificar que todos los campos están en el documento
        expect(screen.getByLabelText(/título/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/descripción/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/categoría/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/autor/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/url de imagen/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /agregar noticia/i })).toBeInTheDocument();
    });

    test('debería permitir la entrada de datos en los campos del formulario', () => {
        render(<NewsForm initialData={{}} onClose={onCloseMock} />);

        // Simular la entrada de datos en los campos
        fireEvent.change(screen.getByLabelText(/título/i), { target: { value: 'Nueva Noticia' } });
        fireEvent.change(screen.getByLabelText(/descripción/i), { target: { value: 'Descripción de la nueva noticia' } });
        fireEvent.change(screen.getByLabelText(/categoría/i), { target: { value: 'Technology' } });
        fireEvent.change(screen.getByLabelText(/autor/i), { target: { value: 'Autor Prueba' } });
        fireEvent.change(screen.getByLabelText(/url de imagen/i), { target: { value: 'https://ejemplo.com/imagen.jpg' } });

        // Verificar que los valores se actualizan correctamente
        expect(screen.getByLabelText(/título/i).value).toBe('Nueva Noticia');
        expect(screen.getByLabelText(/descripción/i).value).toBe('Descripción de la nueva noticia');
        expect(screen.getByLabelText(/categoría/i).value).toBe('Technology');
        expect(screen.getByLabelText(/autor/i).value).toBe('Autor Prueba');
        expect(screen.getByLabelText(/url de imagen/i).value).toBe('https://ejemplo.com/imagen.jpg');
    });

    test('no debería enviar el formulario si los campos requeridos están vacíos', async () => {
        render(<NewsForm initialData={{}} onClose={onCloseMock} />);

        // Simular un clic en el botón de agregar noticia sin completar el formulario
        fireEvent.click(screen.getByRole('button', { name: /agregar noticia/i }));

        // Verificar que onClose no fue llamado
        expect(onCloseMock).not.toHaveBeenCalled();
    });

    test('debería mostrar un mensaje de error si la URL de la imagen no es válida', async () => {
        render(<NewsForm initialData={{}} onClose={onCloseMock} />);

        // Completar otros campos válidos
        fireEvent.change(screen.getByLabelText(/título/i), { target: { value: 'Nueva Noticia' } });
        fireEvent.change(screen.getByLabelText(/descripción/i), { target: { value: 'Descripción de la nueva noticia' } });
        fireEvent.change(screen.getByLabelText(/categoría/i), { target: { value: 'Technology' } });
        fireEvent.change(screen.getByLabelText(/autor/i), { target: { value: 'Autor Prueba' } });

        // Ingresar una URL inválida
        fireEvent.change(screen.getByLabelText(/url de imagen/i), { target: { value: 'imagen-invalida' } });

        // Simular un clic en el botón de agregar noticia
        fireEvent.click(screen.getByRole('button', { name: /agregar noticia/i }));

        // Verificar que se muestre un mensaje de error
        expect(screen.getByText(/url de imagen no es válida/i)).toBeInTheDocument();
    });

    test('debería mostrar un mensaje de error si el autor no es válido', async () => {
        render(<NewsForm initialData={{}} onClose={onCloseMock} />);

        // Completar otros campos válidos
        fireEvent.change(screen.getByLabelText(/título/i), { target: { value: 'Nueva Noticia' } });
        fireEvent.change(screen.getByLabelText(/descripción/i), { target: { value: 'Descripción de la nueva noticia' } });
        fireEvent.change(screen.getByLabelText(/categoría/i), { target: { value: 'Technology' } });

        // Ingresar un autor inválido (sin apellido)
        fireEvent.change(screen.getByLabelText(/autor/i), { target: { value: 'Autor' } });

        // Simular un clic en el botón de agregar noticia
        fireEvent.click(screen.getByRole('button', { name: /agregar noticia/i }));

        // Verificar que se muestre un mensaje de error
        expect(screen.getByText(/el autor debe incluir nombre y apellido/i)).toBeInTheDocument();
    });


    test('debería cargar los datos iniciales para editar una noticia', () => {
        const initialData = {
            _id: '1',
            title: 'Noticia Existente',
            description: 'Descripción de la noticia existente',
            category: 'Health',
            author: 'Autor Existente',
            imageUrl: 'https://ejemplo.com/imagen.jpg',
        };

        render(<NewsForm initialData={initialData} onClose={onCloseMock} />);

        expect(screen.getByLabelText(/título/i).value).toBe('Noticia Existente');
        expect(screen.getByLabelText(/descripción/i).value).toBe('Descripción de la noticia existente');
        expect(screen.getByLabelText(/categoría/i).value).toBe('Health');
        expect(screen.getByLabelText(/autor/i).value).toBe('Autor Existente');
        expect(screen.getByLabelText(/url de imagen/i).value).toBe('https://ejemplo.com/imagen.jpg');
    });
});
