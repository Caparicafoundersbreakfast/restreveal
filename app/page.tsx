"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight, RotateCcw, Sparkles } from "lucide-react"

const restTypes = [
  { name: "Mental Rest", emoji: "🧠", color: "bg-blue-100 border-blue-200 text-blue-800" },
  { name: "Physical Rest", emoji: "💪", color: "bg-green-100 border-green-200 text-green-800" },
  { name: "Emotional Rest", emoji: "💝", color: "bg-pink-100 border-pink-200 text-pink-800" },
  { name: "Social Rest", emoji: "👥", color: "bg-purple-100 border-purple-200 text-purple-800" },
  { name: "Spiritual Rest", emoji: "✨", color: "bg-yellow-100 border-yellow-200 text-yellow-800" },
  { name: "Sensory Rest", emoji: "🌿", color: "bg-emerald-100 border-emerald-200 text-emerald-800" },
  { name: "Intellectual Rest", emoji: "🎯", color: "bg-orange-100 border-orange-200 text-orange-800" },
]

const questions = {
  "Mental Rest": [
    "I often feel overwhelmed by racing thoughts",
    "My brain feels foggy even after sleep",
    "I feel mentally drained after an average day",
  ],
  "Physical Rest": [
    "I wake up tired even after a full night's sleep",
    "My body feels sore, tense, or fatigued regularly",
    "I rely on caffeine to function normally",
  ],
  "Emotional Rest": [
    "I feel emotionally exhausted or easily irritated",
    "I often pretend I'm okay when I'm not",
    "I feel responsible for other people's feelings",
  ],
  "Social Rest": [
    "I feel drained by social interactions",
    "I don't feel like myself around others",
    "I crave deeper connection",
  ],
  "Spiritual Rest": [
    "I feel disconnected from deeper purpose",
    "I feel my daily life lacks meaning",
    "I want to live in alignment with my values",
  ],
  "Sensory Rest": [
    "I feel overstimulated by noise, light, or screens",
    "I spend many hours in front of screens daily",
    "I rarely experience true silence or stillness",
  ],
  "Intellectual Rest": [
    "I feel mentally under-stimulated or bored",
    "I miss learning or creative challenge",
    "I feel mentally flat or uninspired",
  ],
}

const recommendations = {
  "Mental Rest": [
    "🧘 Practice 10 minutes of meditation daily",
    "📝 Try brain dumping - write down all your thoughts",
    "🌿 Spend time in nature without distractions",
    "🛁 Take a warm bath with no devices",
    "😴 Create a calming bedtime routine",
  ],
  "Physical Rest": [
    "😴 Prioritize 7-9 hours of quality sleep",
    "🧘‍♀️ Practice gentle stretching or yoga",
    "💆‍♀️ Get a massage or practice self-massage",
    "🛋️ Take intentional rest breaks during the day",
    "🚶‍♀️ Go for slow, mindful walks",
  ],
  "Emotional Rest": [
    "💭 Honor your boundaries and say no when needed",
    "🤗 Practice self-compassion and self-care",
    "📓 Write your feelings down in a journal",
    "💬 Have supportive conversations with trusted friends",
    "🎭 Express emotions through creative outlets",
  ],
  "Social Rest": [
    "🏠 Spend meaningful time with loved ones",
    "🤝 Seek authentic, supportive interactions",
    "⏰ Schedule alone time to recharge",
    "🚫 Limit interactions that drain your energy",
    "💝 Practice gratitude for positive relationships",
  ],
  "Spiritual Rest": [
    "🙏 Engage in prayer, meditation, or reflection",
    "🌅 Connect with nature and appreciate beauty",
    "📖 Read inspiring or meaningful content",
    "🎯 Align daily actions with your core values",
    "✨ Practice gratitude and mindfulness",
  ],
  "Sensory Rest": [
    "📱 Limit screen time and digital distractions",
    "🕯️ Dim lights and create calming environments",
    "🔇 Turn off notifications and embrace silence",
    "📺 Use blackout curtains in your bedroom",
    "🌙 Have a screen-free hour before bed",
  ],
  "Intellectual Rest": [
    "🧩 Engage in stimulating puzzles or games",
    "📚 Read books that challenge and inspire you",
    "🎨 Try creative hobbies or artistic pursuits",
    "💡 Learn something new that excites you",
    "🗣️ Have meaningful conversations about ideas",
  ],
}

