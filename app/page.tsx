"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"

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
    "I struggle to stay focused",
    "My brain feels foggy even after sleep",
    "I replay conversations or moments repeatedly",
    "I feel mentally drained after an average day",
  ],
  "Physical Rest": [
    "I wake up tired even after a full night's sleep",
    "My body feels sore, tense, or fatigued regularly",
    "I skip movement or stretching even though I know it helps",
    "I rely on caffeine to function normally",
    "I rarely prioritize rest or recovery for my body",
  ],
  "Emotional Rest": [
    "I feel emotionally exhausted or easily irritated",
    "I often pretend I'm okay when I'm not",
    "I have little space to express my emotions",
    "I feel responsible for other people's feelings",
    "I long for more honesty and relief",
  ],
  "Social Rest": [
    "I feel drained by social interactions",
    "I say yes to social things when I don't want to",
    "I don't feel like myself around others",
    "I miss energizing, honest relationships",
    "I crave deeper connection",
  ],
  "Spiritual Rest": [
    "I feel disconnected from deeper purpose",
    "I feel my daily life lacks meaning",
    "I want more time to reflect or feel inspired",
    "I miss feeling connected to something greater than myself",
    "I want to live in alignment with my values",
  ],
  "Sensory Rest": [
    "I feel overstimulated by noise, light, or screens",
    "I spend many hours in front of screens daily",
    "I feel agitated in loud or crowded places",
    "I rarely experience true silence or stillness",
    "I find it hard to relax without digital input",
  ],
  "Intellectual Rest": [
    "I feel mentally under-stimulated or bored",
    "I miss learning or creative challenge",
    "I don't have time for interesting or stimulating tasks",
    "I rarely engage in things that inspire me",
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

  const currentRestType = restTypes[currentStep]
  const progress = ((currentStep + 1) / restTypes.length) * 100

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
    return currentAnswers.length === 5 && currentAnswers.every((answer) => answer >= 1 && answer <= 5)
  }

  const nextStep = () => {
    if (currentStep < restTypes.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowResults(true)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
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
    setCurrentStep(0)
    setAnswers({})
    setShowResults(false)
    setStarted(false)
  }

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <div className="mb-8">
              <h1 className="text-4xl font-light text-slate-800 mb-4 tracking-tight">🌸 RestReveal</h1>
              <div className="w-16 h-0.5 bg-slate-300 mx-auto mb-8"></div>
              <h2 className="text-2xl font-light text-slate-700 mb-6">What Kind of Rest Do You Need Most?</h2>
              <p className="text-slate-600 text-lg leading-relaxed max-w-lg mx-auto">
                Take this 3-minute quiz to discover where your energy is leaking—and how to restore balance.
              </p>
            </div>
            <Button
              onClick={() => setStarted(true)}
              size="lg"
              className="bg-slate-700 hover:bg-slate-800 text-white px-8 py-3 rounded-full text-lg font-light transition-all duration-300 shadow-lg hover:shadow-xl"
            >
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100 p-4">
        <div className="max-w-4xl mx-auto py-8">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-light text-slate-800 mb-4">🎉 Your Rest Profile</h1>
                <div className="w-16 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 mx-auto"></div>
              </div>

              <div className="space-y-8">
                {topResults.map((result, index) => (
                  <div
                    key={result.name}
                    className={`${result.color} border-2 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{result.emoji}</span>
                        <h3 className="text-xl font-medium">
                          {index === 0 ? "🥇 Primary Need: " : "🥈 Secondary Need: "}
                          {result.name}
                        </h3>
                      </div>
                      <span className="text-sm bg-white px-3 py-1 rounded-full font-medium">📊 {result.score}/25</span>
                    </div>

                    <div className="grid gap-3">
                      <h4 className="font-medium mb-2 flex items-center gap-2">💡 Recommended Activities:</h4>
                      {recommendations[result.name as keyof typeof recommendations].map((rec, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-white/70 p-3 rounded-lg backdrop-blur-sm">
                          <span className="text-sm">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-100 rounded-2xl p-6">
                <h4 className="font-medium text-slate-700 mb-3 flex items-center gap-2">📝 Reflection Prompt</h4>
                <p className="text-slate-600 leading-relaxed">
                  Take a moment to reflect: Which of these recommendations feels most appealing to you right now? What
                  small step could you take today to honor your need for rest? Consider journaling about what you
                  discovered and how you might integrate these practices into your daily routine. 🌱
                </p>
              </div>

              <div className="flex justify-center mt-8">
                <Button
                  onClick={restart}
                  variant="outline"
                  className="flex items-center gap-2 px-6 py-2 rounded-full bg-transparent"
                >
                  <RotateCcw className="w-4 h-4" />
                  Take Quiz Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100 p-4">
      <div className="max-w-2xl mx-auto py-8">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">
              Step {currentStep + 1} of {restTypes.length}
            </span>
            <span className="text-sm text-slate-600">{Math.round(progress)}% Complete</span>
          </div>
          <Progress
            value={progress}
            className="h-2 bg-slate-200"
            style={{
              background: `linear-gradient(to right, 
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
    } ${progress}%, #e2e8f0 ${progress}%)`,
            }}
          />
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{currentRestType.emoji}</span>
                <h2 className="text-2xl font-light text-slate-800">{currentRestType.name}</h2>
              </div>
              <p className="text-slate-600">Rate how true each statement feels for you right now.</p>
            </div>

            <div className="space-y-6">
              {questions[currentRestType.name as keyof typeof questions].map((question, index) => (
                <div key={index} className="space-y-3">
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
                          className={`w-5 h-5 ${
                            value <= 2
                              ? "border-green-300 text-green-600"
                              : value === 3
                                ? "border-yellow-300 text-yellow-600"
                                : "border-red-300 text-red-600"
                          }`}
                        />
                        <Label htmlFor={`q${index}-${value}`} className="text-xs text-slate-500 cursor-pointer">
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

            <div className="flex justify-between mt-8">
              <Button
                onClick={prevStep}
                variant="outline"
                disabled={currentStep === 0}
                className="flex items-center gap-2 px-6 py-2 rounded-full bg-transparent"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-300 ${
                  currentRestType.color.includes("blue")
                    ? "bg-blue-600 hover:bg-blue-700"
                    : currentRestType.color.includes("green")
                      ? "bg-green-600 hover:bg-green-700"
                      : currentRestType.color.includes("pink")
                        ? "bg-pink-600 hover:bg-pink-700"
                        : currentRestType.color.includes("purple")
                          ? "bg-purple-600 hover:bg-purple-700"
                          : currentRestType.color.includes("yellow")
                            ? "bg-yellow-600 hover:bg-yellow-700"
                            : currentRestType.color.includes("emerald")
                              ? "bg-emerald-600 hover:bg-emerald-700"
                              : "bg-orange-600 hover:bg-orange-700"
                }`}
              >
                {currentStep === restTypes.length - 1 ? "✨ View Results" : "Next Step"}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
