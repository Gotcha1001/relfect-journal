'use client';

import { MOODS } from '@/app/lib/moods';
import EntryCard from '@/components/entry-card';
import MotionWrapperDelay from '@/components/MotionWrapperDelay';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { CalendarDaysIcon } from '@heroicons/react/24/solid';
import { format, isSameDay } from 'date-fns';
import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const JournalFilters = ({ entries, pagination }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMood, setSelectedMood] = useState('');
    const [date, setDate] = useState(null);
    const [filteredEntries, setFilteredEntries] = useState(entries);

    // Apply filters when entries, search, mood, or date change
    useEffect(() => {
        let filtered = entries;

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (entry) =>
                    entry.title.toLowerCase().includes(query) ||
                    entry.content.toLowerCase().includes(query)
            );
        }

        if (selectedMood) {
            filtered = filtered.filter((entry) => entry.mood === selectedMood);
        }

        if (date) {
            filtered = filtered.filter((entry) =>
                isSameDay(new Date(entry.createdAt), date)
            );
        }

        setFilteredEntries(filtered);
    }, [entries, searchQuery, selectedMood, date]);

    // Handle page change with URL parameters
    const handlePageChange = (newPage) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());

        // Preserve filter parameters
        if (searchQuery) params.set('search', searchQuery);
        if (selectedMood) params.set('mood', selectedMood);
        if (date) params.set('date', date.toISOString());

        router.push(`${pathname}?${params.toString()}`);
    };

    // Clear all filters
    const clearFilters = () => {
        setSearchQuery('');
        setSelectedMood('');
        setDate(null);

        // Remove filter parameters from URL
        const params = new URLSearchParams(searchParams.toString());
        params.delete('search');
        params.delete('mood');
        params.delete('date');
        params.set('page', '1');

        router.push(`${pathname}?${params.toString()}`);
    };

    // Render pagination controls
    const renderPagination = () => {
        return (
            <div className="flex justify-between items-center mt-4">
                <Button
                    variant="outline"
                    size="icon"
                    disabled={pagination.current === 1}
                    onClick={() => handlePageChange(pagination.current - 1)}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-gray-500">
                    Page {pagination.current} of {pagination.pages}
                </span>
                <Button
                    variant="outline"
                    size="icon"
                    disabled={!pagination.hasMore}
                    onClick={() => handlePageChange(pagination.current + 1)}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        );
    };

    return (
        <>
            <div className='flex flex-wrap gap-4'>
                <div className='flex-1 min-w-[200px]'>
                    <MotionWrapperDelay
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 2, delay: 0.9 }}
                        variants={{
                            hidden: { opacity: 0, x: -100 },
                            visible: { opacity: 1, x: 0 },
                        }}
                    >
                        <Input
                            placeholder="Search entries..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full hover:border-indigo-600"
                            prefix={<Search className="h-4 w-4 text-gray-400" />}
                        />
                    </MotionWrapperDelay>
                </div>
                <Select value={selectedMood} onValueChange={setSelectedMood}>
                    <SelectTrigger className="w-[150px] hover:border-indigo-600">
                        <SelectValue placeholder="Filter by mood" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.values(MOODS).map((mood) => (
                            <SelectItem key={mood.id} value={mood.id}>
                                <span className='flex items-center gap-2'>
                                    {mood.emoji} {mood.label}
                                </span>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <MotionWrapperDelay
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 1, delay: 0.9 }}
                    variants={{
                        hidden: { opacity: 0, y: -100 },
                        visible: { opacity: 1, y: 0 },
                    }}
                >
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={cn(
                                    "justify-start text-left font-normal hover:border-indigo-600",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarDaysIcon className='h-4 w-4' />
                                {date ? format(date, "PPP") : <span>Pick A Date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>

                    {(searchQuery || selectedMood || date) && (
                        <Button
                            variant="ghost"
                            className="text-indigo-600"
                            onClick={clearFilters}
                        >
                            Clear Filters
                        </Button>
                    )}
                </MotionWrapperDelay>
            </div>

            <div className='text-sm text-gray-500 mt-4 mb-4'>
                Showing {filteredEntries.length} of {pagination.total} entries
            </div>

            {filteredEntries.length === 0 ? (
                <div className='text-center p-8'>
                    <p className='text-gray-500'>No Entries Found</p>
                </div>
            ) : (
                <>
                    <div className='flex flex-col gap-4'>
                        {filteredEntries.map((entry) => (
                            <EntryCard key={entry.id} entry={entry} />
                        ))}
                    </div>

                    {pagination.pages > 1 && renderPagination()}
                </>
            )}
        </>
    );
};

export default JournalFilters;