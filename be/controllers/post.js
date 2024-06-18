import { PrismaClient } from '@prisma/client'
import e from 'express'

const prisma = new PrismaClient()

export const getPosts = async (req, res) => {
    try {
        const category = req.query.category
        let posts

        if (category) {
            posts = await prisma.post.findMany({
                where: {
                    category: category,
                },
            })
        } else {
            posts = await prisma.post.findMany()
        }

        return res.status(200).json(posts)
    } catch (err) {
        return res.status(500).json({ error: err.toString() })
    }
}

export const getPost = async (req, res) => {
    try {
        const id = Number.parseInt(req.params.id)

        const post = await prisma.post.findFirst({
            where: {
                id: id,
            },
            include: {
                user: {},
                comments: {},
            },
        })
        if (!post) {
            return res.status(404).json({ message: 'No post with this id' })
        } else {
            return res.status(200).json(post)
        }
    } catch (error) {
        return res.status(500).json({ error: error.toString() })
    }
}

export const addPost = async (req, res) => {
    try {
        let post = req.body

        if (post.userId === '' || post.userId === undefined) {
            return res.status(403).json({ message: 'Post must have author' })
        }

        if (post.title.length < 10) {
            return res.status(403).json({ message: 'Title is too short' })
        }

        if (post.img === undefined) {
            return res.status(403).json({ message: 'Post must have image' })
        }

        const newPost = await prisma.post.create({
            data: {
                title: post.title,
                description: post.description,
                img: post.img,
                category: post.category,
                userId: post.userId,
                date: post.date,
            },
        })
        if (newPost) {
            return res.status(200).json({ message: 'Post successfully added' })
        }

        return res.status(403).json({ message: "Post didn't created" })
    } catch (err) {
        return res.status(500).json({ error: err.toString() })
    }
}

export const updatePost = async (req, res) => {
    try {
        const postId = Number(req.params.id)
        const { title, description, img, category, userId } = req.body
        const updatedPost = await prisma.post.update({
            where: { id: postId },
            data: { title, description, img, category, userId },
        })
        return res.status(200).json(updatedPost)
    } catch (error) {
        return res.status(500).json({ error: error.toString() })
    }
}

export const deletePost = async (req, res) => {
    try {
        const postId = Number(req.params.id)
        const userId = Number(req.query.userId)
        const post = await prisma.post.findFirst({
            where: { id: postId },
        })

        if (post.userId !== userId) {
            return res
                .status(403)
                .json({ message: 'You can delete only your posts' })
        }

        await prisma.post.delete({
            where: { id: postId },
        })

        return res.status(200).json(post)
    } catch (e) {
        return res.status(500).json({ message: e.toString() })
    }
}
