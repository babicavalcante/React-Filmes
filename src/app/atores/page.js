'use client'

import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Pagina from "../components/Pagina";
import apiMovies from "../services/apiMovies";


export default function Page(){

    const [atores, setAtores] = useState([])

    useEffect(() => {
        apiMovies.get('person/popular').then(resultado => {
            setAtores(resultado.data.results)
        })
    }, [])

    return(
        <Pagina titulo="Atores">
            <Row md={4}>
            {atores.map(item => (
                <Col className="mb-3" key={item.id}>
                    <Card style={{ height: '100%' }} className="h-100 d-flex flex-column">
                        <Card.Img variant="top" src={'https://image.tmdb.org/t/p/w500/' + item.profile_path} />
                        <Card.Body className="d-flex flex-column">
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Text>{item.original_name}</Card.Text>
                            <Card.Text>Popularidade: {item.popularity}</Card.Text>
                            <div className="mt-auto">
                                <Button href= {`atores/${item.id}`} variant="danger">Ver Detalhes</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
            </Row>
            
        </Pagina>
        
    )
}