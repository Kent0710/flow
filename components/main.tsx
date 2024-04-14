import { twMerge } from "tailwind-merge";
import Link from "next/link";

interface MainProps {
    children : React.ReactNode;
    headerText : string;
    description : string;
    hideHeaderText? : boolean;
    className? : string;
    headerButton? : any;
}
const Main : React.FC<MainProps> = ({
    children,
    headerText,
    description,
    hideHeaderText,
    className,
    headerButton : HeaderButton
}) => {
    return (
        <main className={twMerge(`flex flex-col gap-10 px-[20vw] py-14  h-screen text-sm ${className}`, hideHeaderText && "gap-0")}>
            {hideHeaderText !== true && (
                <div className="flex flex-col gap-4">
                    <section className="flex justify-between">
                        <h1 className="font-bold text-2xl">
                            {headerText}
                        </h1>
                        {HeaderButton && <HeaderButton/>}
                    </section>
                    <p>
                        {description}
                    </p>
                </div>
            )}
            {children}
        </main>
    )
};

export default Main;

interface MainSectionProps {
    title : string;
    children : React.ReactNode
    className? : string;
}
export const MainSection : React.FC<MainSectionProps> = ({
    title,
    children,
    className,
}) => {
    return (
        <section className="flex flex-col gap-4 border-t pt-7">
            <h2 className="font-bold text-lg">
                {title}
            </h2>
            <div className={twMerge(`flex gap-4 items-center flex-wrap ${className}`)}>
                {children}
            </div>
        </section>
    )
};

const Account = () => {
    return (
        <section className="flex flex-col gap-3 px-5">
            <TextLabel label="Email" placeholder="namikaziinakiri@gmail.com" />
            <TextLabel label="Username" placeholder="Namikazii Nakiri" />
            <TextLabel label="Password" placeholder="Thisisnami@1221" type="password" />
        </section>
    )
};
interface TextLabelProps {
    label : string;
    placeholder : string;
    type? : string;
}
const TextLabel : React.FC<TextLabelProps> = ({
    label,
    placeholder,
    type
}) => {
    return (
        <div className="flex flex-col gap-2">
            <p className="font-semibold">
                {label}
            </p>
            <input type={"text" || type} placeholder={placeholder} disabled={true} className="px-3 py-1 rounded-xl" />
        </div>
    )
};