# VoteSmart AI – Election Assistant

A production-quality, interactive web application that helps users understand the election process, voting requirements, and timelines in a simple, accessible way.

## 🎯 Purpose

VoteSmart AI empowers voters by providing:
- Personalized voting guides based on age and experience
- Important election dates and deadlines
- Document checklists tailored to voter profile
- AI-powered chat assistant with voting Q&A
- Responsive, accessible design for all users

## ✨ Features

### 1. **User Input Form**
- Age validation (0-120 years)
- State input with sanitization
- First-time voter status selection
- Real-time validation with error messages
- Keyboard navigation support

### 2. **Personalized Voting Guide**
- Dynamic step-by-step guides based on:
  - Age (under 18 vs. 18+)
  - Voter experience (first-time vs. returning)
- Animated card-based layout
- Clear, actionable instructions

### 3. **Election Timeline**
- Mock election dates with descriptions
- Voter registration deadlines
- Early voting periods
- Election day information
- Responsive timeline layout

### 4. **Document Checklist**
- State-specific document requirements
- Government-issued ID requirements
- Voter registration cards
- Proof of residence
- Interactive checkboxes with progress tracking
- Summary updates as you check items

### 5. **Chat Assistant**
- Predefined Q&A system with efficient lookup
- Covers 10+ common voting questions
- Fuzzy matching for question variations
- Suggested question buttons
- Real-time message display with animations

### 6. **Accessibility Features**
- Semantic HTML5 structure
- ARIA labels and descriptions
- Keyboard navigation support
- Color contrast compliance
- Focus indicators for keyboard users
- Reduced motion support
- Dark mode support

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern responsive design with custom properties
- **Vanilla JavaScript (ES6)** - No frameworks or dependencies
- **No external APIs** - All data is mock/local

## 📁 Project Structure

```
votesmart-ai/
├── index.html          # Main HTML structure
├── style.css           # CSS styling and responsive design
├── script.js           # JavaScript logic and interactivity
└── README.md           # This file
```

## 🚀 Getting Started

### Installation

No installation required! Simply open the application in a web browser.

```bash
# Clone or download the project
cd votesmart-ai

# Open in your browser
open index.html
# or
start index.html
```

### Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📖 How to Use

1. **Open the App**: Launch `index.html` in your web browser
2. **Fill Out Your Profile**:
   - Enter your age
   - Enter your state
   - Select if you're a first-time voter
3. **Get Your Personalized Guide**: Click "Get My Voting Guide"
4. **Review Timeline**: See important election dates
5. **Check Documents**: Mark off required documents as you gather them
6. **Ask Questions**: Use the chat assistant for voting questions
7. **Start Over**: Click "Clear Form & Start Over" anytime

## 🔍 Code Quality

