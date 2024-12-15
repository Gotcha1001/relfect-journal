
import { getCollections } from "@/actions/collection";
import { getJournalEntries } from "@/actions/journal";
import React from "react";
import Collections from "./_components/collections";
import MoodAnalytics from "./_components/mood-analytics";
import MotionWrapperDelay from "@/components/MotionWrapperDelay";

export const metadata = {
    title: "Dashboard",
};

const Dashboard = async () => {

    const collections = await getCollections()
    const entriesData = await getJournalEntries()

    const entriesByCollection = entriesData?.data.entries.reduce((acc, entry) => {
        const collectionId = entry.collectionId || "unorganized";
        if (!acc[collectionId]) {
            acc[collectionId] = []
        }
        acc[collectionId].push(entry)
        return acc;



    }, {})

    console.log(entriesByCollection)
    return <div className="px-4 py-8 space-y-8">
        <section className="space-y-4">
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
                <MoodAnalytics /></MotionWrapperDelay>
        </section>
        <Collections
            collections={collections}
            entriesByCollection={entriesByCollection}
        />
    </div>;
};

export default Dashboard;

