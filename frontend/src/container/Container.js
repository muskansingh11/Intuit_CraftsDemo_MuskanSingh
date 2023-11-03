import { AppContextProvider } from "../context/AppContext";
import { Dashboard, Header } from "../components";

const Container = () => {
    return (
        <AppContextProvider>
            <Header />
            <Dashboard />
        </AppContextProvider>
    );
}

export default Container;