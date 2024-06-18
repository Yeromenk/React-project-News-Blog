import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getComments = async (req, res) => {
    try {
        const postId = Number.parseInt(req.params.post_id)

        const comments = await prisma.comment.findMany({
            where: {
                postId: postId,
            },
            include: {
                user: {},
            },
        })

        return res.status(200).send(comments)
    } catch (err) {
        return res.status(500).json({ message: err.toString() })
    }
}

export const addComment = async (req, res) => {
    try {
        const comment = req.body
        if (!comment.userId || !comment.postId) {
            return res
                .status(403)
                .json({ message: 'Please specify post and user id' })
        }

        if (comment.text.length < 10) {
            return res
                .status(403)
                .json({ message: 'Comment text is too short' })
        }

        const newComment = await prisma.comment.create({
            data: {
                postId: Number.parseInt(comment.postId),
                userId: Number.parseInt(comment.userId),
                text: comment.text,
                date: new Date(),
            },
        })

        if (!newComment) {
            res.status(403).json({ message: 'Comment did not created' })
        }
        res.status(200).json({ message: 'Comment added' })
    } catch (error) {
        return res.status(500).json({ message: error.toString() })
    }
}

export const deleteComment = async (req, res) => {
    try {
        await prisma.comment.delete({
            where: {
                id: Number.parseInt(req.params.id),
            },
        })
        res.status(200).json({ message: 'Comment deleted successfully' })
    } catch (err) {
        return res.status(500).json({ error: err.toString() })
    }
}
