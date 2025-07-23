'use client'

import React, { Suspense } from "react";

import dynamic from 'next/dynamic';

const DoctorForm = dynamic(() => import('./components/DoctorForm'), { ssr: false });
const DoctorSearch = dynamic(() => import("./components/DoctorSearch"), { ssr: false });

export default function App() {
  return (
    <div className="p-4 font-sans">
      <h1 className="text-2xl font-bold text-center mb-4">Doctor-Patient Locator</h1>
      <div className="flex gap-6 justify-center">
        <div>
          <h2 className="font-semibold mb-2">Add Doctor</h2>
          <Suspense fallback={<div>Loading form...</div>}>
            <DoctorForm />
          </Suspense>
        </div>
        <div>
          <h2 className="font-semibold mb-2">Find Doctors</h2>
           <Suspense fallback={<div>Loading form...</div>}>
          <DoctorSearch />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
