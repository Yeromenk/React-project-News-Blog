import { Form, Card } from 'react-bootstrap'
import '../Styles/ScreenWidthAdjust.css'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import { useContext, useEffect, useState } from 'react'
import { InfoModal } from './UIComponents'
import axios from 'axios'
import { AuthContext } from '../context/authContext'

function Comments(params) {
    const { postId, user } = params
    let [text, setText] = useState('')
    let [modalText, setModalText] = useState(
        'You must be signed in to post comments'
    )
    let [isModalVisible, setIsModalVisible] = useState(false)
    let [comments, setComments] = useState([])

    const getComments = async () => {
        try {
            let comments = await axios.get(
                `http://localhost:3001/api/comments/${postId}`
            )
            setComments(comments.data)
        } catch (err) {
            setIsModalVisible(true)
            setModalText(err.toString())
        }
    }
    useEffect(() => {
        getComments()
    }, [])

    const handleSave = async () => {
        if (!user) {
            setModalText('You must be signed in to post comments')
            setIsModalVisible(true)
            return
        }

        if (!postId) {
            setModalText('Post ID is missing')
            setIsModalVisible(true)
            return
        }
        if (text.length < 10) {
            setModalText('Comment text is too short! Minimum length: 10')
            setIsModalVisible(true)
            return
        }
        const dto = {
            userId: user.id,
            postId: postId,
            text: text,
        }

        await axios.post('http://localhost:3001/api/comments', dto)
        getComments()
    }

    const handleChange = (e) => {
        setText(e.target.value)
    }

    return (
        <div>
            <h3>Comments ({comments.length})</h3>
            <Stack gap={2}>
                <InfoModal
                    visible={isModalVisible}
                    onHide={() => setIsModalVisible(false)}
                    title={'Error'}
                    body={modalText}
                    buttonText={'Close'}
                ></InfoModal>
                <span className={'border-2'}>
                    <Form>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Write Comment</Form.Label>
                            <Form.Control
                                as="textarea"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Button onClick={handleSave}> Post</Button>
                    </Form>
                </span>
                {comments.map((comment, index) => (
                    <CommentToast
                        key={index}
                        comment={comment}
                        updateFunction={getComments}
                    />
                ))}
            </Stack>
        </div>
    )
}

function CommentToast(props) {
    const { comment, updateFunction } = props
    const date = new Date(comment.date)
    const currentUser = useContext(AuthContext).currentUser
    let currentUserId = -1
    if (currentUser) {
        currentUserId = Number.parseInt(currentUser.id)
    }

    const handleDelete = async () => {
        await axios.delete(`http://localhost:3001/api/comments/${comment.id}`)
        updateFunction()
    }

    return (
        <Card>
            <Card.Header>{date.toUTCString()}</Card.Header>
            <Card.Body>
                <Card.Title>{comment.user.username}</Card.Title>
                <Card.Text>{comment.text}</Card.Text>
                {currentUserId === Number.parseInt(comment.user.id) ? (
                    <Button variant="danger" onClick={handleDelete}>
                        Delete comment
                    </Button>
                ) : (
                    <span></span>
                )}
            </Card.Body>
        </Card>
    )
}

export default Comments
