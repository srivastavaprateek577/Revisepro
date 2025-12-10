import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, Code } from 'lucide-react'
import QuestionList from '../components/QuestionList'
import { questions, categories } from '../data/questions'

const Category = () => {
    const { categoryId } = useParams()
    const [categoryQuestions, setCategoryQuestions] = useState([])
    const [categoryInfo, setCategoryInfo] = useState(null)

    useEffect(() => {
        const filtered = questions.filter(q => q.categoryId === categoryId)
        setCategoryQuestions(filtered)

        const info = categories.find(c => c.id === categoryId)
        setCategoryInfo(info)

        window.scrollTo(0, 0)
    }, [categoryId])

    if (!categoryInfo) {
        return (
            <div className="container" style={{ paddingTop: '8rem', textAlign: 'center' }}>
                <h2>Category not found</h2>
                <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                    Go Home
                </Link>
            </div>
        )
    }

    return (
        <div className="category-page container">
            <motion.div
                className="page-header"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Link to="/" className="back-link">
                    <ChevronLeft size={20} />
                    Back to Modules
                </Link>

                <div className="category-hero">
                    <div className="category-icon-large">
                        <Code size={40} />
                    </div>
                    <div>
                        <h1>{categoryInfo.name}</h1>
                        <p>{categoryInfo.description}</p>
                    </div>
                </div>
            </motion.div>

            <div className="questions-container">
                <QuestionList questions={categoryQuestions} />
            </div>
        </div>
    )
}

export default Category
