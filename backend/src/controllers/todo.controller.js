import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Todo } from "../models/todo.model.js";

const createTodo = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    const userId = req.user._id; // You'll need to get this from authentication

    if (!title) {
        throw new ApiError(400, "Title is required");
    }

    const todo = await Todo.create({
        title,
        description,
        user: userId
    });

    return res.status(201).json(
        new ApiResponse(201, todo, "Todo created successfully")
    );
});

const getUserTodos = asyncHandler(async (req, res) => {
    const userId = req.user._id; // You'll need to get this from authentication
    
    const todos = await Todo.find({ user: userId })
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, todos, "Todos retrieved successfully")
    );
});

const updateTodo = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    const userId = req.user._id;

    const todo = await Todo.findOneAndUpdate(
        { _id: id, user: userId },
        { completed },
        { new: true }
    );

    if (!todo) {
        throw new ApiError(404, "Todo not found");
    }

    return res.status(200).json(
        new ApiResponse(200, todo, "Todo updated successfully")
    );
});

export { createTodo, getUserTodos, updateTodo };