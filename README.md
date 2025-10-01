
# KuHoot! - Kahoot Hack Tool

A powerful userscript that enhances your Kahoot experience with automated answering, answer highlighting, and advanced configuration options.

## 🚀 Features

- **🤖 Auto Answer**: Automatically answers questions with optimal timing
- **👁️ Show Answers**: Highlights correct (green) and incorrect (red) answers
- **⚡ Points Configuration**: Adjustable points per question (500-1000)
- **🎯 Quiz ID Integration**: Fetch questions directly using Kahoot Quiz ID
- **📊 Real-time Status**: Live question counter and input lag monitoring
- **🎨 Modern Dark UI**: Beautiful floating interface with gradient themes
- **🔧 Advanced Controls**: Minimize, close, and drag functionality
- **⌨️ Keyboard Shortcuts**: Quick hide/show and close commands

## 📦 Installation

### Method 1: Tampermonkey/Greasemonkey
1. Install [Tampermonkey](https://www.tampermonkey.net/) (Chrome/Edge) or [Greasemonkey](https://www.greasespot.net/) (Firefox)
2. Copy the entire `script.js` content
3. Create a new userscript in Tampermonkey/Greasemonkey
4. Paste the code and save
5. Navigate to [kahoot.it](https://kahoot.it) - the script will auto-activate

### Method 2: Browser Console
1. Open Developer Tools (F12) on [kahoot.it](https://kahoot.it)
2. Go to Console tab
3. Paste the script code and press Enter

## 🎮 Usage

### Basic Setup
1. **Enter Quiz ID**: Input the Kahoot quiz ID in the text field
   - Green background = Valid quiz found
   - Red background = Invalid quiz ID
2. **Configure Points**: Use the slider to set desired points per question (500-1000)
3. **Enable Features**: Toggle Auto Answer and/or Show Answers as needed

### Controls
- **🤖 Auto Answer**: Automatically selects correct answers with optimized timing
- **👁️ Show Answers**: Visual highlighting of answer choices
- **Minimize Button (─)**: Collapse the interface to header only
- **Close Button (✕)**: Remove the interface completely

### Keyboard Shortcuts
- `Alt + H`: Hide/Show the entire interface
- `Alt + X`: Close the interface completely

## 🔧 Technical Details

### Supported Question Types
- **Multiple Choice**: Single correct answer selection
- **Multiple Select**: Multiple correct answers with submit
- **Open Ended**: Text-based answers (display only)

### Auto-Answer Algorithm
- Calculates optimal timing based on question duration and point settings
- Adjusts input lag dynamically based on performance
- Accounts for different question types and their specific requirements

### Points Calculation
The script uses an advanced algorithm to maximize points:
```javascript
// Timing calculation for maximum points
time = question.time - question.time / (500/(PPT-500)) - inputLag
```
```markdown
# File: /home/somyajeet/Desktop/README.md
# KuHoot! - Kahoot Hack Tool

A powerful userscript that enhances your Kahoot experience with automated answering, answer highlighting, and advanced configuration options.

## 🚀 Features

- **🤖 Auto Answer**: Automatically answers questions with optimal timing
- **👁️ Show Answers**: Highlights correct (green) and incorrect (red) answers
- **⚡ Points Configuration**: Adjustable points per question (500-1000)
- **🎯 Quiz ID Integration**: Fetch questions directly using Kahoot Quiz ID
- **📊 Real-time Status**: Live question counter and input lag monitoring
- **🎨 Modern Dark UI**: Beautiful floating interface with gradient themes
- **🔧 Advanced Controls**: Minimize, close, and drag functionality
- **⌨️ Keyboard Shortcuts**: Quick hide/show and close commands

## 📦 Installation

### Method 1: Tampermonkey/Greasemonkey
1. Install [Tampermonkey](https://www.tampermonkey.net/) (Chrome/Edge) or [Greasemonkey](https://www.greasespot.net/) (Firefox)
2. Copy the entire `script.js` content
3. Create a new userscript in Tampermonkey/Greasemonkey
4. Paste the code and save
5. Navigate to [kahoot.it](https://kahoot.it) - the script will auto-activate

### Method 2: Browser Console
1. Open Developer Tools (F12) on [kahoot.it](https://kahoot.it)
2. Go to Console tab
3. Paste the script code and press Enter

## 🎮 Usage

### Basic Setup
1. **Enter Quiz ID**: Input the Kahoot quiz ID in the text field
   - Green background = Valid quiz found
   - Red background = Invalid quiz ID
2. **Configure Points**: Use the slider to set desired points per question (500-1000)
3. **Enable Features**: Toggle Auto Answer and/or Show Answers as needed

### Controls
- **🤖 Auto Answer**: Automatically selects correct answers with optimized timing
- **👁️ Show Answers**: Visual highlighting of answer choices
- **Minimize Button (─)**: Collapse the interface to header only
- **Close Button (✕)**: Remove the interface completely

### Keyboard Shortcuts
- `Alt + H`: Hide/Show the entire interface
- `Alt + X`: Close the interface completely

## 🔧 Technical Details

### Supported Question Types
- **Multiple Choice**: Single correct answer selection
- **Multiple Select**: Multiple correct answers with submit
- **Open Ended**: Text-based answers (display only)

### Auto-Answer Algorithm
- Calculates optimal timing based on question duration and point settings
- Adjusts input lag dynamically based on performance
- Accounts for different question types and their specific requirements

### Points Calculation
The script uses an advanced algorithm to maximize points:
```javascript
// Timing calculation for maximum points
time = question.time - question.time / (500/(PPT-500)) - inputLag
```

## 🎨 Interface Features

### Modern Dark Theme
- Gradient backgrounds with glassmorphism effects
- Smooth animations and hover effects
- Responsive design with backdrop blur
- Color-coded status indicators

### Draggable Interface
- Click and drag the header to reposition
- Maintains position during gameplay
- Smooth movement with proper event handling

## ⚙️ Configuration Options

| Setting | Range | Description |
|---------|-------|-------------|
| Points per Question | 500-1000 | Target points for auto-answer timing |
| Input Lag | Auto-adjusted | Compensates for network/system delays |
| Auto Answer | On/Off | Enables automatic answer selection |
| Show Answers | On/Off | Highlights correct/incorrect answers |

## 🔍 Status Monitoring

The interface provides real-time information:
- **Question Counter**: Current question / Total questions
- **Input Lag**: Current compensation delay in milliseconds
- **Quiz Validation**: Visual feedback for quiz ID validity

## 🛡️ Safety Features

- **Dynamic Lag Adjustment**: Prevents detection by varying response times
- **Realistic Timing**: Mimics human response patterns
- **Error Handling**: Graceful failure for invalid quiz IDs
- **Clean Removal**: Complete cleanup when closed

## 🐛 Troubleshooting

### Common Issues
1. **Red Quiz ID Field**: 
   - Verify the quiz ID is correct
   - Ensure the quiz is public/accessible
   
2. **Auto Answer Not Working**:
   - Check if the quiz has started
   - Verify question type is supported
   - Ensure sufficient time remaining

3. **Interface Not Appearing**:
   - Refresh the page
   - Check if userscript is enabled
   - Verify you're on kahoot.it domain

### Performance Tips
- Lower point settings for more reliable auto-answering
- Use Show Answers mode for manual verification
- Monitor input lag for optimal performance

## 📝 Version History

- **v1.0**: Initial release with core functionality
  - Auto-answer system
  - Modern dark UI
  - Quiz ID integration
  - Real-time monitoring

## ⚠️ Disclaimer

This tool is for educational purposes only. Use responsibly and in accordance with your institution's policies. The authors are not responsible for any consequences of using this script.

## 👨‍💻 Author

**ssgamingop**
- GitHub: [https://github.com/ssgamingop](https://github.com/ssgamingop)

## 📄 License

This project is open source. Feel free to modify and distribute according to your needs.

---

**Enjoy your enhanced Kahoot experience! 🎯**
```