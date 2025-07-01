
import { createContext, useContext, useReducer, ReactNode } from "react";
import { QuizContextType, QuizState, initialState } from "./types/quizTypes";
import { quizReducer } from "./reducers/quizReducer";

console.log('🔄 QuizContext module loading...');

// Create the context with undefined as initial value
const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  console.log('🚀 QuizProvider rendering...');
  
  try {
    const [state, dispatch] = useReducer(quizReducer, initialState);
    console.log('✅ useReducer initialized successfully', { state });
    
    // Function to reset the quiz
    const resetQuiz = () => {
      console.log('🔄 Resetting quiz...');
      dispatch({ type: "RESET_QUIZ" });
    };

    const contextValue = { state, dispatch, resetQuiz };
    console.log('✅ Context value created', contextValue);

    return (
      <QuizContext.Provider value={contextValue}>
        {children}
      </QuizContext.Provider>
    );
  } catch (error) {
    console.error('❌ Error in QuizProvider:', error);
    return <div>Error loading quiz: {String(error)}</div>;
  }
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};

// Re-export the helper function from formatHelpers
export { getSkinTypeFormatted } from "./utils/formatHelpers";
