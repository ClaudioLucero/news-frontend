// __tests__/components/loader.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from '../../src/components/Loader';

describe('Loader component', () => {
    test('debería renderizar correctamente el loader', () => {
        render(<Loader />);

        // Verificar que el overlay de loader esté en el documento
        const loaderOverlay = screen.getByTestId('loader');
        expect(loaderOverlay).toBeInTheDocument();
    });

    test('debería contener el icono HourglassBottom', () => {
        render(<Loader />);

        // Verificar que el icono HourglassBottom esté presente
        const loaderIcon = screen.getByTestId('loader').querySelector('svg'); // Busca el elemento svg que representa el icono
        expect(loaderIcon).toBeInTheDocument();
    });
});
