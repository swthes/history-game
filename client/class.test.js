
const { shuffleArray, Questions } = require('./class');


describe('shuffleArray', () => {
    it('should shuffle an array', () => {
      const inputArray = [1, 2, 3, 4, 5];
      const shuffledArray = shuffleArray([...inputArray]); 
      expect(shuffledArray).not.toEqual(inputArray); 
    });
  });


  describe('Questions class', () => {
    // Test the checkanswer method
    describe('checkanswer', () => {
      it('should return true if the provided answer is correct', () => {
        const question = new Questions(
          6,
          'History-Tudor',
          "What is the correct order of your wives' cause of death?",
          [
            "Divorced, beheaded survived, divorced, beheaded, died",
            "Beheaded, divorced, died, beheaded, divorced, died",
            "Beheaded, divorced, died, beheaded, divorced, survived",
            "Divorced, beheaded, died, divorced, beheaded, survived"
          ],
          "Divorced, beheaded, died, divorced, beheaded, survived"
        );
        expect(question.checkanswer("Divorced, beheaded, died, divorced, beheaded, survived")).toBe(true);
      });
  
      it('should return false if the provided answer is incorrect', () => {
        const question = new Questions(
          6,
          'History-Tudor',
          "What is the correct order of your wives' cause of death?",
          [
            "Divorced, beheaded survived, divorced, beheaded, died",
            "Beheaded, divorced, died, beheaded, divorced, died",
            "Beheaded, divorced, died, beheaded, divorced, survived",
            "Divorced, beheaded, died, divorced, beheaded, survived"
          ],
          "Divorced, beheaded, died, divorced, beheaded, survived"
        );
        expect(question.checkanswer("Beheaded, divorced, died, beheaded, divorced, survived")).toBe(false);
      });
    });
  
    
    // Test the getCategory method
    describe('getCategory', () => {
      it('should return the category of the question', () => {
        const question = new Questions(
          6,
          'History-Tudor',
          "What is the correct order of your wives' cause of death?",
          [
            "Divorced, beheaded survived, divorced, beheaded, died",
            "Beheaded, divorced, died, beheaded, divorced, died",
            "Beheaded, divorced, died, beheaded, divorced, survived",
            "Divorced, beheaded, died, divorced, beheaded, survived"
          ],
          "Divorced, beheaded, died, divorced, beheaded, survived"
        );
        expect(question.getCategory()).toBe('History-Tudor');
      });
    });
  
    // Test the getQuestion method
    describe('getQuestion', () => {
      it('should return the question text', () => {
        const question = new Questions(
          6,
          'History-Tudor',
          "What is the correct order of your wives' cause of death?",
          [
            "Divorced, beheaded survived, divorced, beheaded, died",
            "Beheaded, divorced, died, beheaded, divorced, died",
            "Beheaded, divorced, died, beheaded, divorced, survived",
            "Divorced, beheaded, died, divorced, beheaded, survived"
          ],
          "Divorced, beheaded, died, divorced, beheaded, survived"
        );
        expect(question.getQuestion()).toBe("What is the correct order of your wives' cause of death?");
      });
    });
  
    describe('getId', () => {
      it('should return the ID of the question', () => {
        const question = new Questions(
          6,
          'History-Tudor',
          "What is the correct order of your wives' cause of death?",
          [
            "Divorced, beheaded survived, divorced, beheaded, died",
            "Beheaded, divorced, died, beheaded, divorced, died",
            "Beheaded, divorced, died, beheaded, divorced, survived",
            "Divorced, beheaded, died, divorced, beheaded, survived"
          ],
          "Divorced, beheaded, died, divorced, beheaded, survived"
        );
        expect(question.getId()).toBe(6);
      });
    });
  });  