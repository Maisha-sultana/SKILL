// src/App.jsx
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

function App() {

  return (
    // একটি main কন্টেইনার যোগ করুন
    <div className="min-h-screen pt-16 pb-[160px] md:pb-[170px] bg-gray-900 text-white"> 
      <Navbar/>
      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1>Vite + React</h1>
        <p className="text-xl text-gray-400 mt-4">
          আপনার প্রধান কন্টেন্ট এখানে যাবে।
        </p>
      </main>
      <Footer/>
    </div>
  )
}

export default App