import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Skill {
  name: string;
  info: string;
  link: string;
}

const Skills: React.FC = () => {
  const skills: Skill[] = [
    { name: 'React', info: 'A JavaScript library for building user interfaces', link: 'https://reactjs.org/' },
    { name: 'Next.js', info: 'The React Framework for Production', link: 'https://nextjs.org/' },
    { name: 'TypeScript', info: 'Typed JavaScript at Any Scale', link: 'https://www.typescriptlang.org/' },
    { name: 'Node.js', info: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine', link: 'https://nodejs.org/' },
    { name: 'GraphQL', info: 'A query language for your API', link: 'https://graphql.org/' },
    { name: 'Tailwind CSS', info: 'A utility-first CSS framework', link: 'https://tailwindcss.com/' },
    { name: 'JavaScript', info: 'The Programming Language for the Web', link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
    { name: 'HTML', info: 'The standard markup language for Web pages', link: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
    { name: 'CSS', info: 'The language for describing the presentation of Web pages', link: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
    { name: 'Python', info: 'A programming language that lets you work quickly and integrate systems more effectively', link: 'https://www.python.org/' },
    { name: 'Django', info: 'The Web framework for perfectionists with deadlines', link: 'https://www.djangoproject.com/' },
    { name: 'Flask', info: 'A lightweight WSGI web application framework', link: 'https://flask.palletsprojects.com/' },
    { name: 'SQL', info: 'Structured Query Language for managing relational databases', link: 'https://www.w3schools.com/sql/' },
    { name: 'MongoDB', info: 'The database for modern applications', link: 'https://www.mongodb.com/' },
    { name: 'Redis', info: 'An open source, in-memory data structure store', link: 'https://redis.io/' },
    { name: 'Docker', info: 'Empowering App Development for Developers', link: 'https://www.docker.com/' },
    { name: 'Kubernetes', info: 'Production-Grade Container Orchestration', link: 'https://kubernetes.io/' },
    { name: 'AWS', info: 'Amazon Web Services, On-demand cloud computing platforms', link: 'https://aws.amazon.com/' },
    { name: 'Git', info: 'Distributed version control system', link: 'https://git-scm.com/' },
    { name: 'CI/CD', info: 'Continuous Integration and Continuous Delivery', link: 'https://www.redhat.com/en/topics/devops/what-is-ci-cd' },
    { name: 'Jest', info: 'JavaScript Testing Framework', link: 'https://jestjs.io/' },
    { name: 'Cypress', info: 'Fast, easy and reliable testing for anything that runs in a browser', link: 'https://www.cypress.io/' },
    { name: 'Webpack', info: 'A static module bundler for modern JavaScript applications', link: 'https://webpack.js.org/' },
    { name: 'Babel', info: 'The compiler for next generation JavaScript', link: 'https://babeljs.io/' }
  ]

  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-4">
      <motion.h2 
        className="text-6xl font-bold text-center relative z-10 text-green-500 mb-8"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Skills
      </motion.h2>
      <div className="flex flex-wrap justify-center gap-4 relative z-10">
        {skills.map((skill, index) => (
          <motion.span 
            key={index} 
            className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600 transition-colors cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSelectedSkill(skill)}
          >
            {skill.name}
          </motion.span>
        ))}
      </div>
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 p-8 rounded-lg max-w-md w-full relative"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-green-500">{selectedSkill.name}</h3>
              <p className="mb-4 text-white">{selectedSkill.info}</p>
              <button 
                onClick={() => setSelectedSkill(null)}
                className="absolute top-2 right-2 text-white hover:text-green-500"
              >
                ✕
              </button>
              <a 
                href={selectedSkill.link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-2 right-2 bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600 transition-colors"
              >
                Go
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Skills