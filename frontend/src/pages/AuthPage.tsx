import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { api } from "../lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "../components/common/Logo";

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeMessage, setActiveMessage] = useState<string | null>(null);

  useEffect(() => {
    // If user already has a token, send them straight to dashboard
    if (localStorage.getItem("token")) {
      window.location.href = "/dashboard";
    }
  }, []);

  const showWipMessage = (key: string) => {
    setActiveMessage(key);
    setTimeout(() => setActiveMessage(null), 2500);
  };

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const payload = isLogin ? { email, password } : { name, email, password };

      const response = await api.post(endpoint, payload);

      // Success
      localStorage.setItem("token", response.data.data.token);
      window.location.href = "/dashboard"; 

    } catch (err: any) {
      if (err.response?.data) {
        const data = err.response.data;
        if (data.errors && Array.isArray(data.errors)) {
          const messages = data.errors.map((e: any) => e.message).join(" ");
          setError(messages);
        } else {
          setError(data.message || "Authentication failed.");
        }
      } else {
        setError(err.message || "An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-white font-sans text-slate-900 selection:bg-[#85d800] selection:text-white overflow-hidden">
      
      {/* Left Column (Auth Form) */}
      <div className="w-full lg:w-1/2 flex flex-col relative overflow-y-auto bg-white p-8 md:p-16 lg:p-24 justify-center">
        
        {/* Brand Header */}
        <div className="absolute top-12 left-12">
          <a href="/" className="flex items-center hover:opacity-80 transition-opacity w-fit">
            <div className="flex flex-col items-center">
              {/* Simple Wuup Hire Logo Mark */}
              <Logo className="w-5 h-auto text-slate-900" />
            </div>
          </a>
        </div>

        <div className="w-full max-w-[360px] mx-auto mt-12">
          <h1 className="text-[32px] font-medium tracking-tight text-slate-900 mb-2 leading-tight">
            {isLogin ? (
              <>Welcome <span className="bg-[#78d11d] px-1">back</span></>
            ) : (
              <>Join <span className="bg-[#78d11d] px-1">Wuup Hire</span></>
            )}
          </h1>
          <p className="text-[13px] text-slate-500 mb-8">
            {isLogin ? "Sign in to your Wuup Hire workspace and pick up where you left off." : "Create a workspace to deploy your first AI interviewer."}
          </p>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-dashed border-red-200 text-red-600 text-[13px] rounded-sm text-center">
              {error}
            </div>
          )}

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-900 tracking-wide">Full name</label>
                <input 
                  type="text" 
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full h-10 px-3 bg-white border border-dashed border-slate-300 rounded-sm text-[13px] outline-none focus:border-slate-500 transition-colors placeholder:text-slate-300"
                />
              </div>
            )}
            
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-900 tracking-wide">Email</label>
              <input 
                type="email" 
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="youremail@yourdomain.com"
                className="w-full h-10 px-3 bg-white border border-dashed border-slate-300 rounded-sm text-[13px] outline-none focus:border-slate-500 transition-colors placeholder:text-slate-300"
              />
            </div>
            
            <div className="space-y-1.5 relative">
              <label className="text-[11px] font-semibold text-slate-900 tracking-wide">Password</label>
              <input 
                type="password" 
                required
                autoComplete={isLogin ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="w-full h-10 px-3 bg-white border border-dashed border-slate-300 rounded-sm text-[13px] outline-none focus:border-slate-500 transition-colors placeholder:text-slate-300"
              />
            </div>

            {isLogin && (
              <div className="flex justify-end h-4 overflow-hidden relative">
                <AnimatePresence mode="wait">
                  {activeMessage === 'forgot' ? (
                    <motion.span
                      key="msg"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-[11px] font-medium text-[#78d11d] absolute right-0"
                    >
                      Building this recovery flow
                    </motion.span>
                  ) : (
                    <motion.a 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); showWipMessage('forgot'); }}
                      key="link"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-[11px] text-slate-400 hover:text-slate-600 transition-colors absolute right-0"
                    >
                      Forgot password?
                    </motion.a>
                  )}
                </AnimatePresence>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-10 mt-4 bg-slate-900 hover:bg-black text-white font-medium text-[13px] rounded-sm shadow-sm transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2"
            >
              {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-400" />}
              {isLogin ? "Sign in" : "Create account"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dashed border-slate-200"></div>
            </div>
            <div className="relative bg-white px-4 text-[9px] uppercase tracking-[0.2em] font-medium text-slate-300">
              OR CONTINUE WITH
            </div>
          </div>

          <div className="space-y-3">
            <button 
              type="button"
              onClick={() => showWipMessage('google')}
              className="w-full relative overflow-hidden flex items-center justify-center gap-3 h-10 bg-white border border-dashed border-slate-300 rounded-sm text-[12px] font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
            >
              <AnimatePresence mode="wait">
                {activeMessage === 'google' ? (
                  <motion.span
                    key="msg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-[#78d11d] font-semibold"
                  >
                    Crafting integration
                  </motion.span>
                ) : (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-3 absolute"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Continue with Google
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
            <button 
              type="button"
              onClick={() => showWipMessage('github')}
              className="w-full relative overflow-hidden flex items-center justify-center gap-3 h-10 bg-white border border-dashed border-slate-300 rounded-sm text-[12px] font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
            >
              <AnimatePresence mode="wait">
                {activeMessage === 'github' ? (
                  <motion.span
                    key="msg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-[#78d11d] font-semibold"
                  >
                    Crafting integration
                  </motion.span>
                ) : (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-3 absolute"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    Continue with GitHub
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-[12px] text-slate-500">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button 
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError(null);
                }} 
                className="font-medium text-[#78d11d] hover:text-[#6ec219] transition-colors"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>

        </div>
      </div>

      {/* Right Column (Abstract/Blueprint Design) */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-50 relative border-l border-dashed border-slate-200 items-center justify-center p-12 overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.3] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/50 via-transparent to-slate-100/50" />
        
        <div className="relative z-10 w-full max-w-lg">
          {/* Abstract Tech Visual */}
          <div className="w-full h-[300px] relative flex items-center justify-center mb-12 group">
            
            {/* Animated Data Spine */}
            <div className="absolute h-[80%] w-[1px] bg-gradient-to-b from-transparent via-[#78d11d]/40 to-transparent"></div>
            
            {/* Branches */}
            <div className="absolute w-[180px] h-[1px] border-t border-dashed border-slate-300 top-[35%] right-[50%]"></div>
            <div className="absolute w-[220px] h-[1px] border-t border-dashed border-slate-300 top-[65%] left-[50%]"></div>
            
            {/* Central Node */}
            <div className="absolute w-16 h-16 bg-white border border-slate-200 rounded-sm flex items-center justify-center shadow-lg z-20 group-hover:border-[#78d11d]/50 transition-colors duration-500">
              <div className="w-4 h-4 bg-[#78d11d] rounded-sm animate-ping absolute opacity-20" />
              <div className="w-4 h-4 bg-[#78d11d] rounded-sm" />
            </div>

            {/* End Nodes */}
            <div className="absolute top-[35%] right-[calc(50%+180px)] -translate-y-1/2 translate-x-1/2 bg-white border border-slate-200 p-2 rounded-sm shadow-sm flex items-center justify-center z-20">
              <div className="w-2 h-2 bg-slate-800 rounded-sm" />
            </div>
            
            <div className="absolute top-[65%] left-[calc(50%+220px)] -translate-y-1/2 -translate-x-1/2 bg-white border border-slate-200 p-2 rounded-sm shadow-sm flex items-center justify-center z-20">
              <div className="w-2 h-2 bg-slate-800 rounded-sm" />
            </div>

            {/* Floating Tags */}
            <div className="absolute right-[calc(50%+40px)] top-[20%] bg-white border border-slate-100 px-3 py-1.5 rounded-sm shadow-sm z-30">
              <p className="text-[10px] font-mono tracking-wide text-slate-500 uppercase">Live Stream <span className="text-[#78d11d] font-semibold ml-1">Active</span></p>
            </div>
            
            <div className="absolute left-[calc(50%+40px)] bottom-[15%] bg-white border border-slate-100 px-3 py-1.5 rounded-sm shadow-sm z-30">
              <p className="text-[10px] font-mono tracking-wide text-slate-500 uppercase">Latency <span className="text-slate-900 font-semibold ml-1">180ms</span></p>
            </div>
          </div>
          
          {/* Quote Section */}
          <div className="text-center relative z-20">
            <span className="text-[#78d11d] text-4xl font-serif italic mb-2 block leading-none opacity-80">"</span>
            <p className="text-slate-800 text-lg font-medium leading-relaxed mb-6 antialiased max-w-md mx-auto">
              Take control of your intelligence. Build your own AI.
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-8 h-[1px] bg-slate-300"></div>
              <p className="text-[9px] text-slate-500 font-bold tracking-[0.2em] uppercase">
                JENSEN HUANG <span className="text-slate-400 font-medium ml-1">CEO, NVIDIA</span>
              </p>
              <div className="w-8 h-[1px] bg-slate-300"></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
