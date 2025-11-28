import Hero from './components/Hero';
import Testimonial from './components/Testimonial';
import ProcessTimeline from './components/ProcessTimeline';
import Services from './components/Services';
import ClientTestimonials from './components/ClientTestimonials';

export default function Home() {
  return (
    <main>
      <Hero />
      <Testimonial />
      <ProcessTimeline />
      <Services />
      <ClientTestimonials />
    </main>
  );
}
