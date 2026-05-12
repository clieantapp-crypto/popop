import { LexusPrizeForm } from "@/components/lexus-prize-form"

export default function Home() {
  return (
    <main dir="rtl" className="min-h-screen bg-background">
      <section className="max-w-3xl mx-auto px-4 pt-6 pb-16 md:pb-24">
        <LexusPrizeForm />

        <p className="text-center text-xs text-muted-foreground mt-8 leading-relaxed">
          بإرسال هذا النموذج فإنك توافق على التحقق من بياناتك والتواصل معك لإتمام إجراءات تسليم الجائزة
          <br />
          جميع الحقوق محفوظة © 2025
        </p>
      </section>
    </main>
  )
}
