import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { AuthContext } from '../context/authContext'

const Register = () => {
    const [inputs, setInputs] = useState({
        username: '',
        email: '',
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
            const response = await axios.post(
                'http://localhost:3001/api/auth/register',
                inputs
            )
            localStorage.setItem('access_token', response.data.access_token)
            await login(inputs)
            navigate('/')
        } catch (err) {
            if (err.response) {
                setErrors(err.response.data)
            } else {
                console.error('Network error or other error occurred: ', err)
            }
            setIsModalOpen(true)
        }
    }

    return (
        <div className="form login">
            <div className="form-content">
                <header>Signup</header>
                <form action="#">
                    <div className="field input-field">
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            className="input"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="field input-field">
                        <input
                            type="email"
                            placeholder="Email"
                            className="input"
                            name="email"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="field input-field">
                        <input
                            type="password"
                            placeholder="Create password"
                            className="password"
                            name="password"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="field button-field">
                        <button onClick={handleSubmit}>Signup</button>
                        <Modal
                            show={isModalOpen}
                            onHide={() => setIsModalOpen(false)}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Error</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>{errors && errors.message}</Modal.Body>
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
                        Already have an account? <Link to="/login">Login</Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Register
