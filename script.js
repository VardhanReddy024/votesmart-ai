/**
 * VoteSmart AI – Election Assistant
 * Main JavaScript Module
 * Handles form validation, guide rendering, chat, and timeline
 */

// ============================================
// 1. STATE & DATA STRUCTURES
// ============================================

// User state object - stores current voter information
const userState = {
  age: null,
  state: null,
  firstTimeVoter: null,
};

// Mock election timeline data
const ELECTION_TIMELINE = [
  {
    date: '2026-10-01',
    displayDate: 'October 1, 2026',
    title: 'Voter Registration Deadline',
    description: 'Last day to register to vote for the general election.',
  },
  {
    date: '2026-10-15',
    displayDate: 'October 15, 2026',
    title: 'Early Voting Begins',
    description: 'Start of early in-person voting period (varies by state).',
  },
  {
    date: '2026-11-03',
    displayDate: 'November 3, 2026',
    title: 'Election Day',
    description: 'General Election Day. Polls open typically 6am-8pm.',
  },
];

// Document checklist items with state-specific logic
const DOCUMENT_CHECKLIST = [
  {
    id: 'id-required',
    name: 'Government-Issued ID',
    description: 'Driver\'s license, passport, or state ID',
    alwaysRequired: true,
  },
  {
    id: 'voter-registration',
    name: 'Voter Registration Card',
    description: 'Your registration confirmation or card (recommended)',
    alwaysRequired: false,
  },
  {
    id: 'proof-residence',
    name: 'Proof of Residence',
    description: 'Utility bill, lease, or bank statement with current address',
    alwaysRequired: false,
  },
  {
    id: 'registration-form',
    name: 'Registration Form (First-Time Voters)',
    description: 'Complete registration form if registering on election day',
    alwaysRequired: false,
  },
];

// Chat Q&A knowledge base - efficient dictionary lookup
const CHAT_KNOWLEDGE_BASE = {
  'what documents do i need?': {
    question: 'What documents do I need?',
    answer:
      'You\'ll typically need a government-issued ID (driver\'s license or passport). Some states also accept voter registration cards or proof of residence. Check your state\'s specific requirements.',
  },
  'where can i vote?': {
    question: 'Where can I vote?',
    answer:
      'Your polling location depends on your address and precinct. Check your voter registration card, your state\'s election website, or use the "Poll Finder" tool on vote.org.',
  },
  'can i vote early?': {
    question: 'Can I vote early?',
    answer:
      'Most states offer early voting. Early voting periods typically begin 2-4 weeks before Election Day. Visit your state election office website to find early voting locations and dates.',
  },
  'what is voter registration?': {
    question: 'What is voter registration?',
    answer:
      'Voter registration is the process of enrolling on the official voter roll. You must register to vote in elections. Registration deadlines vary by state, typically 15-30 days before elections.',
  },
  'am i eligible to vote?': {
    question: 'Am I eligible to vote?',
    answer:
      'You must be a U.S. citizen, at least 18 years old (or 17 in some states for registration), and a resident of your state. Some states have additional requirements. Check your state\'s election office.',
  },
  'how do i register to vote?': {
    question: 'How do I register to vote?',
    answer:
      'You can register online, by mail, or in person at your local election office, DMV, or library. Visit your state\'s election website to find the registration link or form.',
  },
  'what if i cannot vote in person?': {
    question: 'What if I cannot vote in person?',
    answer:
      'Most states offer mail-in voting or absentee ballots. Request your ballot at least 1-2 weeks before Election Day. Some states automatically mail ballots to all registered voters.',
  },
  'how long does voting take?': {
    question: 'How long does voting take?',
    answer:
      'Voting typically takes 5-15 minutes depending on wait times and ballot complexity. Arrive early or use early voting to avoid lines.',
  },
  'can a first-time voter bring someone?': {
    question: 'Can a first-time voter bring someone?',
    answer:
      'Yes, you can bring a family member or friend for moral support. They must stay outside the voting booth. Election officials can answer questions inside the booth.',
  },
  'what is a polling place?': {
    question: 'What is a polling place?',
    answer:
      'A polling place is a designated location where registered voters cast their ballots. It\'s typically a school, community center, or library in your precinct.',
  },
};

