# Grade Calculator

A web application for students to calculate their letter grades based on AWE outcomes and proficiency levels.

## Features

- **Subject Management**: Create, rename, and switch between multiple subjects
- **AWE Outcomes Input**: Paste outcomes in the format "Reading 2.1 - Advanced"
- **Grade Calculation**: Automatic letter grade calculation using the provided algorithm
- **Local Storage**: All data is saved locally in your browser
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd "/Users/timlu/Library/CloudStorage/OneDrive-AvenuesTheWorldSchool/Work/Systems/Canvas/Calculator App/2025-26 Ver"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. **Create a Subject**: Click "New Subject" and enter a subject name
2. **Add Outcomes**: Paste your AWE outcomes in the format:
   ```
   Reading 2.1 - Advanced
   Writing 2.2 - Proficient
   Math 3.1 - Developing
   Science 1.3 - Not Yet
   ```
3. **View Grade**: The calculated letter grade will appear automatically
4. **Manage Data**: Edit, delete, or switch between subjects as needed

## Grade Calculation Algorithm

The app uses the following algorithm to calculate letter grades:

- **If only Advanced & Proficient**: A (≥50% Advanced), A- (≥20% Advanced), B+ (<20% Advanced)
- **If no Not Yet grades**: B (≥60% Advanced+Proficient), B- (≥50%), C+ (≥20%), C (<20%)
- **If any Not Yet grades**: C- (<20% Not Yet), Warning (≥20% Not Yet)

## Data Storage

All data is stored locally in your browser's localStorage. This means:
- Data persists between browser sessions
- Data is private and stays on your device
- No internet connection required after initial load
- Data can be lost if browser data is cleared

## Technology Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Local Storage API** for data persistence

## Development

The project uses:
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Hot module replacement for fast development

## License

This project is for educational use at Avenues The World School.
