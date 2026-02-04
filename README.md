# TouchTalk AAC

A touch-based communication app for people with cerebral palsy and other motor disabilities.

## About

TouchTalk is an Augmentative and Alternative Communication (AAC) tool that helps people who have difficulty speaking communicate using large, customizable buttons with text-to-speech. 

I built this app after learning about the communication challenges faced by people with cerebral palsy. The goal was to create something accessible, customizable, and easy to use on tablets and phones.
This app is designed to be a free alternative to communication apps, while providing the same crisp and bugless experience as the paid counterparts.

## Features

**Core Functionality**
- Large touch-friendly buttons designed for users with limited motor control
- Immediate text-to-speech when buttons are tapped
- Category-based organization (Feelings, Needs, Words, Actions, People, etc.)
- Quick phrases for common full sentences
- Emergency help button that's always visible

**Customization**
- Add custom categories and symbols
- Upload personal photos instead of using emojis
- Create personalized quick phrases
- Delete or modify existing content
- All customizations save automatically

**Accessibility**
- Works on iPads, iPhones, and Android devices
- Responsive design adapts to different screen sizes
- No installation required - runs in any modern web browser

## How It Works

Users navigate through categories and tap symbols to build sentences. Each tap speaks the word aloud immediately. The Speak button at the bottom repeats the full sentence. 

For faster communication, Quick Phrases provide pre-made sentences like "I want to go home" or "I need help please" that can be accessed with a single tap.

The Customize menu allows users or caregivers to add personal symbols, upload family photos, and create phrases specific to the user's daily needs.

## Technical Details

Built using vanilla HTML, CSS, and JavaScript. Uses the Web Speech API for text-to-speech and localStorage for saving user data. No server or database required - everything runs in the browser.

**Files**
- `index.html` - App structure
- `style.css` - Styling and responsive design  
- `script.js` - Logic and functionality

**Browser Support**
Works in Chrome, Safari, Edge, and Firefox on both desktop and mobile. Requires a modern browser with Web Speech API support.

## Development Process

I started this project in February 2026 as a way to apply what I learned in my high school computer science classes to solve a real-world problem. 

The app was developed over several weeks and tested with a user who has cerebral palsy. Their feedback helped improve button sizing, category organization, and overall usability.

## Future Plans
This app is still in the developmental phase. I intend on making this a downloadable app for both android and ios soon and implement user profiles through sign up/ sign in process.
Possible additions based on continued user testing:
- AI-powered word prediction
- Multiple user profiles
- Ability to export and share custom symbol sets
- Offline support as a Progressive Web App

## Usage

To use the app, simply open `index.html` in a web browser. For the best experience on an iPad or tablet, visit the live version at https://aakashisthegoat.github.io/TouchTalkAAC/

The app works entirely in the browser and doesn't require any installation or account creation.

## About the Developer

I'm a junior in high school with three years of programming experience in Python, Java, and now web development. This project represents my first major web application and first attempt at building assistive technology.

## Acknowledgments

Thanks to my brother who helped me test and fine tune this application. His feedback is greatly appreciated. This project was inspired by existing AAC tools like Proloquo2Go and built to address real accessibility needs.

## License

Free to use for personal, educational, and non-commercial purposes.
