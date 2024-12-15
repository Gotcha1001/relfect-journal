"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Plus } from "lucide-react";
import { getMoodById } from "@/app/lib/moods";
import MotionWrapperDelay from "@/components/MotionWrapperDelay";
import FeatureMotionWrapper from "@/components/FeatureMotionWrapper";

const colorSchemes = {
    unorganized: {
        bg: "bg-indigo-100 hover:bg-indigo-50",
        tab: "bg-indigo-400 group-hover:bg-indigo-300",
    },
    collection: {
        bg: "bg-purple-100 hover:bg-purple-50",
        tab: "bg-purple-500 group-hover:bg-purple-300",
    },
    createCollection: {
        bg: "bg-indigo-700 hover:bg-indigo-100",
        tab: "bg-indigo-100 hover:bg-indigo-50",
    },
};


const FolderTab = ({ colorClass }) => (
    <MotionWrapperDelay
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        variants={{
            hidden: { opacity: 0, y: -10 },
            visible: { opacity: 1, y: 0 },
        }}
    >
        <div
            className={`absolute inset-x-4 -top-2 h-2 rounded-t-md transform -skew-x-6 transition-colors ${colorClass}`}
        />
    </MotionWrapperDelay>
);





const EntryPreview = ({ entry }) => (
    <MotionWrapperDelay
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0 },
        }}
    >
        <div className="bg-white/50 p-2 rounded text-sm truncate">
            <span className="mr-2">{getMoodById(entry.mood)?.emoji}</span>
            {entry.title}
        </div>
    </MotionWrapperDelay>
);


const CollectionPreview = ({
    id,
    name,
    entries = [],
    isUnorganized = false,
    isCreateNew = false,
    onCreateNew,
}) => {
    if (isCreateNew) {
        return (
            <MotionWrapperDelay
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                variants={{
                    hidden: { opacity: 0, y: 100 },
                    visible: { opacity: 1, y: 0 },
                }}
            >
                <button
                    onClick={onCreateNew}
                    className="group relative h-[200px] cursor-pointer"
                >
                    <FolderTab colorClass={colorSchemes["createCollection"].bg} />
                    <div
                        className={`relative h-full rounded-lg p-6 shadow-md hover:shadow-lg transition-all flex flex-col items-center justify-center gap-4 ${colorSchemes["createCollection"].tab}`}
                    >
                        <div className="h-12 w-12 rounded-full bg-gray-200 group-hover:bg-gray-300 flex items-center justify-center">
                            <Plus className="h-6 w-6 text-gray-600" />
                        </div>
                        <p className="text-gray-600 font-medium">Create New Collection</p>
                    </div>
                </button>
            </MotionWrapperDelay>
        );
    }

    return (
        <Link
            href={`/collection/${isUnorganized ? "unorganized" : id}`}
            className="group relative"
        >
            <FolderTab
                colorClass={
                    colorSchemes[isUnorganized ? "unorganized" : "collection"].tab
                }
            />
            <div
                className={`relative rounded-lg p-6 shadow-md hover:shadow-lg transition-all ${colorSchemes[isUnorganized ? "unorganized" : "collection"].bg}`}
            >
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{isUnorganized ? "📂" : "📁"}</span>
                    <h3 className="text-lg font-semibold truncate">{name}</h3>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>{entries.length} entries</span>
                        {entries.length > 0 && (
                            <span>
                                {formatDistanceToNow(new Date(entries[0].createdAt), {
                                    addSuffix: true,
                                })}
                            </span>
                        )}
                    </div>
                    <div className="space-y-2 mt-4">
                        {entries.length > 0 ? (
                            entries.slice(0, 2).map((entry, index) => (
                                <FeatureMotionWrapper key={entry.id} index={index}>
                                    <EntryPreview entry={entry} />
                                </FeatureMotionWrapper>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500 italic">No entries yet</p>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CollectionPreview;
