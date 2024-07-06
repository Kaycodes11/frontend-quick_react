import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
// import MuiButton from "@mui/material/Button"
import { Button, GlobalStyle } from "./styles/global";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { Products } from "./pages/Products";
import { SignUp } from "./pages/SignUp";
import { Accordion } from "./components/Accordion";
import { ImageSlider } from "./components/Carousel";
import { Modal } from "./components/Modal";
import { useAppSelector } from "./hooks";
import { useGetPokemonByNameQuery } from "./services/pokemon";
import { Counter } from "./features/counter/Counter";
import { skipToken } from "@reduxjs/toolkit/query";
import "./App.css";

// move to separate component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default function App() {
  const [showModal, setShowModal] = React.useState<boolean | any>(false);
  const count = useAppSelector((state) => state.counter.value);
  // const {data: posts} = useGetPostsQuery();
  // Using a query hook automatically fetches data and returns query values
  const { data, error, isLoading } = useGetPokemonByNameQuery(
    "pikachu" ?? skipToken
  );

  // if given value is null / undefined then simply skip making the network request or making query
  // const {data, error, isLoading} = useGetPokemonByNameQuery('pikachu' ?? skipToken);

  // Individual hooks are also accessible under the generated endpoints:
  // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

  // console.group(`posts`, posts);

  const openModal = () => {
    setShowModal((prev: any) => !prev);
  };

  return (
    <Router>
      <GlobalStyle />
      <ScrollToTop />
      <NavBar />
      {/*<Counter />*/}

      {/* {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>{data.species.name}</h3>
          <img src={data.sprites.front_shiny} alt={data.species.name} />
        </>
      ) : null} */}

      {/*<MuiButton color={"primary"} size={"medium"}>MButton</MuiButton>*/}
      {/*<Accordion/>*/}
      {/*<ImageSlider />*/}
      {/*<Button onClick={openModal}>I'm a modal</Button>*/}
      {/*<Modal showModal={showModal} setShowModal={setShowModal} />*/}
      <Routes>
        <Route index element={<Home />} />
        <Route path={"services"} element={<Services />} />
        <Route path={"products"} element={<Products />} />
        <Route path={"sign-up"} element={<SignUp />} />
      </Routes>
      <Footer />
    </Router>
  );
}
