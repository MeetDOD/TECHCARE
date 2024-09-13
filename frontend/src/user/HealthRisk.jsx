import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';
import { chatSession } from '@/apis/apiModel';
import { ImSpinner9 } from "react-icons/im";
import { Skeleton } from '@/components/ui/skeleton';
import jsPDF from 'jspdf';
import { toast } from 'sonner';

const HealthRisk = () => {
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [medicalHistory, setmedicalHistory] = useState("");
    const [age, setage] = useState("");
    const [gender, setgender] = useState("");
    const [smokingStatus, setsmokingStatus] = useState("");
    const [physicalActivity, setphysicalActivity] = useState("");
    const [alcoholConsumption, setalcoholConsumption] = useState("");
    const [diet, setDiet] = useState("");
    const [medications, setMedications] = useState("");
    const [cholesterolLevels, setcholesterolLevels] = useState("");
    const [bloodPressure, setbloodPressure] = useState("");
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState("");

    document.title = `TECHCARE | AI HEALTH RISK PREDICTION`;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponse(null);
        try {
            const prompt = `A patient has provided the following health data: 
                - Age: ${age}
                - Gender: ${gender}
                - Weight: ${weight} kg
                - Height: ${height} cm
                - Medical History: ${medicalHistory}
                - Smoking Status: ${smokingStatus}
                - Alcohol Consumption: ${alcoholConsumption}
                - Physical Activity: ${physicalActivity}
                - Diet: ${diet}
                - Current Medications: $${medications}
                - Cholesterol Levels: ${cholesterolLevels}
                - Blood Pressure: ${bloodPressure}

                Based on this data, provide a detailed analysis of the patient's potential health risks, including the probability (in percentage) of developing conditions like diabetes, heart disease, hypertension, or any other relevant health risks. Additionally, recommend preventive measures to mitigate these risks and suggest the next steps for the patient. 

                Please provide the response in JSON format only don't inlcude anything else, with the following structure:
                {
                    "predicted_health_risks": [
                      {
                        "condition": "Diabetes",
                        "probability": "45%",
                        "recommendations": [
                          "Maintain a healthy diet",
                          "Increase physical activity",
                          "Regular blood sugar monitoring"
                        ]
                      },
                      {
                        "condition": "Heart Disease",
                        "probability": "30%",
                        "recommendations": [
                          "Reduce sodium intake",
                          "Avoid smoking",
                          "Increase aerobic exercise"
                        ]
                        }
                    ],
                    "next_steps": [
                        "Consult a doctor for further evaluation",
                        "Get blood tests for cholesterol and glucose levels"
                    ],
                    "risk_factors_considered": [
                        "Age",
                        "Smoking Status"
                    ]
                    }
                    `;
            const result = await chatSession.sendMessage(prompt);
            const parsedResponse = JSON.parse(result.response.text().replace('```json', '').replace('```', ''));
            setResponse(parsedResponse);
            toast.success("Report generated successfully")
        } catch (error) {
            console.error("Error fetching AI response", error);
            toast.error("AI is currently busy")
        } finally {
            setLoading(false);
        }
    }

    const downloadPDF = (data) => {
        const doc = new jsPDF();
        const lineHeight = 10;
        let yOffset = 10;
        const margin = 10;
        const pageHeight = doc.internal.pageSize.height;

        const checkPageBreak = () => {
            if (yOffset + lineHeight > pageHeight - margin) {
                doc.addPage();
                yOffset = margin;
            }
        };

        doc.setFontSize(16);
        doc.text('Health Risk Prediction Analysis By TECHCARE', margin, yOffset);
        yOffset += lineHeight + 5;

        doc.setFontSize(14);
        doc.text('Predicted Health Risks', margin, yOffset);
        yOffset += lineHeight;

        doc.setFontSize(12);
        data.predicted_health_risks.forEach((risk) => {
            checkPageBreak();
            doc.text(risk.condition, margin, yOffset);
            yOffset += lineHeight;

            doc.text(`Probability: ${risk.probability}`, margin, yOffset);
            yOffset += lineHeight;

            doc.text('Recommendations:', margin, yOffset);
            yOffset += lineHeight;

            risk.recommendations.forEach((rec) => {
                checkPageBreak();
                doc.text(`- ${rec}`, margin + 5, yOffset);
                yOffset += lineHeight - 2;
            });

            yOffset += 5;
        });

        doc.setFontSize(14);
        doc.text('Risk Factors Considered', margin, yOffset);
        yOffset += lineHeight;

        doc.setFontSize(12);
        data.risk_factors_considered.forEach((factor) => {
            checkPageBreak();
            doc.text(`- ${factor}`, margin + 5, yOffset);
            yOffset += lineHeight - 2;
        });

        yOffset += 5;

        doc.setFontSize(14);
        doc.text('Next Steps', margin, yOffset);
        yOffset += lineHeight;

        doc.setFontSize(12);
        data.next_steps.forEach((step) => {
            checkPageBreak();
            doc.text(`- ${step}`, margin + 5, yOffset);
            yOffset += lineHeight - 2;
        });

        doc.save('health_risk_prediction_techcare.pdf');
    };

    return (
        <div>
            <div className='mb-10 mx-auto w-full max-w-xl text-start rounded-xl shadow-md border' style={{ borderColor: `var(--borderColor)` }}>
                <form className='p-3 px-5 py-7' onSubmit={handleSubmit}>
                    <div className='my-2 mt-5'>
                        <Label>Medical History</Label>
                        <Input value={medicalHistory} onChange={(e) => setmedicalHistory(e.target.value)} className="mt-2" placeholder="List of conditions, such as diabetes, hypertension, heart disease, etc" required />
                    </div>
                    <div className='my-2 mt-5 grid grid-cols-2 gap-3'>
                        <div>
                            <Label>Your Weight</Label>
                            <Input value={weight} onChange={(e) => setWeight(e.target.value)} className="mt-2" placeholder="Enter your weight in kg" required />
                        </div>
                        <div>
                            <Label>Your Height</Label>
                            <Input value={height} onChange={(e) => setHeight(e.target.value)} className="mt-2" placeholder="Enter your height in cm" required />
                        </div>
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
                    <div className='my-2 mt-5 grid grid-cols-2 gap-3'>
                        <div>
                            <Label>Smoking Status</Label>
                            <Input value={smokingStatus} onChange={(e) => setsmokingStatus(e.target.value)} className="mt-2" placeholder="Enter Yes or No" required />
                        </div>
                        <div>
                            <Label>Alcohol Consumption</Label>
                            <Input value={alcoholConsumption} onChange={(e) => setalcoholConsumption(e.target.value)} className="mt-2" placeholder="Enter the Frequency: None, Occasional, Regular" required />
                        </div>
                    </div>
                    <div className='my-2 mt-5 grid grid-cols-2 gap-3'>
                        <div>
                            <Label>Physical Activity</Label>
                            <Input value={physicalActivity} onChange={(e) => setphysicalActivity(e.target.value)} className="mt-2" placeholder="Enter the physical activity: yoga, gym etc" required />
                        </div>
                        <div>
                            <Label>Diet</Label>
                            <Input value={diet} onChange={(e) => setDiet(e.target.value)} className="mt-2" placeholder="Enter the Diet: Balanced, Unhealthy, Vegan, etc." required />
                        </div>
                    </div>
                    <div className='my-2 mt-5 grid grid-cols-2 gap-3'>
                        <div>
                            <Label>Cholesterol Levels</Label>
                            <Input value={cholesterolLevels} onChange={(e) => setcholesterolLevels(e.target.value)} className="mt-2" placeholder="Enter the cholesterol levels if known" required />
                        </div>
                        <div>
                            <Label>Blood Pressure</Label>
                            <Input value={bloodPressure} onChange={(e) => setbloodPressure(e.target.value)} className="mt-2" placeholder="Enter the blood pressure levels if known" required />
                        </div>
                    </div>
                    <div className='my-2 mt-5'>
                        <Label>Current Medications</Label>
                        <Input value={medications} onChange={(e) => setMedications(e.target.value)} className="mt-2" placeholder="Enter current medications being taken, if any" required />
                    </div>
                    <Button type="submit" className="mt-7 w-full" disabled={loading}>
                        {loading ? <><ImSpinner9 className="animate-spin mr-2" /> Generating your predictions</> : "Generate your prediction"}
                    </Button>
                </form>
            </div >

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
                    <h2 className="text-2xl mt-4 font-bold mb-4">Health Risk Prediction Analysis based on your input</h2>
                    <div className="mb-4">
                        <h3 className="text-lg font-bold opacity-95 mb-3">Predicted Health Risks</h3>
                        <ul className="list-disc font-semibold pl-5 space-y-4">
                            {response.predicted_health_risks.map((risk, index) => (
                                <li key={index} className="mb-2">
                                    <h4 className="font-bold text-md my-2">{risk.condition}</h4>
                                    <p className="text-sm">Probability: {risk.probability}</p>
                                    <div className="mt-1">
                                        <h5 className="font-semibold">Recommendations:</h5>
                                        <ul className="list-disc pl-5">
                                            {risk.recommendations.map((rec, recIndex) => (
                                                <li key={recIndex} className="text-sm">{rec}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-bold opacity-95 mb-3">Risk Factors Considered</h3>
                        <ul className="list-disc font-semibold pl-5">
                            {response.risk_factors_considered.map((riskfact, index) => (
                                <li key={index} className="mb-1">{riskfact}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-bold opacity-95 mb-3">Next Steps</h3>
                        <ul className="list-disc font-semibold pl-5">
                            {response.next_steps.map((nextstep, index) => (
                                <li key={index} className="mb-1">{nextstep}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                    </div>
                    <div>
                        <Button onClick={() => downloadPDF(response)} className="mt-4">
                            Download as PDF
                        </Button>
                    </div>
                </div>
            )}
        </div >
    )
}

export default HealthRisk;
