import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    Code, GitBranch, Repeat, Layers, Type, Box,
    Database, Cpu, FileText, AlertTriangle
} from 'lucide-react'
import './CategoryCard.css'

const iconMap = {
    'basics': Code,
    'control-flow': GitBranch,
    'functions': Repeat,
    'arrays': Layers,
    'strings': Type,
    'oop': Box,
    'data-structures': Database,
    'algorithms': Cpu,
    'file-handling': FileText,
    'exception-handling': AlertTriangle,
}

const gradientMap = {
    'basics': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'control-flow': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'functions': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'arrays': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'strings': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'oop': 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    'data-structures': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'algorithms': 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
    'file-handling': 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
    'exception-handling': 'linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)',
}

const CategoryCard = ({ category, index }) => {
    const Icon = iconMap[category.id] || Code
    const gradient = gradientMap[category.id] || gradientMap['basics']

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: '-50px' }}
        >
            <Link to={`/category/${category.id}`} className="category-card">
                <motion.div
                    className="category-card-inner"
                    whileHover={{
                        scale: 1.03,
                        rotateY: 5,
                        rotateX: 5,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                    <div className="category-icon" style={{ background: gradient }}>
                        <Icon size={28} />
                    </div>

                    <div className="category-content">
                        <h3 className="category-title">{category.name}</h3>
                        <p className="category-description">{category.description}</p>
                    </div>

                    <div className="category-footer">
                        <span className="category-count">{category.questionCount} Problems</span>
                        <div className="category-difficulty">
                            <span className="dot easy"></span>
                            <span className="dot medium"></span>
                            <span className="dot hard"></span>
                        </div>
                    </div>

                    <div className="category-hover-effect" style={{ background: gradient }}></div>
                </motion.div>
            </Link>
        </motion.div>
    )
}

export default CategoryCard
