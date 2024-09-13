'use client'

import Pagina from "@/app/components/Pagina";
import { useEffect, useState } from "react";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Col, Row } from "react-bootstrap";
import apiMovies from "@/app/services/apiMovies";

export default function Page() {
  const [filmes, setFilmes] = useState([]);
  const [series, setSeries] = useState([]);
  const [atores, setAtores] = useState([]);

  useEffect(() => {
    apiMovies.get('movie/popular').then(resultado => {
      let imagens = resultado.data.results.map(item => ({
        original: 'https://image.tmdb.org/t/p/w500' + item.backdrop_path,
        thumbnail: 'https://image.tmdb.org/t/p/w200' + item.backdrop_path,
        originalTitle: item.title,
      }));
      setFilmes(imagens);
    });

    apiMovies.get('tv/popular').then(resultado => {
      let imagens = resultado.data.results.map(item => ({
        original: 'https://image.tmdb.org/t/p/w500' + item.backdrop_path,
        thumbnail: 'https://image.tmdb.org/t/p/w200' + item.backdrop_path,
        originalTitle: item.name,
      }));
      setSeries(imagens);
    });

    apiMovies.get('person/popular').then(resultado => {
      let imagens = resultado.data.results.map(item => ({
        original: 'https://image.tmdb.org/t/p/w500' + item.profile_path,
        thumbnail: 'https://image.tmdb.org/t/p/w200' + item.profile_path,
        originalTitle: item.name,
      }));
      setAtores(imagens);
    });
  }, []);

  return (
    <Pagina titulo="Disney">
      <Row md={2} className="mt-3">
        {filmes.length > 0 && (
          <Col>
            <h1>Filmes Populares</h1>
            <ReactImageGallery items={filmes} />
          </Col>
        )}
        {series.length > 0 && (
          <Col>
            <h1>Séries Populares</h1>
            <ReactImageGallery items={series} />
          </Col>
        )}
        {atores.length > 0 && (
          <Col>
            <h1>Atores Populares</h1>
            <ReactImageGallery items={atores} />
          </Col>
        )}
      </Row>

      <Row className="mt-3">
        {filmes.map((item, index) => (
          <Col key={index}>
            <p>{item.originalTitle}</p>
          </Col>
        ))}
      </Row>
    </Pagina>
  );
}
