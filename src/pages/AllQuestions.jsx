import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SearchBar from '../components/SearchBar'
import QuestionList from '../components/QuestionList'
import { questions, categories } from '../data/questions'

const AllQuestions = () => {
    const [filteredQuestions, setFilteredQuestions] = useState(questions)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleSearch = (results) => {
        setFilteredQuestions(results)
    }

    return (
        <div className="all-questions-page container">
            <motion.div
                className="page-header"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1>All <span className="gradient-text">Questions</span></h1>
                <p>Browse and search through our complete collection of programming challenges.</p>
            </motion.div>

            <SearchBar
                questions={questions}
                onSearch={handleSearch}
                categories={categories}
            />

            <div className="questions-container">
                <div className="results-count">
                    Showing {filteredQuestions.length} questions
                </div>
                <QuestionList questions={filteredQuestions} />
            </div>
        </div>
    )
}

export default AllQuestions
