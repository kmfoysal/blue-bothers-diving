"use client";

import { useState } from "react";
import { ProductContext } from "../context";

export function Providers({ children }) {
    const [productData, setProductData] = useState([]);

    // Function to remove product by id
    const removeProduct = (productId) => {
        setProductData((prevData) =>
            prevData.filter((item) => item.id !== productId)
        );
    };

    return (
        <ProductContext.Provider
            value={{
                productData,
                setProductData,
                removeProduct,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}
