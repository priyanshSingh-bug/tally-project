const DetailCard = ({ title, details }) => (
    <div className="card h-full flex flex-col">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-5">{title}</h3>
        <div className="space-y-4 flex-1">
            {Object.entries(details).map(([key, value]) => {
                const isEmpty = !value || value === '-';
                return (
                    <div key={key} className="flex flex-col gap-1">
                        <span className="text-xs text-gray-400 capitalize">{key.replace(/_/g, ' ')}</span>
                        <span className={`text-sm font-medium px-2 py-0.5 rounded transition-colors ${isEmpty ? 'text-gray-300 bg-background/80 inline-block w-fit' : 'text-gray-900'}`}>
                            {value}
                        </span>
                    </div>
                );
            })}
        </div>
    </div>
)

const InvoiceDetails = ({ data }) => {
    const invoiceInfo = {
        "invoice_number": data.invoice_number,
        "date": data.invoice_date,
        "amount": data.total_amount
    }

    return (
        <div className="grid md:grid-cols-3 gap-6">
            <DetailCard title="INVOICE" details={invoiceInfo} />
            <DetailCard title="SELLER" details={data.seller} />
            <DetailCard title="BUYER" details={data.buyer} />
        </div>
    )
}

export default InvoiceDetails