export default function RestReveal() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number[]>>({})
  const [showResults, setShowResults] = useState(false)
  const [started, setStarted] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showResultsAnimation, setShowResultsAnimation] = useState(false)

  const currentRestType = restTypes[currentStep]
  const progress = ((currentStep + 1) / restTypes.length) * 100

  useEffect(() => {
    if (showResults) {
      setTimeout(() => setShowResultsAnimation(true), 300)
    }
  }, [showResults])

  const handleAnswer = (questionIndex: number, value: string) => {
    const restType = currentRestType.name
    const currentAnswers = answers[restType] || []
    const newAnswers = [...currentAnswers]
    newAnswers[questionIndex] = Number.parseInt(value)

    setAnswers((prev) => ({
      ...prev,
      [restType]: newAnswers,
    }))
  }

  const canProceed = () => {
    const currentAnswers = answers[currentRestType.name] || []
    return currentAnswers.length === 3 && currentAnswers.every((answer) => answer >= 1 && answer <= 5)
  }

  const nextStep = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      if (currentStep < restTypes.length - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        setShowResults(true)
      }
      setIsTransitioning(false)
    }, 250)
  }

  const prevStep = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1)
      }
      setIsTransitioning(false)
    }, 250)
  }

  const calculateResults = () => {
    const scores = restTypes.map((restType) => {
      const restAnswers = answers[restType.name] || []
      const total = restAnswers.reduce((sum, answer) => sum + answer, 0)
      return { ...restType, score: total }
    })

    return scores.sort((a, b) => b.score - a.score).slice(0, 2)
  }

  const restart = () => {
    setShowResultsAnimation(false)
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentStep(0)
      setAnswers({})
      setShowResults(false)
      setStarted(false)
      setIsTransitioning(false)
    }, 250)
  }

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-stone-100 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100/20 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-100/20 rounded-full blur-3xl animate-float-slower"></div>
          <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-pink-100/20 rounded-full blur-3xl animate-float-medium"></div>
        </div>

        <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/90 backdrop-blur-md animate-in fade-in-0 duration-1200 ease-out relative z-10 hover:shadow-3xl transition-all duration-700">
          <CardContent className="p-12 text-center">
            <div className="mb-8">
              <h1 className="text-4xl font-light text-slate-800 mb-4 tracking-tight animate-in fade-in-0 slide-in-from-top-4 duration-1000 ease-out">
                <span className="inline-block animate-gentle-float">🌸</span> RestReveal
              </h1>
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-slate-300 to-transparent mx-auto mb-8 animate-in fade-in-0 slide-in-from-left-4 duration-1000 delay-300 ease-out animate-gentle-pulse"></div>
              <h2 className="text-2xl font-light text-slate-700 mb-6 animate-in fade-in-0 slide-in-from-top-4 duration-1000 delay-400 ease-out">
                What Kind of Rest Do You Need Most?
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed max-w-lg mx-auto animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-600 ease-out">
                Take this 3-minute quiz to discover where your energy is leaking—and how to restore balance.
              </p>
            </div>
            <Button
              onClick={() => setStarted(true)}
              size="lg"
              className="bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white px-8 py-3 rounded-full text-lg font-light transition-all duration-500 shadow-lg hover:shadow-2xl animate-in fade-in-0 duration-1000 delay-800 ease-out hover:scale-105 transform-gpu animate-gentle-glow"
            >
              <Sparkles className="w-5 h-5 mr-2 animate-gentle-twinkle" />
              Begin Your Journey
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showResults) {
    const topResults = calculateResults()

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-stone-100 p-4 relative overflow-hidden">
        {/* Flowing background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/5 w-72 h-72 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-1/3 right-1/5 w-80 h-80 bg-gradient-to-br from-pink-100/30 to-yellow-100/30 rounded-full blur-3xl animate-float-slower"></div>
        </div>

        <div className="max-w-4xl mx-auto py-8 relative z-10">
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-md animate-in fade-in-0 duration-800 ease-out hover:shadow-3xl transition-all duration-700">
            <CardContent className="p-8">
              <div className="text-center mb-8 animate-in fade-in-0 slide-in-from-top-4 duration-800 ease-out">
                <h1 className="text-3xl font-light text-slate-800 mb-4">
                  <span className="animate-gentle-float">🎉</span> Your Rest Profile
                </h1>
                <div className="w-16 h-0.5 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 mx-auto animate-in fade-in-0 slide-in-from-left-4 duration-800 delay-200 ease-out animate-gentle-pulse"></div>
              </div>

              <div className="space-y-8">
                {topResults.map((result, index) => (
                  <div
                    key={result.name}
                    className={`${result.color} border-2 rounded-2xl p-6 transition-all duration-500 hover:shadow-lg hover:scale-[1.01] transform-gpu backdrop-blur-sm ${
                      showResultsAnimation
                        ? "animate-in fade-in-0 slide-in-from-left-6 duration-800 ease-out"
                        : "opacity-0 translate-x-6"
                    } animate-gentle-float-card`}
                    style={{
                      animationDelay: `${index * 200}ms`,
                      animationDuration: `${4 + index}s`,
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl animate-gentle-float" style={{ animationDelay: `${index * 500}ms` }}>
                          {result.emoji}
                        </span>
                        <h3 className="text-xl font-medium">
                          {index === 0 ? "🥇 Primary Need: " : "🥈 Secondary Need: "}
                          {result.name}
                        </h3>
                      </div>
                      <span className="text-sm bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full font-medium animate-in fade-in-0 duration-600 delay-400 ease-out animate-gentle-pulse">
                        📊 {result.score}/15
                      </span>
                    </div>

                    <div className="grid gap-3">
                      <h4 className="font-medium mb-2 flex items-center gap-2">💡 Recommended Activities:</h4>
                      {recommendations[result.name as keyof typeof recommendations].map((rec, idx) => (
                        <div
                          key={idx}
                          className={`flex items-center gap-3 bg-white/80 backdrop-blur-sm p-3 rounded-lg transition-all duration-400 hover:bg-white/95 hover:scale-[1.01] transform-gpu hover:shadow-sm ${
                            showResultsAnimation
                              ? "animate-in fade-in-0 slide-in-from-right-4 duration-600 ease-out"
                              : "opacity-0 translate-x-4"
                          } animate-gentle-float-item`}
                          style={{
                            animationDelay: `${(index * 200) + (idx * 100) + 600}ms`,
                            animationDuration: `${3 + idx * 0.5}s`,
                          }}
                        >
                          <span className="text-sm">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div
                className={`mt-8 bg-gradient-to-r from-indigo-50/80 to-purple-50/80 backdrop-blur-sm border-2 border-indigo-100 rounded-2xl p-6 transition-all duration-500 hover:shadow-md hover:scale-[1.005] transform-gpu ${
                  showResultsAnimation
                    ? "animate-in fade-in-0 slide-in-from-bottom-6 duration-800 delay-800 ease-out"
                    : "opacity-0 translate-y-6"
                } animate-gentle-float-card`}
                style={{ animationDuration: "5s" }}
              >
                <h4 className="font-medium text-slate-700 mb-3 flex items-center gap-2">📝 Reflection Prompt</h4>
                <p className="text-slate-600 leading-relaxed">
                  Take a moment to reflect: Which of these recommendations feels most appealing to you right now? What
                  small step could you take today to honor your need for rest? Consider journaling about what you
                  discovered and how you might integrate these practices into your daily routine. 🌱
                </p>
              </div>

              <div
                className={`flex flex-col items-center gap-4 mt-8 ${
                  showResultsAnimation ? "animate-in fade-in-0 duration-800 delay-1000 ease-out" : "opacity-0"
                }`}
              >
                <Button
                  onClick={restart}
                  variant="outline"
                  className="flex items-center gap-2 px-6 py-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/95 transition-all duration-300 hover:scale-105 transform-gpu animate-gentle-glow"
                >
                  <RotateCcw className="w-4 h-4 transition-transform duration-500 hover:rotate-180" />
                  Take Quiz Again
                </Button>

                <Button
                  asChild
                  className="flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform-gpu animate-gentle-glow"
                >
                  <a href="https://ko-fi.com/caparicafoundersbreakfast" target="_blank" rel="noopener noreferrer">
                    <span className="animate-gentle-float">☕</span> Thank you Klarita
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-stone-100 p-4 relative overflow-hidden">
      {/* Flowing background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-blue-100/20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-purple-100/20 rounded-full blur-3xl animate-float-slower"></div>
      </div>

      <div className="max-w-2xl mx-auto py-8 relative z-10">
        <div className="mb-6 animate-in fade-in-0 slide-in-from-top-4 duration-700 ease-out">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">
              Step {currentStep + 1} of {restTypes.length}
            </span>
            <span className="text-sm text-slate-600">{Math.round(progress)}% Complete</span>
          </div>
          <div className="relative h-3 bg-slate-100/60 backdrop-blur-sm rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out animate-gentle-pulse"
              style={{
                background: `linear-gradient(90deg, 
          ${
            currentRestType.color.includes("blue")
              ? "#3b82f6"
              : currentRestType.color.includes("green")
                ? "#10b981"
                : currentRestType.color.includes("pink")
                  ? "#ec4899"
                  : currentRestType.color.includes("purple")
                    ? "#8b5cf6"
                    : currentRestType.color.includes("yellow")
                      ? "#f59e0b"
                      : currentRestType.color.includes("emerald")
                        ? "#059669"
                        : "#f97316"
          } 0%, 
          ${
            currentRestType.color.includes("blue")
              ? "#60a5fa"
              : currentRestType.color.includes("green")
                ? "#34d399"
                : currentRestType.color.includes("pink")
                  ? "#f472b6"
                  : currentRestType.color.includes("purple")
                    ? "#a78bfa"
                    : currentRestType.color.includes("yellow")
                      ? "#fbbf24"
                      : currentRestType.color.includes("emerald")
                        ? "#10b981"
                        : "#fb923c"
          } 100%)`,
                width: `${progress}%`,
                boxShadow: `0 0 20px ${
                  currentRestType.color.includes("blue")
                    ? "#3b82f6"
                    : currentRestType.color.includes("green")
                      ? "#10b981"
                      : currentRestType.color.includes("pink")
                        ? "#ec4899"
                        : currentRestType.color.includes("purple")
                          ? "#8b5cf6"
                          : currentRestType.color.includes("yellow")
                            ? "#f59e0b"
                            : currentRestType.color.includes("emerald")
                              ? "#059669"
                              : "#f97316"
                }20`,
              }}
            />
          </div>
        </div>

        <Card
          className={`shadow-2xl border-0 bg-white/90 backdrop-blur-md transition-all duration-400 ease-out hover:shadow-3xl ${
            isTransitioning
              ? "opacity-0 scale-95 translate-y-4"
              : "opacity-100 scale-100 translate-y-0 animate-in fade-in-0 duration-700 animate-gentle-float-card"
          }`}
          style={{ animationDuration: "4s" }}
        >
          <CardContent className="p-8">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4 animate-in fade-in-0 slide-in-from-left-4 duration-700 ease-out">
                <span className="text-3xl animate-gentle-float">{currentRestType.emoji}</span>
                <h2 className="text-2xl font-light text-slate-800">{currentRestType.name}</h2>
              </div>
              <p className="text-slate-600 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-300 ease-out">
                Rate how true each statement feels for you right now.
              </p>
            </div>

            <div className="space-y-6">
              {questions[currentRestType.name as keyof typeof questions].map((question, index) => (
                <div
                  key={index}
                  className={`space-y-3 transition-all duration-400 ease-out ${
                    isTransitioning ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
                  } animate-gentle-float-item`}
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animationDuration: `${3 + index * 0.5}s`,
                    animation: !isTransitioning ? `fadeInSlideUp 0.7s ease-out ${index * 150}ms both` : undefined,
                  }}
                >
                  <p className="text-slate-700 font-medium">{question}</p>
                  <RadioGroup
                    value={answers[currentRestType.name]?.[index]?.toString() || ""}
                    onValueChange={(value) => handleAnswer(index, value)}
                    className="flex justify-between"
                  >
                    {[1, 2, 3, 4, 5].map((value) => (
                      <div key={value} className="flex flex-col items-center space-y-2">
                        <RadioGroupItem
                          value={value.toString()}
                          id={`q${index}-${value}`}
                          className={`w-5 h-5 transition-all duration-300 ease-out hover:scale-110 transform-gpu ${
                            value <= 2
                              ? "border-green-300 text-green-600 hover:border-green-400 hover:shadow-green-200/50"
                              : value === 3
                                ? "border-yellow-300 text-yellow-600 hover:border-yellow-400 hover:shadow-yellow-200/50"
                                : "border-red-300 text-red-600 hover:border-red-400 hover:shadow-red-200/50"
                          } hover:shadow-lg`}
                        />
                        <Label
                          htmlFor={`q${index}-${value}`}
                          className="text-xs text-slate-500 cursor-pointer transition-all duration-300 hover:text-slate-700 hover:scale-105 transform-gpu"
                        >
                          {value === 1
                            ? "Not true"
                            : value === 2
                              ? "Rarely"
                              : value === 3
                                ? "Sometimes"
                                : value === 4
                                  ? "Often"
                                  : "Very true"}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-600 ease-out">
              <Button
                onClick={prevStep}
                variant="outline"
                disabled={currentStep === 0}
                className="flex items-center gap-2 px-6 py-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/95 transition-all duration-300 hover:scale-105 transform-gpu disabled:hover:scale-100 animate-gentle-glow"
              >
                <ChevronLeft className="w-4 h-4 transition-transform duration-300" />
                Previous
              </Button>

              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 transform-gpu disabled:hover:scale-100 animate-gentle-glow ${
                  currentRestType.color.includes("blue")
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    : currentRestType.color.includes("green")
                      ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                      : currentRestType.color.includes("pink")
                        ? "bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800"
                        : currentRestType.color.includes("purple")
                          ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                          : currentRestType.color.includes("yellow")
                            ? "bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800"
                            : currentRestType.color.includes("emerald")
                              ? "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800"
                              : "bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800"
                }`}
              >
                {currentStep === restTypes.length - 1 ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-gentle-twinkle" />
                    View Results
                  </>
                ) : (
                  <>
                    Next Step
                    <ChevronRight className="w-4 h-4 transition-transform duration-300" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        @keyframes fadeInSlideUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gentle-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(1deg); }
        }

        @keyframes gentle-float-card {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
        }

        @keyframes gentle-float-item {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-1px); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(1deg); }
          66% { transform: translate(-20px, 20px) rotate(-1deg); }
        }

        @keyframes float-slower {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          50% { transform: translate(-25px, -25px) rotate(0.5deg); }
        }

        @keyframes float-medium {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          25% { transform: translate(20px, -15px) rotate(0.5deg); }
          75% { transform: translate(-15px, 10px) rotate(-0.5deg); }
        }

        @keyframes gentle-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        @keyframes gentle-glow {
          0%, 100% { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
          50% { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
        }

        @keyframes gentle-twinkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }

        .animate-gentle-float {
          animation: gentle-float 4s ease-in-out infinite;
        }

        .animate-gentle-float-card {
          animation: gentle-float-card 6s ease-in-out infinite;
        }

        .animate-gentle-float-item {
          animation: gentle-float-item 4s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }

        .animate-float-slower {
          animation: float-slower 25s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float-medium 15s ease-in-out infinite;
        }

        .animate-gentle-pulse {
          animation: gentle-pulse 3s ease-in-out infinite;
        }

        .animate-gentle-glow {
          animation: gentle-glow 4s ease-in-out infinite;
        }

        .animate-gentle-twinkle {
          animation: gentle-twinkle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
