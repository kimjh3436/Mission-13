// finger print component, uses thumbmark library
import { getFingerprint } from "@thumbmarkjs/thumbmarkjs";
import { useState, useEffect } from 'react';


export const Fingerprint = () => {
    // fingerprint state management 
    const [fingerPrint, setFingerPrint] = useState<string | null>(null)

    // getting the fingerprint then setting it in the state vartiable, re runs anytime fingerprint changes
    useEffect(() => {
        getFingerprint().then((fingerprint) => setFingerPrint(fingerprint))
    },[fingerPrint])

    return (
        <div>{fingerPrint}</div>
    )
};

export default Fingerprint;