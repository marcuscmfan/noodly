import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const AnimatedText = ({ text, speed = 100, className = '', element = 'h1' }) => {

    const [display, setDisplay] = useState('');

    AnimatedText.propTypes = {
        text: PropTypes.string.isRequired,
        speed: PropTypes.number,
        className: PropTypes.string,
        element: PropTypes.string
    }

    useEffect(() => {
        let cancelled = false;
        setDisplay('');
        const timeouts = [];

        text.split('').forEach((char, idx) => {
            const timer = setTimeout(() => {
                if (!cancelled) {
                setDisplay(prev => prev + char);
                }
            }, speed * idx);
            timeouts.push(timer);
        });

        return () => {
            cancelled = true;
            timeouts.forEach(clearTimeout);
        };
    }, [text, speed]);

  const Tag = element;
  return <Tag className={className}>{display}</Tag>;
};

export default AnimatedText;
