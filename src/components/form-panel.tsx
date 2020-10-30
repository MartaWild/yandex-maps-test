import * as React from 'react';
import Container from '@material-ui/core/Container';
import { Header } from './header';
import { OrderForm } from './order-form';

export function FormPanel() {
    return (
        <div>
            <Header />
            <Container maxWidth="md">
                <OrderForm />
            </Container>
        </div>
    );
}
