// __tests__/components/snackbarNotification.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SnackbarNotification from '../../src/components/SnackbarNotification';

describe('SnackbarNotification component', () => {
    test('debería renderizar el mensaje correctamente', () => {
        const mockOnClose = jest.fn();

        render(
            <SnackbarNotification
                open={true}
                message="Noticia guardada exitosamente"
                severity="success"
                onClose={mockOnClose}
            />
        );

        expect(screen.getByText(/Noticia guardada exitosamente/i)).toBeInTheDocument();
    });



    test('no debería renderizar cuando open es false', () => {
        const mockOnClose = jest.fn();

        const { container } = render(
            <SnackbarNotification
                open={false}
                message="Noticia guardada exitosamente"
                severity="success"
                onClose={mockOnClose}
            />
        );

        // Verifica que el Snackbar no está en el documento
        expect(container.firstChild).toBeNull();
    });
});
