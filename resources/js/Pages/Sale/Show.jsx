import AppLayout from '@/Layouts/AppLayout';
import { formatNumber, formatDate } from '@/utils/format';

export default function Show({ sale }) {
    return (
        <AppLayout title={`Penjualan ${sale.sale_number}`}>
            <div className="bg-white shadow rounded-lg p-6">
                <dl className="grid grid-cols-2 gap-4">
                    <div><dt className="text-sm font-medium text-gray-500">Nomor</dt><dd>{sale.sale_number}</dd></div>
                    <div><dt className="text-sm font-medium text-gray-500">Tanggal</dt><dd>{formatDate(sale.sale_date)}</dd></div>
                    <div><dt className="text-sm font-medium text-gray-500">Customer</dt><dd>{sale.customer.name}</dd></div>
                    <div><dt className="text-sm font-medium text-gray-500">Status</dt><dd>{sale.payment_status}</dd></div>
                </dl>
                <div className="mt-6">
                    <h3 className="text-lg font-medium">Item Penjualan</h3>
                    <table className="min-w-full mt-2">
                        <thead><tr><th>Produk</th><th>Qty</th><th>Harga</th><th>Total</th></tr></thead>
                        <tbody>
                            {sale.items.map(item => (
                                <tr key={item.id}>
                                    <td>{item.harvest?.planting_batch?.batch_code}</td>
                                    <td>{item.quantity}</td>
                                    <td>{formatNumber(item.price)}</td>
                                    <td>{formatNumber(item.total)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-4 text-right">
                        <p>Subtotal: Rp {formatNumber(sale.subtotal)}</p>
                        <p>Diskon: Rp {formatNumber(sale.discount)}</p>
                        <p className="text-xl font-bold">Grand Total: Rp {formatNumber(sale.grand_total)}</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