// Personalized voting guide steps
const VOTING_GUIDE_STEPS = {
  firstTime: [
    {
      title: 'Verify Your Registration',
      description:
        'Check that you\'re registered to vote before the deadline (usually 15-30 days before elections).',
    },
    {
      title: 'Locate Your Polling Place',
      description:
        'Find where you can vote on Election Day using your voter registration card or state election website.',
    },
    {
      title: 'Prepare Your Documents',
      description:
        'Gather your government-issued ID and any other required documents for your state.',
    },
    {
      title: 'Arrive Early',
      description:
        'Polls open early (typically 6am). Arriving early helps you avoid long lines.',
    },
    {
      title: 'Review the Ballot',
      description:
        'Take time to review your ballot and all candidates. You can ask poll workers for help.',
    },
    {
      title: 'Mark Your Choices',
      description:
        'Follow the instructions to mark your selections. Double-check before submitting.',
    },
    {
      title: 'Cast Your Ballot',
      description:
        'Submit your ballot. You\'ll receive confirmation that your vote was recorded.',
    },
  ],
  returningVoter: [
    {
      title: 'Check Voter Registration',
      description:
        'Verify your registration is still active, especially if you\'ve moved.',
    },
    {
      title: 'Review Ballot Preview',
      description:
        'Many states provide sample ballots online. Review candidates and measures before voting.',
    },
    {
      title: 'Choose Your Voting Method',
      description:
        'Decide if you\'ll vote in person, early, or by mail. Make sure to meet deadlines.',
    },
    {
      title: 'Gather Documents',
      description:
        'Bring your ID and voter registration card (if available) to your polling place.',
    },
    {
      title: 'Vote with Confidence',
      description:
        'You know the process. Go vote during your preferred time window.',
    },
  ],
  underage: [
    {
      title: 'Prepare for 18',
      description:
        'You can pre-register in some states. Check your state\'s election office for details.',
    },
    {
      title: 'Learn About Voting',
      description:
        'Use resources like VoteSmart AI to understand the process before you turn 18.',
    },
    {
      title: 'Keep Documents Ready',
      description:
        'Have your ID ready for when you\'re eligible. You might need to register on or before Election Day.',
    },
    {
      title: 'Stay Informed',
      description:
        'Keep up with voter registration deadlines for elections after you turn 18.',
    },
  ],
};

// ============================================
// 2. DOM ELEMENT CACHING
// ============================================

// Cache DOM elements for performance
const DOM = {
  // Form elements
  voterForm: document.getElementById('voterForm'),
  ageInput: document.getElementById('ageInput'),
  stateInput: document.getElementById('stateInput'),
  firstTimeVoterSelect: document.getElementById('firstTimeVoter'),
  ageError: document.getElementById('ageError'),
  stateError: document.getElementById('stateError'),
  voterStatusError: document.getElementById('voterStatusError'),

  // Guide section
  guideSection: document.getElementById('guideSection'),
  guideContainer: document.getElementById('guideContainer'),

  // Timeline
  timelineContainer: document.getElementById('timelineContainer'),

  // Checklist
  checklistSection: document.getElementById('checklistSection'),
  checklistContainer: document.getElementById('checklistContainer'),

  // Eligibility
  eligibilitySection: document.getElementById('eligibilitySection'),
  eligibilityContainer: document.getElementById('eligibilityContainer'),

  // Chat
  chatMessages: document.getElementById('chatMessages'),
  chatInput: document.getElementById('chatInput'),
  chatSendBtn: document.getElementById('chatSendBtn'),

  // Buttons
  resetBtn: document.getElementById('resetBtn'),
};

// ============================================
// 3. VALIDATION FUNCTIONS
// ============================================

/**
 * Validate age input
 * @param {string|number} age - The age value to validate
 * @returns {object} - { isValid: boolean, error: string }
 */
function validateAge(age) {
  const ageNum = parseInt(age, 10);

  if (!age || age === '') {
    return { isValid: false, error: 'Age is required.' };
  }

  if (isNaN(ageNum)) {
    return { isValid: false, error: 'Age must be a number.' };
  }

  if (ageNum < 0 || ageNum > 120) {
    return { isValid: false, error: 'Age must be between 0 and 120.' };
  }

  return { isValid: true, error: '' };
}

