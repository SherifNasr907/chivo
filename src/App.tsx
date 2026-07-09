import { useState } from 'react'
import { Sidebar } from './components/layout/Sidebar'
import { Topbar } from './components/layout/Topbar'
import { ExecutiveOverview } from './views/ExecutiveOverview'
import { MarketingRoi } from './views/MarketingRoi'
import { EcommerceDeepDive } from './views/EcommerceDeepDive'
import { OpsFinance } from './views/OpsFinance'

export type ViewKey = 'overview' | 'marketing' | 'ecommerce' | 'ops'

export default function App() {
  const [view, setView] = useState<ViewKey>('overview')

  return (
    <div className="flex h-full min-h-screen">
      <Sidebar view={view} onChange={setView} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar view={view} />
        <main className="flex-1 overflow-x-hidden px-4 py-5 md:px-6">
          {view === 'overview' && <ExecutiveOverview />}
          {view === 'marketing' && <MarketingRoi />}
          {view === 'ecommerce' && <EcommerceDeepDive />}
          {view === 'ops' && <OpsFinance />}
        </main>
      </div>
    </div>
  )
}
