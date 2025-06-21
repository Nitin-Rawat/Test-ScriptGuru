
import { Plus, Edit2, Trash2, Calendar, User, AlertCircle } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
    const priorityColors = {
        Low: 'bg-green-100 text-green-800',
        Medium: 'bg-yellow-100 text-yellow-800',
        High: 'bg-red-100 text-red-800'
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-3">
            <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-900">{task.title}</h4>
                <div className="flex gap-1">
                    <button
                        onClick={() => onEdit(task)}
                        className="p-1 text-gray-400 hover:text-blue-600"
                    >
                        <Edit2 size={14} />
                    </button>
                    <button
                        onClick={() => onDelete(task._id)}
                        className="p-1 text-gray-400 hover:text-red-600"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>

            {task.description && (
                <p className="text-sm text-gray-600 mb-2">{task.description}</p>
            )}

            <div className="flex flex-wrap gap-2 mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                    {task.priority}
                </span>

                {task.assignedTo && (
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                        <User size={12} />
                        {task.assignedTo}
                    </span>
                )}

                {task.dueDate && (
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar size={12} />
                        {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                )}
            </div>

            <select
                value={task.status}
                onChange={(e) => onStatusChange(task._id, e.target.value)}
                className="w-full text-xs border border-gray-300 rounded px-2 py-1"
            >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
            </select>
        </div>
    );
};

export default TaskCard
