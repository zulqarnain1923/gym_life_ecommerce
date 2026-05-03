import { useEffect } from "react";

export default function useScrollAnimation(location) {
  useEffect(() => {

    const upSections = document.querySelectorAll(".up_section");
    const leftSections = document.querySelectorAll(".left_section");
    const rightSections = document.querySelectorAll(".right_section");

    const upObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("up_animate");
        }
      });
    }, { threshold: 0.3 });

    const leftObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("left_animate");
        }
      });
    }, { threshold: 0.5 });

    const rightObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("right_animate");
        }
      });
    }, { threshold: 0.5 });

    upSections.forEach(el => upObserver.observe(el));
    leftSections.forEach(el => leftObserver.observe(el));
    rightSections.forEach(el => rightObserver.observe(el));

    // cleanup (VERY IMPORTANT)
    return () => {
      upSections.forEach(el => upObserver.unobserve(el));
      leftSections.forEach(el => leftObserver.unobserve(el));
      rightSections.forEach(el => rightObserver.unobserve(el));
    };

  }, [location]);
}