import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Calendar, User, AlertCircle } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskModal from './TaskModal';
import BoardModal from './BoardModal';
import TaskCard from './TaskCard';

const API_BASE = 'https://test-scriptguru.onrender.com/api';

const KanbanBoard = () => {
    // State declarations - Remain same
    const [boards, setBoards] = useState([]);
    const [selectedBoard, setSelectedBoard] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // fetchBoards, fetchTasks, createBoard, deleteTask, updateTaskStatus functions - Remain same
    const fetchBoards = async () => {
        try {
            setError(null);
            const response = await fetch(`${API_BASE}/boards`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setBoards(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching boards:', error);
            setError('Failed to load boards. Please check if the server is running.');
            setBoards([]);
        }
    };

    const fetchTasks = async (boardId) => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`${API_BASE}/boards/${boardId}/tasks`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setTasks(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            setError('Failed to load tasks.');
            setTasks([]);
        } finally {
            setLoading(false);
        }
    };

    const createBoard = async (name) => {
        try {
            const response = await fetch(`${API_BASE}/boards`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const newBoard = await response.json();
            setBoards([newBoard, ...boards]);
            setIsBoardModalOpen(false);
        } catch (error) {
            console.error('Error creating board:', error);
            setError('Failed to create board.');
        }
    };

    // ✅ FIXED: Updated URL structure to match backend routes
    const saveTask = async (taskData) => {
        try {
            if (editingTask) {
                // Update existing task
                const response = await fetch(`${API_BASE}/tasks/${editingTask._id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(taskData)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const updatedTask = await response.json();
                setTasks(tasks.map(task => task._id === updatedTask._id ? updatedTask : task));
            } else {
                // Create new task - Fixed URL: boards/:boardId/tasks
                const response = await fetch(`${API_BASE}/boards/${selectedBoard._id}/tasks`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(taskData)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const newTask = await response.json();
                setTasks([newTask, ...tasks]);
            }
            setIsTaskModalOpen(false);
            setEditingTask(null);
        } catch (error) {
            console.error('Error saving task:', error);
            setError('Failed to save task.');
        }
    };

    const deleteTask = async (taskId) => {
        try {
            const response = await fetch(`${API_BASE}/tasks/${taskId}`, { method: 'DELETE' });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setTasks(tasks.filter(task => task._id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
            setError('Failed to delete task.');
        }
    };

    const updateTaskStatus = async (taskId, newStatus) => {
        try {
            const response = await fetch(`${API_BASE}/tasks/${taskId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const updatedTask = await response.json();
            setTasks(tasks.map(task => task._id === updatedTask._id ? updatedTask : task));
        } catch (error) {
            console.error('Error updating task status:', error);
            setError('Failed to update task status.');
        }
    };

    // ✅ ADDED: Drag and drop handler
    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        const newStatus = destination.droppableId;
        updateTaskStatus(draggableId, newStatus);
    };

    const groupedTasks = {
        'To Do': tasks.filter(task => task.status === 'To Do'),
        'In Progress': tasks.filter(task => task.status === 'In Progress'),
        'Done': tasks.filter(task => task.status === 'Done')
    };

    useEffect(() => {
        fetchBoards();
    }, []);

    useEffect(() => {
        if (selectedBoard) {
            fetchTasks(selectedBoard._id);
        }
    }, [selectedBoard]);

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex h-screen bg-gray-100">
                {error && (
                    <div className="fixed top-0 left-0 right-0 bg-red-500 text-white px-4 py-2 z-50">
                        <div className="flex items-center justify-between">
                            <span>{error}</span>
                            <button onClick={() => setError(null)} className="text-white hover:text-gray-200">
                                ×
                            </button>
                        </div>
                    </div>
                )}

                {/* Sidebar - Remain same */}
                <div className="w-64 bg-white shadow-lg">
                    <div className="p-4 border-b">
                        <h2 className="text-xl font-semibold text-gray-800">Boards</h2>
                        <button
                            onClick={() => setIsBoardModalOpen(true)}
                            className="mt-2 w-full flex items-center gap-2 text-blue-600 hover:text-blue-800"
                        >
                            <Plus size={16} />
                            Add Board
                        </button>
                    </div>

                    <div className="p-4">
                        {boards.length === 0 ? (
                            <div className="text-gray-500 text-sm">
                                {error ? 'Unable to load boards' : 'No boards available'}
                            </div>
                        ) : (
                            boards.map(board => (
                                <div
                                    key={board._id}
                                    onClick={() => setSelectedBoard(board)}
                                    className={`p-3 rounded-lg cursor-pointer mb-2 ${selectedBoard?._id === board._id
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'hover:bg-gray-100'
                                        }`}
                                >
                                    {board.name}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Main Content with Drag & Drop */}
                <div className="flex-1 p-6">
                    {selectedBoard ? (
                        <>
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold text-gray-800">{selectedBoard.name}</h1>
                                <button
                                    onClick={() => {
                                        setEditingTask(null);
                                        setIsTaskModalOpen(true);
                                    }}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                                >
                                    <Plus size={16} />
                                    Add Task
                                </button>
                            </div>

                            {loading ? (
                                <div className="flex justify-center items-center h-64">
                                    <div className="text-gray-500">Loading tasks...</div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-3 gap-6">
                                    {Object.entries(groupedTasks).map(([status, statusTasks]) => (
                                        <Droppable key={status} droppableId={status}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.droppableProps}
                                                    className={`bg-gray-50 rounded-lg p-4 min-h-[500px] ${snapshot.isDraggedOver ? 'bg-blue-50 border-2 border-blue-300' : ''
                                                        }`}
                                                >
                                                    <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                                                        {status}
                                                        <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs">
                                                            {statusTasks.length}
                                                        </span>
                                                    </h3>

                                                    <div className="space-y-3">
                                                        {statusTasks.map((task, index) => (
                                                            <Draggable key={task._id} draggableId={task._id} index={index}>
                                                                {(provided, snapshot) => (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        className={snapshot.isDragging ? 'opacity-75 transform rotate-2' : ''}
                                                                    >
                                                                        <TaskCard
                                                                            task={task}
                                                                            onEdit={(task) => {
                                                                                setEditingTask(task);
                                                                                setIsTaskModalOpen(true);
                                                                            }}
                                                                            onDelete={deleteTask}
                                                                            onStatusChange={updateTaskStatus}
                                                                        />
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                    </div>
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                                <AlertCircle size={48} className="text-gray-400 mx-auto mb-4" />
                                <h2 className="text-xl font-semibold text-gray-600 mb-2">No Board Selected</h2>
                                <p className="text-gray-500">Select a board from the sidebar to view tasks</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Modals - Remain same */}
                <TaskModal
                    isOpen={isTaskModalOpen}
                    onClose={() => {
                        setIsTaskModalOpen(false);
                        setEditingTask(null);
                    }}
                    task={editingTask}
                    boardId={selectedBoard?._id}
                    onSave={saveTask}
                />

                <BoardModal
                    isOpen={isBoardModalOpen}
                    onClose={() => setIsBoardModalOpen(false)}
                    onSave={createBoard}
                />
            </div>
        </DragDropContext>
    );
};

export default KanbanBoard;