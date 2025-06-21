import { useState } from "react";


const BoardModal = ({ isOpen, onClose, onSave }) => {
    const [boardName, setBoardName] = useState('');

    const handleSubmitBoard = () => {
        if (boardName.trim()) {
            onSave(boardName.trim());
            setBoardName('');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4">Create New Board</h3>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Board Name *
                        </label>
                        <input
                            type="text"
                            value={boardName}
                            onChange={(e) => setBoardName(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            placeholder="Enter board name"
                            required
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={handleSubmitBoard}
                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                        >
                            Create Board
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoardModal

