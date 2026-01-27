const ItemsTable = ({ items }) => {
    return (
        <div className="card overflow-hidden !p-0">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Line Items</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-50/50">
                        <tr>
                            {['Item', 'Description', 'HSN', 'Qty', 'Rate', 'Total'].map(header => (
                                <th key={header} className="px-6 py-4 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {items.map((item, idx) => (
                            <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.item_name || '-'}</td>
                                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                                    {item.description || '-'}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 font-mono">{item.hsn || '-'}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{item.quantity || '-'}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{item.rate || '-'}</td>
                                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{item.taxable_value || '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ItemsTable