/**
 * Validate state input
 * @param {string} state - The state value to validate
 * @returns {object} - { isValid: boolean, error: string }
 */
function validateState(state) {
  if (!state || state.trim() === '') {
    return { isValid: false, error: 'State is required.' };
  }

  if (state.trim().length < 2) {
    return { isValid: false, error: 'State must be at least 2 characters.' };
  }

  if (state.trim().length > 50) {
    return { isValid: false, error: 'State must be less than 50 characters.' };
  }

  return { isValid: true, error: '' };
}

/**
 * Validate first-time voter selection
 * @param {string} value - The selected value
 * @returns {object} - { isValid: boolean, error: string }
 */
function validateFirstTimeVoter(value) {
  if (!value || value === '') {
    return { isValid: false, error: 'Please select an option.' };
  }

  if (value !== 'yes' && value !== 'no') {
    return { isValid: false, error: 'Invalid selection.' };
  }

  return { isValid: true, error: '' };
}

/**
 * Sanitize user input to prevent XSS
 * Uses textContent to safely escape HTML entities without double-encoding
 * @param {string} input - The input string to sanitize
 * @returns {string} - Safely escaped text for safe innerHTML insertion
 */
function sanitizeInput(input) {
  const span = document.createElement('span');
  span.textContent = input;
  return span.innerHTML;
}

/**
 * Validate and process form
 * @returns {boolean} - True if form is valid, false otherwise
 */
function validateForm() {
  const age = DOM.ageInput.value;
  const state = DOM.stateInput.value;
  const firstTimeVoter = DOM.firstTimeVoterSelect.value;

  // Validate individual fields
  const ageValidation = validateAge(age);
  const stateValidation = validateState(state);
  const voterValidation = validateFirstTimeVoter(firstTimeVoter);

  // Display error messages
  DOM.ageError.textContent = ageValidation.error;
  DOM.stateError.textContent = stateValidation.error;
  DOM.voterStatusError.textContent = voterValidation.error;

  // Return true only if all validations pass
  return ageValidation.isValid && stateValidation.isValid && voterValidation.isValid;
}

// ============================================
// 4. GUIDE RENDERING
// ============================================

/**
 * Render personalized voting guide
 * Determines which guide to show based on user age and experience
 */
