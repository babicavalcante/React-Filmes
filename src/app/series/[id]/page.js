'use client'

import Pagina from '@/app/components/Pagina';
import apiMovies from '@/app/services/apiMovies';
import { useEffect, useState } from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';

export default function Page({ params }) {

    const [series, SetSeries] = useState({});
    const [ator, setAtor] = useState([]);
    const [temp, setTemp] = useState([]);

    useEffect(() => {
        apiMovies.get(`tv/${params.id}`).then(resultado => {
            SetSeries(resultado.data);

        })
    }, [])

    useEffect(() => {
        apiMovies.get(`tv/${params.id}/credits`).then(resultado => {
            setAtor(resultado.data.cast);

        })
    }, [])

    useEffect(() => {
        apiMovies.get(`tv/${params.id}`).then(resultado => {
            setTemp(resultado.data.seasons);

        })
    }, [])


    return (
        <Pagina titulo="Series Detalhes">

            <h1 className='mt-5'><p>{series.title}</p></h1>
            <Row md={3}>
                <Col key={series.id}>
                    <img style={{ width: '100%' }} src={'https://image.tmdb.org/t/p/w500/' + series.poster_path} />
                </Col>
                <Col md={8}>
                    <p><b>Titulo Original: </b>{series.original_title}</p>
                    <p><b>Popularidade: </b>{series.popularity}</p>
                    <p><b>Data de Lançamento: </b>{series.release_date}</p>
                    <p><b>Orçamento: </b>{series.revenue}</p>
                    <p><b>Gêneros: </b> {series.genres && series.genres.map(genero => genero.name).join(', ')}</p>
                    <p><b>Sinopse: </b>{series.overview}</p>

                    <Button href='/series' variant="danger">Voltar</Button>

                </Col>
            </Row>

            <h1 className='mt-5'>Temporadas</h1>
            <Row md={6}>

                {temp.map(item => (
                    <Col className=' mb-3' >

                        <img style={{ width: '100%' }} src={'https://image.tmdb.org/t/p/w500/' + item.poster_path} />

                    </Col>

                ))}

            </Row>
            <h1 className='mt-5'>Atores</h1>
            <Row md={6}>

                {ator.map(item => (
                    <Col className=' mb-3' >

                        <img style={{ width: '100%' }} src={'https://image.tmdb.org/t/p/w500/' + item.profile_path} />

                    </Col>

                ))}
            </Row>
        </Pagina>
    )
}
