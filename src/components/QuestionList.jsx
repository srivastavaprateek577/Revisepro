import { motion } from 'framer-motion'
import QuestionCard from './QuestionCard'
import './QuestionList.css'

const QuestionList = ({ questions }) => {
    if (questions.length === 0) {
        return (
            <div className="empty-state">
                <h3>No questions found</h3>
                <p>Try adjusting your search or filters.</p>
            </div>
        )
    }

    return (
        <motion.div
            className="question-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {questions.map((question, index) => (
                <QuestionCard
                    key={question.id}
                    question={question}
                    index={index}
                />
            ))}
        </motion.div>
    )
}

export default QuestionList
