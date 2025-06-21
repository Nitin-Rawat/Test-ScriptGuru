# Team Collaboration Board

A full-stack MERN application for team collaboration, similar to Trello/Asana. Team members can create boards, manage tasks, and track progress with an intuitive drag-and-drop interface.

## Features

### Core Features
- **Board Management**: Create and manage multiple boards
- **Task Management**: Full CRUD operations for tasks
- **Task Status Tracking**: "To Do", "In Progress", "Done" columns
- **Task Priority**: Low, Medium, High priority levels
- **Task Assignment**: Assign tasks to team members
- **Due Dates**: Set and track task deadlines
- **Responsive Design**: Works on desktop and mobile devices

### Bonus Features
- **Priority Color Coding**: Visual priority indicators
- **Task Filtering**: Filter tasks by status
- **Clean UI/UX**: Modern, intuitive interface with Tailwind CSS
- **Real-time Updates**: Instant task status updates

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - Frontend framework
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **React Hooks** - State management

## API Endpoints

### Boards
- `GET /boards` - Get all boards
- `POST /boards` - Create a new board

### Tasks
- `GET /boards/:id/tasks` - Get tasks for a specific board
- `POST /boards/:id/tasks` - Create a new task in a board
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Update the `.env` file with your MongoDB connection string:
```
MONGODB_URI=mongodb://localhost:27017/collaboration-board
PORT=5000
```

5. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Project Structure

```
collaboration-board/
├── backend/
│   ├── server.js          # Express server and routes
│   ├── package.json       # Backend dependencies
│   └── .env.example       # Environment variables template
├── frontend/
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── index.js       # React entry point
│   │   └── index.css      # Tailwind CSS imports
│   ├── package.json       # Frontend dependencies
│   ├── tailwind.config.js # Tailwind configuration
│   └── postcss.config.js  # PostCSS configuration
└── README.md
```

## Database Schema

### Board Model
```javascript
{
  name: String (required),
  createdAt: Date
}
```

### Task Model
```javascript
{
  title: String (required),
  description: String,
  status: Enum ['To Do', 'In Progress', 'Done'],
  priority: Enum ['Low', 'Medium', 'High'],
  assignedTo: String,
  dueDate: Date,
  boardId: ObjectId (ref: Board),
  createdAt: Date
}
```

## Usage

1. **Create a Board**: Click "Add Board" in the sidebar to create a new board
2. **Select a Board**: Click on any board in the sidebar to view its tasks
3. **Add Tasks**: Click "Add Task" to create a new task in the selected board
4. **Manage Tasks**: 
   - Edit tasks by clicking the edit icon
   - Delete tasks by clicking the trash icon
   - Update task status using the dropdown
5. **Track Progress**: Tasks are automatically organized into columns by status

## Development Notes

- The application uses functional components with React Hooks
- State management is handled with useState and useEffect
- API calls are made using the Fetch API
- Responsive design implemented with Tailwind CSS
- Icons provided by Lucide React

## Deployment

### Backend Deployment (Render/Railway)
1. Create a new service on your preferred platform
2. Connect your GitHub repository
3. Set environment variables (MONGODB_URI, PORT)
4. Deploy

### Frontend Deployment (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `build` folder to your preferred platform
3. Update the API_BASE URL to point to your deployed backend

## Future Enhancements

- User authentication and authorization
- Real-time collaboration with WebSockets
- Drag and drop functionality for task reordering
- File attachments for tasks
- Task comments and activity history
- Team member management
- Board templates
- Advanced filtering and search
- Email notifications
- Dark mode theme

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.