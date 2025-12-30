# Happy Clock

A joyful digital clock with cascading digit columns showing hours, minutes, and seconds in real-time.

## Features

- **Three-Column Design**: Hours, Minutes, and Seconds each in their own column
- **Cascading Digits**: Smooth animations as digits move up and down
- **Multiple Themes**: Three colorful themes (Cyber, Matrix, Neon)
- **Settings Modal**: Accessible via gear icon in header
- **Responsive Design**: Works on all screen sizes
- **Full API Backend**: Comprehensive backend with additional features

## Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd car-dashboard

2. Install backend dependencies:

    ```bash
    cd backend
    pip install -r requirements.txt

3. Run the application:

    ```bash
    python app.py

4. Open the browser and navigate to:

    ```bash
    http://localhost:5000

## Usage

## Project Structure

      Clock/
        │
        ├── backend/
        │   ├── app.py
        │   └── requirements.txt
        │
        ├── frontend/
        │   ├── assets/
        │   ├── index.html
        │   ├── style.css
        │   └── script.js
        │
        └── README.md

## Backend API
- /api/time - Get current time data
- /api/themes - Get available themes
- /api/theme/<name> - Get specific theme
- /api/version - Get version information

## How It Works
-- Happy Clock features three cascading digit columns that display hours, minutes, and seconds in real-time. Each column contains two stacks of digits (tens and ones) that smoothly transition as time progresses, creating a beautiful waterfall effect.
