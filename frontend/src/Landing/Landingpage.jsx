import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function LandingPage() {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem("access");


    return (
        <main className="min-h-screen bg-white text-gray-900">
            {/* NavBar*/}
            {/* <nav>
                <div className="navbar-brand">
                    <img src="/google_forms.png" alt="" />
                </div>

                <div>
                    
                </div>
            </nav> */}
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-24 flex flex-col items-center text-center">
            
            <h1 className="text-4xl md:text-6xl font-semibold leading-tight max-w-4xl">
            Create forms. <br className="hidden md:block" />
            Collect answers. Analyze instantly.
            </h1>

            <p className="mt-6 text-lg text-gray-600 max-w-2xl">
            Build surveys and quizzes in minutes — no complexity, no fuss
            </p>

            <div className="mt-10 flex gap-4">
            <button className="inline-flex items-center gap-2 rounded-full bg-purple-900 px-8 py-3 text-white font-medium hover:bg-purple-800 transition cursor-pointer" onClick={() => navigate(isAuthenticated ? '/formly': "/singup")}>
                Get Started
                <ArrowRight size={18} />
            </button>

            <button className="rounded-full border border-gray-300 px-8 py-3 font-medium text-gray-900 hover:bg-purple-900 transition  cursor-pointer">
                View Demo
            </button>
            </div>

        </section>
        </main>
    );
}
