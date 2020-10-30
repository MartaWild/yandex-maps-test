import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { FormPanel } from './components/form-panel';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import './style.css';

const container = document.getElementById('container');

function App() {
    return (
        <Provider store={store}>
            <CssBaseline />
            <FormPanel />
        </Provider>
    );
}

ReactDOM.render(<App />, container);
