import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) { setSubmitted(true); setEmail('') }
  }

  return (
    <section className="py-20 px-4 bg-indigo-600">
      <div className="max-w-2xl mx-auto text-center text-white">
        <h2 className="text-4xl font-extrabold mb-3">Stay in the Loop</h2>
        <p className="text-indigo-200 text-lg mb-8">Subscribe for exclusive deals, travel tips, and secret hotel rates.</p>
        {submitted ? (
          <div className="bg-white/20 text-white rounded-xl p-5 font-semibold text-lg">
            🎉 You're subscribed! Check your inbox.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-5 py-3.5 rounded-xl bg-white/15 border border-white/30 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button type="submit" className="px-8 py-3.5 bg-white text-indigo-700 font-bold rounded-xl hover:bg-indigo-50 transition-all shadow-lg">
              Subscribe
            </button>
          </form>
        )}
        <p className="text-indigo-300 text-xs mt-4">No spam ever. Unsubscribe anytime.</p>
      </div>
    </section>
  )
}
