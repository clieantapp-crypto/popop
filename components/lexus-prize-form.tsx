"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, ChevronLeft, ChevronRight, User, MapPin, Sparkles, ShieldCheck, FileCheck } from "lucide-react"

const syrianGovernorates = [
  "دمشق",
  "ريف دمشق",
  "حلب",
  "حمص",
  "حماة",
  "اللاذقية",
  "طرطوس",
  "إدلب",
  "درعا",
  "السويداء",
  "القنيطرة",
  "دير الزور",
  "الرقة",
  "الحسكة",
]

export function LexusPrizeForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    nationalId: "",
    phone: "",
    whatsapp: "",
    governorate: "",
    city: "",
    address: "",
    nearestLandmark: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [referenceNumber, setReferenceNumber] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const ref = "LX-" + Math.floor(100000 + Math.random() * 900000)
    setReferenceNumber(ref)
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const canProceedStep1 = formData.fullName && formData.nationalId && formData.phone
  const canSubmit = formData.governorate && formData.city && formData.address

  if (isSubmitted) {
    return (
      <Card className="border-gold/30 bg-card shadow-gold overflow-hidden">
        <div className="h-1 bg-gold-gradient" />
        <CardContent className="p-8 md:p-12 text-center">
          <div className="w-20 h-20 rounded-full bg-gold-gradient flex items-center justify-center mx-auto mb-6 shadow-gold">
            <CheckCircle2 className="w-12 h-12 text-background" strokeWidth={2.5} />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gold-gradient mb-3">
            تم تسجيل بياناتك بنجاح
          </h2>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            تهانينا! تم استلام بياناتك بنجاح، سيتم التواصل معك خلال
            <br />
            <span className="text-foreground font-bold">24 إلى 48 ساعة</span> لإتمام إجراءات تسليم سيارتك
          </p>

          <div className="bg-secondary/50 border border-gold/20 rounded-xl p-6 mb-6">
            <p className="text-muted-foreground text-sm mb-2">الرقم المرجعي للطلب</p>
            <p className="text-3xl font-extrabold text-gold tracking-widest">{referenceNumber}</p>
            <p className="text-xs text-muted-foreground mt-3">
              يرجى الاحتفاظ بهذا الرقم لمراجعتك عند التواصل
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-right">
            <div className="bg-secondary/30 rounded-lg p-4 border border-border">
              <ShieldCheck className="w-6 h-6 text-gold mb-2" />
              <p className="text-sm font-bold text-foreground mb-1">تسليم رسمي</p>
              <p className="text-xs text-muted-foreground">داخل سوريا بأوراق ثبوتية كاملة</p>
            </div>
            <div className="bg-secondary/30 rounded-lg p-4 border border-border">
              <FileCheck className="w-6 h-6 text-gold mb-2" />
              <p className="text-sm font-bold text-foreground mb-1">أوراق كاملة</p>
              <p className="text-xs text-muted-foreground">شهادة تسجيل ولوحات رسمية</p>
            </div>
            <div className="bg-secondary/30 rounded-lg p-4 border border-border">
              <Sparkles className="w-6 h-6 text-gold mb-2" />
              <p className="text-sm font-bold text-foreground mb-1">جاهزة للاستلام</p>
              <p className="text-xs text-muted-foreground">لكزس LX 700 موديل 2025</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-gold/30 bg-card shadow-gold overflow-hidden">
      <div className="h-1 bg-gold-gradient" />

      {/* Steps Indicator */}
      <div className="border-b border-border bg-secondary/20 px-6 py-5">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                step >= 1
                  ? "bg-gold-gradient text-background shadow-gold"
                  : "bg-secondary text-muted-foreground border border-border"
              }`}
            >
              {step > 1 ? <CheckCircle2 className="w-5 h-5" /> : "1"}
            </div>
            <span className={`hidden md:block text-sm font-bold ${step >= 1 ? "text-foreground" : "text-muted-foreground"}`}>
              البيانات الشخصية
            </span>
          </div>

          <div className={`w-16 h-0.5 ${step >= 2 ? "bg-gold" : "bg-border"}`} />

          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                step >= 2
                  ? "bg-gold-gradient text-background shadow-gold"
                  : "bg-secondary text-muted-foreground border border-border"
              }`}
            >
              2
            </div>
            <span className={`hidden md:block text-sm font-bold ${step >= 2 ? "text-foreground" : "text-muted-foreground"}`}>
              عنوان التسليم
            </span>
          </div>
        </div>
      </div>

      <CardContent className="p-6 md:p-10">
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold/10 border border-gold/30 mb-4">
                  <User className="w-7 h-7 text-gold" />
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">
                  البيانات الشخصية للفائز
                </h2>
                <p className="text-muted-foreground text-sm">
                  يرجى إدخال بياناتك مطابقة للهوية الشخصية الرسمية
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-foreground mb-2">
                    الاسم الثلاثي الكامل <span className="text-gold">*</span>
                  </label>
                  <Input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    placeholder="مثال: محمد أحمد علي"
                    className="bg-secondary/40 border-border text-foreground h-12 text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">
                    الرقم الوطني <span className="text-gold">*</span>
                  </label>
                  <Input
                    name="nationalId"
                    value={formData.nationalId}
                    onChange={handleInputChange}
                    required
                    inputMode="numeric"
                    placeholder="11 رقم"
                    maxLength={11}
                    className="bg-secondary/40 border-border text-foreground h-12 text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">
                    رقم الجوال <span className="text-gold">*</span>
                  </label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    inputMode="tel"
                    placeholder="09xxxxxxxx"
                    className="bg-secondary/40 border-border text-foreground h-12 text-base"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-foreground mb-2">
                    رقم الواتساب <span className="text-muted-foreground text-xs">(اختياري - إن اختلف عن الجوال)</span>
                  </label>
                  <Input
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    inputMode="tel"
                    placeholder="09xxxxxxxx"
                    className="bg-secondary/40 border-border text-foreground h-12 text-base"
                  />
                </div>
              </div>

              <div className="bg-gold/5 border border-gold/20 rounded-lg p-4 text-sm text-muted-foreground">
                <p className="flex items-start gap-2">
                  <ShieldCheck className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span>
                    بياناتك محمية ومشفرة ولن يتم استخدامها إلا لأغراض التحقق وتسليم الجائزة الرسمية فقط.
                  </span>
                </p>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!canProceedStep1}
                  className="bg-gold-gradient hover:opacity-90 text-background font-bold h-12 px-8 text-base shadow-gold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  التالي
                  <ChevronLeft className="w-5 h-5 mr-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold/10 border border-gold/30 mb-4">
                  <MapPin className="w-7 h-7 text-gold" />
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">
                  عنوان تسليم السيارة
                </h2>
                <p className="text-muted-foreground text-sm">
                  سيتم تسليم السيارة رسمياً داخل سوريا في العنوان المحدد
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">
                    المحافظة <span className="text-gold">*</span>
                  </label>
                  <select
                    name="governorate"
                    value={formData.governorate}
                    onChange={(e) => setFormData({ ...formData, governorate: e.target.value })}
                    required
                    className="w-full bg-secondary/40 border border-border rounded-md text-foreground h-12 px-3 text-base focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <option value="">اختر المحافظة</option>
                    {syrianGovernorates.map((gov) => (
                      <option key={gov} value={gov}>
                        {gov}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">
                    المدينة / المنطقة <span className="text-gold">*</span>
                  </label>
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    placeholder="مثال: المزة"
                    className="bg-secondary/40 border-border text-foreground h-12 text-base"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-foreground mb-2">
                    العنوان التفصيلي <span className="text-gold">*</span>
                  </label>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    placeholder="الحي - الشارع - رقم المبنى"
                    className="bg-secondary/40 border-border text-foreground h-12 text-base"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-foreground mb-2">
                    أقرب معلم مميز <span className="text-muted-foreground text-xs">(اختياري)</span>
                  </label>
                  <Input
                    name="nearestLandmark"
                    value={formData.nearestLandmark}
                    onChange={handleInputChange}
                    placeholder="مثال: بجانب مدرسة... / مقابل صيدلية..."
                    className="bg-secondary/40 border-border text-foreground h-12 text-base"
                  />
                </div>
              </div>

              <div className="bg-secondary/40 border border-gold/20 rounded-xl p-5">
                <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-gold" />
                  ملخص بياناتك
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between border-b border-border/50 pb-2">
                    <span className="text-muted-foreground">الاسم:</span>
                    <span className="text-foreground font-medium">{formData.fullName || "—"}</span>
                  </div>
                  <div className="flex justify-between border-b border-border/50 pb-2">
                    <span className="text-muted-foreground">الرقم الوطني:</span>
                    <span className="text-foreground font-medium">{formData.nationalId || "—"}</span>
                  </div>
                  <div className="flex justify-between border-b border-border/50 pb-2">
                    <span className="text-muted-foreground">الجوال:</span>
                    <span className="text-foreground font-medium">{formData.phone || "—"}</span>
                  </div>
                  <div className="flex justify-between border-b border-border/50 pb-2">
                    <span className="text-muted-foreground">الجائزة:</span>
                    <span className="text-gold font-bold">لكزس LX 700 - 2025</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col-reverse md:flex-row justify-between gap-3 pt-4">
                <Button
                  type="button"
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="border-border bg-transparent text-foreground hover:bg-secondary h-12 px-8 text-base"
                >
                  <ChevronRight className="w-5 h-5 ml-2" />
                  السابق
                </Button>
                <Button
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  className="bg-gold-gradient hover:opacity-90 text-background font-bold h-12 px-8 text-base shadow-gold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="inline-block w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin ml-2" />
                      جاري الإرسال...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5 ml-2" />
                      تأكيد وتسجيل البيانات
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
