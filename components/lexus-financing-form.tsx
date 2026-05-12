"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

const carModels = [
  { id: "lx600", name: "LX 600", price: "485,000" },
  { id: "ls500", name: "LS 500", price: "420,000" },
  { id: "lc500", name: "LC 500", price: "395,000" },
  { id: "es350", name: "ES 350", price: "245,000" },
  { id: "rx350", name: "RX 350", price: "285,000" },
  { id: "nx350", name: "NX 350", price: "235,000" },
]

const financingPeriods = [
  { months: 12, label: "12 شهر" },
  { months: 24, label: "24 شهر" },
  { months: 36, label: "36 شهر" },
  { months: 48, label: "48 شهر" },
  { months: 60, label: "60 شهر" },
]

export function LexusFinancingForm() {
  const [step, setStep] = useState(1)
  const [selectedModel, setSelectedModel] = useState("")
  const [selectedPeriod, setSelectedPeriod] = useState(36)
  const [formData, setFormData] = useState({
    fullName: "",
    nationalId: "",
    phone: "",
    email: "",
    salary: "",
    employer: "",
    employmentYears: "",
    downPayment: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <Card className="w-full max-w-lg border-accent/20 bg-card">
          <CardContent className="flex flex-col items-center gap-6 p-8 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
              <svg
                className="h-10 w-10 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              تم استلام طلبك بنجاح
            </h2>
            <p className="text-muted-foreground">
              سيتواصل معك أحد ممثلي المبيعات خلال 24 ساعة لاستكمال الإجراءات
            </p>
            <p className="text-sm text-muted-foreground">
              رقم الطلب: #{Math.random().toString(36).substring(2, 10).toUpperCase()}
            </p>
            <Button
              onClick={() => {
                setIsSubmitted(false)
                setStep(1)
                setSelectedModel("")
                setFormData({
                  fullName: "",
                  nationalId: "",
                  phone: "",
                  email: "",
                  salary: "",
                  employer: "",
                  employmentYears: "",
                  downPayment: "",
                })
              }}
              className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90"
            >
              تقديم طلب جديد
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold tracking-wider text-foreground">
              LEXUS
            </div>
            <span className="text-xs text-muted-foreground">2025</span>
          </div>
          <nav className="hidden gap-8 md:flex">
            <span className="cursor-pointer text-sm text-muted-foreground transition-colors hover:text-foreground">
              الموديلات
            </span>
            <span className="cursor-pointer text-sm text-accent">التمويل</span>
            <span className="cursor-pointer text-sm text-muted-foreground transition-colors hover:text-foreground">
              تواصل معنا
            </span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary py-16">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
        <div className="relative mx-auto max-w-6xl px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-primary-foreground md:text-5xl">
            تقديم طلب تمويل
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-primary-foreground/70">
            امتلك سيارة لكزس 2025 الأحلام مع خطط تمويل مرنة ومميزة
          </p>
        </div>
      </section>

      {/* Progress Steps */}
      <div className="border-b border-border bg-card/30">
        <div className="mx-auto max-w-4xl px-4 py-6">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: "اختيار السيارة" },
              { num: 2, label: "البيانات الشخصية" },
              { num: 3, label: "معلومات العمل" },
            ].map((s, index) => (
              <div key={s.num} className="flex flex-1 items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all ${
                      step >= s.num
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-muted-foreground/30 text-muted-foreground"
                    }`}
                  >
                    {step > s.num ? (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      s.num
                    )}
                  </div>
                  <span
                    className={`mt-2 text-xs ${
                      step >= s.num ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {index < 2 && (
                  <div
                    className={`mx-4 h-0.5 flex-1 transition-all ${
                      step > s.num ? "bg-accent" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <main className="mx-auto max-w-4xl px-4 py-12">
        <form onSubmit={handleSubmit}>
          {/* Step 1: Car Selection */}
          {step === 1 && (
            <div className="space-y-8">
              <div>
                <h2 className="mb-6 text-xl font-bold text-foreground">
                  اختر موديل السيارة
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {carModels.map((car) => (
                    <Card
                      key={car.id}
                      onClick={() => setSelectedModel(car.id)}
                      className={`cursor-pointer border-2 transition-all hover:border-accent/50 ${
                        selectedModel === car.id
                          ? "border-accent bg-accent/5"
                          : "border-border bg-card"
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="mb-4 flex h-32 items-center justify-center rounded-lg bg-muted/50">
                          <svg
                            className="h-16 w-16 text-muted-foreground/50"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                            />
                          </svg>
                        </div>
                        <h3 className="mb-1 text-lg font-bold text-foreground">
                          {car.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          يبدأ من{" "}
                          <span className="font-bold text-accent">
                            {car.price}
                          </span>{" "}
                          ر.س
                        </p>
                        {selectedModel === car.id && (
                          <div className="mt-3 flex items-center gap-2 text-sm text-accent">
                            <svg
                              className="h-4 w-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            تم الاختيار
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Financing Period */}
              <div>
                <h2 className="mb-6 text-xl font-bold text-foreground">
                  فترة التمويل
                </h2>
                <div className="flex flex-wrap gap-3">
                  {financingPeriods.map((period) => (
                    <button
                      key={period.months}
                      type="button"
                      onClick={() => setSelectedPeriod(period.months)}
                      className={`rounded-full border-2 px-6 py-3 text-sm font-medium transition-all ${
                        selectedPeriod === period.months
                          ? "border-accent bg-accent text-accent-foreground"
                          : "border-border bg-card text-foreground hover:border-accent/50"
                      }`}
                    >
                      {period.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary */}
              {selectedModel && (
                <Card className="border-accent/20 bg-accent/5">
                  <CardContent className="p-6">
                    <h3 className="mb-4 font-bold text-foreground">
                      ملخص التمويل المبدئي
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <p className="text-sm text-muted-foreground">السيارة</p>
                        <p className="font-bold text-foreground">
                          {carModels.find((c) => c.id === selectedModel)?.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          فترة التمويل
                        </p>
                        <p className="font-bold text-foreground">
                          {selectedPeriod} شهر
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          القسط الشهري التقريبي
                        </p>
                        <p className="text-xl font-bold text-accent">
                          {Math.round(
                            (parseInt(
                              carModels
                                .find((c) => c.id === selectedModel)
                                ?.price.replace(",", "") || "0"
                            ) *
                              1000) /
                              selectedPeriod
                          ).toLocaleString()}{" "}
                          ر.س
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-start">
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={!selectedModel}
                  className="bg-accent px-8 text-accent-foreground hover:bg-accent/90 disabled:opacity-50"
                >
                  التالي
                  <svg
                    className="mr-2 h-4 w-4 rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Personal Information */}
          {step === 2 && (
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-foreground">
                البيانات الشخصية
              </h2>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    الاسم الكامل <span className="text-destructive">*</span>
                  </label>
                  <Input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="أدخل اسمك الكامل"
                    required
                    className="h-12 bg-card"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    رقم الهوية الوطنية <span className="text-destructive">*</span>
                  </label>
                  <Input
                    name="nationalId"
                    value={formData.nationalId}
                    onChange={handleInputChange}
                    placeholder="أدخل رقم الهوية"
                    required
                    maxLength={10}
                    className="h-12 bg-card"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    رقم الجوال <span className="text-destructive">*</span>
                  </label>
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="05xxxxxxxx"
                    required
                    className="h-12 bg-card"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    البريد الإلكتروني <span className="text-destructive">*</span>
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@email.com"
                    required
                    className="h-12 bg-card"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  onClick={prevStep}
                  variant="outline"
                  className="px-8"
                >
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                  السابق
                </Button>
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={
                    !formData.fullName ||
                    !formData.nationalId ||
                    !formData.phone ||
                    !formData.email
                  }
                  className="bg-accent px-8 text-accent-foreground hover:bg-accent/90 disabled:opacity-50"
                >
                  التالي
                  <svg
                    className="mr-2 h-4 w-4 rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Employment Information */}
          {step === 3 && (
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-foreground">
                معلومات العمل
              </h2>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    جهة العمل <span className="text-destructive">*</span>
                  </label>
                  <Input
                    name="employer"
                    value={formData.employer}
                    onChange={handleInputChange}
                    placeholder="اسم جهة العمل"
                    required
                    className="h-12 bg-card"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    سنوات الخدمة <span className="text-destructive">*</span>
                  </label>
                  <Input
                    name="employmentYears"
                    type="number"
                    value={formData.employmentYears}
                    onChange={handleInputChange}
                    placeholder="عدد سنوات الخدمة"
                    required
                    className="h-12 bg-card"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    الراتب الشهري <span className="text-destructive">*</span>
                  </label>
                  <Input
                    name="salary"
                    type="number"
                    value={formData.salary}
                    onChange={handleInputChange}
                    placeholder="الراتب بالريال السعودي"
                    required
                    className="h-12 bg-card"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    الدفعة الأولى (اختياري)
                  </label>
                  <Input
                    name="downPayment"
                    type="number"
                    value={formData.downPayment}
                    onChange={handleInputChange}
                    placeholder="مبلغ الدفعة الأولى"
                    className="h-12 bg-card"
                  />
                </div>
              </div>

              {/* Final Summary */}
              <Card className="border-accent/20 bg-accent/5">
                <CardContent className="p-6">
                  <h3 className="mb-4 font-bold text-foreground">
                    ملخص الطلب
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <p className="text-sm text-muted-foreground">السيارة</p>
                      <p className="font-bold text-foreground">
                        {carModels.find((c) => c.id === selectedModel)?.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">السعر</p>
                      <p className="font-bold text-foreground">
                        {carModels.find((c) => c.id === selectedModel)?.price}{" "}
                        ر.س
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        فترة التمويل
                      </p>
                      <p className="font-bold text-foreground">
                        {selectedPeriod} شهر
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">مقدم الطلب</p>
                      <p className="font-bold text-foreground">
                        {formData.fullName || "-"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Terms */}
              <div className="rounded-lg bg-muted/50 p-4">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 h-4 w-4 rounded border-border accent-accent"
                  />
                  <span className="text-sm text-muted-foreground">
                    أوافق على{" "}
                    <span className="cursor-pointer text-accent underline">
                      الشروط والأحكام
                    </span>{" "}
                    وأقر بأن جميع المعلومات المقدمة صحيحة
                  </span>
                </label>
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  onClick={prevStep}
                  variant="outline"
                  className="px-8"
                >
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                  السابق
                </Button>
                <Button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    !formData.employer ||
                    !formData.employmentYears ||
                    !formData.salary
                  }
                  className="bg-accent px-8 text-accent-foreground hover:bg-accent/90 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="ml-2 h-4 w-4 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      جاري الإرسال...
                    </>
                  ) : (
                    <>
                      إرسال الطلب
                      <svg
                        className="mr-2 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </form>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <p className="text-sm text-muted-foreground">
            جميع الحقوق محفوظة 2025 - LEXUS
          </p>
          <p className="mt-2 text-xs text-muted-foreground/70">
            الأسعار والأقساط المعروضة تقريبية وقابلة للتغيير حسب شروط التمويل
          </p>
        </div>
      </footer>
    </div>
  )
}
