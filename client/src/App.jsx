import { useState } from 'react'
import axios from 'axios'
import UploadSection from './components/UploadSection'
import InvoiceDetails from './components/InvoiceDetails'
import ItemsTable from './components/ItemsTable'
import GstSummary from './components/GstSummary'

function App() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleUpload = async (file) => {
        setLoading(true)
        setError(null)
        const formData = new FormData()
        formData.append('invoice', file)

        try {
            const response = await axios.post('/api/invoice/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            setData(response.data)
        } catch (err) {
            console.error(err)
            setError('Failed to process invoice. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleDownloadJSON = async () => {
        try {
            const response = await axios.post('/api/invoice/download/json', {}, { responseType: 'blob' })
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'invoice_data.json')
            document.body.appendChild(link)
            link.click()
        } catch (err) {
            console.error(err)
            alert("Error downloading JSON")
        }
    }

    const handleReset = () => {
        setData(null)
        setLoading(false)
        setError(null)
    }

    const handleDownloadXML = async () => {
        try {
            const response = await axios.post('/api/invoice/download/xml', {}, { responseType: 'blob' })
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'tally_import.xml')
            document.body.appendChild(link)
            link.click()
        } catch (err) {
            console.error(err)
            alert("Error downloading XML")
        }
    }

    return (
        <div className="min-h-screen w-full">
            <div className='bg-black w-full py-10 mb-12'>
                <header className="text-center max-w-6xl mx-auto px-6">
                    <h1 className="text-5xl font-bold tracking-tight mb-3 text-white">
                        Invoice Converter
                    </h1>
                    <p className="text-white text-lg font-light">
                        AI-powered extraction for Tally Prime
                    </p>
                </header>
            </div>
            <div className="max-w-6xl mx-auto px-6 md:px-12 pb-20">
                <div className="grid gap-12">
                    {!data && <UploadSection onUpload={handleUpload} loading={loading} />}

                    {error && (
                        <div className="bg-red-50 text-red-600 px-6 py-4 rounded-xl text-center border border-red-100 text-sm font-medium">
                            {error}
                        </div>
                    )}

                    {data && (
                        <div className="space-y-10 animate-fade-in">
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm sticky top-6 z-20 backdrop-blur-md bg-white/80">
                                <button
                                    onClick={handleReset}
                                    className="px-5 py-2.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors text-sm font-medium flex items-center gap-2"
                                >
                                    <span>↺</span> Start Over
                                </button>

                                <div className="flex gap-2 w-full sm:w-auto">
                                    <button onClick={handleDownloadJSON} className="btn-secondary flex-1 sm:flex-none">
                                        Download JSON
                                    </button>
                                    <button onClick={handleDownloadXML} className="btn-primary flex-1 sm:flex-none">
                                        Download XML
                                    </button>
                                </div>
                            </div>

                            <div className="grid gap-8">
                                <InvoiceDetails data={data} />
                                <ItemsTable items={data.items} />
                                <GstSummary summary={data.gst_summary} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}


export default App
