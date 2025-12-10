import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ChevronDown, Code, Terminal, Braces } from 'lucide-react'
import './Hero.css'

const Hero = () => {
    const [displayText, setDisplayText] = useState('')
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)

    const phrases = [
        'Hello World to Advanced',
        '500+ Coding Challenges',
        'Master Programming',
        'Practice Makes Perfect',
        'Learn by Doing',
    ]

    useEffect(() => {
        const currentPhrase = phrases[currentPhraseIndex]
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (displayText.length < currentPhrase.length) {
                    setDisplayText(currentPhrase.slice(0, displayText.length + 1))
                } else {
                    setTimeout(() => setIsDeleting(true), 2000)
                }
            } else {
                if (displayText.length > 0) {
                    setDisplayText(displayText.slice(0, -1))
                } else {
                    setIsDeleting(false)
                    setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
                }
            }
        }, isDeleting ? 50 : 100)

        return () => clearTimeout(timeout)
    }, [displayText, isDeleting, currentPhraseIndex])

    const scrollToCategories = () => {
        document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })
    }

    const floatingIcons = [
        { Icon: Code, delay: 0 },
        { Icon: Terminal, delay: 0.5 },
        { Icon: Braces, delay: 1 },
    ]

    return (
        <section className="hero">
            {/* Animated Background */}
            <div className="hero-bg">
                <div className="hero-gradient"></div>
                <div className="hero-pattern"></div>

                {/* Falling Code Symbols */}
                {['{', '}', '<', '>', '/', ';', '(', ')', '[', ']', '=', '+', '-', '*', '#', '@', '$', '%', '&', '!'].map((symbol, i) => (
                    <motion.div
                        key={i}
                        className="code-symbol"
                        style={{
                            left: `${Math.random() * 100}%`,
                            fontSize: `${Math.random() * 20 + 15}px`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${Math.random() * 3 + 4}s`,
                        }}
                    >
                        {symbol}
                    </motion.div>
                ))}

                {/* Floating Code Icons */}
                {floatingIcons.map(({ Icon, delay }, index) => (
                    <motion.div
                        key={index}
                        className={`floating-icon floating-icon-${index + 1}`}
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay,
                        }}
                    >
                        <Icon size={40} />
                    </motion.div>
                ))}
            </div>

            <div className="hero-content container">
                <motion.div
                    className="hero-badge"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Sparkles size={16} />
                    <span>500+ Practice Problems</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    Master Programming <br />
                    <span className="gradient-text">One Problem at a Time</span>
                </motion.h1>

                <motion.div
                    className="hero-typewriter"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <span className="typewriter-text">{displayText}</span>
                    <span className="cursor">|</span>
                </motion.div>

                <motion.p
                    className="hero-description"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    Copy any problem directly to your IDE and start coding.
                    No login required. Practice at your own pace.
                </motion.p>

                <motion.div
                    className="hero-actions"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <motion.button
                        className="btn btn-primary hero-btn"
                        onClick={scrollToCategories}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Start Practicing
                        <Sparkles size={18} />
                    </motion.button>
                </motion.div>

                <motion.div
                    className="hero-scroll"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    onClick={scrollToCategories}
                >
                    <span>Scroll to explore</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <ChevronDown size={24} />
                    </motion.div>
                </motion.div>
            </div>

            {/* Stats Bar */}
            <motion.div
                className="hero-stats"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
            >
                <div className="stat">
                    <span className="stat-number">500+</span>
                    <span className="stat-label">Problems</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat">
                    <span className="stat-number">10</span>
                    <span className="stat-label">Categories</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat">
                    <span className="stat-number">3</span>
                    <span className="stat-label">Difficulty Levels</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat">
                    <span className="stat-number">∞</span>
                    <span className="stat-label">Learning</span>
                </div>
            </motion.div>
        </section>
    )
}

export default Hero
