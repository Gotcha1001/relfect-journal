"use client"
import { getAnalytics } from "@/actions/analytics"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useFetch from "@/hooks/use-fetch"
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import MoodAnalyticsSkeleton from "./analytics-loading"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getMoodById, getMoodTrend } from "@/app/lib/moods"
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { format, parseISO } from "date-fns"
import MotionWrapperDelay from "@/components/MotionWrapperDelay"



const timeOptions = [
    { value: "7d", label: "Last 7 Days" },
    { value: "15d", label: "Last 15 Days" },
    { value: "30d", label: "Last 30 Days" },

]



const MoodAnalytics = () => {
    const [period, setPeriod] = useState("7d")

    const {
        loading,
        data: analytics,
        fn: fetchAnalytics,
    } = useFetch(getAnalytics)
    console.log(analytics)

    const { isLoaded } = useUser()

    useEffect(() => {
        fetchAnalytics(period)
    }, [period]);

    if (loading || !analytics?.data || !isLoaded) {
        return <MoodAnalyticsSkeleton />
    }

    const { timeline, stats } = analytics.data

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload?.length) {
            <div className="bg-white p-4 border rounded-lg shadow-lg">
                <p className="font-medium">
                    {format(parseISO(label), "MMM d, yyy")}
                </p>
                <p className="text-indigo-600">Average Mood: {payload[0].value}</p>
                <p className="text-blue-600">Entries: {payload[1].value}</p>
            </div>

        }
    }

    return (
        <>

            <div className="flex justify-between items-center">

                <MotionWrapperDelay
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    variants={{
                        hidden: { opacity: 0, x: 100 },
                        visible: { opacity: 1, x: 0 },
                    }}
                >
                    <h2 className="text-5xl font-bold gradient-title">Dashboard</h2>
                </MotionWrapperDelay>
                <Select value={period} onValueChange={setPeriod}>
                    <SelectTrigger className="w-[140px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {timeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value} >{option.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            {/*STATISTICS  */}
            <div className="space-y-6">
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {/* card one */}
                    <MotionWrapperDelay
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        variants={{
                            hidden: { opacity: 0, y: 100 },
                            visible: { opacity: 1, y: 0 },
                        }}
                    >
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold">{stats.totalEntries}</p>
                                <p className="text-xs text-muted-foreground">
                                    ~{stats.dailyAverage} entries per day</p>
                            </CardContent>
                        </Card>
                    </MotionWrapperDelay>
                    {/* card 2 */}

                    <MotionWrapperDelay
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        variants={{
                            hidden: { opacity: 0, x: -100 },
                            visible: { opacity: 1, x: 0 },
                        }}
                    >
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Average Mood</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold">{stats.averageScore}/10</p>
                                <p className="text-xs text-muted-foreground">
                                    Overall mood score</p>
                            </CardContent>
                        </Card>
                    </MotionWrapperDelay>
                    {/* card 3 */}
                    <MotionWrapperDelay
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        variants={{
                            hidden: { opacity: 0, x: -100 },
                            visible: { opacity: 1, x: 0 },
                        }}
                    >
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Mood Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold flex items-center gap-2">
                                    {getMoodById(stats.mostFrequentMood)?.emoji}
                                    {getMoodTrend(stats.averageScore)}
                                </div>
                            </CardContent>
                        </Card>
                    </MotionWrapperDelay>
                </div>
                {/* CHART */}
                <Card>
                    <CardHeader>
                        <CardTitle >Mood Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full gradient-background2 rounded-lg p-2" >
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart

                                    data={timeline}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date"
                                        tickFormatter={(date) => format(parseISO(date), "MMM d")} />

                                    <YAxis yAxisId="left" domain={[0, 10]} />
                                    <YAxis yAxisId="right"
                                        orientation="right"
                                        domain={[0, "auto"]} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                    <Line
                                        yAxisId="left"
                                        type="monotone"
                                        dataKey="averageScore"
                                        stroke="#6366F1"
                                        name="Average Mood"
                                        strokeWidth={2} />
                                    <Line
                                        yAxisId="right"
                                        type="monotone"
                                        dataKey="entryCount"
                                        stroke="#82ca9d"
                                        name="Number of Entries"
                                        strokeWidth={2}
                                    />

                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div >
        </>
    )
}

export default MoodAnalytics