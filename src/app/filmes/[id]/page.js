'use client'

import Pagina from '@/app/components/Pagina';
import apiMovies from '@/app/services/apiMovies';
import { useEffect, useState } from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';

export default function Page({ params }) {

    const [filme, setFilme] = useState({});
    const [ator, setAtor] = useState([]);

    useEffect(() => {
        apiMovies.get(`movie/${params.id}`).then(resultado => {
            setFilme(resultado.data);

        })
    }, [])

    useEffect(() => {
        apiMovies.get(`movie/${params.id}/credits`).then(resultado => {
            setAtor(resultado.data.cast);

        })
    }, [])


    return (
        <Pagina titulo="Filmes Detalhes">
             
             <h1 className='mt-5'><p>{filme.title}</p></h1>
            <Row md={3}>
                <Col  key={filme.id}>
                <img style={{ width: '100%'}} src={'https://image.tmdb.org/t/p/w500/' + filme.poster_path}/>
                </Col>
                <Col md={8}>
                <p><b>Titulo Original: </b>{filme.original_title}</p>
                <p><b>Popularidade: </b>{filme.popularity}</p>
                <p><b>Data de Lançamento: </b>{filme.release_date}</p>
                <p><b>Orçamento: </b>{filme.revenue}</p>
                <p><b>Gêneros: </b> {filme.genres && filme.genres.map(genero => genero.name).join(', ')}</p>
                <p><b>Sinopse: </b>{filme.overview}</p>

                <Button href='/filmes' variant="danger">Voltar</Button>
                
                </Col>

            </Row>
            <h1 className='mt-5'>Atores</h1>
            <Row md={6}>
                
                {ator.map(item=>(
                 <Col className= ' mb-3' >
                 
                 <img style={{ width: '100%'}} src={'https://image.tmdb.org/t/p/w500/' + item.profile_path}/>
                 
                 </Col>
                
                ))}

            </Row>
        </Pagina>
    )
}


