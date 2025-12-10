import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import CategoryCard from '../components/CategoryCard'
import { categories } from '../data/questions'

const Home = () => {
    return (
        <div className="home-page">
            <Hero />

            <section id="categories" className="categories-section container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>Explore <span className="gradient-text">Modules</span></h2>
                    <p>Choose a topic to start practicing. From basics to advanced algorithms.</p>
                </motion.div>

                <div className="grid grid-3">
                    {categories.map((category, index) => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                            index={index}
                        />
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Home