function renderVotingGuide() {
  const age = parseInt(DOM.ageInput.value, 10);
  const isFirstTime = DOM.firstTimeVoterSelect.value === 'yes';

  let guideSteps;

  if (age < 18) {
    guideSteps = VOTING_GUIDE_STEPS.underage;
  } else if (isFirstTime) {
    guideSteps = VOTING_GUIDE_STEPS.firstTime;
  } else {
    guideSteps = VOTING_GUIDE_STEPS.returningVoter;
  }

  // Clear previous content
  DOM.guideContainer.innerHTML = '';
  // Set list role for accessibility
  DOM.guideContainer.setAttribute('role', 'list');

  // Render each step with animation
  guideSteps.forEach((step, index) => {
    const stepElement = document.createElement('div');
    stepElement.className = 'guide__step';
    stepElement.setAttribute('role', 'listitem');

    const stepHTML = `
      <div class="guide__step-number">${index + 1}</div>
      <div>
        <h3 class="guide__step-title">${sanitizeInput(step.title)}</h3>
        <p class="guide__step-description">${sanitizeInput(step.description)}</p>
      </div>
    `;

    stepElement.innerHTML = stepHTML;
    DOM.guideContainer.appendChild(stepElement);
  });

  // Show the guide section
  DOM.guideSection.classList.remove('hidden');
  DOM.guideSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ============================================
// 5. TIMELINE RENDERING
// ============================================

/**
 * Render election timeline
 * Displays all important election dates
 */
function renderTimeline() {
  // Clear previous content
  DOM.timelineContainer.innerHTML = '';
  // Set list role for accessibility
  DOM.timelineContainer.setAttribute('role', 'list');

  // Render each timeline event
  ELECTION_TIMELINE.forEach((event, index) => {
    const eventElement = document.createElement('div');
    eventElement.className = 'timeline__event';
    eventElement.setAttribute('role', 'listitem');

    const eventHTML = `
      <div class="timeline__date">${event.displayDate}</div>
      <div class="timeline__content">
        <h3 class="timeline__event-title">${sanitizeInput(event.title)}</h3>
        <p class="timeline__event-description">${sanitizeInput(event.description)}</p>
      </div>
    `;

    eventElement.innerHTML = eventHTML;
    DOM.timelineContainer.appendChild(eventElement);
  });
}

// ============================================
// 6. CHECKLIST RENDERING
// ============================================

/**
 * Render document checklist
 * Shows required documents based on user profile
 * Uses event delegation to prevent memory leaks from repeated renders
 */
function renderChecklist() {
  const age = parseInt(DOM.ageInput.value, 10);
  const isFirstTime = DOM.firstTimeVoterSelect.value === 'yes';

  // Clear previous content
  DOM.checklistContainer.innerHTML = '';

  // Create a wrapper for checklist items
  const checklistWrapper = document.createElement('div');
  checklistWrapper.className = 'checklist';
  checklistWrapper.setAttribute('role', 'list');

  // Render each checklist item
  DOCUMENT_CHECKLIST.forEach((item) => {
    // Determine if item should be required
    const isRequired =
      item.alwaysRequired ||
      (isFirstTime && item.id === 'registration-form') ||
      (age < 18 && item.id === 'registration-form');

    const itemElement = document.createElement('div');
    itemElement.className = 'checklist__item';
    itemElement.setAttribute('role', 'listitem');
    itemElement.setAttribute('data-item-id', item.id);

    const ariaLabel = `Mark ${sanitizeInput(item.name)} as checked${isRequired ? ' (required)' : ''}`;
    const itemHTML = `
      <input
        type="checkbox"
        id="checkbox-${item.id}"
        class="checklist__checkbox"
        aria-label="${ariaLabel}"
        ${isRequired ? 'aria-required="true"' : ''}
        data-required="${isRequired}"
      >
      <div class="checklist__content">
        <label for="checkbox-${item.id}" class="checklist__label">
          ${sanitizeInput(item.name)}
          ${isRequired ? '<span aria-label="required" class="checklist__required">*</span>' : ''}
        </label>
        <p class="checklist__description">${sanitizeInput(item.description)}</p>
      </div>
    `;

    itemElement.innerHTML = itemHTML;
    checklistWrapper.appendChild(itemElement);
  });

  // Add summary element
  const summaryElement = document.createElement('div');
  summaryElement.className = 'checklist__summary';
  summaryElement.id = 'checklistSummary';
  summaryElement.setAttribute('role', 'status');
  summaryElement.setAttribute('aria-live', 'polite');
  summaryElement.textContent = 'Check off items as you gather them.';

  checklistWrapper.appendChild(summaryElement);

  // Add wrapper to container
  DOM.checklistContainer.appendChild(checklistWrapper);

  // Use event delegation for checkbox changes to avoid memory leaks
  // Remove previous listener if it exists
  DOM.checklistContainer.removeEventListener('change', handleChecklistChange);
  // Add single delegated listener to container
  DOM.checklistContainer.addEventListener('change', handleChecklistChange);

  // Show checklist section
  DOM.checklistSection.classList.remove('hidden');
}

/**
 * Handle checklist checkbox changes via event delegation
 * Prevents memory leaks from multiple render cycles
 */
function handleChecklistChange(event) {
  if (event.target.classList.contains('checklist__checkbox')) {
    const checkboxItem = event.target.closest('.checklist__item');
    if (checkboxItem) {
      checkboxItem.classList.toggle('checklist__item--checked');
      updateChecklistSummary();
    }
  }
}

/**
 * Update checklist summary with current progress
 */
function updateChecklistSummary() {
  const checkboxes = document.querySelectorAll('.checklist__checkbox');
  const checked = document.querySelectorAll('.checklist__checkbox:checked');
  const total = checkboxes.length;
  const percentage = Math.round((checked.length / total) * 100);

  const summaryElement = document.getElementById('checklistSummary');
  summaryElement.textContent = `Progress: ${checked.length} of ${total} items (${percentage}%)`;

  if (checked.length === total) {
    summaryElement.textContent += ' ✓ You\'re all set!';
  }
}

// ============================================
// 6. VOTER ELIGIBILITY CHECKING
// ============================================

/**
 * Check voter eligibility based on age and user info
 * @returns {object} - { isEligible: boolean, status: string, message: string, icon: string }
 */
function checkVoterEligibility() {
  const age = parseInt(DOM.ageInput.value, 10);
  const state = DOM.stateInput.value.trim();
  
  // Check age requirement
  if (age >= 18) {
    return {
      isEligible: true,
      status: 'Eligible to Vote',
      message: `You're ${age} years old and eligible to vote in ${state}! Make sure you're registered before the voting deadline.`,
      icon: '✓',
    };
  } else if (age >= 16) {
    return {
      isEligible: false,
      status: 'Not Yet Eligible',
      message: `You're ${age} years old. You'll be eligible to vote in ${18 - age} year(s)! You may be able to pre-register in some states.`,
      icon: '⏳',
    };
  } else {
    return {
      isEligible: false,
      status: 'Too Young',
      message: `You're ${age} years old. You must be at least 18 to vote. Check back in ${18 - age} year(s)!`,
      icon: '📅',
    };
  }
}

/**
 * Render voter eligibility status
 * Displays eligibility badge with status and helpful message
 */
function renderEligibilityStatus() {
  const eligibility = checkVoterEligibility();
  
  DOM.eligibilityContainer.innerHTML = '';
  
  const eligibilityElement = document.createElement('div');
  eligibilityElement.className = `eligibility__card eligibility__card--${eligibility.isEligible ? 'eligible' : 'ineligible'}`;
  eligibilityElement.setAttribute('role', 'status');
  eligibilityElement.setAttribute('aria-live', 'polite');
  
  const statusHTML = `
    <div class="eligibility__badge">
      <span class="eligibility__icon" aria-label="${eligibility.status}">${eligibility.icon}</span>
      <h3 class="eligibility__status">${eligibility.status}</h3>
    </div>
    <p class="eligibility__message">${sanitizeInput(eligibility.message)}</p>
    ${eligibility.isEligible ? `
      <div class="eligibility__requirements">
        <h4 class="eligibility__req-title">Your Requirements:</h4>
        <ul class="eligibility__list">
          <li>✓ Age: 18+ (You're ${parseInt(DOM.ageInput.value, 10)})</li>
          <li>✓ State: ${sanitizeInput(DOM.stateInput.value)}</li>
          <li>○ Registered to vote (check before voting)</li>
          <li>○ U.S. Citizen (required)</li>
        </ul>
      </div>
    ` : `
      <div class="eligibility__requirements">
        <h4 class="eligibility__req-title">When You're Eligible:</h4>
        <ul class="eligibility__list">
          <li>Must be at least 18 years old (you're ${parseInt(DOM.ageInput.value, 10)})</li>
          <li>Must be a U.S. citizen</li>
          <li>Must be a resident of the state</li>
          <li>Must be registered to vote</li>
        </ul>
      </div>
    `}
  `;
  
  eligibilityElement.innerHTML = statusHTML;
  DOM.eligibilityContainer.appendChild(eligibilityElement);
  
  // Show eligibility section
  DOM.eligibilitySection.classList.remove('hidden');
}

// ============================================
// 7. CHAT FUNCTIONALITY
// ============================================

/**
 * Normalize user question for lookup
 * @param {string} question - The user's question
 * @returns {string} - Normalized question
 */
function normalizeQuestion(question) {
  return question.toLowerCase().trim().replace(/[?!.]+$/, '');
}

/**
 * Find answer in knowledge base
 * Uses both exact and fuzzy matching
 * @param {string} userQuestion - The user's question
 * @returns {string|null} - The answer or null if not found
 */
function findAnswer(userQuestion) {
  const normalizedQuestion = normalizeQuestion(userQuestion);

  // Try exact match first
  if (CHAT_KNOWLEDGE_BASE[normalizedQuestion]) {
    return CHAT_KNOWLEDGE_BASE[normalizedQuestion].answer;
  }

  // Try substring matching for fuzzy search
  for (const [key, value] of Object.entries(CHAT_KNOWLEDGE_BASE)) {
    if (normalizedQuestion.includes(key) || key.includes(normalizedQuestion)) {
      return value.answer;
    }
  }

  // Return default response if no match
  return "I'm not sure about that. Try asking about documents, voting locations, early voting, voter registration, eligibility, registration process, mail-in voting, or voting time.";
}

/**
 * Add message to chat (user or assistant)
 * @param {string} message - The message text
 * @param {string} sender - 'user' or 'assistant'
 */
function addChatMessage(message, sender) {
  const messageElement = document.createElement('div');
  messageElement.className = `chat__message chat__message--${sender}`;
  messageElement.setAttribute('role', 'article');

  const messageText = document.createElement('p');
  messageText.className = 'chat__message-text';
  messageText.textContent = message;

  messageElement.appendChild(messageText);
  DOM.chatMessages.appendChild(messageElement);

  // Auto-scroll to latest message
  DOM.chatMessages.scrollTop = DOM.chatMessages.scrollHeight;
}

/**
 * Handle chat message submission
 */
function handleChatSubmit() {
  const message = DOM.chatInput.value.trim();

  if (!message) {
    return;
  }

  // Add user message
  addChatMessage(message, 'user');

  // Find and add assistant response
  const answer = findAnswer(message);
  setTimeout(() => {
    addChatMessage(answer, 'assistant');
  }, 300);

  // Clear input
  DOM.chatInput.value = '';
  DOM.chatInput.focus();
}

/**
 * Handle suggestion button clicks
 * Validates suggestion before processing to prevent injection
 * @param {string} question - The suggested question
 */
function handleSuggestionClick(question) {
  // Validate that question is a string and not empty
  if (typeof question !== 'string' || !question.trim()) {
    console.warn('Invalid suggestion question:', question);
    return;
  }
  
  DOM.chatInput.value = question;
  handleChatSubmit();
}

// ============================================
// 8. FORM HANDLING
// ============================================

/**
 * Handle form submission
 * Validates and processes user input
 */
function handleFormSubmit(event) {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  // Update user state
  userState.age = parseInt(DOM.ageInput.value, 10);
  userState.state = DOM.stateInput.value;
  userState.firstTimeVoter = DOM.firstTimeVoterSelect.value === 'yes';

  // Render dynamic content
  renderEligibilityStatus();
  renderVotingGuide();
  renderChecklist();
}

/**
 * Handle form reset
 */
function handleFormReset() {
  // Clear form inputs
  DOM.voterForm.reset();

  // Clear error messages
  DOM.ageError.textContent = '';
  DOM.stateError.textContent = '';
  DOM.voterStatusError.textContent = '';

  // Hide dynamic sections
  DOM.guideSection.classList.add('hidden');
  DOM.eligibilitySection.classList.add('hidden');
  DOM.checklistSection.classList.add('hidden');

  // Clear chat messages
  DOM.chatMessages.innerHTML = '';

  // Reset user state
  userState.age = null;
  userState.state = null;
  userState.firstTimeVoter = null;

  // Focus on first input
  DOM.ageInput.focus();
}

// ============================================
// 9. EVENT LISTENERS
// ============================================

/**
 * Initialize all event listeners
 */
function initializeEventListeners() {
  // Form submission
  DOM.voterForm.addEventListener('submit', handleFormSubmit);

  // Chat functionality
  DOM.chatSendBtn.addEventListener('click', handleChatSubmit);
  DOM.chatInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      handleChatSubmit();
    }
  });

  // Suggestion buttons
  document.querySelectorAll('.chat__suggestion-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const question = button.getAttribute('data-question');
      handleSuggestionClick(question);
    });
  });

  // Reset button
  DOM.resetBtn.addEventListener('click', handleFormReset);

  // Real-time validation
  DOM.ageInput.addEventListener('blur', () => {
    const validation = validateAge(DOM.ageInput.value);
    DOM.ageError.textContent = validation.error;
  });

  DOM.stateInput.addEventListener('blur', () => {
    const validation = validateState(DOM.stateInput.value);
    DOM.stateError.textContent = validation.error;
  });
}

