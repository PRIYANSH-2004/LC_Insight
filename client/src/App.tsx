
import './App.css'
import HomePage from "./components/HomePage"
// import {Trophy, X} from 'lucide-react';
import { LuTrophy } from "react-icons/lu";
function App() {

  return (
    <div className="">
      <h2 className="top-0 left-0 right-0 items-center text-2xl font-bold mb-6 bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent  p-3">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mr-6 shadow-lg"> 
          <LuTrophy className='text-3xl text-white'/>
        </div>
        LC Insight
      </h2>
      <HomePage/>

      <p className="fixed bottom-0 left-0 right-0 text-center text-black bg-gray-100 py-2 text-sm">
          Made with ❤️ by Priyansh
        </p>
    </div>
  )
}

export default App
