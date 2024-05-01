import { cn } from "@utils/cn";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
    image: string;
    website: string;
  }[];
  direction?: "left" | "right";
  speed?: "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards");
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse");
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div className="flex">
      <div ref={containerRef} className={cn("scroller relative z-20 w-10/12 overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]", className)}>
        <div>
          <ul ref={scrollerRef} className={cn(" flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap", start && "animate-scroll ", pauseOnHover && "hover:[animation-play-state:paused]")}>
            {items.map((item, idx) => (
              <li
                className="w-auto relative p-4"
                style={{
                  background: "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
                }}
                key={item.name}
              >
                <div aria-hidden="true" className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"></div>
                <a href={item.website} target="_blank">
                  <img src={item.image} alt={item.name} className="w-auto h-16" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
