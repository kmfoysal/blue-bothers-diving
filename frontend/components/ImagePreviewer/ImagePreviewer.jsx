"use client";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function ImagePreviewer() {
    const [selectedImg, setSelectedImg] = useState(null);

    const ourGallery = [
        { id: 1, image: "/images/our-gallery-img-1.jpg", alt: "our gallery" },
        { id: 2, image: "/images/our-gallery-img-2.jpg", alt: "our gallery" },
        { id: 3, image: "/images/our-gallery-img-3.jpg", alt: "our gallery" },
        { id: 4, image: "/images/our-gallery-img-4.jpg", alt: "our gallery" },
        { id: 5, image: "/images/our-gallery-img-5.jpg", alt: "our gallery" },
        { id: 6, image: "/images/our-gallery-img-6.jpg", alt: "our gallery" },
        { id: 7, image: "/images/our-gallery-img-7.jpg", alt: "our gallery" },
        { id: 8, image: "/images/our-gallery-img-8.jpg", alt: "our gallery" },
        { id: 9, image: "/images/our-gallery-img-9.jpg", alt: "our gallery" },
        { id: 10, image: "/images/our-gallery-img-10.jpg", alt: "our gallery" },
    ];

    return (
        <div className="p-6">
            {/* Image Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {ourGallery.map((item) => (
                    <motion.img
                        key={item.id}
                        src={item.image}
                        alt={item.alt}
                        className="rounded-xl cursor-pointer shadow-lg hover:scale-105 transition"
                        // whileHover={{ scale: 1.05 }}
                        onClick={() => setSelectedImg(item.image)}
                    />
                ))}
            </div>

            {/* Fullscreen Preview */}
            <AnimatePresence>
                {selectedImg && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImg(null)}
                    >
                        <motion.img
                            key={selectedImg}
                            src={selectedImg}
                            alt="Full Preview"
                            className="max-w-[90%] max-h-[90%] rounded-2xl shadow-2xl"
                            initial={{ scale: 0.7, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.7, opacity: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 20,
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
