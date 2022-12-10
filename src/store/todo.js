import axios from 'axios'

const state = {
  todos: [],
}

const getters = {
    allTodos: state => state.todos
}

const actions = {
    async getTodos({commit}){
        const response = await axios.get('http://localhost:8000/tasks')
        commit('setTodos', response.data)
    },
    async changeStatus({commit}, task){
        await axios.put(`http://localhost:8000/tasks/${task._id}`, {done: !task.done})
        const response = await axios.get('http://localhost:8000/tasks')

        commit('setTodos', response.data)
    },
    async deleteTask({commit}, task){
        await axios.delete(`http://localhost:8000/tasks/${task._id}`)
        const response = await axios.get('http://localhost:8000/tasks')

        commit('setTodos', response.data)
    },
    async uploadTask({commit}, {title, description}){
        await axios.post('http://localhost:8000/tasks', {title, description})
        const response = await axios.get('http://localhost:8000/tasks')

        commit('setTodos', response.data)
    }
}

const mutations = {
    setTodos: (state, data) => state.todos = data
}

export default {
    state, getters, actions, mutations
}