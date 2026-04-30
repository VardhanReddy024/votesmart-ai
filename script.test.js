const { validateAge, validateState, validateFirstTimeVoter, normalizeQuestion, findAnswer } = require('./script.js');

describe('Validation Functions', () => {
  describe('validateAge', () => {
    it('should reject empty input', () => {
      expect(validateAge('')).toEqual({ isValid: false, error: 'Age is required.' });
      expect(validateAge(null)).toEqual({ isValid: false, error: 'Age is required.' });
    });

    it('should reject non-numeric input', () => {
      expect(validateAge('abc')).toEqual({ isValid: false, error: 'Age must be a number.' });
    });

    it('should reject out of bounds age', () => {
      expect(validateAge('-5')).toEqual({ isValid: false, error: 'Age must be between 0 and 120.' });
      expect(validateAge('150')).toEqual({ isValid: false, error: 'Age must be between 0 and 120.' });
    });

    it('should accept valid age', () => {
      expect(validateAge('25')).toEqual({ isValid: true, error: '' });
      expect(validateAge(18)).toEqual({ isValid: true, error: '' });
      expect(validateAge(0)).toEqual({ isValid: true, error: '' });
      expect(validateAge(120)).toEqual({ isValid: true, error: '' });
    });
  });

  describe('validateState', () => {
    it('should reject empty input', () => {
      expect(validateState('')).toEqual({ isValid: false, error: 'State is required.' });
      expect(validateState('   ')).toEqual({ isValid: false, error: 'State is required.' });
    });

    it('should reject state names that are too short', () => {
      expect(validateState('A')).toEqual({ isValid: false, error: 'State must be at least 2 characters.' });
    });

    it('should reject state names that are too long', () => {
      expect(validateState('A'.repeat(51))).toEqual({ isValid: false, error: 'State must be less than 50 characters.' });
    });

    it('should accept valid state names', () => {
      expect(validateState('CA')).toEqual({ isValid: true, error: '' });
      expect(validateState('California')).toEqual({ isValid: true, error: '' });
    });
  });

  describe('validateFirstTimeVoter', () => {
    it('should reject empty selection', () => {
      expect(validateFirstTimeVoter('')).toEqual({ isValid: false, error: 'Please select an option.' });
      expect(validateFirstTimeVoter(null)).toEqual({ isValid: false, error: 'Please select an option.' });
    });

    it('should reject invalid selection', () => {
      expect(validateFirstTimeVoter('maybe')).toEqual({ isValid: false, error: 'Invalid selection.' });
    });

    it('should accept valid selection', () => {
      expect(validateFirstTimeVoter('yes')).toEqual({ isValid: true, error: '' });
      expect(validateFirstTimeVoter('no')).toEqual({ isValid: true, error: '' });
    });
  });

  describe('normalizeQuestion', () => {
    it('should convert to lower case and trim whitespace', () => {
      expect(normalizeQuestion('  What is voting?  ')).toBe('what is voting');
    });

    it('should remove trailing punctuation', () => {
      expect(normalizeQuestion('Hello!!.')).toBe('hello');
    });
  });

  describe('findAnswer (AI Fallback Knowledge Base)', () => {
    it('should return exact match answer', () => {
      const answer = findAnswer('What documents do I need?');
      expect(answer).toContain('government-issued ID');
    });

    it('should return fuzzy match answer for variations', () => {
      const answer = findAnswer('what documents');
      expect(answer).toContain('government-issued ID');
    });

    it('should return default fallback response for unknown topics', () => {
      const answer = findAnswer('What is the capital of France?');
      expect(answer).toContain("I'm not sure about that");
    });
  });
});
