import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { LinkContainer } from 'react-router-bootstrap'
import { Card } from 'react-bootstrap'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/authContext'
import { InfoModal } from './UIComponents'
import { useLoaderData } from 'react-router-dom'

export function ArticlePage() {
    // const [posts, setPosts] = React.useState([])

    const user = useContext(AuthContext).currentUser
    let [isModalShowed, setIsModalShowed] = useState(false)
    let [modalText, setModalText] = useState('')
    let [modalTitle, setModalTitle] = useState('Error')
    const posts = useLoaderData()
    console.log(posts)

    // useEffect(() => {
    //     fetchPosts()
    // }, [])

    return (
        <Container>
            <InfoModal
                title={modalTitle}
                body={modalText}
                visible={isModalShowed}
                buttonText="Close"
                onHide={() => setIsModalShowed(false)}
            />
            <Row className="align-items-center justify-content-end">
                <Col>
                    <h1>Recent articles</h1>
                </Col>

                <Col className="d-flex justify-content-end">
                    {user && (
                        <LinkContainer to={'/write'}>
                            <Button>Create article</Button>
                        </LinkContainer>
                    )}
                </Col>
            </Row>
            <Container>
                <Row
                    xs={'auto'}
                    sm={'auto'}
                    md={'auto'}
                    lg={'auto'}
                    className="g-2 align-items-center justify-content-center"
                >
                    {posts.map((post, index) => (
                        <Col key={index}>
                            <ArticlePreview
                                title={post.title}
                                img={post.img}
                                category={post.category}
                                id={post.id}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </Container>
    )
}

function ArticlePreview(props) {
    const { category, title, img, id } = props

    const croppedText = cropText(title)

    return (
        <Card
            className={'text-center'}
            style={{ width: '20rem', height: '26em' }}
        >
            <Card.Header>{category}</Card.Header>
            <Card.Img
                variant="top"
                src={img}
                style={{ minHeight: '200px', maxHeight: '200px' }}
            />

            <Card.Body>
                <Card.Title>{croppedText}</Card.Title>
            </Card.Body>
            <Card.Footer>
                <LinkContainer to={`/article/${id}`}>
                    <Button title={'Read article'}>Read article</Button>
                </LinkContainer>
            </Card.Footer>
        </Card>
    )
}

function cropText(title) {
    if (title.length > 75) {
        title = title.slice(0, 75) + '...'
    }
    return title
}

export default ArticlePage
