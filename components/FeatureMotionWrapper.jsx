"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function FeatureMotionWrapper({ children, index }) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    // Use a consistent seeded random function to generate deterministic animations
    const seedRandom = (seed) => {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    };

    const getRandomDirection = (index, min, max) => {
        // Use the index as a seed to generate consistent "random" values
        const seed = seedRandom(index + 42);
        return Math.floor(seed * (max - min + 1)) + min;
    };

    useEffect(() => {
        const currentRef = ref.current; // Local variable to capture current ref

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    // Optional: reset visibility when element leaves viewport
                    setIsVisible(false);
                }
            },
            {
                threshold: 0.1, // Trigger when 10% of the element is visible
            }
        );

        if (currentRef) {
            observer.observe(currentRef);
        }

        // Cleanup observer on component unmount
        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []); // Empty dependency array as we're using a local variable for the ref

    return (
        <motion.div
            ref={ref}
            initial={{
                x: getRandomDirection(index, -200, 200),
                y: getRandomDirection(index, -200, 200),
                opacity: 0,
            }}
            animate={isVisible ? {
                x: 0,
                y: 0,
                opacity: 1,
            } : {
                x: getRandomDirection(index, -200, 200),
                y: getRandomDirection(index, -200, 200),
                opacity: 0,
            }}
            transition={{
                duration: 0.5 + index * 0.3,
                delay: 0.3 + index * 0.1,
            }}
        >
            {children}
        </motion.div>
    );
}