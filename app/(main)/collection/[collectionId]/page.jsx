import { getCollection } from "@/actions/collection";
import { getJournalEntries } from "@/actions/journal";
import DeleteCollectionDialog from "../_components/delete-collection";
import JournalFilters from "../_components/journal-filters";

export const metadata = {
    title: "Collections",
};

const CollectionPage = async ({ params, searchParams }) => {
    // Await the params and searchParams before using them
    const { collectionId } = await params;
    const resolvedSearchParams = await searchParams;

    const page = resolvedSearchParams?.page ? parseInt(resolvedSearchParams.page) : 1;
    const limit = resolvedSearchParams?.limit ? parseInt(resolvedSearchParams.limit) : 10;

    const entries = await getJournalEntries({
        collectionId,
        page,
        limit
    });

    const collection = await getCollection(collectionId);

    return (
        <div className="space-y-6">
            <div className="flex flex-col justify-between">
                <div className="flex justify-between">
                    <h1 className="text-4xl font-bold gradient-title">
                        {collectionId === "unorganized"
                            ? "Unorganized Entries"
                            : collection?.name || "Collection"
                        }
                    </h1>
                    {collection && (
                        <DeleteCollectionDialog
                            collection={collection}
                            entriesCount={entries.data.entries.length}
                        />
                    )}
                </div>
                {collection?.description && (
                    <h2 className="font-extralight pl-1">{collection?.description}</h2>
                )}
            </div>
            <JournalFilters
                entries={entries.data.entries}
                pagination={entries.data.pagination}
            />
        </div>
    );
};

export default CollectionPage;
