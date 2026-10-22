import Hero from '../components/Hero'
import FeaturedDestinations from '../components/FeaturedDestinations'
import ExclusiveOffers from '../components/ExclusiveOffers'
import Testimonials from '../components/Testimonials'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedDestinations />
      <ExclusiveOffers />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  )
}
