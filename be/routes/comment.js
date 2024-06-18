import express from 'express'
import {
    addComment,
    deleteComment,
    getComments,
} from '../controllers/comment.js'

const router = express.Router()
router.get('/:post_id', getComments)
router.post('/', addComment)
router.delete('/:id', deleteComment)

export default router
