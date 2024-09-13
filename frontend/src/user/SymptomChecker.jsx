import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';
import { chatSession } from '@/apis/apiModel';
import { ImSpinner9 } from "react-icons/im";
import { Skeleton } from '@/components/ui/skeleton';
import jsPDF from 'jspdf';
import { toast } from 'sonner';

const SymptomChecker = () => {
    const [symptoms, setsymptoms] = useState("");
    const [duration, setduration] = useState("");
    const [severity, setseverity] = useState("");
    const [age, setage] = useState("");
    const [gender, setgender] = useState("");
    const [pre_existing_conditions, setpre_existing_conditions] = useState("");
    const [medications, setmedications] = useState("");
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    document.title = `TECHCARE | AI Symptom Checker`;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponse(null);
        try {
            const prompt = `A patient has reported the following symptoms: ${symptoms}. 
                The patient is a ${age} year old ${gender}, with ${pre_existing_conditions}. 
                The symptoms have lasted for ${duration}, and the severity is ${severity}. 
                The patient is currently on ${medications}. 
                Based on these details, provide a list of potential causes for the symptoms, medicine to be taken and recommend the next steps 
                (whether the patient should seek medical attention, self-treat, or monitor the symptoms). 
                Give the response in JSON format only and don't include anything else.`;
            const result = await chatSession.sendMessage(prompt);
            const parsedResponse = JSON.parse(result.response.text().replace('```json', '').replace('```', ''));
            setResponse(parsedResponse);
            toast.success("Report generated successfully");
        } catch (error) {
            console.error("Error fetching AI response", error);
            toast.error("AI is currently busy")
        } finally {
            setLoading(false);
        }
    }

    const generatePDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text('Symptom Analysis By TECHCARE', 20, 20);

        doc.setFontSize(14);
        doc.text('Potential Causes:', 20, 30);
        doc.setFontSize(12);
        response.potential_causes.forEach((cause, index) => {
            doc.text(`${index + 1}. ${cause}`, 20, 40 + index * 10);
        });

        let medicineStartY = 40 + response.potential_causes.length * 10 + 10;
        doc.setFontSize(14);
        doc.text('Medicine:', 20, medicineStartY);
        doc.setFontSize(12);
        response.medicine.forEach((med, index) => {
            doc.text(`${index + 1}. ${med}`, 20, medicineStartY + 10 + index * 10);
        });

        let nextStepsStartY = medicineStartY + response.medicine.length * 10 + 20;
        doc.setFontSize(14);
        doc.text('Next Steps:', 20, nextStepsStartY);
        doc.setFontSize(12);

        const splitNextSteps = doc.splitTextToSize(response.next_steps, 170);
        doc.text(splitNextSteps, 20, nextStepsStartY + 10);

        doc.save('Symptom_Analysis_Report_techcare.pdf');
    };

    return (
        <div>
            <div className='mb-10 mx-auto w-full max-w-xl text-start rounded-xl shadow-md border' style={{ borderColor: `var(--borderColor)` }}>
                <form className='p-3 px-5 py-7' onSubmit={handleSubmit}>
                    <div className='my-2 mt-5'>
                        <Label>Symptom Description</Label>
                        <Input value={symptoms} onChange={(e) => setsymptoms(e.target.value)} className="mt-2" placeholder="Enter your symptoms description" required />
                    </div>
                    <div className='my-2 mt-5'>
                        <Label>Symptom Duration</Label>
                        <Input value={duration} onChange={(e) => setduration(e.target.value)} className="mt-2" placeholder="Enter how long they've had the symptoms (e.g., 2 days)" required />
                    </div>
                    <div className='my-2 mt-5'>
                        <Label>Symptom Severity</Label>
                        <Input value={severity} onChange={(e) => setseverity(e.target.value)} className="mt-2" placeholder="Enter how severe the symptoms are (e.g., mild, moderate, severe)" required />
                    </div>
                    <div className='my-2 mt-5 grid grid-cols-2 gap-3'>
                        <div>
                            <Label>Your Age</Label>
                            <Input value={age} onChange={(e) => setage(e.target.value)} className="mt-2" placeholder="Enter your age" required />
                        </div>
                        <div>
                            <Label>Your Gender</Label>
                            <Input value={gender} onChange={(e) => setgender(e.target.value)} className="mt-2" placeholder="Enter your gender" required />
                        </div>
                    </div>
                    <div className='my-2 mt-5'>
                        <Label>Pre-existing conditions</Label>
                        <Input value={pre_existing_conditions} onChange={(e) => setpre_existing_conditions(e.target.value)} className="mt-2" placeholder="Enter if you have chronic diseases like diabetes, asthma" required />
                    </div>
                    <div className='my-2 mt-5'>
                        <Label>Medication/Allergies</Label>
                        <Input value={medications} onChange={(e) => setmedications(e.target.value)} className="mt-2" placeholder="Enter any medication you are currently taking or allergies you have" required />
                    </div>
                    <Button type="submit" className="mt-7 w-full" disabled={loading}>
                        {loading ? <><ImSpinner9 className="animate-spin mr-2" /> Generating your symptom</> : "Generate your symptom"}
                    </Button>
                </form>
            </div>

            {loading && (
                <div className="my-10 p-5 rounded-xl shadow-md border" style={{ borderColor: `var(--borderColor)` }}>
                    <Skeleton className="h-8 mt-4 w-1/2 mb-4" />
                    <Skeleton className="h-6 w-64 mb-4" />
                    <ul className="list-disc font-semibold pl-5">
                        <Skeleton className="h-3 w-72 mb-2" />
                        <Skeleton className="h-3 w-72 mb-2" />
                        <Skeleton className="h-3 w-72 mb-4" />
                    </ul>
                    <Skeleton className="h-6 w-64 mb-4" />
                    <ul className="list-disc font-semibold pl-5">
                        <Skeleton className="h-3 w-72 mb-2" />
                        <Skeleton className="h-3 w-72 mb-2" />
                        <Skeleton className="h-3 w-72 mb-4" />
                    </ul>
                    <Skeleton className="h-6 w-64 mb-4" />
                    <Skeleton className="h-6 w-1/2 mb-2" />
                </div>
            )}

            {response && (
                <div className="my-10 p-5 rounded-xl shadow-md border" style={{ borderColor: `var(--borderColor)` }}>
                    <h2 className="text-2xl mt-4 font-bold mb-4">Symptom Analysis based on your input</h2>
                    <div className="mb-4">
                        <h3 className="text-lg font-bold opacity-95 mb-3">Potential Causes</h3>
                        <ul className="list-disc font-semibold pl-5">
                            {response.potential_causes.map((cause, index) => (
                                <li key={index} className="mb-1">{cause}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-bold opacity-95 mb-3">Medicine</h3>
                        <ul className="list-disc font-semibold pl-5">
                            {response.medicine.map((med, index) => (
                                <li key={index} className="mb-1">{med}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-bold opacity-95 mb-3">Next Steps</h3>
                        <p className="font-semibold">{response.next_steps}</p>
                    </div>
                    <Button
                        className="mt-4"
                        onClick={generatePDF}
                    >
                        Download PDF
                    </Button>
                </div>
            )}
        </div>
    )
}

export default SymptomChecker;
