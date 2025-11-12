"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Eye, Download, Printer } from "lucide-react"
import InvoiceForm from "@/components/invoice-form"
import InvoicePreview from "@/components/invoice-preview"

interface InvoiceData {
  invoiceNumber: string
  date: string
  dueDate: string
  companyName: string
  companyAddress: string
  clientName: string
  clientAddress: string
  items: Array<{
    id: string
    description: string
    quantity: number
    price: number
  }>
  notes: string
  paymentTerms: string
}

const initialInvoiceData: InvoiceData = {
  invoiceNumber: "001",
  date: new Date().toISOString().split("T")[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  companyName: "شركتي",
  companyAddress: "العنوان",
  clientName: "اسم العميل",
  clientAddress: "عنوان العميل",
  items: [{ id: "1", description: "الخدمة/المنتج", quantity: 1, price: 100 }],
  notes: "شكرا على تعاملكم معنا",
  paymentTerms: "الدفع عند الاستلام",
}

export default function Home() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(initialInvoiceData)

  const handleGeneratePDF = () => {
    const element = document.getElementById("invoice-preview")
    if (!element) return

    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    const totalAmount = invoiceData.items.reduce((sum, item) => sum + item.quantity * item.price, 0)

    printWindow.document.write(`
      <!DOCTYPE html>
      <html dir="rtl">
        <head>
          <meta charset="UTF-8">
          <title>فاتورة - ${invoiceData.invoiceNumber}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Arial', sans-serif; background: white; padding: 0; }
            .invoice { background: white; max-width: 800px; margin: 0 auto; padding: 48px; }
            .header { border-bottom: 4px solid #1e3a8a; padding-bottom: 24px; margin-bottom: 32px; }
            .header-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
            .company-info h2 { font-size: 20px; color: #1e3a8a; font-weight: bold; }
            .company-info p { font-size: 12px; color: #4b5563; margin: 4px 0; }
            .invoice-title-section { text-align: left; }
            .invoice-title { font-size: 14px; font-weight: bold; color: #1e3a8a; }
            .client-info { margin-bottom: 24px; }
            .client-info p { font-size: 13px; color: #1e3a8a; font-weight: bold; margin-bottom: 12px; }
            .divider { border-bottom: 2px solid #d0d0d0; padding-bottom: 16px; margin-bottom: 16px; }
            table { width: 100%; margin: 24px 0; border-collapse: collapse; }
            th { background: #f3f4f6; color: #1e3a8a; padding: 12px; text-align: right; font-weight: bold; font-size: 13px; border: 2px solid #9ca3af; }
            td { padding: 12px; border: 2px solid #9ca3af; font-size: 12px; }
            td:first-child { text-align: right; }
            td:not(:first-child) { text-align: center; }
            .empty-row { height: 48px; }
            .total-section { display: flex; font-weight: bold; border: 2px solid #9ca3af; font-size: 12px; margin-bottom: 24px; }
            .total-amount { width: 25%; padding: 12px; text-align: center; background: #f3f4f6; border-right: 2px solid #9ca3af; }
            .total-label { flex: 1; padding: 12px; text-align: right; }
            .signature { display: flex; justify-content: flex-start; margin-top: 48px; }
            .signature-line { text-align: center; }
            .signature-line div { border-bottom: 2px solid #9ca3af; width: 128px; margin-bottom: 8px; }
            .signature-line p { font-size: 11px; font-weight: bold; color: #1e3a8a; }
            @media print {
              body { background: white; padding: 0; margin: 0; }
              .invoice { padding: 0; }
            }
          </style>
        </head>
        <body>
          <div class="invoice">
            <div class="header">
              <div class="header-top">
                <div class="company-info">
                  <h2>مختبر نورمار</h2>
                  <p>NORMAR DIGITAL DENTAL INDUSTRY LAB</p>
                  <p>الرمثا - قرب المدرسة الثانوية - هاتف: 0798719058</p>
                </div>
                <div class="invoice-title-section">
                  <p class="invoice-title">فاتورة</p>
                  <p style="font-size: 11px; color: #666; margin-top: 8px;">رقم: <strong>${invoiceData.invoiceNumber}</strong></p>
                  <p style="font-size: 11px; color: #666;">التاريخ: <strong>${invoiceData.date}</strong></p>
                </div>
              </div>
            </div>
            
            <div class="client-info">
              <p>المطلوب من السيد / السادة: <span style="color: #333;">${invoiceData.clientName}</span></p>
              <div class="divider"></div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>السعر الإجمالي (دينار)</th>
                  <th>السعر</th>
                  <th>العدد</th>
                  <th>البيــــــــــــــان</th>
                </tr>
              </thead>
              <tbody>
                ${invoiceData.items
                  .map(
                    (item) => `
                  <tr>
                    <td style="text-align: center; font-weight: bold;">${(item.quantity * item.price).toFixed(2)}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>${item.quantity}</td>
                    <td>${item.description}</td>
                  </tr>
                `,
                  )
                  .join("")}
                ${[...Array(Math.max(0, 6 - invoiceData.items.length))]
                  .map(() => '<tr class="empty-row"><td></td><td></td><td></td><td></td></tr>')
                  .join("")}
              </tbody>
            </table>

            <div class="total-section">
              <div class="total-amount">${totalAmount.toFixed(2)}</div>
              <div class="total-label">المجموع</div>
            </div>

            <div class="signature">
              <div class="signature-line">
                <div></div>
                <p>توقيع المستقبل</p>
              </div>
            </div>
          </div>
          <script>
            setTimeout(() => window.print(), 500)
          </script>
        </body>
      </html>
    `)
    printWindow.document.close()
  }

  const handleDownloadPDF = async () => {
    try {
      const { jsPDF } = await import("jspdf")
      const html2canvas = (await import("html2canvas")).default

      const element = document.getElementById("invoice-preview")
      if (!element) return

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const imgWidth = 210
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)

      pdf.save(`فاتورة-${invoiceData.invoiceNumber}.pdf`)
    } catch (error) {
      console.error("خطأ في إنشاء PDF:", error)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="border-b border-slate-200 bg-white shadow-sm">
        <div className="container mx-auto py-6 sm:py-8 px-4">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-1 sm:mb-2">
              نظام الفواتير 
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-600">
              إنشاء وإدارة الفواتير  
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-6 sm:py-8 px-4">
        <Tabs defaultValue="form" className="w-full max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-6 sm:mb-8 bg-slate-100 p-1 rounded-lg">
            <TabsTrigger
              value="form"
              className="flex items-center gap-1 sm:gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm rounded transition-all text-xs sm:text-sm"
            >
              <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">النموذج</span>
              <span className="sm:hidden">الإدخال</span>
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className="flex items-center gap-1 sm:gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm rounded transition-all text-xs sm:text-sm"
            >
              <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">معاينة</span>
              <span className="sm:hidden">العرض</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="form" className="space-y-4 sm:space-y-6">
            <InvoiceForm data={invoiceData} onChange={setInvoiceData} />
          </TabsContent>

          <TabsContent value="preview" className="space-y-4 sm:space-y-6">
            <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-6 flex-wrap">
              <Button
                onClick={handleDownloadPDF}
                className="flex-1 sm:flex-none bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all rounded-lg px-3 sm:px-6 py-2 sm:py-2.5 font-medium text-sm sm:text-base"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>تحميل PDF</span>
              </Button>
              <Button
                onClick={handleGeneratePDF}
                className="flex-1 sm:flex-none bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all rounded-lg px-3 sm:px-6 py-2 sm:py-2.5 font-medium text-sm sm:text-base"
              >
                <Printer className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>طباعة</span>
              </Button>
            </div>
            <InvoicePreview data={invoiceData} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
