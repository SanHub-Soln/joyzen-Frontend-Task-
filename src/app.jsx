import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroimg from './heroimg.png';
import grad1 from './grad1.png';
import footer from './footer.png';
import profolie from './profile.png';
import gridb1 from './gridb1.png';
import gridb2 from './gridb2.png';

/* ─── Intersection observer hook ─── */
const useInView = (threshold = 0.12) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
};

/* ─── Animated section wrapper ─── */
const Reveal = ({ children, delay = 0, y = 36, className = "" }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity .75s cubic-bezier(.4,0,.2,1) ${delay}ms, transform .75s cubic-bezier(.4,0,.2,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
};

/* ─── Scroll-driven text reveal ─── */
const ScrollRevealText = ({ text, className = "", style = {} }) => {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const start = windowH * 0.85;
      const end = windowH * 0.1;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      setRevealed(progress);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const words = text.split(" ");
  return (
    <p ref={ref} className={className} style={{ ...style, lineHeight: 1.75 }}>
      {words.map((word, wi) => {
        const isJoyzen = word === "Joyzen";
        const chars = (word + (wi < words.length - 1 ? " " : "")).split("");
        const charsBefore = words.slice(0, wi).reduce((a, w) => a + w.length + 1, 0);
        const totalChars = text.length;
        return chars.map((ch, ci) => {
          const globalI = charsBefore + ci;
          const charProgress = Math.min(1, Math.max(0, (revealed - (globalI / totalChars) * 0.7) / 0.3));
          const opacity = 0.28 + charProgress * 0.72;
          const color = isJoyzen
            ? `rgba(239,143,96,${opacity})`
            : `rgba(26,26,26,${opacity})`;
          return (
            <span key={`${wi}-${ci}`} style={{
              color,
              transition: "color 0.1s",
              whiteSpace: ch === " " ? "pre" : "normal",
            }}>{ch}</span>
          );
        });
      })}
    </p>
  );
};

/* ─── Joyzen SVG Logo ─── */
const JoyzenSVGLogo = ({ width = 120, gap = 12 }) => (
  <svg
    width={width}
    height={(width * 53) / 200}
    viewBox="0 0 200 53"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ overflow: "visible" }}
  >
    <g id="one">
      <path d="M14.2771 24.544C6.55077 24.544 1.5293 21.1496 0 14.95L34.0372 14.9717V24.544H14.2771Z" fill="#EF8F60"/>
      <path d="M16.9695 11.7599C13.8332 11.7599 11.1844 9.08957 11.1844 5.92996C11.1844 2.77036 13.8354 0 16.9695 0C20.1036 0 22.8516 2.65946 22.8516 5.92996C22.8516 9.20047 20.1575 11.7599 16.9695 11.7599Z" fill="#EF8F60"/>
      <path d="M0 37.3064V27.7341H19.7601C27.4865 27.7341 32.5079 31.1286 34.0372 37.3282L0 37.3064Z" fill="#EF8F60"/>
      <path d="M17.0678 52.278C13.8237 52.278 11.1857 49.6185 11.1857 46.348C11.1857 43.0775 13.8798 40.5181 17.0678 40.5181C20.2559 40.5181 22.8507 43.1884 22.8507 46.348C22.8507 49.5076 20.2019 52.278 17.0678 52.278Z" fill="#EF8F60"/>
    </g>
    <g id="two" transform={`translate(${30 + gap}, 0)`}>
      <path d="M35.8966 10.3181C28.0236 10.3181 21.4254 15.8741 21.4254 25.766C21.4254 35.658 28.0257 40.8443 35.9591 40.8443C43.8925 40.8443 50.3721 35.471 50.3721 25.766C50.3721 16.0611 43.7092 10.3181 35.8987 10.3181H35.8966ZM35.8966 34.5555C31.7185 34.5555 28.5693 31.5655 28.5693 25.7051C28.5693 19.8448 31.6559 16.6091 35.8966 16.6091C40.1372 16.6091 43.226 19.7208 43.226 25.7051C43.226 31.6895 40.1372 34.5555 35.8966 34.5555Z" fill="#FAF8F1"/>
      <path d="M69.2786 10.9292L62.8594 32.1135L56.3798 10.9292H49.6586L59.4686 40.2333L55.7154 52.4433H62.497L66.1919 40.2333L76.0019 10.9292H69.2807H69.2786Z" fill="#FAF8F1"/>
      <path d="M99.2295 34.9209V40.2333H76.8227V34.9209L90.0234 16.2394H77.3684L79.1458 10.9292H98.0776V16.2394L84.9955 34.9209H99.2273H99.2295ZM87.9053 8.60899C90.2068 8.60899 92.1438 6.65626 92.1438 4.33603C92.1438 2.0158 90.2068 0 87.9053 0C85.6038 0 83.6064 1.95273 83.6064 4.33385C83.6064 6.71497 85.5434 8.60682 87.9053 8.60682V8.60899Z" fill="#FAF8F1"/>
      <path d="M18.0453 10.9292V43.1645C18.0453 49.014 15.1485 52.178 10.8389 52.8956L10.8539 10.9292H18.0475H18.0453ZM4.29887 52.8956C6.60037 52.8956 8.53735 50.9429 8.53735 48.6226C8.53735 46.3024 6.60037 44.2888 4.29887 44.2888C1.99737 44.2888 0 46.2415 0 48.6226C0 51.0037 1.93697 52.8956 4.29887 52.8956Z" fill="#FAF8F1"/>
      <path d="M127.196 25.5181C127.196 14.7128 121.564 10.3159 114.48 10.3159C106.666 10.3159 100.732 15.6283 100.732 25.3354C100.732 35.7754 107.334 40.8421 115.084 40.8421C119.989 40.8421 123.684 38.7676 125.925 34.9186L121.806 30.8305C120.654 33.4552 118.052 34.5533 115.205 34.5533C111.148 34.5533 107.815 32.2961 107.272 27.473H127.194V25.5181H127.196ZM107.393 22.8956C108.119 18.6205 111.027 16.6069 114.541 16.6069C118.055 16.6069 120.777 18.7444 121.079 22.8956H107.393Z" fill="#FAF8F1"/>
      <path d="M146.393 10.3181C141.307 10.3181 138.822 12.7014 137.066 16.6677H136.947V10.9291H129.859V40.2332H136.947V25.2289C136.947 23.9155 137.126 22.6021 137.525 21.3517C138.638 17.855 140.722 16.4829 143.671 16.4829C146.941 16.4829 149.001 18.0703 149.001 22.3433V40.2332H156.086V20.4514C156.086 13.3081 151.848 10.3159 146.397 10.3159L146.393 10.3181Z" fill="#FAF8F1"/>
      <path d="M35.8966 10.3181C28.0236 10.3181 21.4254 15.8741 21.4254 25.766C21.4254 35.658 28.0257 40.8443 35.9591 40.8443C43.8925 40.8443 50.3721 35.471 50.3721 25.766C50.3721 16.0611 43.7092 10.3181 35.8987 10.3181H35.8966ZM35.8966 34.5555C31.7185 34.5555 28.5693 31.5655 28.5693 25.7051C28.5693 19.8448 31.6559 16.6091 35.8966 16.6091C40.1372 16.6091 43.226 19.7208 43.226 25.7051C43.226 31.6895 40.1372 34.5555 35.8966 34.5555Z" fill="#EF8F60"/>
      <path d="M69.2786 10.9292L62.8594 32.1135L56.3798 10.9292H49.6586L59.4686 40.2333L55.7154 52.4433H62.497L66.1919 40.2333L76.0019 10.9292H69.2807H69.2786Z" fill="#EF8F60"/>
      <path d="M99.2295 34.9209V40.2333H76.8227V34.9209L90.0234 16.2394H77.3684L79.1458 10.9292H98.0776V16.2394L84.9955 34.9209H99.2273H99.2295ZM87.9053 8.60899C90.2068 8.60899 92.1438 6.65626 92.1438 4.33603C92.1438 2.0158 90.2068 0 87.9053 0C85.6038 0 83.6064 1.95273 83.6064 4.33385C83.6064 6.71497 85.5434 8.60682 87.9053 8.60682V8.60899Z" fill="#EF8F60"/>
      <path d="M18.0453 10.9292V43.1645C18.0453 49.014 15.1485 52.178 10.8389 52.8956L10.8539 10.9292H18.0475H18.0453ZM4.29887 52.8956C6.60037 52.8956 8.53735 50.9429 8.53735 48.6226C8.53735 46.3024 6.60037 44.2888 4.29887 44.2888C1.99737 44.2888 0 46.2415 0 48.6226C0 51.0037 1.93697 52.8956 4.29887 52.8956Z" fill="#EF8F60"/>
      <path d="M127.196 25.5181C127.196 14.7128 121.564 10.3159 114.48 10.3159C106.666 10.3159 100.732 15.6283 100.732 25.3354C100.732 35.7754 107.334 40.8421 115.084 40.8421C119.989 40.8421 123.684 38.7676 125.925 34.9186L121.806 30.8305C120.654 33.4552 118.052 34.5533 115.205 34.5533C111.148 34.5533 107.815 32.2961 107.272 27.473H127.194V25.5181H127.196ZM107.393 22.8956C108.119 18.6205 111.027 16.6069 114.541 16.6069C118.055 16.6069 120.777 18.7444 121.079 22.8956H107.393Z" fill="#EF8F60"/>
      <path d="M146.393 10.3181C141.307 10.3181 138.822 12.7014 137.066 16.6677H136.947V10.9291H129.859V40.2332H136.947V25.2289C136.947 23.9155 137.126 22.6021 137.525 21.3517C138.638 17.855 140.722 16.4829 143.671 16.4829C146.941 16.4829 149.001 18.0703 149.001 22.3433V40.2332H156.086V20.4514C156.086 13.3081 151.848 10.3159 146.397 10.3159L146.393 10.3181Z" fill="#EF8F60"/>
    </g>
  </svg>
);

