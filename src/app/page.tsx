import Hero from './components/Hero';
import Testimonial from './components/Testimonial';
import ProcessTimeline from './components/ProcessTimeline';
import Services from './components/Services';
import ClientTestimonials from './components/ClientTestimonials';
import CompaniesCarousel from './components/CompaniesCarousel';
import ContactBanner from './components/ContactBanner';
import ContactBoxes from './components/ContactBoxes';

export default function Home() {
  return (
    <main>
      <Hero />
      <Testimonial />
      <ProcessTimeline />
      <CompaniesCarousel />
      <Services />
      <ClientTestimonials />
      <ContactBanner />
      <ContactBoxes />
    </main>
  );
}
