import { useEffect, useState } from "react";

export function useReveal() {
  const [visible, setVisible] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-animate-id") || "";
          if (entry.isIntersecting) {
            setVisible((prev) => ({ ...prev, [id]: true }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll("[data-animate-id]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  /** 
   * Returns animation classes
   * @param id Unique element ID
   * @param index Stagger delay multiplier (150ms each)
   */
  const getAnimation = (id: string, index: number = 0) => {
    const delay = index * 150;

    // Base hidden state + transition
    let cls = `transition-all duration-[1200ms] ease-out opacity-0 translate-y-6 
               will-change-transform will-change-opacity`;

    // Revealed state
    if (visible[id]) cls += ` opacity-100 translate-y-0`;

    // Stagger delay
    cls += ` delay-[${delay}ms]`;

    return cls;
  };

  return { getAnimation };
}
