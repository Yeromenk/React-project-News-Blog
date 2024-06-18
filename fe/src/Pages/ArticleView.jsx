import React, { useContext, useEffect, useState } from 'react'
import { Container, Button, Image } from 'react-bootstrap'
import parse from 'html-react-parser'
import Comments from './Comment'
import { BsPencil, BsTrash } from 'react-icons/bs'
import { Link, useLoaderData, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/authContext'
import { InfoModal } from './UIComponents'

function ArticleView() {
    let { id } = useParams()
    const user = useContext(AuthContext).currentUser
    let userId = -1
    if (user) {
        userId = user.id
    }
    const postData = useLoaderData()

    const [date, setDate] = useState(new Date())
    const navigate = useNavigate()
    const [isModalShowed, setIsModalShowed] = useState(false)
    const [modalText, setModalText] = useState('')
    const [modalTitle, setModalTitle] = useState('Error')
    let [success, setSuccess] = useState(false)

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3001/api/posts/${id}`, {
                params: { userId: userId },
            })
            setModalTitle('Success!')
            setModalText('Article is successfully deleted')
            setSuccess(true)
            setIsModalShowed(true)
        } catch (e) {
            console.log(e)
            setModalTitle('Error!')
            setModalText(e.toString())
            setIsModalShowed(true)
        }
    }

    const handleModalClose = () => {
        setIsModalShowed(false)
        if (success) navigate('/')
    }

    return (
        <Container
            className={
                'p-5 justify-content-center align-self-center text-center w-adjust'
            }
        >
            <Image className={'w-75'} src={postData.img} alt="Post image" />
            <h1>{postData.title}</h1>
            <p>Written by {postData.user.username}</p>
            <p>{date.toDateString()}</p>
            <p>Category: {postData.category}</p>

            {user && user.username === postData.user.username && (
                <>
                    <Button variant="danger" onClick={handleDelete}>
                        <BsTrash /> Delete post
                    </Button>

                    <Link to={`/write/${id}`} state={date}>
                        <Button variant="primary" style={{ marginLeft: 5 }}>
                            <BsPencil /> Edit post
                        </Button>
                    </Link>
                </>
            )}

            <hr />
            <Container className="text-start">
                {parse(`${postData.description}`)}
                <Comments postId={id} user={user} />
            </Container>

            <InfoModal
                title={modalTitle}
                body={modalText}
                visible={isModalShowed}
                buttonText="Close"
                onHide={handleModalClose}
            />
        </Container>
    )
}

export default ArticleView