/* ─── Logo (nav) ─── */
const Logo = ({ size = 20 }) => (
  <div style={{ display: "flex", alignItems: "center", userSelect: "none" }}>
    <JoyzenSVGLogo width={size * 6} />
  </div>
);

/* ─── Balancing Preloader ─── */
const BalancingPreloader = ({ onFinished }) => {
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const isFinished = progress >= 100;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 40);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isFinished) {
      const t = setTimeout(() => onFinished && onFinished(), 1800);
      return () => clearTimeout(t);
    }
  }, [isFinished, onFinished]);

  const iconSize = isMobile ? 60 : 100;
  const iconViewH = isMobile ? 78 : 130;
  const logoW = isMobile ? 140 : 200;
  const logoH = isMobile ? 37 : 53;

  return (
    <AnimatePresence>
      <motion.div
        key="preloader"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          position: "fixed", inset: 0, zIndex: 9999,
          display: "flex", flexDirection: "column",
          justifyContent: "center", alignItems: "center",
          background: "#000", gap: "20px",
        }}
      >
        <motion.svg
          width={iconSize}
          height={iconViewH}
          viewBox="0 0 80 104"
          style={{ overflow: "visible" }}
          animate={{ rotate: isFinished ? 0 : [-8, 8, -8] }}
          transition={{ duration: 2.5, repeat: isFinished ? 0 : Infinity, ease: "easeInOut" }}
        >
          <motion.g
            animate={{ fill: isFinished ? "#EF8F60" : ["#EF8F60", "#FCFFB2", "#FF00E5", "#EF8F60"] }}
            transition={{ duration: 4, repeat: isFinished ? 0 : Infinity }}
          >
            <motion.path d="M32.18 49.1202C15.8668 49.1202 5.26459 42.3025 2.03564 29.8506L73.9012 29.8943V49.1202H32.18Z" />
            <motion.path
              d="M67.2137 23.6198C60.5918 23.6198 54.9993 18.2564 54.9993 11.9104C54.9993 5.5643 60.5964 0 67.2137 0C73.831 0 79.633 5.34156 79.633 11.9104C79.633 18.4792 73.9448 23.6198 67.2137 23.6198Z"
              animate={{ x: isFinished ? 0 : [-40, 5, -40], rotate: isFinished ? 0 : 360 }}
              transition={{ duration: 2.5, repeat: isFinished ? 0 : Infinity, ease: "easeInOut" }}
            />
            <motion.path d="M2.03564 74.7538V55.5278H43.7568C60.07 55.5278 70.6723 62.3456 73.9012 74.7975L2.03564 74.7538Z" />
            <motion.path
              d="M12.4194 103.526C5.56981 103.526 0 98.1849 0 91.6161C0 85.0473 5.68822 79.9066 12.4194 79.9066C19.1505 79.9066 24.6292 85.27 24.6292 91.6161C24.6292 97.9621 19.0366 103.526 12.4194 103.526Z"
              animate={{ x: isFinished ? 0 : [40, -5, 40], rotate: isFinished ? 0 : -360 }}
              transition={{ duration: 2.5, repeat: isFinished ? 0 : Infinity, ease: "easeInOut" }}
            />
          </motion.g>
        </motion.svg>

        <div style={{ position: "relative", width: `${logoW}px`, margin: "5px", height: `${logoH}px` }}>
          <svg width={logoW} height={logoH} viewBox="0 0 200 53" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <clipPath id="preloaderTextClip">
                <motion.rect
                  x="0" y="0" height="53"
                  animate={{ width: `${progress * 2}` }}
                  transition={{ ease: "linear" }}
                />
              </clipPath>
            </defs>
            <g opacity="0.15">
              <path d="M63.7073 10.4225C54.7792 10.4225 47.2966 15.9784 47.2966 25.8704C47.2966 35.7624 54.7816 40.9486 63.7782 40.9486C72.7749 40.9486 80.1229 35.5754 80.1229 25.8704C80.1229 16.1654 72.567 10.4225 63.7098 10.4225H63.7073ZM63.7073 34.6599C58.9693 34.6599 55.398 31.6699 55.398 25.8095C55.398 19.9491 58.8983 16.7134 63.7073 16.7134C68.5163 16.7134 72.019 19.8252 72.019 25.8095C72.019 31.7938 68.5163 34.6599 63.7073 34.6599Z" fill="#FAF8F1"/>
              <path d="M101.563 11.0334L94.2839 32.2178L86.9359 11.0334H79.314L90.4387 40.3375L86.1825 52.5475H93.873L98.0631 40.3375L109.188 11.0334H101.566H101.563Z" fill="#FAF8F1"/>
              <path d="M135.528 35.0252V40.3376H110.119V35.0252L125.089 16.3438H110.737L112.753 11.0335H134.222V16.3438L119.387 35.0252H135.526H135.528ZM122.687 8.7133C125.297 8.7133 127.493 6.76057 127.493 4.44034C127.493 2.12011 125.297 0.104309 122.687 0.104309C120.077 0.104309 117.812 2.05704 117.812 4.43816C117.812 6.81928 120.008 8.71113 122.687 8.71113V8.7133Z" fill="#FAF8F1"/>
              <path d="M43.4638 11.0335V43.2689C43.4638 49.1184 40.1787 52.2823 35.2915 52.9999L35.3086 11.0335H43.4663H43.4638ZM27.875 52.9999C30.485 52.9999 32.6815 51.0472 32.6815 48.727C32.6815 46.4067 30.485 44.3931 27.875 44.3931C25.2651 44.3931 23 46.3458 23 48.727C23 51.1081 25.1966 52.9999 27.875 52.9999Z" fill="#FAF8F1"/>
              <path d="M167.243 25.6225C167.243 14.8172 160.856 10.4203 152.823 10.4203C143.961 10.4203 137.232 15.7327 137.232 25.4398C137.232 35.8798 144.719 40.9464 153.508 40.9464C159.07 40.9464 163.261 38.8719 165.802 35.023L161.13 30.9349C159.824 33.5595 156.874 34.6577 153.645 34.6577C149.044 34.6577 145.265 32.4005 144.648 27.5774H167.24V25.6225H167.243ZM144.785 23C145.61 18.7248 148.907 16.7112 152.892 16.7112C156.876 16.7112 159.963 18.8488 160.306 23H144.785Z" fill="#FAF8F1"/>
            </g>
            <g clipPath="url(#preloaderTextClip)">
              <path d="M63.7073 10.4225C54.7792 10.4225 47.2966 15.9784 47.2966 25.8704C47.2966 35.7624 54.7816 40.9486 63.7782 40.9486C72.7749 40.9486 80.1229 35.5754 80.1229 25.8704C80.1229 16.1654 72.567 10.4225 63.7098 10.4225H63.7073ZM63.7073 34.6599C58.9693 34.6599 55.398 31.6699 55.398 25.8095C55.398 19.9491 58.8983 16.7134 63.7073 16.7134C68.5163 16.7134 72.019 19.8252 72.019 25.8095C72.019 31.7938 68.5163 34.6599 63.7073 34.6599Z" fill="#EF8F60"/>
              <path d="M101.563 11.0334L94.2839 32.2178L86.9359 11.0334H79.314L90.4387 40.3375L86.1825 52.5475H93.873L98.0631 40.3375L109.188 11.0334H101.566H101.563Z" fill="#EF8F60"/>
              <path d="M135.528 35.0252V40.3376H110.119V35.0252L125.089 16.3438H110.737L112.753 11.0335H134.222V16.3438L119.387 35.0252H135.526H135.528ZM122.687 8.7133C125.297 8.7133 127.493 6.76057 127.493 4.44034C127.493 2.12011 125.297 0.104309 122.687 0.104309C120.077 0.104309 117.812 2.05704 117.812 4.43816C117.812 6.81928 120.008 8.71113 122.687 8.71113V8.7133Z" fill="#EF8F60"/>
              <path d="M43.4638 11.0335V43.2689C43.4638 49.1184 40.1787 52.2823 35.2915 52.9999L35.3086 11.0335H43.4663H43.4638ZM27.875 52.9999C30.485 52.9999 32.6815 51.0472 32.6815 48.727C32.6815 46.4067 30.485 44.3931 27.875 44.3931C25.2651 44.3931 23 46.3458 23 48.727C23 51.1081 25.1966 52.9999 27.875 52.9999Z" fill="#EF8F60"/>
              <path d="M167.243 25.6225C167.243 14.8172 160.856 10.4203 152.823 10.4203C143.961 10.4203 137.232 15.7327 137.232 25.4398C137.232 35.8798 144.719 40.9464 153.508 40.9464C159.07 40.9464 163.261 38.8719 165.802 35.023L161.13 30.9349C159.824 33.5595 156.874 34.6577 153.645 34.6577C149.044 34.6577 145.265 32.4005 144.648 27.5774H167.24V25.6225H167.243ZM144.785 23C145.61 18.7248 148.907 16.7112 152.892 16.7112C156.876 16.7112 159.963 18.8488 160.306 23H144.785Z" fill="#EF8F60"/>
            </g>
          </svg>
        </div>

        <div style={{ width: isMobile ? "140px" : "200px", height: "2px", background: "#222", borderRadius: "1px", overflow: "hidden" }}>
          <motion.div
            style={{ height: "100%", background: "#EF8F60" }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>

        <AnimatePresence>
          {isFinished && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              style={{
                position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                background: "#000",
                pointerEvents: "none",
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

/* ─── Hover Joyzen Icon (for #hello section) ─── */
const HoverJoyzenIcon = () => {
  const [isHovered, setIsHovered] = useState(false);
  const colorCycle = ["#EF8F60", "#FCFFB2", "#FF00E5", "#50FFB1", "#EF8F60"];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: "flex", justifyContent: "center", alignItems: "center",
        width: "clamp(120px,22vw,190px)", height: "clamp(120px,22vw,190px)",
        flexShrink: 0, cursor: "pointer",
      }}
    >
      <motion.svg
        width="120"
        height="150"
        viewBox="0 0 80 104"
        style={{ overflow: "visible" }}
        animate={{ rotate: isHovered ? 0 : [-10, 10, -10] }}
        transition={{ duration: 2, repeat: isHovered ? 0 : Infinity, ease: "easeInOut" }}
      >
        <motion.g
          animate={{ fill: isHovered ? "#EF8F60" : colorCycle }}
          transition={{ duration: 4, repeat: isHovered ? 0 : Infinity, ease: "linear" }}
        >
          <path d="M32.18 49.1202C15.8668 49.1202 5.26459 42.3025 2.03564 29.8506L73.9012 29.8943V49.1202H32.18Z" />
          <motion.path
            d="M67.2137 23.6198C60.5918 23.6198 54.9993 18.2564 54.9993 11.9104C54.9993 5.5643 60.5964 0 67.2137 0C73.831 0 79.633 5.34156 79.633 11.9104C79.633 18.4792 73.9448 23.6198 67.2137 23.6198Z"
            animate={{ x: isHovered ? -28 : [-45, 5, -45], rotate: isHovered ? 0 : 360 }}
            transition={{ duration: 3, repeat: isHovered ? 0 : Infinity, ease: "easeInOut" }}
          />
          <path d="M2.03564 74.7538V55.5278H43.7568C60.07 55.5278 70.6723 62.3456 73.9012 74.7975L2.03564 74.7538Z" />
          <motion.path
            d="M12.4194 103.526C5.56981 103.526 0 98.1849 0 91.6161C0 85.0473 5.68822 79.9066 12.4194 79.9066C19.1505 79.9066 24.6292 85.27 24.6292 91.6161C24.6292 97.9621 19.0366 103.526 12.4194 103.526Z"
            animate={{ x: isHovered ? 28 : [45, -5, 45], rotate: isHovered ? 0 : -360 }}
            transition={{ duration: 3, repeat: isHovered ? 0 : Infinity, ease: "easeInOut" }}
          />
        </motion.g>
      </motion.svg>
    </div>
  );
};

/* ─── Button ─── */
const Btn = ({ children, primary = false, small = false, navLink = false, active = false }) => {
  const [hov, setHov] = useState(false);

  if (navLink) {
    return (
      <button
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          fontFamily: "var(--f-body)", fontWeight: 500,
          fontSize: ".875rem",
          borderRadius: 99, padding: "8px 18px",
          cursor: "pointer", position: "relative", overflow: "hidden", letterSpacing: ".02em",
          background: active
            ? "rgba(184,168,130,0.25)"
            : hov ? "rgba(255,255,255,.12)" : "transparent",
          border: active ? "1px solid rgba(184,168,130,0.5)" : "1px solid transparent",
          color: "#fff",
          transition: "all .25s cubic-bezier(.4,0,.2,1)",
          outline: "none",
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: "var(--f-body)", fontWeight: 600,
        fontSize: small ? ".82rem" : ".9rem",
        borderRadius: 99, padding: small ? "8px 18px" : "11px 22px",
        cursor: "pointer", position: "relative", overflow: "hidden", letterSpacing: ".02em",
        background: hov
          ? "linear-gradient(135deg, #c9b48a 0%, #b09060 100%)"
          : "linear-gradient(135deg, #c0a97a 0%, #a88450 100%)",
        border: "1px solid rgba(255,255,255,.25)",
        color: "#fff",
        boxShadow: hov
          ? "0 8px 28px rgba(176,144,80,.45), 0 2px 8px rgba(0,0,0,.18), inset 0 1px 0 rgba(255,255,255,.25)"
          : "0 4px 16px rgba(176,144,80,.3), inset 0 1px 0 rgba(255,255,255,.2)",
        transform: hov ? "translateY(-2px) scale(1.02)" : "none",
        transition: "all .25s cubic-bezier(.4,0,.2,1)",
        outline: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
      <span style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: small ? 22 : 26, height: small ? 22 : 26,
        borderRadius: "50%",
        background: "rgba(255,255,255,.18)",
        border: "1px solid rgba(255,255,255,.3)",
        flexShrink: 0,
      }}>
        <svg width={small ? 12 : 14} height={small ? 12 : 14} viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="4.5" r="2.5" stroke="rgba(255,255,255,.9)" strokeWidth="1.2"/>
          <path d="M2 12c0-2.761 2.239-5 5-5s5 2.239 5 5" stroke="rgba(255,255,255,.9)" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </span>
    </button>
  );
};

