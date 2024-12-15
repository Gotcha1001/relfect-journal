import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import DeleteDialog from "./_components/delete-dialog";
import EditButton from "./_components/edit-button";
import { getMoodById } from "@/app/lib/moods";
import { getJournalEntry } from "@/actions/journal";
import MotionWrapperDelay from "@/components/MotionWrapperDelay";


export const metadata = {
    title: "Single Entry",
};

export default async function JournalEntryPage({ params }) {
    const { id } = await params;
    const entry = await getJournalEntry(id);
    const mood = getMoodById(entry.mood);

    return (
        <>
            {/* Header with Mood Image */}

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
                {entry.moodImageUrl && (
                    <div className="relative h-48 md:h-64 w-full">
                        <Image
                            src={entry.moodImageUrl}
                            alt="Mood visualization"
                            className="object-contain"
                            fill
                            priority
                        />
                    </div>
                )}</MotionWrapperDelay>

            <div className="p-6 space-y-6">
                {/* Header Section */}
                <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="space-y-1">
                            <MotionWrapperDelay
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.9, delay: 0.8 }}
                                variants={{
                                    hidden: { opacity: 0, y: 100 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                            >
                                <div className="flex items-center gap-2">
                                    <h1 className="text-5xl font-bold gradient-title">
                                        {entry.title}
                                    </h1>
                                </div></MotionWrapperDelay>
                            <p className="text-gray-500">
                                Created {format(new Date(entry.createdAt), "PPP")}
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <EditButton entryId={id} />
                            <DeleteDialog entryId={id} />
                        </div>
                    </div>

                    {/* Tags Section */}
                    <div className="flex flex-wrap gap-2">
                        {entry.collection && (
                            <Link href={`/collection/${entry.collection.id}`}>
                                <Badge>Collection: {entry.collection.name}</Badge>
                            </Link>
                        )}
                        <Badge
                            variant="outline"
                            style={{
                                backgroundColor: `var(--${mood?.color}-50)`,
                                color: `var(--${mood?.color}-700)`,
                                borderColor: `var(--${mood?.color}-200)`,
                            }}
                        >
                            Feeling {mood?.label}
                        </Badge>
                    </div>
                </div>

                <hr />

                {/* Content Section */}
                <div className="ql-snow">
                    <div
                        className="ql-editor"
                        dangerouslySetInnerHTML={{ __html: entry.content }}
                    />
                </div>

                {/* Footer */}
                <div className="text-sm text-gray-500 pt-4 border-t">
                    Last updated {format(new Date(entry.updatedAt), "PPP 'at' p")}
                </div>
            </div>
        </>
    );
}