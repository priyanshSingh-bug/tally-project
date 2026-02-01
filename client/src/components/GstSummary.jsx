const GstSummary = ({ summary }) => {
    const getSummaryClass = (value) => {
        const isEmpty = !value || value === '-' || value === '0.00';
        return `font-mono font-medium px-2 py-1 rounded transition-colors ${isEmpty ? 'text-gray-300 bg-background/100' : 'text-gray-900'}`;
    }

    return (
        <div className="card w-full md:w-1/2 mr-auto !p-0">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Tax Summary</h3>
            </div>
            <div className="p-2">
                <div className="grid grid-cols-3 divide-x divide-gray-50">
                    <div className="p-4 text-center">
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">CGST</p>
                        <p className={getSummaryClass(summary.cgst)}>
                            {summary.cgst}
                        </p>
                    </div>
                    <div className="p-4 text-center">
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">SGST</p>
                        <p className={getSummaryClass(summary.sgst)}>
                            {summary.sgst}
                        </p>
                    </div>
                    <div className="p-4 text-center">
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">IGST</p>
                        <p className={getSummaryClass(summary.igst)}>
                            {summary.igst}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GstSummary
