import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmationDialog from '../../src/components/ConfirmationDialog'; // Asegúrate de que la ruta sea correcta

describe('ConfirmationDialog', () => {
    const mockOnConfirm = jest.fn(); // Mock para la función de confirmación
    const mockOnCancel = jest.fn(); // Mock para la función de cancelación

    const setup = (props = {}) => {
        const defaultProps = {
            open: true,
            title: 'Título de prueba',
            description: 'Descripción de prueba',
            confirmText: 'Confirmar',
            cancelText: 'Cancelar',
            onConfirm: mockOnConfirm,
            onCancel: mockOnCancel,
        };

        return render(<ConfirmationDialog {...defaultProps} {...props} />);
    };

    beforeEach(() => {
        jest.clearAllMocks(); // Limpiar mocks antes de cada prueba
    });

    test('debería renderizar el diálogo correctamente', () => {
        setup();

        // Verifica que se muestren los textos esperados
        expect(screen.getByText('Título de prueba')).toBeInTheDocument();
        expect(screen.getByText('Descripción de prueba')).toBeInTheDocument();
        expect(screen.getByText('Confirmar')).toBeInTheDocument();
        expect(screen.getByText('Cancelar')).toBeInTheDocument();
    });

    test('debería llamar a onConfirm al hacer clic en el botón de confirmar', () => {
        setup();

        fireEvent.click(screen.getByText('Confirmar'));
        expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    });

    test('debería llamar a onCancel al hacer clic en el botón de cancelar', () => {
        setup();

        fireEvent.click(screen.getByText('Cancelar'));
        expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });

    test('no debería renderizar el diálogo cuando open es false', () => {
        setup({ open: false });

        // Verifica que el diálogo no se renderice
        expect(screen.queryByText('Título de prueba')).not.toBeInTheDocument();
    });
});