### Clean Code Principles
- **Separation of Concerns**: HTML, CSS, and JavaScript are separate
- **DRY (Don't Repeat Yourself)**: Reusable functions and components
- **Meaningful Names**: Clear variable and function naming
- **Comments**: Each function has descriptive comments
- **Consistent Formatting**: Standardized code style throughout

### Key Functions

#### Validation
- `validateAge()` - Validates age input (0-120)
- `validateState()` - Validates state input (2-50 characters)
- `validateFirstTimeVoter()` - Validates dropdown selection
- `validateForm()` - Master validation function
- `sanitizeInput()` - Prevents XSS attacks

#### Rendering
- `renderVotingGuide()` - Creates personalized guide steps
- `renderTimeline()` - Displays election timeline
- `renderChecklist()` - Renders document checklist
- `updateChecklistSummary()` - Updates checklist progress

#### Chat
- `findAnswer()` - Looks up Q&A with fuzzy matching
- `addChatMessage()` - Adds messages to chat
- `handleChatSubmit()` - Processes chat input

#### Event Handling
- `handleFormSubmit()` - Processes form submission
- `handleFormReset()` - Clears form and resets state
- `handleSuggestionClick()` - Handles suggested questions

### Security

- **Input Sanitization**: All user inputs are sanitized to prevent XSS
- **TextContent Usage**: Dynamic content uses `textContent` instead of `innerHTML` for untrusted data
- **No eval()**: No dynamic code execution
- **No External Dependencies**: Reduces attack surface

## 🧪 Testing

The app includes built-in test functions. Open your browser's developer console and run:

### Run All Tests
```javascript
runAllTests()
```

### Individual Tests
```javascript
testAgeValidation()      // Tests age validation logic
testStateValidation()    // Tests state validation logic
testChatFunctionality()  // Tests Q&A system
testChecklistLogic()     // Tests checklist logic
```

### Expected Output
- **Age Validation**: Tests edge cases (empty, valid, negative, over 120, non-numeric)
- **State Validation**: Tests edge cases (empty, valid, short, long)
- **Chat**: Verifies Q&A lookups work with case variations
- **Checklist**: Verifies correct documents for first-time/returning voters

## 📊 Data Structures

### User State
```javascript
const userState = {
  age: null,              // Voter age
  state: null,            // Voter state
  firstTimeVoter: null    // First-time voter flag
};
```

### Knowledge Base
- 10+ predefined Q&A pairs
- Efficient object dictionary for O(1) lookup
- Fuzzy matching for similar questions

### Timeline
- 3 mock election events
- Display dates and descriptions

### Checklist
- 4 document types
- Logic-based rendering based on age and experience

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#2563eb)
- **Success**: Green (#16a34a)
- **Error**: Red (#dc2626)
- **Warning**: Orange (#d97706)
- **Backgrounds**: White, light gray, very light gray
- **Text**: Dark gray, medium gray

### Typography
- Font Family: System fonts (San Francisco, Segoe UI, Roboto)
- Sizes: 0.75rem to 1.875rem
- Weights: 400, 500, 600, 700

### Spacing System
- Base unit: 0.5rem (8px)
- Scale: xs (0.25rem) to 3xl (4rem)

### Responsive Breakpoints
- Desktop: 768px+
- Tablet: 480px - 768px
- Mobile: < 480px

## ♿ Accessibility Features

### Semantic HTML
- `<header>`, `<main>`, `<section>`, `<footer>`
- Proper heading hierarchy (h1 → h3)
- `<label>` elements for form inputs
- `role` attributes for custom elements

### ARIA Attributes
- `aria-label` - Descriptive labels for buttons and inputs
- `aria-required` - Marks required form fields
- `aria-describedby` - Links inputs to error messages
- `aria-live` - Dynamic content announcements
- `role="alert"` - Error message announcements

### Keyboard Navigation
- Tab/Shift+Tab for navigation
- Enter to submit forms
- Enter to send chat messages
- Space to toggle checkboxes
- Arrow keys in dropdowns

### Color Contrast
- All text meets WCAG AA standards (4.5:1 for normal text)
- Error messages are color-coded but also include text
- No information conveyed by color alone

### Motion
- `prefers-reduced-motion` support
- Smooth scrolling (respects browser preferences)
- Minimal animations on smaller screens

### Dark Mode
- CSS custom properties adapt to `prefers-color-scheme: dark`
- Maintains contrast in dark mode

## 📈 Performance Optimizations

1. **DOM Caching**: Elements cached in `DOM` object
2. **Event Delegation**: Where applicable for multiple elements
3. **Minimal Reflows**: Batch DOM updates
4. **CSS Custom Properties**: Efficient theming
5. **No External Resources**: Loads instantly

## 🔄 State Management

- Simple object-based state (`userState`)
- No global state pollution
- Clear initialization and reset

## 🐛 Error Handling

- Form validation with user-friendly messages
- Try-catch patterns in critical functions
- Graceful degradation for missing data
- Default responses in chat if question not found

## 📱 Responsive Design

### Mobile-First Approach
- Base styles for mobile (< 480px)
- Tablet styles (480px - 768px)
- Desktop styles (768px+)

### Key Adjustments
- Font sizes adjust for readability
- Padding/margins reduce on mobile
- Chat interface stacks on mobile
- Suggestion buttons go full-width on small screens

## 🚀 Deployment

To deploy this application:

1. **Static Hosting**: Can be hosted on any static web server
   - GitHub Pages
   - Netlify
   - Vercel
   - AWS S3 + CloudFront
   - Any CDN

2. **No Backend Required**: Completely client-side application

3. **Minimal Assets**:
   - 1 HTML file
   - 1 CSS file
   - 1 JS file
   - Total size < 100KB

## 📝 License

Educational purposes only. For official voting information, visit your state's election office.

## 🤝 Contributing

This is a static educational application. To contribute:
1. Ensure code follows the established style
2. Add tests for new features
3. Update this README
4. Test accessibility with keyboard and screen readers

## 📚 Resources

- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Vote.org](https://www.vote.org/) - Real voting resources
- [Ballotpedia](https://ballotpedia.org/) - Election information

## ✅ Checklist for Production Readiness

- [x] Semantic HTML5
- [x] Responsive CSS3 design
- [x] Vanilla JavaScript (no frameworks)
- [x] Input validation and sanitization
- [x] XSS prevention
- [x] WCAG accessibility compliance
- [x] Keyboard navigation
- [x] Screen reader support
- [x] Mobile responsiveness
- [x] Dark mode support
- [x] Built-in test suite
- [x] Performance optimizations
- [x] Clean, documented code
- [x] Error handling
- [x] No console errors
- [x] Cross-browser compatibility

## 🎉 Getting Started

1. Clone/download this repository
2. Open `index.html` in your browser
3. Fill out the form to see your personalized guide
4. Explore all features
5. Open DevTools console and run `runAllTests()` to verify

---

**VoteSmart AI** – Making voting information accessible to everyone. 🗳️

Last Updated: 2026-04-28
