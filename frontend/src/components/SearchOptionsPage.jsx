// SearchOptionsPage.jsx
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';

export default function SearchOptionsPage() {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = () => {
    console.log('Searching for flights from', departure, 'to', arrival, 'on', date);
  };

  return (
    <motion.div className="min-h-screen flex flex-col justify-center items-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Card className="w-full max-w-md shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Search Flights</h1>
        <CardContent className="space-y-4">
          <Input 
            placeholder="Departure Airport" 
            value={departure} 
            onChange={(e) => setDeparture(e.target.value)} 
          />
          <Input 
            placeholder="Arrival Airport" 
            value={arrival} 
            onChange={(e) => setArrival(e.target.value)} 
          />
          <Input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
          />
          <Button className="w-full" onClick={handleSearch}>Search</Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
