import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SymptomChecker from './SymptomChecker';
import HealthRisk from './HealthRisk';

const ChooseModel = () => {
    const navigate = useNavigate();
    return (
        <div className="container mx-auto mb-10">
            <Tabs defaultValue="symptomchecker" className="overflow-hidden">
                <TabsList className="gap-2 flex justify-center flex-1 items-center mb-8" style={{
                    backgroundColor: `var(--background-color)`,
                }} >
                    <TabsTrigger className="py-2" value="symptomchecker">Symptom Checker</TabsTrigger>
                    <TabsTrigger className="py-2" value="healthrisk">Health Risk Prediction</TabsTrigger>
                </TabsList>

                <TabsContent value="symptomchecker">
                    <SymptomChecker />
                </TabsContent>
                <TabsContent value="healthrisk">
                    <HealthRisk />
                </TabsContent>
            </Tabs>
        </div >
    );
}

export default ChooseModel;
