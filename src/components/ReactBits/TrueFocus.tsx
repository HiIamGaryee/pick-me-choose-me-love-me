import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import "./TrueFocus.css";

interface TrueFocusProps {
  sentence?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
}

interface FocusRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const TrueFocus: React.FC<TrueFocusProps> = ({
  sentence = "True Focus",
  manualMode = false,
  blurAmount = 5,
  borderColor = "green",
  glowColor = "rgba(0, 255, 0, 0.6)",
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
}) => {
  const words = sentence.split(" ");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const wordRefs: React.MutableRefObject<(HTMLSpanElement | null)[]> = useRef(
    []
  );
  const [focusRect, setFocusRect] = useState<FocusRect>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  // auto-animate words
  useEffect(() => {
    if (!manualMode) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
      }, (animationDuration + pauseBetweenAnimations) * 1000);
      return () => clearInterval(interval);
    }
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  // update focus frame position
  useEffect(() => {
    if (
      !wordRefs.current[currentIndex] ||
      !containerRef.current ||
      !frameRef.current
    )
      return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = wordRefs.current[currentIndex]!.getBoundingClientRect();

    const newRect = {
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height,
    };

    setFocusRect(newRect);

    // animate with GSAP
    gsap.to(frameRef.current, {
      x: newRect.x,
      y: newRect.y,
      width: newRect.width,
      height: newRect.height,
      opacity: 1,
      duration: animationDuration,
      ease: "power2.out",
    });
  }, [currentIndex, animationDuration, words.length]);

  const handleMouseEnter = (index: number) => {
    if (manualMode) {
      setLastActiveIndex(index);
      setCurrentIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (manualMode) {
      setCurrentIndex(lastActiveIndex ?? 0);
    }
  };

  return (
    <div className="focus-container" ref={containerRef}>
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={index}
            ref={(el) => {
              if (el) wordRefs.current[index] = el;
            }}
            className={`focus-word ${manualMode ? "manual" : ""} ${
              isActive ? "active" : ""
            }`}
            style={
              {
                filter: isActive ? `blur(0px)` : `blur(${blurAmount}px)`,
                transition: `filter ${animationDuration}s ease`,
                "--border-color": borderColor,
                "--glow-color": glowColor,
              } as React.CSSProperties
            }
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        );
      })}

      {/* focus frame */}
      <div
        className="focus-frame"
        ref={frameRef}
        style={
          {
            "--border-color": borderColor,
            "--glow-color": glowColor,
            opacity: 0,
            position: "absolute",
            top: 0,
            left: 0,
          } as React.CSSProperties
        }
      >
        <span className="corner top-left" />
        <span className="corner top-right" />
        <span className="corner bottom-left" />
        <span className="corner bottom-right" />
      </div>
    </div>
  );
};

export default TrueFocus;
