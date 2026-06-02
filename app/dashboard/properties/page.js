import { getClientProperties } from '@/lib/mockData'

export default async function PropertiesPage() {
  const properties = await getClientProperties()
  const withOpen = properties.filter(p => p.open_requests > 0).length

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Properties</h1>
        <p className="text-gray-500 text-sm mt-1">
          {properties.length} properties under management · {withOpen} with open requests.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50 text-xs text-gray-400 uppercase tracking-wide">
              <th className="text-left px-6 py-3 font-medium">Property</th>
              <th className="text-left px-6 py-3 font-medium">Suburb</th>
              <th className="text-left px-6 py-3 font-medium">Type</th>
              <th className="text-left px-6 py-3 font-medium">Tenant</th>
              <th className="text-left px-6 py-3 font-medium">Open Requests</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {properties.map(p => (
              <tr key={p.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">
                    {p.address}{p.unit ? `, ${p.unit}` : ''}
                  </div>
                  <div className="text-xs text-gray-400">{p.id}</div>
                </td>
                <td className="px-6 py-4 text-gray-700">{p.suburb}</td>
                <td className="px-6 py-4 text-gray-700">{p.type}</td>
                <td className="px-6 py-4 text-gray-700">{p.tenant_name}</td>
                <td className="px-6 py-4">
                  {p.open_requests > 0 ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-700">
                      {p.open_requests} open
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-500">
                      None
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
