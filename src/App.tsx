import React, { useCallback } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import Header from './components/header';
import usePersistedState from './hooks/use-persisted-state';
import Routes from './routes';
import GlobalStyle from './styles/global';
import dark from './styles/themes/dark';
import light from './styles/themes/light';

const App: React.FC = () => {
    const [theme, setTheme] = usePersistedState<DefaultTheme>(
        '@GitHubExplorer:theme',
        light,
    );

    const toggleTheme = useCallback(() => {
        setTheme(theme.title === 'light' ? dark : light);
    }, [theme, setTheme]);

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Header toggleTheme={toggleTheme} />
                <Routes />
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
