import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, ChevronDown, ChevronUp, Code, Hash, X } from 'lucide-react'
import toast from 'react-hot-toast'
import './QuestionCard.css'

const QuestionCard = ({ question, index }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [isCopied, setIsCopied] = useState(false)
    const [showLanguageModal, setShowLanguageModal] = useState(false)

    const languages = [
        { id: 'javascript', name: 'JavaScript', extension: 'js' },
        { id: 'python', name: 'Python', extension: 'py' },
        { id: 'java', name: 'Java', extension: 'java' },
        { id: 'cpp', name: 'C++', extension: 'cpp' },
        { id: 'c', name: 'C', extension: 'c' }
    ]

    const generateCodeTemplate = (language) => {
        const commentStart = language === 'python' ? '"""' : '/*'
        const commentEnd = language === 'python' ? '"""' : '*/'
        const lineComment = language === 'python' ? '#' : '//'

        let template = `${commentStart}
Problem: ${question.title}
Difficulty: ${question.difficulty}
Category: ${question.category}

Description:
${question.description}
${question.examples ? `\nExamples:\n${question.examples}` : ''}
${question.constraints ? `\nConstraints:\n${question.constraints}` : ''}
${commentEnd}

`

        // Generate language-specific code structure
        switch (language) {
            case 'javascript':
                template += `${lineComment} Your solution here:\nfunction solution() {\n    ${lineComment} Write your code logic here\n    \n}\n\n${lineComment} Test your solution\nconsole.log(solution());`
                break
            case 'python':
                template += `${lineComment} Your solution here:\ndef solution():\n    ${lineComment} Write your code logic here\n    pass\n\n${lineComment} Test your solution\nif __name__ == "__main__":\n    print(solution())`
                break
            case 'java':
                template += `public class Solution {\n    ${lineComment} Your solution here:\n    public static void main(String[] args) {\n        ${lineComment} Write your code logic here\n        \n    }\n}`
                break
            case 'cpp':
                template += `#include <iostream>\nusing namespace std;\n\n${lineComment} Your solution here:\nint main() {\n    ${lineComment} Write your code logic here\n    \n    return 0;\n}`
                break
            case 'c':
                template += `#include <stdio.h>\n\n${lineComment} Your solution here:\nint main() {\n    ${lineComment} Write your code logic here\n    \n    return 0;\n}`
                break
            default:
                template += `${lineComment} Your solution here:\n`
        }

        return template
    }

    const handleCopyClick = (e) => {
        e.stopPropagation()
        setShowLanguageModal(true)
    }

    const copyToClipboard = async (language) => {
        const textToCopy = generateCodeTemplate(language)

        try {
            await navigator.clipboard.writeText(textToCopy)
            setIsCopied(true)
            setShowLanguageModal(false)
            toast.success(`Copied as ${languages.find(l => l.id === language)?.name}!`)
            setTimeout(() => setIsCopied(false), 2000)
        } catch (err) {
            toast.error('Failed to copy')
        }
    }

    const getDifficultyClass = (difficulty) => {
        switch (difficulty.toLowerCase()) {
            case 'easy': return 'badge-easy'
            case 'medium': return 'badge-medium'
            case 'hard': return 'badge-hard'
            default: return 'badge-easy'
        }
    }

    return (
        <motion.div
            className={`question-card ${isExpanded ? 'expanded' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.02 }}
            layout
        >
            <div className="question-header" onClick={() => setIsExpanded(!isExpanded)}>
                <div className="question-number">
                    <Hash size={14} />
                    <span>{question.id}</span>
                </div>

                <div className="question-info">
                    <h3 className="question-title">{question.title}</h3>
                    <div className="question-meta">
                        <span className={`badge ${getDifficultyClass(question.difficulty)}`}>
                            {question.difficulty}
                        </span>
                        <span className="question-category">
                            <Code size={14} />
                            {question.category}
                        </span>
                    </div>
                </div>

                <div className="question-actions">
                    <motion.button
                        className={`copy-btn ${isCopied ? 'copied' : ''}`}
                        onClick={handleCopyClick}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {isCopied ? <Check size={18} /> : <Copy size={18} />}
                        <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                    </motion.button>

                    <motion.button
                        className="expand-btn"
                        onClick={(e) => {
                            e.stopPropagation()
                            setIsExpanded(!isExpanded)
                        }}
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                    >
                        <ChevronDown size={20} />
                    </motion.button>
                </div>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        className="question-body"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="question-description">
                            <h4>Problem Description</h4>
                            <p>{question.description}</p>
                        </div>

                        {question.examples && (
                            <div className="question-examples">
                                <h4>Examples</h4>
                                <pre className="code-block">{question.examples}</pre>
                            </div>
                        )}

                        {question.constraints && (
                            <div className="question-constraints">
                                <h4>Constraints</h4>
                                <ul>
                                    {question.constraints.split('\n').map((constraint, i) => (
                                        <li key={i}>{constraint}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {question.starterCode && (
                            <div className="question-starter">
                                <h4>Starter Code</h4>
                                <pre className="code-block">{question.starterCode}</pre>
                            </div>
                        )}

                        {question.hints && (
                            <div className="question-hints">
                                <h4>Hints</h4>
                                <ul>
                                    {question.hints.map((hint, i) => (
                                        <li key={i}>{hint}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {question.practiceLinks && (question.practiceLinks.gfg || question.practiceLinks.leetcode || question.practiceLinks.hackerrank) && (
                            <div className="practice-links">
                                <h4>Practice on Other Platforms</h4>
                                <div className="links-grid">
                                    {question.practiceLinks.gfg && (
                                        <a
                                            href={question.practiceLinks.gfg}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="practice-link gfg"
                                        >
                                            <span className="link-icon">🟢</span>
                                            <span className="link-text">GeeksforGeeks</span>
                                        </a>
                                    )}
                                    {question.practiceLinks.leetcode && (
                                        <a
                                            href={question.practiceLinks.leetcode}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="practice-link leetcode"
                                        >
                                            <span className="link-icon">🟠</span>
                                            <span className="link-text">LeetCode</span>
                                        </a>
                                    )}
                                    {question.practiceLinks.hackerrank && (
                                        <a
                                            href={question.practiceLinks.hackerrank}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="practice-link hackerrank"
                                        >
                                            <span className="link-icon">🟢</span>
                                            <span className="link-text">HackerRank</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="question-tags">
                            {question.tags && question.tags.map(tag => (
                                <span key={tag} className="tag">{tag}</span>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Language Selection Modal */}
            <AnimatePresence>
                {showLanguageModal && (
                    <motion.div
                        className="language-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={(e) => {
                            e.stopPropagation()
                            setShowLanguageModal(false)
                        }}
                    >
                        <motion.div
                            className="language-modal"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="modal-header">
                                <h3>Select Programming Language</h3>
                                <button
                                    className="close-modal-btn"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setShowLanguageModal(false)
                                    }}
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="language-grid">
                                {languages.map((lang, idx) => (
                                    <motion.button
                                        key={lang.id}
                                        className="language-option"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            copyToClipboard(lang.id)
                                        }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Code size={24} />
                                        <span>{lang.name}</span>
                                        <span className="extension">.{lang.extension}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default QuestionCard
