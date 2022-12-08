import '../styles/global.css';
import NavBar from '../components/NavBar';

function App({ Component, pageProps }) {
    return (<>
        <NavBar />
        <Component {...pageProps} />;
        <footer>este es el footer</footer>
    </>

    )
}

export default App;