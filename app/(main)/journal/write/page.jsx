"use client"
import React, { use, useEffect, useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import MotionWrapperDelay from '@/components/MotionWrapperDelay';
import { journalSchema } from '@/app/lib/schema';
import { BarLoader } from 'react-spinners';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getMoodById, MOODS } from '@/app/lib/moods';
import { Button } from '@/components/ui/button';
import useFetch from '@/hooks/use-fetch';
import { createJournalEntry, getDraft, getJournalEntry, saveDraft, updateJournalEntry } from '@/actions/journal';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { createCollection, getCollections } from '@/actions/collection';
import CollectionForm from '@/components/collection-dialog';


// Dynamically import ReactQuill
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });



const JournalEntryPage = () => {

    const [isCollectionDialogOpen, setIsCollectionDialogOpen] = useState(false)

    const [isEditMode, setIsEditMode] = useState(false)

    const { loading: actionLoading, fn: actionFn, data: actionResult
    } = useFetch(isEditMode ? updateJournalEntry : createJournalEntry)

    const { loading: collectionsLoading, fn: fetchCollections, data: collections } = useFetch(getCollections)

    const { loading: createCollectionLoading, fn: createCollectionFn, data: createdCollection } = useFetch(createCollection)

    const router = useRouter()

    const searchParams = useSearchParams()
    const editId = searchParams.get("edit")
    console.log("editId+++++++++:", editId); // Debug log

    const {
        loading: entryLoading,
        data: existingEntry,
        fn: fetchEntry,

    } = useFetch(getJournalEntry)

    const {
        loading: draftLoading,
        data: draftData,
        fn: fetchDraft,
    } = useFetch(getDraft)

    const {
        loading: savingDraft,
        fn: saveDraftFn,
        data: savedDraft,
    } = useFetch(saveDraft)



    useEffect(() => {
        document.title = "Write";
    }, []);

    useEffect(() => {
        if (actionResult && !actionLoading) {

            if (!isEditMode) {  // clearing the DRAFT on entry create
                saveDraftFn({ title: "", content: "", mood: "" })
            }

            router.push(`/collection/${actionResult.collectionId ? actionResult.collectionId : "unorganized"}`)
            toast.success(`Entry ${isEditMode ? "updated" : "created"} successfully`)
        }

    }, [actionLoading, actionResult])

    const { register, handleSubmit, reset, watch, control, formState: { errors, isDirty }, getValues, setValue } = useForm({
        resolver: zodResolver(journalSchema),
        defaultValues: {
            title: "",
            content: "",
            mood: "",
            collectionId: "",
        }
    })

    useEffect(() => {
        fetchCollections()

        if (editId) {
            setIsEditMode(true)
            fetchEntry()
        } else {
            setIsEditMode(false)
            fetchDraft()
        }
    }, [editId])

    useEffect(() => {
        if (isEditMode && existingEntry) {
            reset({
                title: existingEntry.title || "",
                content: existingEntry.content || "",
                mood: existingEntry.mood || "",
                collectionId: existingEntry.collectionId || "",
            })
        } else if (draftData?.success && draftData?.data) {
            reset({
                title: draftData.data.title || "",
                content: draftData.data.content || "",
                mood: draftData.data.mood || "",
                collectionId: "",
            })
        } else {
            reset({
                title: "",
                content: "",
                mood: "",
                collectionId: "",
            })
        }
    }, [draftData, isEditMode, existingEntry]);



    const onSubmit = handleSubmit(async (data) => {
        const mood = getMoodById(data.mood)

        actionFn({
            ...data,
            moodScore: mood.score,
            moodQuery: mood.pixabayQuery,
            ...(isEditMode && { id: editId })
        })
    })

    useEffect(() => {
        if (createdCollection) {
            setIsCollectionDialogOpen(false)
            fetchCollections()
            setValue("collectionId", createdCollection.id)
            toast.success(`Collection ${createdCollection.name} created!`)
        }
    }, [createdCollection]);


    const handleCreateCollection = async (data) => {
        createCollectionFn(data)
    }

    const formData = watch()

    const handleSaveDraft = async () => {
        if (!isDirty) {
            toast.error("No Changes To Save")
            return;
        }
        const result = await saveDraftFn(formData)

    }

    useEffect(() => {
        if (savedDraft?.success && !savingDraft) {
            toast.success("Draft Saved Successfully")
        }
    }, [saveDraft, savingDraft]);


    const isLoading = actionLoading || collectionsLoading || entryLoading || draftLoading || savingDraft

    return (
        <div className='py-8'>
            <Head>
                <title>Write</title>
            </Head>
            <form className='space-y-3 mx-auto' onSubmit={onSubmit}>
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
                    <h1 className='text-5xl md:text-6xl gradient-title'>{isEditMode ? "Edit Entry" : "What's on your mind?"}</h1>
                </MotionWrapperDelay>
                {isLoading && < BarLoader color='indigo' width={"100%"} />}

                <div className='space-y-2'>
                    <label className='text-sm font-medium'>Title</label>
                    <Input
                        disabled={isLoading}
                        {...register("title")}
                        placeholder="Give your entry a title..."
                        className={`py-5 md:text-md ${errors.title ? "border-red-500" : ""}`}
                    />
                    {errors.title && (
                        <p className='text-red-500 text-sm'>{errors.title.message}</p>
                    )}
                </div>

                <div className='space-y-2'>
                    <label className='text-sm font-medium'>How are you feeling?</label>
                    <Controller
                        name="mood"
                        control={control}
                        render={({ field }) => {
                            return (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger
                                        className={errors.mood ? "border-red-500" : ""}
                                    >
                                        <SelectValue placeholder="Select a mood..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.values(MOODS).map((mood, index) => (
                                            <SelectItem key={`${mood.id}-${index}`} value={mood.id}>
                                                <span className='flex items-center gap-2'>
                                                    {mood.emoji} {mood.label}
                                                </span>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )
                        }}
                    />
                    {errors.mood && (
                        <p className='text-red-500 text-sm'>{errors.mood.message}</p>
                    )}
                </div>


                <div className='space-y-2'>
                    <label className='text-sm font-medium'>{getMoodById(getValues("mood"))?.prompt ?? "Write your thoughts..."}</label>
                    <Controller
                        name="content"
                        control={control}
                        render={({ field }) => (
                            <ReactQuill
                                readOnly={isLoading}
                                theme='snow'
                                value={field.value}
                                onChange={field.onChange}

                                modules={{
                                    toolbar: [
                                        // Headers
                                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                                        // Text formatting
                                        ['bold', 'italic', 'underline', 'strike'],
                                        [{ 'color': [] }, { 'background': [] }],
                                        [{ 'font': [] }],
                                        [{ 'script': 'sub' }, { 'script': 'super' }],

                                        // Alignment
                                        [{ 'align': [] }],

                                        // Lists
                                        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],

                                        // Advanced elements
                                        ['blockquote', 'code-block'],

                                        // Links and media
                                        ['link', 'image', 'video'],

                                        // Cleanup
                                        ['clean']
                                    ],
                                }}
                            />
                        )}
                    />
                    {errors.content && (
                        <p className='text-red-500 text-sm'>{errors.content.message}</p>
                    )}
                </div>

                {/* selecting our collection  */}
                <div className='space-y-2'>
                    <label className='text-sm font-medium'>Add to Collection (optional)</label>
                    <Controller
                        name="collectionId"
                        control={control}
                        render={({ field }) => {
                            return (
                                <Select onValueChange={(value) => {
                                    if (value === 'new') {
                                        setIsCollectionDialogOpen(true)
                                    } else {
                                        field.onChange(value)
                                    }

                                }} value={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose a collection..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {collections?.map((collection, index) => (
                                            <SelectItem key={`${collection.id}-${index}`} value={collection.id}>
                                                {collection.name}
                                            </SelectItem>
                                        ))}
                                        <SelectItem value="new">
                                            <span className='text-indigo-600'>
                                                + Create A New Collection
                                            </span>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            )
                        }}
                    />
                    {errors.collectionId && (
                        <p className='text-red-500 text-sm'>{errors.collectionId.message}</p>
                    )}
                </div>
                <div className='space-x-4 flex'>
                    {!isEditMode && (
                        <Button
                            onClick={handleSaveDraft}
                            disabled={savingDraft || !isDirty}
                            variant="outline"
                            type="button"
                        >
                            {savingDraft && < BarLoader color='indigo' width={"100%"} />}
                            Save As Draft
                        </Button>
                    )}

                    <Button type="submit" variant="journal" disabled={actionLoading || !isDirty}>
                        {isEditMode ? "Update" : "Publish"}
                    </Button>
                    {isEditMode && (
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                router.push(`/journal/${existingEntry.id}`)
                            }}
                            variant="destructive"
                        >
                            Cancel
                        </Button>
                    )}
                </div>
            </form>
            <CollectionForm open={isCollectionDialogOpen} setOpen={setIsCollectionDialogOpen} loading={createCollectionLoading} onSuccess={handleCreateCollection} />
        </div>
    );
};

export default JournalEntryPage;
