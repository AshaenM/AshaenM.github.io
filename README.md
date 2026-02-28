# Ashaen Manuel - Portfolio Website

A modern, unique portfolio website showcasing my work as an aspiring game developer.

## Features

- 🎮 Game-dev inspired design with unique animations
- 📱 Fully responsive design
- ⚡ Fast and lightweight
- 🎨 Dark theme with vibrant accents
- 📊 Easy content management via `data.json`

## GitHub Pages Setup

This website is designed to work perfectly on GitHub Pages. To deploy:

1. Push all files to your GitHub repository
2. Go to Settings → Pages
3. Select your branch (usually `main` or `master`)
4. Select `/ (root)` as the source
5. Your site will be live at `https://yourusername.github.io/repository-name/`

## Adding Content

All content is managed through `data.json`. Simply edit this file to update:

- **Personal Info**: Name, title, bio, contact details
- **Skills**: Add/remove skills with categories and levels
- **Projects**: Add new projects with images, descriptions, and links
- **Experience**: Add work experience entries
- **Education**: Add education entries

### Example: Adding a New Project

```json
{
  "id": 4,
  "title": "My New Project",
  "description": "A brief description of the project",
  "image": "assets/project-image.png",
  "technologies": ["Python", "React"],
  "github": "https://github.com/username/repo",
  "category": "Web Application",
  "highlights": [
    "Achievement 1",
    "Achievement 2"
  ]
}
```

### Example: Adding Experience

```json
{
  "id": 2,
  "title": "Software Developer",
  "company": "Company Name",
  "location": "City, Country",
  "startDate": "2024",
  "endDate": "Present",
  "description": "Description of your role",
  "achievements": [
    "Achievement 1",
    "Achievement 2"
  ]
}
```

## File Structure

```
├── index.html          # Main page (single-page application)
├── data.json          # All content data
├── scripts/
│   └── main.js        # JavaScript for rendering content
├── styles/
│   └── style.css      # All styling
└── assets/            # Images and other assets
```

## Technologies Used

- HTML5
- CSS3 (with CSS Variables)
- Vanilla JavaScript (ES6+)
- GitHub Pages for hosting

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Copyright © 2026 Ashaen Manuel. All Rights Reserved.
