// __tests__/components/mainContent.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MainContent from '../../src/components/MainContent';

// Mock de los componentes hijos
jest.mock('../../src/components/FilterBar', () => () => <div>FilterBar Component</div>);
jest.mock('../../src/components/Loader', () => () => <div>Loader Component</div>);
jest.mock('../../src/components/NewsList', () => (props) => (
    <div onClick={() => props.openModal()}>NewsList Component</div>
));
jest.mock('../../src/components/Pagination', () => () => <div>Pagination Component</div>);
jest.mock('../../src/components/NewsForm', () => (props) => (
    <div>
        NewsForm Component
        <button onClick={props.onClose}>Close Modal</button>
    </div>
));

// Mock del contexto
jest.mock('../../src/context/AppContext', () => {
    return {
        useAppContext: () => ({
            isDarkMode: true,
            loading: false,
        }),
    };
});

describe('MainContent component', () => {
    test('debería renderizar los componentes principales', () => {
        render(<MainContent />);

        // Verifica la existencia de los componentes internos
        expect(screen.getByText('FilterBar Component')).toBeInTheDocument();
        expect(screen.getByText('NewsList Component')).toBeInTheDocument();
        expect(screen.getByText('Pagination Component')).toBeInTheDocument();

        // Verifica el botón de añadir noticias
        const addButton = screen.getByRole('button', { name: '' });
        expect(addButton).toBeInTheDocument();
    });

    test('debería abrir y cerrar el modal al hacer clic en el botón', () => {
        render(<MainContent />);

        // Abre el modal al hacer clic en el botón de añadir noticias
        const addButton = screen.getByRole('button', { name: '' });
        fireEvent.click(addButton);
        expect(screen.getByText('NewsForm Component')).toBeInTheDocument();

        // Cierra el modal al hacer clic en el botón de cierre dentro del modal
        const closeButton = screen.getByText('Close Modal');
        fireEvent.click(closeButton);
        expect(screen.queryByText('NewsForm Component')).not.toBeInTheDocument();
    });

    test('debería aplicar la clase correcta de modo oscuro', () => {
        render(<MainContent />);

        // Verifica que el contenedor principal tenga la clase `dark-mode`
        const mainContent = screen.getByRole('main');
        expect(mainContent).toHaveClass('dark-mode');
    });


});
