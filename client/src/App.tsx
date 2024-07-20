import { Container } from "./components/Container";
import { Layout } from "./components/Layout";
import { List } from "./components/List";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./components/providers/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getTodos } from "./components/hooks/hooks";

const queryClient = new QueryClient()

export const App = () => {

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <Container>
                    <Layout>
                        <Header onItemAdd={() => console.warn("unimplemented")}>To Do app</Header>
                        <List />
                        <Footer />
                    </Layout>
                </Container>
            </ThemeProvider>
        </QueryClientProvider>
    );
};
