import { BriefcaseBusinessIcon, CalculatorIcon, Calendar, Code2Icon, LayoutDashboard, List, Puzzle, Settings, User2Icon, WalletCards } from "lucide-react";

export const SidebarOptions = [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard"
    },
    {
        name: "Scheduled Interviews",
        icon: Calendar,
        path: "/scheduled-interviews"
    },
    {
        name: "All Interviews",
        icon: List,
        path: "/all-interviews"
    },
    {
        name: "Billing",
        icon: WalletCards,
        path: "/billing"
    },
    {
        name: "Settings",
        icon: Settings,
        path: "/settings"
    }
]

export const InterviewTypes = [
    {
        title: 'Technical',
        icon: Code2Icon
    },
    {
        title: 'Behavioral',
        icon: User2Icon
    },
    {
        title: 'Experience',
        icon: BriefcaseBusinessIcon
    },
    {
        title: 'Problem Solving',
        icon: Puzzle
    },
    {
        title: 'Leadership',
        icon: CalculatorIcon
    }
]