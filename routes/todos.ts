import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

interface Todo {
    id: string,
    text: string
}

let todos: Todo[] = [];

router.get('/todos', (ctx) => {
    ctx.response.body = { todos: todos };
});

router.post('/todos', async (ctx) => {
    const body = await ctx.request.body();
    const text = await body.value;

    const newTodo: Todo = {
        id: new Date().toISOString(),
        text
    };

    todos.push(newTodo);

    ctx.response.body = {
        message: 'Created Todo',
        todo: newTodo
    };
});

router.put('/todos/:id', async (ctx) => {
    const body = await ctx.request.body();
    const data = await body.value;

    const id = ctx.params.id;
    const index = todos.findIndex(todo => todo.id === id);
    todos[index] = {
        id: todos[index].id,
        text: data.text
    };

    ctx.response.body = {
        message: 'Updated'
    };
});

router.delete('/todos/:id', (ctx, next) => {
    const id = ctx.params.id;
    todos = todos.filter(todo => todo.id !== id);

    ctx.response.body = {
        message: 'Deleted'
    };
});

export default router;