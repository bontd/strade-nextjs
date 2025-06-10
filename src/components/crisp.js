"use client"

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("99ad9c45-2061-4326-ad80-3d5a770b3871");
    });

    return null;
}

export default CrispChat;