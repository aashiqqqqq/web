import React, { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from 'emailjs-com'
import { FaLinkedin, FaGithub, FaMedium, FaInstagram } from 'react-icons/fa'

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await emailjs.send(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'aashiqnawaz0@gmail.com'
        },
        'YOUR_USER_ID' // Replace with your EmailJS user ID
      )
      alert('Message sent successfully!')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Error sending email:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 relative overflow-hidden">
      <motion.h2 
        className="text-4xl font-bold mb-8 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Contact
      </motion.h2>
      <form className="max-w-md mx-auto relative z-10" onSubmit={handleSubmit}>
        <motion.div 
          className="mb-4"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <label htmlFor="name" className="block mb-2">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-gray-900 p-2 rounded border border-green-500 focus:ring-2 focus:ring-green-500 transition-all" 
            required
          />
        </motion.div>
        <motion.div 
          className="mb-4"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <label htmlFor="email" className="block mb-2">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-gray-900 p-2 rounded border border-green-500 focus:ring-2 focus:ring-green-500 transition-all" 
            required
          />
        </motion.div>
        <motion.div 
          className="mb-4"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <label htmlFor="message" className="block mb-2">Message</label>
          <textarea 
            id="message" 
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4} 
            className="w-full bg-gray-900 p-2 rounded border border-green-500 focus:ring-2 focus:ring-green-500 transition-all"
            required
          ></textarea>
        </motion.div>
        <motion.button 
          type="submit" 
          className={`bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600 transition-colors ${isSubmitting ? 'animate-pulse' : ''}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </motion.button>
      </form>
      <footer className="mt-8 py-4">
        <div className="flex justify-center space-x-4">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-600">
            <FaLinkedin size={24} />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-600">
            <FaGithub size={24} />
          </a>
          <a href="https://medium.com" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-600">
            <FaMedium size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-600">
            <FaInstagram size={24} />
          </a>
        </div>
      </footer>
    </section>
  )
}

export default Contact