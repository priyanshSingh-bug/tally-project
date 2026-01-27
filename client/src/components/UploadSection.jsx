import { useState, useRef } from 'react'

const UploadSection = ({ onUpload, loading }) => {
    const [file, setFile] = useState(null)
    const [dragActive, setDragActive] = useState(false)
    const fileInputRef = useRef(null)

    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    const handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        const files = e.dataTransfer.files
        if (files && files[0]) {
            setFile(files[0])
        }
    }

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const handleScan = (e) => {
        e.stopPropagation(); // Prevent triggering the card click
        if (file) onUpload(file)
    }

    return (
        <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={handleClick}
            className={`
                group relative flex flex-col items-center justify-center p-16 
                border-2 border-dashed rounded-3xl transition-all duration-300 cursor-pointer
                ${dragActive
                    ? 'border-primary bg-primary/5 scale-[1.01]'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
                }
            `}
        >
            <input
                ref={fileInputRef}
                type="file"
                onChange={handleChange}
                accept="image/*,application/pdf"
                className="hidden"
            />

            <div className={`p-5 rounded-2xl bg-white border border-gray-100 shadow-sm mb-6 transition-transform duration-300 ${dragActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
            </div>

            <div className="text-center space-y-2 mb-8">
                <h3 className="text-xl font-semibold text-gray-900">
                    {file ? file.name : "Upload Invoice"}
                </h3>
                <p className="text-gray-500">
                    {file ? "Ready to process" : "Drag & drop or click to browse"}
                </p>
            </div>

            <button
                onClick={handleScan}
                disabled={!file || loading}
                className={`
                    px-8 py-3 rounded-xl font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-xl
                    ${!file || loading
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                        : 'bg-black text-white hover:scale-105 active:scale-95'
                    }
                `}
            >
                {loading ? 'Processing...' : 'Scan Invoice'}
            </button>
        </div>
    )
}

export default UploadSection
