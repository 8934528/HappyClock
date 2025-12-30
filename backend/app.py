from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import random
import time
from datetime import datetime
import threading
import json
import os

app = Flask(__name__, static_folder='../frontend')
CORS(app)

# Themes
happy_themes = {
    'cyber': {
        'primary': '#00ff88',
        'secondary': '#0088ff',
        'accent': '#ff0088',
        'bg': '#0a0a0a',
        'panel': '#1a1a1a'
    },
    'matrix': {
        'primary': '#00ff41',
        'secondary': '#008f11',
        'accent': '#00ff88',
        'bg': '#000000',
        'panel': '#0a0a0a'
    },
    'neon': {
        'primary': '#ff00ff',
        'secondary': '#00ffff',
        'accent': '#ffff00',
        'bg': '#000000',
        'panel': '#111111'
    }
}

@app.route('/')
def serve_frontend():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

@app.route('/api/time', methods=['GET'])
def get_current_time():
    """Get current time in various formats"""
    now = datetime.now()
    return jsonify({
        'time24': now.strftime('%H:%M:%S'),
        'time12': now.strftime('%I:%M:%S %p'),
        'date': now.strftime('%A, %B %d, %Y'),
        'timestamp': time.time(),
        'hours': now.hour,
        'minutes': now.minute,
        'seconds': now.second,
        'day': now.strftime('%A'),
        'month': now.strftime('%B'),
        'version': 'v2.25.12.29.14.20',
        'creator': 'Mihlali'
    })

@app.route('/api/themes', methods=['GET'])
def get_themes():
    """Get available clock themes"""
    return jsonify(happy_themes)

@app.route('/api/theme/<theme_name>', methods=['GET'])
def get_theme(theme_name):
    """Get specific theme colors"""
    theme = happy_themes.get(theme_name, happy_themes['cyber'])
    return jsonify(theme)

@app.route('/api/version', methods=['GET'])
def get_version():
    """Get version information"""
    return jsonify({
        'version': 'v2.25.12.29.14.20',
        'name': 'Happy Clock',
        'creator': 'Mihlali',
        'description': 'A joyful digital clock with cascading digit columns',
        'release_date': 'December 29, 2024',
        'features': [
            'Three-column design (Hours, Minutes, Seconds)',
            'Three colorful themes (Cyber, Matrix, Neon)',
            'Real-time digit animation',
            'Smooth cascading effects',
            'Responsive design',
            'Customizable settings',
            'Fullscreen mode support'
        ]
    })

if __name__ == '__main__':
    print("=" * 50)
    print("Happy Clock v2.25.12.29.14.20")
    print("Created by Mihlali")
    print("Starting server on http://0.0.0.0:5000")
    print("=" * 50)
    app.run(debug=True, port=5000, host='0.0.0.0')
