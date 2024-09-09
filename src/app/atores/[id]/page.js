'use client';

import Pagina from "@/app/components/Pagina";
import apiMovies from "@/app/services/apiMovies";
import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

export default function Disney({ params }) {
    const [ator, setAtor] = useState({});
    const [filme, setFilme] = useState([]);

    useEffect(() => {
        if (params.id) {
            apiMovies.get(`/person/${params.id}`)
                .then(resultado => setAtor(resultado.data))
                .catch(error => console.error("Erro ao buscar ator:", error));
        }
    }, [params.id]);

    useEffect(() => {
        if (params.id) {
            apiMovies.get(`/person/${params.id}/movie_credits`)
                .then(resultado => setFilme(resultado.data.cast))
        }
    }, [params.id]);

    return (
        <Pagina>
            <h1>{ator.name}</h1> {/* Ajuste para `name` em vez de `Name` */}
            <Row>
                <Col md={4}>
                    <Card style={{ width: '100%' }}>
                        <Card.Img 
                            variant="top" 
                            src={'https://image.tmdb.org/t/p/w500/' + ator.profile_path} 
                            alt={ator.name}
                        />
                    </Card>
                </Col>
                <Col md={8}>
                    <p><b>Data de Nascimento: </b> {ator.birthday}</p>
                    <p><b>Local de Nascimento: </b> {ator.place_of_birth}</p>
                    <p><b>Popularidade: </b> {ator.popularity}</p>
                    <p><b>Biografia: </b> {ator.biography}</p>

                    <Button href="/atores" variant="secondary">Voltar</Button> {/* Adicionada uma variante para o botão */}
                </Col>
            </Row>

            <h1 className="mt-5 mb-2">Filmes</h1>
            <Row md={6}>
                {filme.map(item => (
                    <Col className="mb-3" key={item.id}>
                        <Card style={{ height: '100%' }} className="h-100 d-flex flex-column">
                            <a href={`/movies/${item.id}`}> {/* Corrigido o link para a estrutura de URL correta */}
                                <Card.Img 
                                    variant="top" 
                                    src={'https://image.tmdb.org/t/p/w500/' + item.poster_path} 
                                    alt={item.title} 
                                />
                            </a>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Pagina>
    );
}
