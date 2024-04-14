'use client'

import { useState } from "react";

import { useToast } from "@/components/ui/use-toast"

interface SubmitButtonProps {
    text : string;
    onSubmitText : string;
}
const SubmitButton : React.FC<SubmitButtonProps> = ({
    text,
    onSubmitText
}) => {
    const { toast } = useToast()

    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleClick = () => {
        if (!isSubmitted) setIsSubmitted(true);
        else setIsSubmitted(false)
    }

    if (isSubmitted) {
        toast({
            title : "Creating project....",
        })
        setIsSubmitted(false)
    }

    return (
        <button type="submit" onClick={handleClick} className="w-[10rem] mt-3 bg-blue-700 text-sm py-2 text-white font-bold rounded-xl hover:opacity-70">
            {text}
        </button>
    )
};

export default SubmitButton;