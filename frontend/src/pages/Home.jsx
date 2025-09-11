import React from 'react';
import CarouselComponent from '../components/CarouselComponent';
import SecondBlock from "../components/SecondBlock";
import TileOfCollections from "../components/TileOfCollections";
import Accordion from '../components/Accordion';

function Home(){
    return(
        <>
        <CarouselComponent></CarouselComponent>
        <SecondBlock></SecondBlock>
        <TileOfCollections></TileOfCollections>
        <Accordion></Accordion>
        </>
    )
}

export default Home;