'use client'

import { twMerge } from "tailwind-merge";

const days = [
    " ", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15",
    "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30",
    " ", " ", " ", " "
];
const daysHeader = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
];

const Calendar = () => {

    const data = [
        {
            dayId : "1",
            projects : [
                { title : "Flow Startup", due : "March 20, 2024" },
                { title : "Bite Startup", due : "March 20, 2024" },
            ]
        },
        {
            dayId : "5",
            projects : [
                { title : "Vite Startup", due : "March 20, 2024" },
                { title : "Three Startup", due : "March 20, 2024" },
            ]
        }
    ]

    const dayWithProjects = ['1', '5']

    return (
        <div className="grid grid-cols-7">
            {days.map((day) => (
                <CalendarBox 
                    key={day}
                    day={day}
                    data={data}
                    dayWithProjects={dayWithProjects}
                />
            ))}
        </div>
    )
};

export default Calendar;

const boxClassname = "border p-10 text-center"

type CalendarProjectType = {
    title : string;
    due : string;
}
interface CalendarBoxProps {
    day : string;
    data? : any[];
    dayWithProjects : string[]
}
const CalendarBox : React.FC<CalendarBoxProps> = ({
    day,
    data,
    dayWithProjects
}) => {
    return (
        <div className={twMerge(`${boxClassname} flex flex-col gap-3 rounded-xl`)}>
            <small> {day} </small>
            <div className="flex flex-col gap-3">
                {dayWithProjects.map((num) => (
                    num === day && data?.map((dayItem) => (
                        dayItem.dayId == day && dayItem.projects.map((proj : any) => (
                            <CalendarProjectBox key={dayItem.dayId} title={proj.title} due={proj.due} />
                        ))
                    ))
                ))}
            </div>
        </div>
    )
};
interface CalendarProjectBoxProps {
    title : string;
    due : string;
}
const CalendarProjectBox : React.FC<CalendarProjectBoxProps> = ({
    title,
    due
}) => {
    return (
        <div className="p-3 text-sm rounded-xl hover:bg-accent">
            <h5 className="font-bold">
                {title}
            </h5>
            <p>
                {due}
            </p>
        </div>
    )
};