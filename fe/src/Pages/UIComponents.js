import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav, Navbar, Container, NavDropdown, Modal } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { AuthContext } from '../context/authContext'
import Button from 'react-bootstrap/Button'

function Navigation() {
    const { currentUser, logout } = useContext(AuthContext)

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <LinkContainer to={'/'}>
                    <Navbar.Brand>CyberNews</Navbar.Brand>
                </LinkContainer>

                <Nav className="me-auto">
                    <LinkContainer to={'/'}>
                        <Nav.Link>News</Nav.Link>
                    </LinkContainer>
                </Nav>

                <Nav className="me-auto">
                    <LinkContainer to={'/about'}>
                        <Nav.Link>About us</Nav.Link>
                    </LinkContainer>
                </Nav>

                <Nav>
                    <Nav className="me-auto">
                        <Nav.Link>{currentUser?.username}</Nav.Link>
                    </Nav>

                    {currentUser ? (
                        <NavDropdown title="My profile">
                            <NavDropdown.Item onClick={logout}>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    ) : (
                        <>
                            <LinkContainer to={'/login'}>
                                <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={'/register'}>
                                <Nav.Link>Register</Nav.Link>
                            </LinkContainer>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
    )
}

/*
&&
 <LinkContainer to={"/register"}><NavDropdown.Item>Register</NavDropdown.Item></LinkContainer>
 */

function InfoModal(props) {
    let { title, body, buttonText, visible, onHide } = props

    return (
        <Modal show={visible} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    {buttonText}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export { Navigation, InfoModal }
