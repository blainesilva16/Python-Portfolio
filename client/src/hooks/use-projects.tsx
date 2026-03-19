import { faPython, faJs, faBootstrap, faReact, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faDatabase, faFile, faFileAudio, faP } from "@fortawesome/free-solid-svg-icons";
import TodoListDemo from "@/projects/todo-list/TodoListDemo";
import YearTrackerDemo from "@/projects/year-tracker/YearTrackerDemo";
import TextToSpeechDemo from "@/projects/text-to-speech/TextToSpeechDemo";
import NumberFactsDemo from "@/projects/number-facts/NumberFactsDemo";
import PaletteGeneratorDemo from "@/projects/pallete-generator/PalleteGeneratorDemo";
import CafeWifiDemo from "@/projects/cafe-seeker/CafeSeekerDemo";
import TimelessPlaylistDemo from "@/projects/timeless-playlist/TimelessPlaylistDemo";
import InternetSpeedDemo from "@/projects/internet-speed/InternetSpeedDemo";
import SnakeGameDemo from "@/projects/snake-game/SnakeGameDemo";
import DemoContent from "@/projects/DemoContent";

const projectsData: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  howToUse: string[];
  howItWasCreated: string[];
  techStack: { name: string; icon: any }[];
  githubUrl: string;
  demoContent: React.ReactNode;
}> = {
  "default": {
    title: "Default Project",
    subtitle: "Project Subtitle",
    description: "This is a default project description.",
    howToUse: [
      "Step 1 to use the project.",
      "Step 2 to use the project."
    ],
    howItWasCreated: [
      "This project was created using various technologies.",
      "It features a responsive design and dynamic content."
    ],
    techStack: [
      { name: "Python", icon: faPython },
      { name: "React", icon: faReact }
    ],
    githubUrl: "https://github.com/blainesilva16/",
    demoContent: <DemoContent />
  },
  "text-to-speech": {
    title: "Text to Speech Converter",
    subtitle: "Listen to your texts",
    description: "Convert any text into natural-sounding speech with multiple language and accent options.",
    howToUse: [
      "Write a text on textarea or click on button to select text from PDF.",
      "Choose the language for the speech.",
      "Choose your preferred accent among the ones available for that language.",
      "Click on \"Convert to Speech\" and wait.",
      "The audio will be played for you as soon as it is created.",
      "You can download the audio and clear textarea after all."
    ],
    howItWasCreated: [
      "This Text to Speech Converter was built using Flask, gTTS, pypdf and React. It makes dynamic updates without page reloads.",
      "It uses the pypdf library (pure-python) to extract text from PDF and the gTTS (Google Text-to-Speech) library to make the conversion using the given accent.",
      "It features a responsive design, allowing you to manage your tasks seamlessly on any device."
    ],
    techStack: [
      { name: "Flask", icon: faPython },
      { name: "pypdf", icon: faFile },
      { name: "gTTS", icon: faFileAudio },
      { name: "React", icon: faReact },
    ],
    githubUrl: "https://github.com/blainesilva16/text-to-speech-py",
    demoContent: <TextToSpeechDemo />
  },
  "todo-list": {
    title: "To-do List",
    subtitle: "Get hold of your tasks",
    description: "Keep your Tasks organized with this App where you can create Lists to categorize your to-dos.",
    howToUse: [
      "Create a new list by typing in the input field and clicking \"Create\".",
      "Click on a list to view its tasks.",
      "Add tasks by typing in the task input field and clicking \"Add\".",
      "Set deadlines for tasks using the calendar icon and categorize them by color.",
      "Edit or delete lists and tasks as needed.",
      "Drag a task to move it to another list or to reorder within lists.",
      "Highlight a task and mark it as completed."
    ],
    howItWasCreated: [
      "This To-do List was built using Flask,  SQLite/SQLAlchemy and React. It makes dynamic updates without page reloads.",
      "It features a responsive design, allowing you to manage your tasks seamlessly on any device.",
      "Tasks can be color-coded and have deadlines, making it easy to prioritize and organize your work.",
      "This demo version stores data in localStorage. In the live version, lists and tasks are stored in a SQLite database managed through SQLAlchemy."
    ],
    techStack: [
      { name: "Flask", icon: faPython },     
      { name: "React", icon: faReact },
      { name: "SQLite", icon: faDatabase }
    ],
    githubUrl: "https://github.com/blainesilva16/todo-list-py",
    demoContent: <TodoListDemo />
  },
  "year-tracker": {
    title: "Year Tracker",
    subtitle: "Track your Activities along the Year",
    description: "Create Trackers for your Activities like Mood and Exercises to keep track through the whole Year.",
    howToUse: [
      "Choose a track.",
      "Click on a color to select it then click on a day to apply the color.",
      "Click again on the day to remove the applied color.",
      "Create more color codes for the trackers.",
      "Edit or delete color codes as well as trackers.",
      "Add more trackers to get hold of different activities."
    ],
    howItWasCreated: [
      "This Year Tracker was built using Flask, SQLite/SQLAlchemy and React. It makes dynamic updates without page reloads.",
      "It features a responsive design, allowing you to manage your tasks seamlessly on any device.",
      "Color codes and trackers are fully customizable so that you can keep track of many activities as mood, exercises, sleep time, goals achieved and more.",
      "This demo version stores data in localStorage. In the live version, trackers and color codes are stored in a SQLite database managed through SQLAlchemy."
    ],
    techStack: [
      { name: "Flask", icon: faPython },
      { name: "React", icon: faReact },
      { name: "SQLite", icon: faDatabase }
    ],
    githubUrl: "https://github.com/blainesilva16/year-tracker-py",
    demoContent: <YearTrackerDemo />
  },
  "number-facts": {
    title: "Number Facts - check the api later",
    subtitle: "Discover interesting facts about numbers",
    description: "Get interesting facts about numbers including trivia, math, date, and year facts using the Numbers API.",
    howToUse: [
      "Enter a number in the input field.",
      "Select the type of fact you want: Trivia, Year, or Math.",
      "Click the 'Check' button to fetch the fact.",
      "To get a date fact, enter a date in the date input field and click 'Check'.",
      "For a random fact, select the type from the dropdown and click 'Check'."
    ],
    howItWasCreated: [
      "This Number Facts application was built using React for the frontend and Flask as the backend fetching from the API.",
      "It fetches data from the Numbers API (http://numbersapi.com/) to provide interesting facts about numbers.",
      "The application features a clean and responsive design, making it easy to use on various devices." 
    ],
    techStack: [
      { name: "Flask", icon: faPython },
      { name: "React", icon: faReact },  
      { name: "Numbers API", icon: faP }
    ],
    githubUrl: "https://github.com/blainesilva16/number-facts-py",
    demoContent: <NumberFactsDemo />
  },
  "palette-generator": {
    title: "Palette Generator",
    subtitle: "Generate color palettes easily",
    description: "Create beautiful color palettes for your design projects with ease.",
    howToUse: [
      "Upload an image in the input area.",
      "The generated color palette will appear on the right side.",
      "You can click on each square to check the color code in HEX and RGB formats.",
      "To upload a new image, simply click on the upload area again or drag and drop a new image.",
      "To remove the current image and palette, click on the 'Remove Image' button."
    ],
    howItWasCreated: [
      "This Palette Generator was built using React for the frontend and Flask for the backend with ColorThief library.",
      "It uses the ColorThief library to extract the dominant colors from the uploaded image and generate a color palette.",
      "The application features a clean and responsive design, making it easy to use on various devices." 
    ],  
    techStack: [
      { name: "Flask", icon: faPython },
      { name: "React", icon: faReact },  
      { name: "ColorThief", icon: faPython }
    ],
    githubUrl: "https://github.com/blainesilva16/pallete-generator-py",
    demoContent: <PaletteGeneratorDemo />
  },
  "cafe-seeker": {
    title: "Cafe Seeker",
    subtitle: "Find places to work with good coffee",
    description: "A web application to discover and share the best cafes, featuring a Google Maps API.",
    howToUse: [
      "Type a location on the input.",
      "A list of matching location will be listed.",
      "You can select one of them and/or click the search button.",
      "Just wait until a list of the main 20 results appear on the screen",
      "You can check the name, the address, the open time, the rating, the website (if it exists) and the Google Maps link of that cafe."
    ],
    howItWasCreated: [
      "This Cafe Seeker was built using a Flask backend and a React frontend.",
      "When start typing, the listed locations come from a request for the Google Maps API - Places API, which is done every time a new character comes in.", 
      "Then it uses the Maps Geocoding API to find the latitude and longitude of the location.",
      "And it uses the Google Maps API - Places API to fetch the first 20 results of cafes on a given location.",
      "The data comes on a JSON object, and it is passed to the frontend to format it on cards."
    ],
    techStack: [
      { name: "Flask", icon: faPython },
      { name: "React", icon: faReact },
      { name: "Google Maps API", icon: faGoogle }
    ],
    githubUrl: "https://github.com/blainesilva16/cafe-wifi-py",
    demoContent: <CafeWifiDemo />
  },
  "timeless-playlist": {
    title: "Timeless Playlist",
    subtitle: "Find the top 100 songs on Billboard of a given date",
    description: "Enter any date and wait for a list of the most streamed songs back then.",
    howToUse: [
      "Enter a date and wait a few seconds.",
      "A list with the top 100 songs on Billboard will displayed.",
      "Not all of the songs might be shared, because of the availability of that song on Spotify."
    ],
    howItWasCreated: [
      "It was created with Flask in the backend and React in the frontend.",
      "BeautifulSoup does the web scraping to get the top 100 songs on Billboard.",
      "The project on Github also creates a playlist on Spotify containing all those songs with the library Spotipy.",
      "This project does not create the playlist on Spotify because of the need of a personal account for it."
    ],
    techStack: [
      { name: "Flask", icon: faPython },
      { name: "React", icon: faReact },
      { name: "BeautifulSoup", icon: faPython }
    ],
    githubUrl: "https://github.com/blainesilva16/spotify-playlist-py",
    demoContent: <TimelessPlaylistDemo />
  },
  "internet-speed": {
    title: "Internet Speed",
    subtitle: "Check the speed of your Internet using the web scraper Selenium",
    description: "Just click the button and wait a few minutes while the test executes.",
    howToUse: [
      "Click the button and wait a few minutes.",
      "Selenium will open a page to do the interactions and get the download and upload speed.",
      "The results will be shared on this page after the testing is succeeded."
    ],
    howItWasCreated: [
      "It was created with Flask in the backend and React in the frontend.",
      "Selenium does the web scraping to interact with the page.",
      "After the proccess, the speeds of both download and upload will de displayed."
    ],
    techStack: [
      { name: "Flask", icon: faPython },
      { name: "React", icon: faReact },
      { name: "Selenium", icon: faPython }
    ],
    githubUrl: "https://github.com/blainesilva16/internet-speed-py",
    demoContent: <InternetSpeedDemo />
  },
  // "snake-game": {
  //   title: "Snake Game",
  //   subtitle: "The classic game to make the snake eat food and grow",
  //   description: "Control the snake with the arrow keys and avoid hitting the walls.",
  //   howToUse: [
  //     "Click the button and wait a few minutes.",
  //     "Selenium will open a page to do the interactions and get the download and upload speed.",
  //     "The results will be shared on this page after the testing is succeeded."
  //   ],
  //   howItWasCreated: [
  //     "This game was created with Python Turtle, which is part of the Python Tkinter library.",
  //     "The original Python code for the game is relying on Trinket, so that the conversion to display on a webpage can happen.",
  //     "After the proccess, the speeds of both download and upload will de displayed."
  //   ],
  //   techStack: [
  //     { name: "Flask", icon: faPython },
  //     { name: "React", icon: faReact },
  //     { name: "Python Turtle", icon: faPython }
  //   ],
  //   githubUrl: "https://github.com/blainesilva16/snake-game-py",
  //   demoContent: <SnakeGameDemo />
  // }
};

export default projectsData;