const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
const lerp = (a, b, t) => a + (b - a) * t;
const clamp01 = (v, lo, hi) => Math.min(1, Math.max(0, (v - lo) / (hi - lo)));

/* ─── AnimCell helper ─── */
const AnimCell = ({ children, progress, lo, hi, dx, dy, zIndex, style: extraStyle = {} }) => {
  const p = ease(clamp01(progress, lo, hi));
  return (
    <div style={{
      opacity: p,
      transform: `translate(${dx * (1 - p)}px, ${dy * (1 - p)}px)`,
      transition: "none",
      zIndex,
      ...extraStyle,
    }}>
      {children}
    </div>
  );
};

/* ════════════════════════════════════════════════════
   DESKTOP BENTO
   FIX: removed overflow:hidden from sticky container,
   set overflow:visible on all wrapper divs so animating
   cards are never clipped during entry/scatter.
════════════════════════════════════════════════════ */
const DesktopBento = ({ shadows }) => {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const totalScroll = sectionRef.current.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      setProgress(Math.min(1, Math.max(0, scrolled / Math.max(totalScroll, 1))));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const enterP = ease(clamp01(progress, 0.00, 0.28));
  const scatterP = ease(clamp01(progress, 0.48, 0.72));
  const logoScale = lerp(1.35, 1, scatterP);
  const logoTranslY = lerp(120, 0, enterP);
  const logoOpacity = Math.min(enterP * 1.8, 1);

  const [hovCard, setHovCard] = useState(null);

  const cardStyle = (isHov, shadowColor) => ({
    background: "rgba(255,255,255,.88)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1.5px solid rgba(255,255,255,0.9)",
    borderRadius: "1.25rem",
    padding: "1.2rem 1.3rem",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    boxShadow: `0 8px 32px ${shadowColor}, 0 2px 8px rgba(0,0,0,.04), inset 0 1px 0 rgba(255,255,255,.9)`,
    transition: "transform .35s cubic-bezier(.25,.46,.45,.94)",
    transform: isHov ? "scale(1.025)" : "scale(1)",
  });

  const imageCardStyle = (isHov, shadowColor) => ({
    borderRadius: "1.25rem",
    overflow: "hidden",
    height: "100%",
    border: "1.5px solid rgba(255,255,255,0.9)",
    boxShadow: `0 8px 32px ${shadowColor}, inset 0 1px 0 rgba(255,255,255,.9)`,
    transition: "transform .35s cubic-bezier(.25,.46,.45,.94)",
    transform: isHov ? "scale(1.025)" : "scale(1)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  });

  const ROW_GAP = "0.6rem";
  const COL_GAP = "0.6rem";

  return (
    /* FIX: section itself has no overflow restriction */
    <section ref={sectionRef} style={{ height: "310vh", position: "relative" }}>
      <div style={{
        position: "sticky", top: 0, height: "100vh",
        /* FIX: was overflow:"hidden" — changed to visible so cards animate freely */
        overflow: "visible",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "0 clamp(1.2rem,3vw,2.5rem)",
        backgroundImage: `url(${grad1})`,
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(245,240,234,0.55)",
          backdropFilter: "blur(2px)",
          /* FIX: keep the overlay clipped to viewport so it doesn't bleed */
          overflow: "hidden",
        }} />

        {/* FIX: all wrapper divs use overflow:visible */}
        <div style={{ width: "100%", maxWidth: 1080, position: "relative", zIndex: 2, overflow: "visible" }}>
          <div style={{ position: "relative", overflow: "visible" }}>

            {/* 3×2 grid */}
            <div
              style={{
                display: "grid",
                overflow: "visible",
                paddingTop: "2px",
                gridTemplateColumns: "1fr 1fr 1fr",
                gridTemplateRows: "1fr 1fr",
                gap: ROW_GAP + " " + COL_GAP,
                height: "clamp(340px, 70vh, 960px)",
              }}
            >

              {/* ── ROW 1 ── */}

              {/* Box 1: Beyond Visits (top-left) */}
              <AnimCell progress={progress} lo={0.52} hi={0.78} dx={-110} dy={-50} zIndex={10}>
                <div style={{ height: "100%" }}
                  onMouseEnter={() => setHovCard(0)}
                  onMouseLeave={() => setHovCard(null)}
                >
                  <div style={cardStyle(hovCard === 0, shadows.beyondVisits)}>
                    <h3 style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: ".92rem", color: "#1a1a1a", marginBottom: ".35rem" }}>Beyond Visits</h3>
                    <p style={{ fontFamily: "var(--f-body)", fontSize: ".75rem", color: "#7b7b7b", lineHeight: 1.6 }}>Traditional care treats moments. Joyzen manages the entire journey continuously, not occasionally.</p>
                  </div>
                </div>
              </AnimCell>

              {/* Box 2: Integrated Care (top-center) */}
              <AnimCell progress={progress} lo={0.55} hi={0.80} dx={0} dy={-65} zIndex={9}>
                <div style={{ height: "90%", marginTop: "-30px" }}
                  onMouseEnter={() => setHovCard(1)}
                  onMouseLeave={() => setHovCard(null)}
                >
                  <div style={cardStyle(hovCard === 1, shadows.integratedCare)}>
                    <h3 style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: ".92rem", color: "#1a1a1a", marginBottom: ".35rem" }}>Integrated Care</h3>
                    <p style={{ fontFamily: "var(--f-body)", fontSize: ".75rem", color: "#7b7b7b", lineHeight: 1.6 }}>Doctors, lifestyle, and emotional support, working together as one system.</p>
                  </div>
                </div>
              </AnimCell>

              {/* Box 3: IMAGE — gridb1 (top-right) */}
              <AnimCell progress={progress} lo={0.53} hi={0.79} dx={110} dy={-50} zIndex={10}>
                <div
                  onMouseEnter={() => setHovCard(2)}
                  onMouseLeave={() => setHovCard(null)}
                  style={{
                    ...imageCardStyle(hovCard === 2, shadows.integratedCare),
                    backgroundImage: `url(${gridb1})`,
                    backgroundPosition: "center",
                    height: "100%",
                  }}
                />
              </AnimCell>

              {/* ── ROW 2 ── */}

              {/* Box 4: Focused on Root (bottom-left) */}
              <AnimCell progress={progress} lo={0.58} hi={0.84} dx={-95} dy={50} zIndex={8}>
                <div style={{ height: "100%" }}
                  onMouseEnter={() => setHovCard(3)}
                  onMouseLeave={() => setHovCard(null)}
                >
                  <div style={cardStyle(hovCard === 3, shadows.focused)}>
                    <h3 style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: ".92rem", color: "#1a1a1a", marginBottom: ".35rem" }}>Focused on Root, Not Symptoms</h3>
                    <p style={{ fontFamily: "var(--f-body)", fontSize: ".75rem", color: "#7b7b7b", lineHeight: 1.6 }}>Hormones, lifestyle, fertility, long-term health — everything connected, everything managed.</p>
                  </div>
                </div>
              </AnimCell>

              {/* Box 5: IMAGE — gridb2 (bottom-center) */}
              <AnimCell progress={progress} lo={0.59} hi={0.85} dx={0} dy={65} zIndex={6}>
                <div
                  onMouseEnter={() => setHovCard(4)}
                  onMouseLeave={() => setHovCard(null)}
                  style={{
                    ...imageCardStyle(hovCard === 4, shadows.accent),
                    backgroundImage: `url(${gridb2})`,
                    marginTop: "30px",
                    height: "100%",
                  }}
                />
              </AnimCell>

              {/* Box 6: Designed for Better Outcomes (bottom-right) */}
              <AnimCell progress={progress} lo={0.60} hi={0.86} dx={105} dy={50} zIndex={7}>
                <div style={{ height: "100%" }}
                  onMouseEnter={() => setHovCard(5)}
                  onMouseLeave={() => setHovCard(null)}
                >
                  <div style={cardStyle(hovCard === 5, shadows.outcomes)}>
                    <h3 style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: ".92rem", color: "#1a1a1a", marginBottom: ".35rem" }}>Designed for Better Outcomes</h3>
                    <p style={{ fontFamily: "var(--f-body)", fontSize: ".75rem", color: "#7b7b7b", lineHeight: 1.6 }}>Not more visits. Not more confusion. Clear direction. Continuous support. Real results.</p>
                  </div>
                </div>
              </AnimCell>

            </div>

            {/* ── LOGO CARD — absolutely centered over the gap between rows ── */}
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) scale(${logoScale}) translateY(${logoTranslY}px)`,
              transformOrigin: "center center",
              opacity: logoOpacity,
              zIndex: progress < 0.65 ? 30 : 20,
              transition: "z-index 0.1s",
              pointerEvents: "auto",
            }}>
              <div
                onMouseEnter={() => setHovCard(6)}
                onMouseLeave={() => setHovCard(null)}
                style={{
                  background: "rgba(255,255,255,.96)",
                  backdropFilter: "blur(22px)",
                  WebkitBackdropFilter: "blur(22px)",
                  border: "1.5px solid rgba(255,255,255,0.95)",
                  borderRadius: "1.1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "14px 28px",
                  boxShadow: `0 16px 60px ${shadows.logoCard}, 0 4px 16px rgba(232,104,58,.15), inset 0 1px 0 rgba(255,255,255,.95)`,
                  transition: "transform .35s cubic-bezier(.25,.46,.45,.94)",
                  transform: hovCard === 6 ? "scale(1.04)" : "scale(1)",
                  whiteSpace: "nowrap",
                }}
              >
                <JoyzenSVGLogo width={140} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════
   MOBILE BENTO
════════════════════════════════════════════════════ */
const MobileBento = ({ shadows }) => {
  const sectionRef = useRef(null);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const h = sectionRef.current.offsetHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(h, 1)));
      setScroll(progress);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const CARD_WINDOW = 0.15;
  const CARD_GAP = 0.14;
  const cardCount = 7;

  const getCardStyle = (i) => {
    const enterStart = i * CARD_GAP;
    const enterP = ease(Math.min(1, Math.max(0, (scroll - enterStart) / CARD_WINDOW)));
    let pushAmount = 0;
    for (let j = i + 1; j < cardCount; j++) {
      const jEnterStart = j * CARD_GAP;
      const jP = ease(Math.min(1, Math.max(0, (scroll - jEnterStart) / CARD_WINDOW)));
      pushAmount += jP;
    }
    const opacity = enterP > 0.05 ? Math.min(1, enterP * 1.5) : 0;
    const fadeOut = pushAmount > 1.5 ? Math.max(0, 1 - (pushAmount - 1.5) / 0.8) : 1;
    return {
      opacity: opacity * fadeOut,
      pointerEvents: opacity > 0.1 && fadeOut > 0.1 ? "auto" : "none",
      enterP,
      pushAmount,
    };
  };

  const [hovCard, setHovCard] = useState(null);

  const mobileCardBase = (isHov, shadowColor) => ({
    background: "rgba(255,255,255,.88)",
    backdropFilter: "blur(20px)",
    border: "1.5px solid rgba(255,255,255,0.9)",
    borderRadius: "1.35rem",
    padding: "1.5rem",
    minHeight: "200px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    boxShadow: `0 8px 32px ${shadowColor}`,
    transition: "transform .35s cubic-bezier(.25,.46,.45,.94)",
    transform: isHov ? "scale(1.025)" : "scale(1)",
  });

  const cards = [
    {
      render: (isHov) => (
        <div style={{
          background: "rgba(255,255,255,.92)",
          backdropFilter: "blur(22px)",
          border: "1.5px solid rgba(255,255,255,.9)",
          borderRadius: "1.35rem",
          padding: "2rem 1.5rem",
          textAlign: "center",
          boxShadow: `0 16px 60px ${shadows.logoCard}`,
          transition: "transform .35s cubic-bezier(.25,.46,.45,.94)",
          transform: isHov ? "scale(1.025)" : "scale(1)",
          minHeight: "160px",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <JoyzenSVGLogo width={110} />
        </div>
      )
    },
    {
      render: (isHov) => (
        <div style={mobileCardBase(isHov, shadows.beyondVisits)}>
          <h3 style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: "1rem", color: "#1a1a1a", marginBottom: ".45rem" }}>Beyond Visits</h3>
          <p style={{ fontFamily: "var(--f-body)", fontSize: ".82rem", color: "#7b7b7b", lineHeight: 1.65 }}>Traditional care treats moments. Joyzen manages the entire journey continuously, not occasionally.</p>
        </div>
      )
    },
    {
      render: (isHov) => (
        <div style={{
          borderRadius: "1.35rem",
          overflow: "hidden",
          minHeight: "240px",
          backgroundImage: `url(${gridb1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          border: "1.5px solid rgba(255,255,255,.9)",
          boxShadow: `0 8px 32px ${shadows.integratedCare}`,
          transition: "transform .35s cubic-bezier(.25,.46,.45,.94)",
          transform: isHov ? "scale(1.025)" : "scale(1)",
        }} />
      )
    },
    {
      render: (isHov) => (
        <div style={mobileCardBase(isHov, shadows.focused)}>
          <h3 style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: "1rem", color: "#1a1a1a", marginBottom: ".45rem" }}>Integrated Care</h3>
          <p style={{ fontFamily: "var(--f-body)", fontSize: ".82rem", color: "#7b7b7b", lineHeight: 1.65 }}>Doctors, lifestyle, and emotional support, working together as one system.</p>
        </div>
      )
    },
    {
      render: (isHov) => (
        <div style={mobileCardBase(isHov, shadows.integratedCare)}>
          <h3 style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: "1rem", color: "#1a1a1a", marginBottom: ".45rem" }}>Focused on Root, Not Symptoms</h3>
          <p style={{ fontFamily: "var(--f-body)", fontSize: ".82rem", color: "#7b7b7b", lineHeight: 1.65 }}>Hormones, lifestyle, fertility, long-term health — everything connected, everything managed.</p>
        </div>
      )
    },
    {
      render: (isHov) => (
        <div style={{
          borderRadius: "1.35rem",
          overflow: "hidden",
          minHeight: "240px",
          backgroundImage: `url(${gridb2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          border: "1.5px solid rgba(255,255,255,.9)",
          boxShadow: `0 8px 32px ${shadows.accent}`,
          transition: "transform .35s cubic-bezier(.25,.46,.45,.94)",
          transform: isHov ? "scale(1.025)" : "scale(1)",
        }} />
      )
    },
    {
      render: (isHov) => (
        <div style={mobileCardBase(isHov, shadows.outcomes)}>
          <h3 style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: "1rem", color: "#1a1a1a", marginBottom: ".45rem" }}>Designed for Better Outcomes</h3>
          <p style={{ fontFamily: "var(--f-body)", fontSize: ".82rem", color: "#7b7b7b", lineHeight: 1.65 }}>Not more visits. Not more confusion. Clear direction. Continuous support. Real results.</p>
        </div>
      )
    },
  ];

  return (
    <section ref={sectionRef} style={{ height: `${cardCount * 82 + 100}vh`, position: "relative" }}>
      <div style={{
        position: "sticky", top: 0, height: "100vh", overflow: "hidden",
        backgroundImage: `url(${grad1})`,
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1.5rem 1.2rem",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(245,240,234,0.45)" }} />
        <div style={{ width: "100%", maxWidth: 400, position: "relative", height: "62vh", zIndex: 2 }}>
          {cards.map((card, i) => {
            const { opacity, pointerEvents, enterP, pushAmount } = getCardStyle(i);
            const isHov = hovCard === i;
            const finalX = enterP < 1
              ? lerp(110, 0, enterP) - pushAmount * 108 * enterP
              : 0 - pushAmount * 108;
            return (
              <div
                key={i}
                onMouseEnter={() => setHovCard(i)}
                onMouseLeave={() => setHovCard(null)}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "0%",
                  width: "100%",
                  zIndex: cardCount - i,
                  transform: `translateY(-50%) translateX(${finalX}%)`,
                  opacity,
                  pointerEvents,
                  transition: "none",
                }}
              >
                {card.render(isHov)}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════
   BENTO SECTION
════════════════════════════════════════════════════ */
const BentoSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const shadows = {
    beyondVisits: "rgba(147,210,235,.35)",
    integratedCare: "rgba(232,104,58,.18)",
    logoCard: "rgba(232,104,58,.22)",
    focused: "rgba(147,210,235,.3)",
    accent: "rgba(196,181,253,.3)",
    outcomes: "rgba(196,181,253,.35)",
  };

  if (isMobile) return <MobileBento shadows={shadows} />;
  return <DesktopBento shadows={shadows} />;
};

/* ════════════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════════════ */
export default function JoyzenLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const [activeNav, setActiveNav] = useState("About");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []); 

  const introText = "Joyzen replaces fragmented care with a continuous system where hormones, fertility, and long-term health are managed together. Online or in clinic, it's the same person guiding your care. Tracking your progress. Adjusting your treatment. Moving you forward. Joyzen connects you to the right doctor and keeps your care continuous across every step. Always accessible — speak to your doctor anytime, not just during appointments.";

  const navLinks = ["About", "Program", "Who it's for", "Product"];

  return (
    <>
      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700&f[]=epilogue@500,600,700,800,900&display=swap');
        :root {
          --f-head: 'Epilogue', sans-serif;
          --f-body: 'Satoshi', sans-serif;
          --orange: #E8683A;
          --bg: #f8f6f3;
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: var(--bg); color: #1a1a1a; font-family: var(--f-body); }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #ede8e2; }
        ::-webkit-scrollbar-thumb { background: var(--orange); border-radius: 4px; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes bounceY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(5px)} }
        .h-tag { animation: fadeUp .8s cubic-bezier(.4,0,.2,1) .00s both; }
        .h-h1  { animation: fadeUp .8s cubic-bezier(.4,0,.2,1) .12s both; }
        .h-sub { animation: fadeUp .8s cubic-bezier(.4,0,.2,1) .22s both; }
        .h-cta { animation: fadeUp .8s cubic-bezier(.4,0,.2,1) .32s both; }
        .h-bg  { animation: fadeIn 1.1s ease .05s both; }
        .mesh {
          background:
            radial-gradient(ellipse at 10% 55%,rgba(232,104,58,.08) 0%,transparent 55%),
            radial-gradient(ellipse at 85% 15%,rgba(147,197,253,.12) 0%,transparent 55%),
            radial-gradient(ellipse at 55% 85%,rgba(196,181,253,.08) 0%,transparent 55%),
            var(--bg);
        }
        .hidden { display: none; }
        @media (min-width: 768px) {
          .md\\:flex { display: flex !important; }
          .md\\:block { display: block !important; }
          .md\\:hidden { display: none !important; }
        }
        @media (max-width: 767px) {
          .clarity-inner {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
          .clarity-inner > div:first-child {
            align-items: center !important;
            display: flex !important;
            flex-direction: column !important;
          }
        }
      `}</style>

      <AnimatePresence>
        {showPreloader && (
          <BalancingPreloader onFinished={() => setShowPreloader(false)} />
        )}
      </AnimatePresence>

      <div className="mesh" style={{ visibility: showPreloader ? "hidden" : "visible" }}>

        {/* ── NAV ── */}
        <nav style={{
          position: "absolute", top: 0, left: 0, right: 0, zIndex: 50, height: 60,
          display: "flex", alignItems: "center",
          background: "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,.2)" : "1px solid transparent",
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,.1)" : "none",
          transition: "all .4s",
          padding: "0 clamp(1rem,5vw,3rem)",
        }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            width: "100%", maxWidth: 1100, margin: "0 auto",
          }}>
            <Logo />

            <div className="hidden md:flex" style={{ alignItems: "center", gap: ".25rem" }}>
              {navLinks.map(link => (
                <Btn
                  key={link}
                  navLink
                  active={activeNav === link}
                  onClick={() => setActiveNav(link)}
                >
                  {link}
                </Btn>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div className="hidden md:block">
                <Btn primary small>Book Clarity Call</Btn>
              </div>
              <button className="md:hidden" onClick={() => setMobileMenu(m => !m)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  {mobileMenu
                    ? <path d="M4 4l14 14M18 4L4 18" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
                    : <><line x1="3" y1="6" x2="19" y2="6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" /><line x1="3" y1="11" x2="19" y2="11" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" /><line x1="3" y1="16" x2="19" y2="16" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" /></>
                  }
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div style={{
            position: "fixed", inset: 0, top: 60, zIndex: 49,
            background: "rgba(10,10,10,.97)", backdropFilter: "blur(20px)",
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "flex-start", paddingTop: "2.5rem", gap: "1.25rem",
          }} className="md:hidden">
            {navLinks.map(link => (
              <button key={link} onClick={() => { setActiveNav(link); setMobileMenu(false); }} style={{
                fontFamily: "var(--f-body)", fontSize: "1.1rem", fontWeight: 500,
                color: activeNav === link ? "#EF8F60" : "rgba(255,255,255,.8)",
                background: "none", border: "none", cursor: "pointer", padding: "8px 0",
              }}>{link}</button>
            ))}
            <div style={{ marginTop: ".5rem" }}>
              <Btn primary>Book Clarity Call</Btn>
            </div>
          </div>
        )}

        {/* ── HERO ── */}
        <section style={{
          minHeight: "100svh",
          height: "100svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          paddingBottom: "clamp(2rem,5vw,4rem)",
          paddingTop: 60,
          paddingBottom: 30,
          position: "relative",
          overflow: "hidden",
        }}>
          <div className="h-bg" style={{
            position: "absolute", inset: 0,
            backgroundImage: `url(${heroimg})`,
            backgroundSize: "cover",
           backgroundPosition: isMobile ? "left center" : "top center",
            opacity: 0.97,
          }} />

          <div style={{
            position: "absolute",
            bottom: -120, left: 0, right: 0,
            height: "150px",
            background: "linear-gradient(to bottom, transparent, rgba(248,246,243,0.95) 20%, #f8f6f3 100%)",
            zIndex: 1,
          }} />

          <div style={{ position: "relative", zIndex: 2, maxWidth: 1100, margin: "0 auto", padding: "0 clamp(1rem,5vw,3rem)", width: "100%" }}>
            <h1 className="h-h1" style={{
              fontFamily: "var(--f-head)", fontWeight: 400,
              fontSize: "clamp(1.6rem,2.5vw,3.6rem)",
              lineHeight: 0.4, color: "#fff", maxWidth: 560,
              marginBottom: "1rem", letterSpacing: "-.02em"
            }}>
              A New Health System
            </h1>
            <p className="h-sub" style={{
              fontFamily: "var(--f-body)", fontSize: "clamp(.8rem,1.2vw,.9rem)",
              color: "rgba(255,255,255,.78)", maxWidth: 300,
              lineHeight: 1.6, marginBottom: "1.75rem"
            }}>
              Joyzen is not a clinic. It's a new way of delivering reproductive healthcare.
            </p>
          </div>
        </section>

        {/* ── INTRO TEXT ── */}
        <section style={{
          height: "100vh",
          padding: "clamp(3.5rem,8vw,7rem) clamp(1rem,5vw,3rem)",
          position: "relative",
          backgroundImage: `url(${grad1})`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "rgba(248,246,243,0.82)",
          }} />
          <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
            <ScrollRevealText
              text={introText}
              style={{
                fontFamily: "var(--f-body)",
                fontWeight: 800,
                fontSize: "clamp(1rem,2.2vw,1.35rem)",
                lineHeight: 1.75,
              }}
            />
          </div>
        </section>

        {/* ── BENTO SCROLL SECTION ── */}
        <BentoSection />

        {/* ── BUILT FOR MODERN LIFE ── */}
        <section style={{
          padding: "clamp(4rem,9vw,8rem) clamp(1rem,5vw,3rem)",
          position: "relative",
          backgroundImage: `url(${gridb2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(180deg,rgba(237,232,226,.75) 0%,rgba(248,246,243,.85) 100%)",
          }} />
          <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
            <Reveal>
              <p style={{ fontFamily: "var(--f-head)", fontWeight: 500, fontSize: ".8rem", color: "#aaa", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: ".5rem" }}>Built for</p>
              <h2 style={{ fontFamily: "var(--f-head)", fontWeight: 800, fontSize: "clamp(2.4rem,6vw,4.5rem)", color: "#1a1a1a", letterSpacing: "-.025em", lineHeight: 1.05, marginBottom: "3rem" }}>Modern Life</h2>
            </Reveal>
            <Reveal delay={120}>
              <div
                style={{
                  width: "clamp(180px,28vw,260px)",
                  height: "clamp(180px,28vw,260px)",
                  borderRadius: "50%",
                  overflow: "hidden",
                  margin: "0 auto 2rem",
                  border: "3px solid rgba(232,104,58,.15)",
                  boxShadow: "0 12px 48px rgba(0,0,0,.12), 0 4px 16px rgba(0,0,0,.06)",
                }}
              >
                <img
                  src={profolie}
                  alt="Profile"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center top",
                    display: "block",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <h3 style={{ fontFamily: "var(--f-head)", fontWeight: 700, fontSize: "clamp(1rem,2vw,1.25rem)", color: "#1a1a1a", marginBottom: "1rem" }}>Focused on Root, Not Symptoms</h3>
              <p style={{ fontFamily: "var(--f-body)", fontSize: "clamp(.875rem,1.6vw,.975rem)", color: "#7b7b7b", lineHeight: 1.75, maxWidth: 520, margin: "0 auto" }}>
                Joyzen was built on a simple realization: life has changed, but healthcare hasn't kept up. Care still begins too late. Joyzen enables earlier understanding, proactive care, and continuous guidance.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── BOOK CLARITY CALL ── */}
        <section style={{
  padding: "clamp(2rem,5vw,4rem) clamp(1rem,5vw,3rem)",
  position: "relative",
  backgroundImage: `url(${grad1})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
}}>
  <div style={{
    position: "absolute", inset: 0,
    background: "rgba(248,246,243,0.7)",
  }} />
  
  <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
    <Reveal>
      <div style={{
        background: "rgba(250,248,244,.92)",
        backdropFilter: "blur(18px)",
        border: "1px solid rgba(255,255,255,.8)",
        borderRadius: "2rem",
        boxShadow: "0 4px 32px rgba(0,0,0,.06), inset 0 1px 0 rgba(255,255,255,.95)",
        padding: "clamp(2.5rem,5vw,4.5rem) clamp(2rem,5vw,4rem)",
      }}>
        <div className="clarity-inner" style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: isMobile ? "1.5rem" : "3rem",        // Reduced gap on mobile
          flexDirection: isMobile ? "column" : "row", // Stack on mobile
        }}>
          
          {/* Icon - Moved to top on mobile */}
          <div style={{
            position: "relative",
            width: isMobile 
              ? "clamp(110px, 28vw, 140px)" 
              : "clamp(120px,22vw,190px)",
            height: isMobile 
              ? "clamp(100px, 28vw, 140px)" 
              : "clamp(120px,22vw,190px)",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            order: isMobile ? 1 : 2,   // Icon first on mobile
          }}>
            <HoverJoyzenIcon />
          </div>

          {/* Content */}
          <div style={{ 
            maxWidth: 700, 
            flex: "1 1 320px",
            marginTop:"30px",
            order: isMobile ? 2 : 1,   // Content below on mobile
            textAlign: isMobile ? "center" : "left"
          }}>
            <h2 style={{ 
              fontFamily: "var(--f-head)", 
              fontWeight: 800, 
              fontSize: "clamp(1.5rem,4.5vw,3.5rem)", 
              color: "#0d0d0d", 
              letterSpacing: "-.02em", 
              width: isMobile ? "100%" : "80%", 
              lineHeight: 1.08, 
              marginBottom: "1.25rem" 
            }}>
              Book a<br />clarity call
            </h2>
            
            <p style={{ 
              fontFamily: "var(--f-body)", 
              fontSize: "clamp(.85rem,1.5vw,.95rem)", 
              color: "#6b6b6b", 
              lineHeight: 1.75, 
              marginBottom: "2rem", 
              maxWidth: isMobile ? "100%" : 400,
              marginLeft: isMobile ? "auto" : "0",
              marginRight: isMobile ? "auto" : "0"
            }}>
              If you would like to understand your reproductive health better or learn how Joyzen can support your journey, you can schedule a conversation with our care team.
            </p>
            
            <button style={{
              fontFamily: "var(--f-body)",
              fontWeight: 500,
              fontSize: ".9rem",
              borderRadius: 99,
              padding: "10px 22px",
              cursor: "pointer",
              background: "rgba(255,255,255,.9)",
              border: "1px solid rgba(0,0,0,.1)",
              color: "#1a1a1a",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,.06)",
              outline: "none",
              margin: isMobile ? "0 auto" : "0",
            }}>
              Book Clarity Call
              <span style={{
                display: "inline-flex", 
                alignItems: "center", 
                justifyContent: "center",
                width: 26, 
                height: 26, 
                borderRadius: "50%",
                background: "rgba(0,0,0,.06)",
                border: "1px solid rgba(0,0,0,.08)",
              }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="4.5" r="2.5" stroke="#333" strokeWidth="1.2"/>
                  <path d="M2 12c0-2.761 2.239-5 5-5s5 2.239 5 5" stroke="#333" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </span>
            </button>
          </div>

        </div>
      </div>
    </Reveal>
  </div>
</section>

        {/* ── FOOTER ──
            FIX: responsive background image
            - backgroundSize: "cover" ensures the image always fills the footer at any screen size
            - backgroundPosition: "center center" keeps it centered on all viewports
            - minHeight with clamp so the footer has enough room for the image to show on mobile
            - width: 100% on the footer itself to prevent any horizontal shrinkage
        */}
        <footer style={{
          marginTop: 0,
          position: "relative",
          width: "100%",
          // Increased minHeight slightly for mobile to ensure the background image has room to breathe
          minHeight: "clamp(320px, 50vw, 520px)", 
          backgroundImage: `url(${footer})`,
          // Using 'cover' is usually best, but '50% center' ensures the focal point stays centered
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}>
          <div style={{
            position: "absolute", 
            inset: 0,
            // Added a slight dark overlay to ensure text readability across all screen sizes
            backgroundColor: "rgba(0,0,0,0.2)" 
          }} />
          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", minHeight: "inherit", width: "100%" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", padding: "1.5rem clamp(1rem,5vw,3rem)", display: "flex", justifyContent: "flex-end", gap: "1rem 2rem", flexWrap: "wrap" }}>
              {["Email: info@joyzenlife.com", "Instagram: @joyzen.in"].map(t => (
                <span key={t} style={{ fontFamily: "var(--f-body)", fontSize: ".78rem", color: "rgba(0, 0, 0)" }}>{t}</span>
              ))}
            </div>
            
            <div style={{ flexGrow: 1, padding: "clamp(1rem,5vw,2rem) clamp(1rem,5vw,3rem)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              <h2 style={{ 
                fontFamily: "var(--f-head)", 
                fontWeight: 900, 
                fontSize: "clamp(3.5rem, 18vw, 11rem)", 
                color: "transparent", 
                WebkitTextStroke: "1px rgba(255,255,255,.15)", 
                letterSpacing: "-.03em", 
                userSelect: "none", 
                lineHeight: 1,
                textAlign: "center"
              }}>
                ÷ joyzen
              </h2>
            </div>

            <div style={{ 
  maxWidth: 1100, 
  margin: "0 auto", 
  width: "100%", 
  // Pins the container to the bottom of the relative parent
  position: "absolute",
  bottom: 0,
  left: "50%",
  transform: "translateX(-50%)",
  // Reduced padding on mobile to save space
  padding: isMobile ? "0.75rem clamp(1rem,5vw,3rem)" : "1.5rem clamp(1rem,5vw,3rem)", 
  borderTop: "1px solid rgba(255,255,255,.1)", 
  display: "flex", 
  justifyContent: "space-between", 
  flexWrap: "wrap", 
  // Closer gap for mobile
  gap: isMobile ? "0.25rem" : "1rem"
}}>
  <p style={{ 
    fontFamily: "var(--f-body)", 
    // Smaller font size on mobile
    fontSize: isMobile ? "0.65rem" : ".75rem", 
    color: "rgba(0, 0, 0)",
    // Tightens the height/spacing
    lineHeight: isMobile ? "1.2" : "1.5",
    margin: 0 
  }}>
    © 2026 Joyzen. Built for Healthcare. Designed for Trust.
  </p>
  <p style={{ 
    fontFamily: "var(--f-body)", 
    // Smaller font size on mobile
    fontSize: isMobile ? "0.65rem" : ".75rem", 
    color: "rgba(0, 0, 0)",
    // Tightens the height/spacing
    lineHeight: isMobile ? "1.2" : "1.5",
    margin: 0 
  }}>
    Designed and Developed by TVC Global Services
  </p>
</div>
          </div>
        </footer>

      </div>
    </>
  );
}
