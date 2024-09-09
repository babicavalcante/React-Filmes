'use client'

import { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import Pagina from '../components/Pagina';
import apiMovies from '../services/apiMovies';

export default function Filmes() {

    const [series, setSeries] = useState([]);

    useEffect(() => {
        apiMovies.get('tv/popular').then(resultado => {
            setSeries(resultado.data.results);

        })
    }, [])

    return (
        <Pagina titulo="Series">
            <Row md={3}>
                {series.map((item) => (
                    <Col key={item.id} className="p-4">
                        <Card style={{ height: '100%' }}> {/* Define a mesma altura para todos os cards */}
                            <div style={{ height: '300px', overflow: 'hidden' }}> {/* Define uma altura fixa para a imagem */}
                                <Card.Img
                                    variant="top"
                                    src={'https://image.tmdb.org/t/p/w500/' + item.backdrop_path}
                                    className="img-fluid"
                                    style={{ height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>
                                    <p>{item.name}</p>
                                    <p>Popularidade: {item.popularity}</p>
                                </Card.Text>
                                <Button href={`/series/${item.id}`} variant="danger">Ver Detalhes</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Pagina>
    )
}

