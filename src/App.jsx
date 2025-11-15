// src/App.jsx

import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

function App() {

  return (
    // মূল কন্টেইনারের ব্যাকগ্রাউন্ড হালকা গোলাপী (rose-50) এবং টেক্সট কালার গাঢ় ধূসর (text-gray-800) করা হয়েছে।
    // fixed Navbar এবং Footer-এর জন্য pt-16 এবং pb-[160px] বজায় রাখা হয়েছে।
    <div className="min-h-screen pt-16 pb-[160px] md:pb-[170px] bg-rose-50 text-gray-800"> 
      <Navbar/>
      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1>Vite + React</h1>
        {/* প্রধান টেক্সটে গোলাপী অ্যাকসেন্ট যোগ করা হয়েছে */}
        <p className="text-xl text-rose-600 mt-4"> 
          আপনার প্রধান কন্টেন্ট এখানে যাবে।
        </p>
      </main>
      <Footer/>
    </div>
  )
}

export default App;