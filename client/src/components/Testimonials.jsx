import { testimonials } from '../assets/assets.js'
import { assets } from '../assets/assets.js'

export default function Testimonials() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-indigo-600 font-semibold text-sm uppercase tracking-widest">Testimonials</span>
          <h2 className="text-4xl font-extrabold text-gray-900 mt-2">What Our Guests Say</h2>
          <p className="text-gray-500 mt-2">Real reviews from real travelers worldwide</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-2xl p-7 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col gap-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src={i < t.rating ? assets.starIconFilled : assets.starIconOutlined}
                    alt=""
                    className="w-4 h-4"
                  />
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed text-sm flex-1">"{t.review}"</p>
              <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                <img src={t.image} alt={t.name} className="w-11 h-11 rounded-full object-cover ring-2 ring-indigo-200" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.address}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
