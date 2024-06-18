import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { AuthContext } from '../context/authContext'

const Login = () => {
    const [inputs, setInputs] = useState({
        username: '',
        password: '',
    })

    const navigate = useNavigate()

    const { login } = useContext(AuthContext)

    const [errors, setErrors] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await login(inputs)
            navigate('/')
        } catch (err) {
            if (err.response) {
                setErrors(err.response.data)
            } else {
                console.log('An error occurred: ', err)
            }
            setIsModalOpen(true)
        }
    }

    return (
        <section className="container forms">
            <div className="form login">
                <div className="form-content">
                    <header>Login</header>
                    <form action="#">
                        <div className="field input-field">
                            <input
                                type="text"
                                placeholder="Username"
                                className="input"
                                name="username"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="field input-field">
                            <input
                                type="password"
                                placeholder="Password"
                                className="password"
                                name="password"
                                onChange={handleChange}
                            />
                            <i className="bx bx-hide eye-icon"></i>
                        </div>
                        <div className="field button-field">
                            <LinkContainer to={'/'}>
                                <button onClick={handleSubmit}>Login</button>
                            </LinkContainer>
                            <Modal
                                show={isModalOpen}
                                onHide={() => setIsModalOpen(false)}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Error</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    {errors && errors.message}
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button
                                        variant="secondary"
                                        onClick={() => setIsModalOpen(false)}
                                    >
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </form>
                    <div className="form-link">
                        <span>
                            Don't have an account?{' '}
                            <Link to="/register" className="link signup-link">
                                SignUp
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