// ============================================
// 10. TESTING FUNCTIONS
// ============================================

/**
 * Test age validation
 */
function testAgeValidation() {
  console.group('Test: Age Validation');

  const testCases = [
    { input: '', expected: false, description: 'Empty input' },
    { input: '25', expected: true, description: 'Valid age (25)' },
    { input: '17', expected: true, description: 'Valid age (17)' },
    { input: '-5', expected: false, description: 'Negative age' },
    { input: '150', expected: false, description: 'Age over 120' },
    { input: 'abc', expected: false, description: 'Non-numeric input' },
  ];

  testCases.forEach((testCase) => {
    const result = validateAge(testCase.input);
    const passed = result.isValid === testCase.expected;
    console.log(
      `${passed ? '✓' : '✗'} ${testCase.description}: ${result.isValid} (expected ${testCase.expected})`
    );
  });

  console.groupEnd();
}

/**
 * Test state validation
 */
function testStateValidation() {
  console.group('Test: State Validation');

  const testCases = [
    { input: '', expected: false, description: 'Empty input' },
    { input: 'California', expected: true, description: 'Valid state' },
    { input: 'NY', expected: true, description: 'Short state name' },
    { input: 'a', expected: false, description: 'Single character' },
    { input: 'A'.repeat(51), expected: false, description: 'Over 50 characters' },
  ];

  testCases.forEach((testCase) => {
    const result = validateState(testCase.input);
    const passed = result.isValid === testCase.expected;
    console.log(
      `${passed ? '✓' : '✗'} ${testCase.description}: ${result.isValid} (expected ${testCase.expected})`
    );
  });

  console.groupEnd();
}

