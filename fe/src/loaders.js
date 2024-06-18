import axios from 'axios'

export const fetchPosts = async () => {
    try {
        const response = await axios.get('http://localhost:3001/api/posts/')
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const fetchPost = async (id) => {
    try {
        const response = await axios.get(
            `http://localhost:3001/api/posts/${id}`
        )
        return response.data
    } catch (e) {
        console.log(e)
    }
}
