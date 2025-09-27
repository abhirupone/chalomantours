import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import AnimatedWrapper from './AnimatedWrapper';
import { PaperAirplaneIcon, UserIcon, CalendarIcon, MapPinIcon } from './Icons';

interface FormData {
    // Personal Information
    fullName: string;
    email: string;
    phone: string;
    
    // Trip Details
    destination: string;
    startDate: string;
    endDate: string;
    groupSize: number;
    budget: string;
    
    // Preferences
    accommodation: string;
    activities: string[];
    transportation: string;
    dietaryRequirements: string;
    specialRequests: string;
}

const CustomTourForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        phone: '',
        destination: '',
        startDate: '',
        endDate: '',
        groupSize: 1,
        budget: '',
        accommodation: '',
        activities: [],
        transportation: '',
        dietaryRequirements: '',
        specialRequests: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleActivityChange = (activity: string, checked: boolean) => {
        setFormData(prev => ({
            ...prev,
            activities: checked 
                ? [...prev.activities, activity]
                : prev.activities.filter(a => a !== activity)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Basic validation - at least name and email should be provided
        if (!formData.fullName.trim() || !formData.email.trim()) {
            setSubmitStatus('error');
            return;
        }
        
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            // EmailJS configuration - same as Contact page
            const serviceId = 'service_69ysp7u';
            const templateId = 'template_custom_tour'; // Custom template for tour requests
            const publicKey = 'l2PZUKDQalqG2Oe5e';

            // Template parameters for custom tour request
            const templateParams = {
                from_name: formData.fullName,
                from_email: formData.email,
                phone: formData.phone || '',
                destination: formData.destination || '',
                startDate: formData.startDate || '',
                endDate: formData.endDate || '',
                groupSize: formData.groupSize || 1,
                budget: formData.budget || '',
                accommodation: formData.accommodation || '',
                activities: formData.activities.length > 0 ? formData.activities.join(', ') : '',
                transportation: formData.transportation || '',
                dietaryRequirements: formData.dietaryRequirements || '',
                specialRequests: formData.specialRequests || '',
                to_email: 'chaloman@yahoo.com',
            };

            // Send email using EmailJS
            await emailjs.send(serviceId, templateId, templateParams, publicKey);

            setSubmitStatus('success');

            // Reset form
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                destination: '',
                startDate: '',
                endDate: '',
                groupSize: 1,
                budget: '',
                accommodation: '',
                activities: [],
                transportation: '',
                dietaryRequirements: '',
                specialRequests: ''
            });
        } catch (error) {
            console.error('Error sending custom tour request:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const activityOptions = [
        'Heritage Sites & Monuments', 'Temple Tours', 'Cultural Festivals', 'Ayurvedic Spa',
        'Wildlife Safaris', 'Himalayan Trekking', 'Beach Relaxation', 'Yoga & Meditation',
        'Local Village Visits', 'Street Food Tours', 'Photography Tours', 'Adventure Sports'
    ];

    return (
        <section className="bg-secondary py-20">
            <div className="container mx-auto px-6">
                <AnimatedWrapper>
                    <div className="text-center mb-12">
                        <UserIcon className="h-12 w-12 mx-auto text-highlight mb-4" />
                        <h2 className="text-4xl font-bold font-serif mb-4">Create Your Custom Tour</h2>
                        <p className="text-xl text-accent max-w-3xl mx-auto">
                            Tell us about your dream Indian journey and we'll create a personalized tour package featuring India's rich heritage, diverse cultures, and breathtaking landscapes.
                        </p>
                    </div>
                </AnimatedWrapper>

                <div className="max-w-4xl mx-auto">
                    <form onSubmit={handleSubmit} className="bg-primary rounded-lg shadow-lg p-8">
                        {/* Personal Information */}
                        <AnimatedWrapper>
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold font-serif mb-6 flex items-center gap-2">
                                    <UserIcon className="h-6 w-6 text-highlight" />
                                    Personal Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-accent mb-2">
                                            Full Name <span className="text-highlight">(recommended)</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            className="w-full bg-accent/20 border border-accent/30 rounded-md py-3 px-4 text-accent focus:outline-none focus:ring-2 focus:ring-highlight"
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-accent mb-2">
                                            Email Address <span className="text-highlight">(recommended)</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full bg-accent/20 border border-accent/30 rounded-md py-3 px-4 text-accent focus:outline-none focus:ring-2 focus:ring-highlight"
                                            placeholder="your.email@example.com"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-accent mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full bg-accent/20 border border-accent/30 rounded-md py-3 px-4 text-accent focus:outline-none focus:ring-2 focus:ring-highlight"
                                            placeholder="+91 9876543210"
                                        />
                                    </div>
                                </div>
                            </div>
                        </AnimatedWrapper>

                        {/* Trip Details */}
                        <AnimatedWrapper delay="200ms">
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold font-serif mb-6 flex items-center gap-2">
                                    <CalendarIcon className="h-6 w-6 text-highlight" />
                                    Trip Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-accent mb-2">
                                            Preferred Destination
                                        </label>
                                        <input
                                            type="text"
                                            name="destination"
                                            value={formData.destination}
                                            onChange={handleInputChange}
                                            className="w-full bg-accent/20 border border-accent/30 rounded-md py-3 px-4 text-accent focus:outline-none focus:ring-2 focus:ring-highlight"
                                            placeholder="e.g., Rajasthan, Kerala, Himalayas, Golden Triangle, or multiple destinations"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-accent mb-2">
                                            Start Date
                                        </label>
                                        <input
                                            type="date"
                                            name="startDate"
                                            value={formData.startDate}
                                            onChange={handleInputChange}
                                            className="w-full bg-accent/20 border border-accent/30 rounded-md py-3 px-4 text-accent focus:outline-none focus:ring-2 focus:ring-highlight"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-accent mb-2">
                                            End Date
                                        </label>
                                        <input
                                            type="date"
                                            name="endDate"
                                            value={formData.endDate}
                                            onChange={handleInputChange}
                                            className="w-full bg-accent/20 border border-accent/30 rounded-md py-3 px-4 text-accent focus:outline-none focus:ring-2 focus:ring-highlight"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-accent mb-2">
                                            Group Size
                                        </label>
                                        <input
                                            type="number"
                                            name="groupSize"
                                            value={formData.groupSize}
                                            onChange={handleInputChange}
                                            min="1"
                                            max="50"
                                            className="w-full bg-accent/20 border border-accent/30 rounded-md py-3 px-4 text-accent focus:outline-none focus:ring-2 focus:ring-highlight"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-accent mb-2">
                                            Budget Range
                                        </label>
                                        <select
                                            name="budget"
                                            value={formData.budget}
                                            onChange={handleInputChange}
                                            className="w-full bg-accent/20 border border-accent/30 rounded-md py-3 px-4 text-accent focus:outline-none focus:ring-2 focus:ring-highlight"
                                        >
                                            <option value="">Select budget range</option>
                                            <option value="under-50000">Under ₹50,000</option>
                                            <option value="50000-100000">₹50,000 - ₹1,00,000</option>
                                            <option value="100000-200000">₹1,00,000 - ₹2,00,000</option>
                                            <option value="200000-500000">₹2,00,000 - ₹5,00,000</option>
                                            <option value="over-500000">Over ₹5,00,000</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </AnimatedWrapper>

                        {/* Preferences */}
                        <AnimatedWrapper delay="400ms">
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold font-serif mb-6 flex items-center gap-2">
                                    <MapPinIcon className="h-6 w-6 text-highlight" />
                                    Preferences
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-accent mb-2">
                                            Accommodation Type
                                        </label>
                                        <select
                                            name="accommodation"
                                            value={formData.accommodation}
                                            onChange={handleInputChange}
                                            className="w-full bg-accent/20 border border-accent/30 rounded-md py-3 px-4 text-accent focus:outline-none focus:ring-2 focus:ring-highlight"
                                        >
                                            <option value="">No preference</option>
                                            <option value="heritage-hotels">Heritage & Palace Hotels</option>
                                            <option value="boutique">Boutique Hotels</option>
                                            <option value="resorts">Ayurvedic Resorts & Spas</option>
                                            <option value="homestays">Traditional Homestays</option>
                                            <option value="houseboats">Houseboats (Kerala)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-accent mb-2">
                                            Transportation
                                        </label>
                                        <select
                                            name="transportation"
                                            value={formData.transportation}
                                            onChange={handleInputChange}
                                            className="w-full bg-accent/20 border border-accent/30 rounded-md py-3 px-4 text-accent focus:outline-none focus:ring-2 focus:ring-highlight"
                                        >
                                            <option value="">No preference</option>
                                            <option value="domestic-flights">Domestic Flights</option>
                                            <option value="train-journeys">Scenic Train Journeys</option>
                                            <option value="private-car">Private AC Car</option>
                                            <option value="tempo-traveller">Tempo Traveller</option>
                                            <option value="motorcycle">Motorcycle Tours</option>
                                        </select>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-accent mb-3">
                                            Preferred Activities (Select all that apply)
                                        </label>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                            {activityOptions.map((activity) => (
                                                <label key={activity} className="flex items-center space-x-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.activities.includes(activity)}
                                                        onChange={(e) => handleActivityChange(activity, e.target.checked)}
                                                        className="rounded border-accent/30 text-highlight focus:ring-highlight focus:ring-2"
                                                    />
                                                    <span className="text-sm text-accent">{activity}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-accent mb-2">
                                            Dietary Requirements
                                        </label>
                                        <input
                                            type="text"
                                            name="dietaryRequirements"
                                            value={formData.dietaryRequirements}
                                            onChange={handleInputChange}
                                            className="w-full bg-accent/20 border border-accent/30 rounded-md py-3 px-4 text-accent focus:outline-none focus:ring-2 focus:ring-highlight"
                                            placeholder="e.g., Jain food, Vegetarian, Non-vegetarian, Gluten-free, Allergies"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-accent mb-2">
                                            Special Requests or Additional Information
                                        </label>
                                        <textarea
                                            name="specialRequests"
                                            value={formData.specialRequests}
                                            onChange={handleInputChange}
                                            rows={4}
                                            className="w-full bg-accent/20 border border-accent/30 rounded-md py-3 px-4 text-accent focus:outline-none focus:ring-2 focus:ring-highlight resize-none"
                                            placeholder="Tell us anything else that would help us create the perfect trip for you..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </AnimatedWrapper>

                        {/* Submit Button */}
                        <AnimatedWrapper delay="600ms">
                            <div className="text-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-highlight text-primary font-bold py-4 px-8 rounded-lg hover:bg-opacity-80 transition-all duration-300 disabled:bg-accent disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                                            <span>Sending Request...</span>
                                        </>
                                    ) : (
                                        <>
                                            <PaperAirplaneIcon className="h-5 w-5" />
                                            <span>Send Custom Tour Request</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </AnimatedWrapper>

                        {/* Status Messages */}
                        {submitStatus === 'success' && (
                            <AnimatedWrapper className="mt-6">
                                <div className="bg-green-900/50 border border-green-500 text-green-300 px-4 py-3 rounded-lg text-center">
                                    <p className="font-medium">Request Sent Successfully!</p>
                                    <p className="text-sm mt-1">We'll contact you within 24 hours to discuss your custom tour.</p>
                                </div>
                            </AnimatedWrapper>
                        )}

                        {submitStatus === 'error' && (
                            <AnimatedWrapper className="mt-6">
                                <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-center">
                                    <p className="font-medium">Failed to Send Request</p>
                                    <p className="text-sm mt-1">Please try again or contact us directly.</p>
                                </div>
                            </AnimatedWrapper>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default CustomTourForm;