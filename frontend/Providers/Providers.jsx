"use client";

import { useState, useEffect } from "react";
import { ProductContext } from "../context";

export function Providers({ children }) {
    const [productData, setProductData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // 1. Load data
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedCart = localStorage.getItem("blueBrothersCart");
            if (storedCart) {
                try {
                    setProductData(JSON.parse(storedCart));
                } catch (error) {
                    console.error("Failed to parse cart data:", error);
                    localStorage.removeItem("blueBrothersCart");
                }
            }
            setIsLoaded(true);
        }
    }, []);

    // 2. Save data
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("blueBrothersCart", JSON.stringify(productData));
        }
    }, [productData, isLoaded]);

    // --- Actions ---

    // ✅ FIX: Remove by 'cartId' (unique), not 'id' (product id)
    const removeProduct = (cartId) => {
        setProductData((prevData) =>
            prevData.filter((item) => item.cartId !== cartId)
        );
    };

    // ✅ FIX: Update by 'cartId'
    const updateProduct = (cartId, updatedFields) => {
        setProductData((prevData) =>
            prevData.map((item) =>
                item.cartId === cartId ? { ...item, ...updatedFields } : item
            )
        );
    };

    return (
        <ProductContext.Provider
            value={{
                productData,
                setProductData,
                removeProduct,
                updateProduct,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}