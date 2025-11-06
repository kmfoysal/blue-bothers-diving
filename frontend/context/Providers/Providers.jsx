"use client";

import { useState } from "react";
import { ProductContext } from "..";

export function Providers({ children }) {
    const [productData, setProductData] = useState({});

    return (
        <ProductContext.Provider value={{ productData, setProductData }}>
            {children}
        </ProductContext.Provider>
    );
}