/**
 * Test chat functionality
 */
function testChatFunctionality() {
  console.group('Test: Chat Q&A System');

  const testQuestions = [
    'What documents do I need?',
    'where can i vote?',
    'CAN I VOTE EARLY?',
    'unknown question about voting',
  ];

  testQuestions.forEach((question) => {
    const answer = findAnswer(question);
    console.log(`Q: ${question}`);
    console.log(`A: ${answer.substring(0, 50)}...`);
    console.log('---');
  });

  console.groupEnd();
}

/**
 * Test checklist logic
 */
function testChecklistLogic() {
  console.group('Test: Checklist Logic');

  // Simulate first-time voter checklist
  const firstTimeVoterChecklist = DOCUMENT_CHECKLIST.filter(
    (item) => item.alwaysRequired || item.id === 'registration-form'
  );

  console.log(`First-time voter required items: ${firstTimeVoterChecklist.length}`);
  firstTimeVoterChecklist.forEach((item) => {
    console.log(`  - ${item.name}`);
  });

  // Simulate returning voter checklist
  const returningVoterChecklist = DOCUMENT_CHECKLIST.filter((item) => item.alwaysRequired);

  console.log(`Returning voter required items: ${returningVoterChecklist.length}`);
  returningVoterChecklist.forEach((item) => {
    console.log(`  - ${item.name}`);
  });

  console.groupEnd();
}

/**
 * Run all tests
 */
function runAllTests() {
  console.log('='.repeat(50));
  console.log('VoteSmart AI – Test Suite');
  console.log('='.repeat(50));

  testAgeValidation();
  testStateValidation();
  testChatFunctionality();
  testChecklistLogic();

  console.log('='.repeat(50));
  console.log('All tests completed. Check console for results.');
  console.log('='.repeat(50));
}

// ============================================
// 11. INITIALIZATION
// ============================================

/**
 * Initialize the application
 */
function initializeApp() {
  // Render timeline immediately (doesn't depend on form)
  renderTimeline();

  // Set up event listeners
  initializeEventListeners();

  // Log initialization
  console.log('VoteSmart AI initialized successfully');
  console.log('Run runAllTests() in console to test the application');
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// ============================================
// 12. EXPORT FOR TESTING (optional)
// ============================================

// Make test functions globally accessible
window.runAllTests = runAllTests;
window.testAgeValidation = testAgeValidation;
window.testStateValidation = testStateValidation;
window.testChatFunctionality = testChatFunctionality;
window.testChecklistLogic = testChecklistLogic;
