import React, { useContext, useEffect, useState } from 'react'
import { Row, Col, Form, Button, Card } from 'react-bootstrap'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import {
    useLoaderData,
    useLocation,
    useNavigate,
    useParams,
} from 'react-router-dom'
import { AuthContext } from '../context/authContext.js'
import { InfoModal } from './UIComponents'
import axios from 'axios'

const Write = () => {
    const user = useContext(AuthContext).currentUser
    const state = useLocation().state

    const post = useLoaderData()

    let [title, setTitle] = useState(post?.title || '')
    const [value, setValue] = useState(post?.description || '')

    const [image, setImage] = useState(post?.img || undefined)
    const [category, setCategory] = useState(post?.category || 'IT')
    const navigate = useNavigate()

    let [isModalShowed, setIsModalShowed] = useState(false)
    let [modalText, setModalText] = useState('')
    let [successfulCreation, setSuccessfulCreation] = useState(false)
    let [modalTitle, setModalTitle] = useState('Error')
    let { id } = useParams()

    const handleSave = async () => {
        if (!user || !user.id) {
            setModalText('You must be logged in to create article')
            setIsModalShowed(true)
            return
        }

        if (image === undefined) {
            setModalText('Please select an image')
            setIsModalShowed(true)
            return
        }

        if (title.length < 10) {
            setModalText('Title is too short (minimum length: 10)')
            setIsModalShowed(true)
            return
        }

        const dto = {
            title: title,
            description: value,
            date: new Date(),
            img: image,
            category: category,
            userId: user.id,
        }

        try {
            if (id) {
                await axios.put(`http://localhost:3001/api/posts/${id}`, dto)
                setSuccessfulCreation(true)
                setModalTitle('Success!')
                setModalText('Article is successfully updated')
                setIsModalShowed(true)
            } else {
                await axios.post('http://localhost:3001/api/posts/', dto)
                setSuccessfulCreation(true)
                setModalTitle('Success!')
                setModalText('Article is successfully created')
                setIsModalShowed(true)
            }
        } catch (e) {
            setModalText(e.toString())
            setIsModalShowed(true)
        }
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleRadioSelect = (e) => {
        setCategory(e.target.value)
    }

    const handleImageChange = async (e) => {
        let file = e.target.files[0]
        if (file) {
            if (file.size > 10_000_000) {
                setModalText('File is too large')
                setIsModalShowed(true)
                return
            }
            let fileReader = new FileReader()
            fileReader.readAsDataURL(file)

            fileReader.addEventListener(
                'load',
                () => {
                    setImage(fileReader.result)
                },
                false
            )
        }
    }

    return (
        <div className="container">
            <h1 style={{ marginTop: 20 }}>
                {id ? 'Edit article' : 'Create article'}
            </h1>
            <Row>
                <Col md={8}>
                    <Form.Control
                        type="text"
                        value={title}
                        placeholder="Title"
                        className="mb-3"
                        onChange={handleTitleChange}
                    />
                    <ReactQuill
                        theme="snow"
                        value={value}
                        onChange={setValue}
                        style={{ height: '385px' }}
                    />
                </Col>
                <InfoModal
                    title={modalTitle}
                    body={modalText}
                    visible={isModalShowed}
                    buttonText={'Close'}
                    onHide={() => {
                        setIsModalShowed(false)
                        if (successfulCreation) {
                            navigate('/')
                        }
                    }}
                ></InfoModal>

                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <h1>Publish</h1>
                            </Card.Title>
                            <Form.Group controlId="formFile" className="mt-3">
                                <Form.Label>Upload image</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/x-png, image/jpeg, image/webp"
                                    onChange={handleImageChange}
                                />
                            </Form.Group>
                            <div className="mt-3">
                                <Button
                                    variant="primary"
                                    className="me-2"
                                    onClick={handleSave}
                                >
                                    Publish
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                    <Card className={'mt-3'}>
                        <Card.Body>
                            <h1>Image preview</h1>
                            <div className="text-center">
                                <img className={'w-50 h-50'} src={image} />
                            </div>
                        </Card.Body>
                    </Card>
                    <Card className="mt-3">
                        <Card.Body>
                            <h1>Category</h1>
                            <Form>
                                <Form.Check
                                    inline
                                    checked={category === 'IT'}
                                    label="IT"
                                    type="radio"
                                    id="it"
                                    name="category"
                                    value="IT"
                                    style={{ display: 'block' }}
                                    onChange={handleRadioSelect}
                                />
                                <Form.Check
                                    inline
                                    checked={category === 'Design'}
                                    label="Design"
                                    type="radio"
                                    id="design"
                                    name="category"
                                    value="Design"
                                    style={{ display: 'block' }}
                                    onChange={handleRadioSelect}
                                />
                                <Form.Check
                                    inline
                                    checked={category === 'Development'}
                                    label="Development"
                                    type="radio"
                                    id="development"
                                    name="category"
                                    value="Development"
                                    style={{ display: 'block' }}
                                    onChange={handleRadioSelect}
                                />
                                <Form.Check
                                    inline
                                    checked={category === 'Computer games'}
                                    label="Computer games"
                                    type="radio"
                                    id="games"
                                    name="category"
                                    value="Computer games"
                                    style={{ display: 'block' }}
                                    onChange={handleRadioSelect}
                                />
                                <Form.Check
                                    inline
                                    checked={
                                        category === 'Science and research'
                                    }
                                    label="Science and research"
                                    type="radio"
                                    id="science"
                                    name="category"
                                    value="Science and research"
                                    style={{ display: 'block' }}
                                    onChange={handleRadioSelect}
                                />
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Write
