import Hero from './components/Hero';
import Testimonial from './components/Testimonial';
import ProcessTimeline from './components/ProcessTimeline';
import Services from './components/Services';
import ClientTestimonials from './components/ClientTestimonials';
import ContactBanner from './components/ContactBanner';
import ContactBoxes from './components/ContactBoxes';

export default function Home() {
  return (
    <main>
      <Hero />
      <Testimonial />
      <ProcessTimeline />
      <Services />
      <ClientTestimonials />
      <ContactBanner />
      <ContactBoxes />
    </main>
  );
}
