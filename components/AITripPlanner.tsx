import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GoogleGenAI, Type } from "@google/genai";
import { DESTINATIONS } from '../constants';
import type { SuggestedDestination, Destination } from '../types';
import AnimatedWrapper from './AnimatedWrapper';
import DestinationCard from './DestinationCard';
import { SparklesIcon, SpinnerIcon } from './Icons';

interface AITripPlannerProps {
    onCardClick: (destination: Destination) => void;
}

const AITripPlanner: React.FC<AITripPlannerProps> = ({ onCardClick }) => {
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [suggestions, setSuggestions] = useState<SuggestedDestination[]>([]);
    const [budget, setBudget] = useState('');
    const [duration, setDuration] = useState('');
    const [groupSize, setGroupSize] = useState('');

    const handleGeneratePlan = async () => {
        if (!prompt.trim() || isLoading) return;

        setIsLoading(true);
        setError(null);
        setSuggestions([]);

        try {
            // FIX: Removed unnecessary 'as string' type assertion.
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

            const systemInstruction = `You are an expert travel planner for Chaloman Tours. Your task is to analyze a user's travel request and recommend the most suitable destinations from a provided list. You must only return the IDs of the recommended destinations and a short, compelling reason for each. Your response must be in JSON format and adhere to the provided schema. Only suggest destinations from the list. If no destinations match, return an empty array for recommendations. Recommend at most 3 destinations.`;

            const preferences = [];
            if (budget) preferences.push(`Budget: ${budget}`);
            if (duration) preferences.push(`Duration: ${duration}`);
            if (groupSize) preferences.push(`Group size: ${groupSize}`);

            const preferencesText = preferences.length > 0 ? `\n\nTravel preferences: ${preferences.join(', ')}` : '';

            const contents = `
                Here is the list of available destinations:
                ${JSON.stringify(DESTINATIONS.map(d => ({ id: d.id, name: d.name, country: d.country, description: d.description })), null, 2)}
    
                Here is the user's travel request:
                "${prompt}"${preferencesText}
            `;

            const responseSchema = {
                type: Type.OBJECT,
                properties: {
                    recommendations: {
                        type: Type.ARRAY,
                        description: "An array of recommended destination objects.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                id: {
                                    type: Type.INTEGER,
                                    description: "The ID of the recommended destination."
                                },
                                reason: {
                                    type: Type.STRING,
                                    description: "A short, compelling reason (20-30 words) why this destination matches the user's request."
                                }
                            },
                            required: ['id', 'reason']
                        }
                    }
                },
                required: ['recommendations']
            };

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents,
                config: {
                    systemInstruction,
                    responseMimeType: "application/json",
                    responseSchema,
                },
            });

            // FIX: Added .trim() to prevent parsing errors from whitespace.
            const jsonResponse = JSON.parse(response.text.trim());

            if (jsonResponse.recommendations && jsonResponse.recommendations.length > 0) {
                const results: SuggestedDestination[] = jsonResponse.recommendations
                    .map((rec: { id: number; reason: string }) => {
                        const destination = DESTINATIONS.find(d => d.id === rec.id);
                        return destination ? { destination, reason: rec.reason } : null;
                    })
                    .filter((item: SuggestedDestination | null): item is SuggestedDestination => item !== null);

                setSuggestions(results);
            } else {
                setError("I couldn't find a perfect match in our destinations. Try describing your ideal trip differently!");
            }

            // FIX: Explicitly typed the error object to 'any' to prevent potential TypeScript errors with strict settings. This resolves the reported errors.
        } catch (e: any) {
            console.error("AI Trip Planner Error:", e);
            setError("Sorry, I'm having trouble planning right now. Please check your connection or try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="bg-secondary py-20">
            <div className="container mx-auto px-6 text-center">
                <AnimatedWrapper>
                    <SparklesIcon className="h-12 w-12 mx-auto text-highlight mb-4" />
                    <h2 className="text-4xl font-bold font-serif mb-4">Your Personal AI Trip Planner</h2>
                    <p className="text-xl text-accent max-w-3xl mx-auto mb-8">
                        Describe your dream vacation, and our AI will find the perfect destinations for you from our catalog.
                    </p>

                    {/* Trip Preferences */}
                    <div className="max-w-4xl mx-auto mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Budget Selector */}
                            <div className="bg-primary p-4 rounded-lg shadow-lg">
                                <label className="block text-sm font-medium text-accent mb-2">Budget Range</label>
                                <select
                                    value={budget}
                                    onChange={(e) => setBudget(e.target.value)}
                                    className="w-full bg-accent/20 border border-accent/30 rounded-md py-2 px-3 text-light focus:outline-none focus:ring-2 focus:ring-highlight"
                                    disabled={isLoading}
                                >
                                    <option value="">Any budget</option>
                                    <option value="budget">Budget-friendly</option>
                                    <option value="mid-range">Mid-range</option>
                                    <option value="luxury">Luxury</option>
                                </select>
                            </div>

                            {/* Duration Selector */}
                            <div className="bg-primary p-4 rounded-lg shadow-lg">
                                <label className="block text-sm font-medium text-accent mb-2">Trip Duration</label>
                                <select
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    className="w-full bg-accent/20 border border-accent/30 rounded-md py-2 px-3 text-light focus:outline-none focus:ring-2 focus:ring-highlight"
                                    disabled={isLoading}
                                >
                                    <option value="">Any duration</option>
                                    <option value="weekend">Weekend (2-3 days)</option>
                                    <option value="week">Week (4-7 days)</option>
                                    <option value="extended">Extended (2+ weeks)</option>
                                </select>
                            </div>

                            {/* Group Size Selector */}
                            <div className="bg-primary p-4 rounded-lg shadow-lg">
                                <label className="block text-sm font-medium text-accent mb-2">Group Size</label>
                                <select
                                    value={groupSize}
                                    onChange={(e) => setGroupSize(e.target.value)}
                                    className="w-full bg-accent/20 border border-accent/30 rounded-md py-2 px-3 text-light focus:outline-none focus:ring-2 focus:ring-highlight"
                                    disabled={isLoading}
                                >
                                    <option value="">Any group size</option>
                                    <option value="solo">Solo traveler</option>
                                    <option value="couple">Couple</option>
                                    <option value="family">Family</option>
                                    <option value="group">Group</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-3xl mx-auto bg-primary p-4 rounded-lg shadow-lg flex flex-col sm:flex-row gap-4">
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="e.g., 'A relaxing 7-day beach vacation with great food and culture' or 'An adventurous hiking trip in the mountains'"
                            className="w-full h-24 sm:h-auto bg-accent/20 border border-accent/30 rounded-md py-3 px-4 text-light focus:outline-none focus:ring-2 focus:ring-highlight resize-none flex-grow"
                            rows={2}
                            disabled={isLoading}
                            aria-label="Describe your dream vacation"
                        />
                        <button
                            onClick={handleGeneratePlan}
                            disabled={isLoading || !prompt.trim()}
                            className="bg-highlight text-primary font-bold py-3 px-6 rounded-lg hover:bg-opacity-80 transition-all duration-300 disabled:bg-accent disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-fit"
                            aria-live="polite"
                        >
                            {isLoading ? (
                                <>
                                    <SpinnerIcon className="h-5 w-5 animate-spin" />
                                    <span>Planning...</span>
                                </>
                            ) : (
                                <>
                                    <SparklesIcon className="h-5 w-5" />
                                    <span>Create Plan</span>
                                </>
                            )}
                        </button>
                    </div>
                </AnimatedWrapper>

                {error && (
                    <AnimatedWrapper className="mt-8">
                        <div className="max-w-3xl mx-auto bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-lg" role="alert">
                            <p className="mb-4">{error}</p>
                            <Link
                                to="/contact"
                                className="inline-block bg-highlight text-primary font-bold py-2 px-4 rounded-lg text-sm hover:bg-opacity-80 transition-colors duration-300"
                            >
                                Contact Us for Custom Planning
                            </Link>
                        </div>
                    </AnimatedWrapper>
                )}

                {suggestions.length > 0 && (
                    <div className="mt-16 text-left">
                        <AnimatedWrapper>
                            <h3 className="text-3xl font-bold font-serif text-center mb-12">
                                Here's What We Found For You
                            </h3>
                        </AnimatedWrapper>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {suggestions.map((suggestion, index) => (
                                <AnimatedWrapper key={suggestion.destination.id} delay={`${index * 150}ms`}>
                                    <DestinationCard
                                        destination={suggestion.destination}
                                        aiReason={suggestion.reason}
                                        onCardClick={onCardClick}
                                    />
                                </AnimatedWrapper>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AITripPlanner;