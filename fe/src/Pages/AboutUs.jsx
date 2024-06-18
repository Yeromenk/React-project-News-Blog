import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Card } from 'react-bootstrap'
import bohdan from '../Images/bohdan.jpeg'
import maksym from '../Images/maksym.jpg'

const AboutUs = () => {
    return (
        <div>
            <Container className="my-5">
                <Row>
                    <Col md={6}>
                        <h1 className="mb-4">About CyberNews</h1>
                        <p>
                            Welcome to CyberNews, your reliable source for the
                            latest news and updates on the cyber world. Our
                            mission is to provide you with accurate and
                            up-to-date information on cybersecurity, technology,
                            and digital trends.
                        </p>
                        <p>
                            At CyberNews, we understand the importance of
                            staying informed in today's rapidly evolving digital
                            landscape. Whether you're a cybersecurity
                            professional, a technology enthusiast, or simply
                            curious about the latest digital developments, we've
                            got you covered.
                        </p>
                        <p>
                            CyberNews is not just a news platform; it's a
                            vibrant community where individuals from diverse
                            backgrounds come together to explore, learn, and
                            discuss the ever-changing world of technology. From
                            breaking cybersecurity alerts to in-depth analyses
                            of emerging technologies, our platform offers a
                            wealth of knowledge and insights for everyone.
                        </p>
                        <p>In CyberNews, you can:</p>
                        <ul>
                            <li>
                                Stay Informed: Access the latest news articles,
                                analysis, and opinion pieces covering a wide
                                range of topics, including cybersecurity
                                threats, data privacy issues, technological
                                innovations, and more.
                            </li>
                            <li>
                                Engage with Content: Join the conversation by
                                commenting on articles, sharing your
                                perspectives, and interacting with other members
                                of the CyberNews community.
                            </li>
                            <li>
                                Personalize Your Experience: Create an account
                                to unlock personalized features tailored to your
                                interests.
                            </li>
                            <li>
                                Contribute Your Voice: Are you passionate about
                                cybersecurity, technology, or digital rights?
                                Become a contributor and share your expertise
                                with our global audience. Whether you're a
                                seasoned professional or an aspiring writer, we
                                welcome diverse voices and perspectives.
                            </li>
                            <li>
                                Connect with Like-Minded Individuals: Connect
                                with fellow tech enthusiasts, cybersecurity
                                professionals, and industry experts. Expand your
                                network, exchange ideas, and collaborate on
                                projects that matter to you.
                            </li>
                        </ul>
                    </Col>
                    <Col md={6}>
                        <div className="d-flex flex-column justify-content-between h-100">
                            <h1 className="mb-4">Our Team</h1>
                            <Card style={{ marginBottom: '10px' }}>
                                <Card.Body className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <Card.Title>
                                            Maksym Yeromenko
                                        </Card.Title>
                                        <Card.Text>
                                            Vysoká škola báňská - Technická
                                            univerzita Ostrava Co-founder &
                                            Developer
                                        </Card.Text>
                                    </div>
                                    <Card.Img
                                        variant="top"
                                        src={maksym}
                                        style={{ width: '30%' }}
                                    />
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Body className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <Card.Title>
                                            Bohdan Rieznikov
                                        </Card.Title>
                                        <Card.Text>
                                            Vysoká škola báňská - Technická
                                            univerzita Ostrava Co-founder &
                                            Developer
                                        </Card.Text>
                                    </div>
                                    <Card.Img
                                        variant="top"
                                        src={bohdan}
                                        style={{ width: '30%' }}
                                    />
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default AboutUs
