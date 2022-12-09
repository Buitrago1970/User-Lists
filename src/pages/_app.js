import NavBar from '../components/NavBar';
import '../styles/globals.css'

function App({ Component, pageProps }) {
    return (<>
        <NavBar />
        <Component {...pageProps} />;
        <footer>este es el footer</footer>
    </>

    )
}

export default App;