import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Code2, Github, Twitter, Linkedin, Heart, Mail } from 'lucide-react'
import './Footer.css'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    const categories = [
        { name: 'Basics', path: '/category/basics' },
        { name: 'Control Flow', path: '/category/control-flow' },
        { name: 'Functions', path: '/category/functions' },
        { name: 'Arrays', path: '/category/arrays' },
        { name: 'Strings', path: '/category/strings' },
    ]

    const advancedCategories = [
        { name: 'OOP', path: '/category/oop' },
        { name: 'Data Structures', path: '/category/data-structures' },
        { name: 'Algorithms', path: '/category/algorithms' },
        { name: 'File Handling', path: '/category/file-handling' },
        { name: 'Exception Handling', path: '/category/exception-handling' },
    ]

    return (
        <footer className="footer">
            <div className="footer-wave">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path
                        fill="currentColor"
                        d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
                    ></path>
                </svg>
            </div>

            <div className="footer-content">
                <div className="container">
                    <div className="footer-grid">
                        <div className="footer-brand">
                            <Link to="/" className="footer-logo">
                                <div className="footer-logo-icon">
                                    <Code2 size={28} />
                                </div>
                                <span className="footer-logo-text">
                                    <span className="gradient-text">Code</span>Master
                                </span>
                            </Link>
                            <p className="footer-description">
                                Practice programming with 500+ coding challenges. From Hello World to advanced algorithms,
                                master coding one problem at a time.
                            </p>
                            <div className="footer-social">
                                <motion.a
                                    href="https://github.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Github size={20} />
                                </motion.a>
                                <motion.a
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Twitter size={20} />
                                </motion.a>
                                <motion.a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Linkedin size={20} />
                                </motion.a>
                                <motion.a
                                    href="mailto:contact@codemaster.com"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Mail size={20} />
                                </motion.a>
                            </div>
                        </div>

                        <div className="footer-links">
                            <h4>Beginner Topics</h4>
                            <ul>
                                {categories.map((cat) => (
                                    <li key={cat.path}>
                                        <Link to={cat.path}>{cat.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="footer-links">
                            <h4>Advanced Topics</h4>
                            <ul>
                                {advancedCategories.map((cat) => (
                                    <li key={cat.path}>
                                        <Link to={cat.path}>{cat.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="footer-links">
                            <h4>Quick Links</h4>
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/questions">All Questions</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p>
                            © {currentYear} CodeMaster. Made with{' '}
                            <motion.span
                                className="heart"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                <Heart size={16} fill="currentColor" />
                            </motion.span>{' '}
                            for aspiring developers.
                        </p>
                        <p className="footer-stats">
                            <span>500+ Questions</span>
                            <span>•</span>
                            <span>10 Categories</span>
                            <span>•</span>
                            <span>All Skill Levels</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
