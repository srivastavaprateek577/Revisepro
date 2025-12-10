import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Filter, SlidersHorizontal } from 'lucide-react'
import Fuse from 'fuse.js'
import './SearchBar.css'

const SearchBar = ({ questions, onSearch, categories }) => {
    const [query, setQuery] = useState('')
    const [isExpanded, setIsExpanded] = useState(false)
    const [showFilters, setShowFilters] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedDifficulty, setSelectedDifficulty] = useState('')
    const [suggestions, setSuggestions] = useState([])

    const fuse = useMemo(() => {
        return new Fuse(questions, {
            keys: ['title', 'description', 'category', 'tags'],
            threshold: 0.3,
            includeMatches: true,
        })
    }, [questions])

    useEffect(() => {
        let results = questions

        if (query.trim()) {
            const fuseResults = fuse.search(query)
            results = fuseResults.map(r => r.item)
        }

        if (selectedCategory) {
            results = results.filter(q => q.categoryId === selectedCategory)
        }

        if (selectedDifficulty) {
            results = results.filter(q => q.difficulty === selectedDifficulty)
        }

        onSearch(results)

        // Show suggestions only when typing
        if (query.trim() && query.length > 1) {
            const fuseResults = fuse.search(query).slice(0, 5)
            setSuggestions(fuseResults.map(r => r.item))
        } else {
            setSuggestions([])
        }
    }, [query, selectedCategory, selectedDifficulty, questions])

    const clearSearch = () => {
        setQuery('')
        setSelectedCategory('')
        setSelectedDifficulty('')
        setSuggestions([])
    }

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion.title)
        setSuggestions([])
    }

    const difficulties = ['Easy', 'Medium', 'Hard']

    return (
        <div className="search-wrapper">
            <motion.div
                className={`search-container ${isExpanded ? 'expanded' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="search-input-wrapper">
                    <Search className="search-icon" size={22} />
                    <input
                        type="text"
                        placeholder="Search 500+ problems... (e.g., fibonacci, array, sorting)"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsExpanded(true)}
                        onBlur={() => setTimeout(() => setIsExpanded(false), 200)}
                        className="search-input"
                    />
                    {query && (
                        <motion.button
                            className="clear-btn"
                            onClick={clearSearch}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                        >
                            <X size={18} />
                        </motion.button>
                    )}
                    <motion.button
                        className={`filter-toggle ${showFilters ? 'active' : ''}`}
                        onClick={() => setShowFilters(!showFilters)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <SlidersHorizontal size={20} />
                    </motion.button>
                </div>

                {/* Suggestions Dropdown */}
                <AnimatePresence>
                    {suggestions.length > 0 && isExpanded && (
                        <motion.div
                            className="suggestions-dropdown"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            {suggestions.map((suggestion, index) => (
                                <motion.div
                                    key={suggestion.id}
                                    className="suggestion-item"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Search size={16} />
                                    <div className="suggestion-content">
                                        <span className="suggestion-title">{suggestion.title}</span>
                                        <span className="suggestion-category">{suggestion.category}</span>
                                    </div>
                                    <span className={`suggestion-badge badge-${suggestion.difficulty.toLowerCase()}`}>
                                        {suggestion.difficulty}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Filters Panel */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            className="filters-panel"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <div className="filter-group">
                                <label>Category</label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    <option value="">All Categories</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="filter-group">
                                <label>Difficulty</label>
                                <div className="difficulty-filters">
                                    {difficulties.map(diff => (
                                        <button
                                            key={diff}
                                            className={`diff-btn ${selectedDifficulty === diff ? 'active' : ''} ${diff.toLowerCase()}`}
                                            onClick={() => setSelectedDifficulty(selectedDifficulty === diff ? '' : diff)}
                                        >
                                            {diff}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {(selectedCategory || selectedDifficulty) && (
                                <button className="clear-filters" onClick={clearSearch}>
                                    Clear All Filters
                                </button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}

export default SearchBar
