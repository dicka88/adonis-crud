'use strict'

const Todo = use('App/Models/Todo')

class TodoController {
    async index({ request, response, view }) {
        const todos = await Todo.all()
        console.log(todos.rows);

        return view.render('index', { todos: todos.rows })
    }

    create({ view }) {
        return view.render('create')
    }

    async store({ request, session, response }) {
        const todo = new Todo()

        todo.title = request.input('title')
        todo.description = request.input('description')
        await todo.save()

        session.flash({
            notification: 'Successfully created'
        })

        return response.route('Todo.index')
    }

    async edit({ request, params, response, view }) {
        const id = params.id
        const todo = await Todo.find(id)

        return view.render('edit', { todo })
    }

    async update({ request, view, params, session, response }) {
        const id = params.id
        const todo = await Todo.find(id)

        todo.title = request.input('title')
        todo.description = request.input('description')
        await todo.save()

        session.flash({
            notification: 'Success update todo'
        })

        response.redirect('/')
    }

    async delete({ request, params, response, session, view }) {
        const id = params.id
        const todo = await Todo.find(id)
        await todo.delete()

        session.flash({
            notification: 'Success delete data'
        })
        response.redirect('/')
    }
}

module.exports = TodoController