import { DndProvider } from '../components/dnd-provider'
import { DomainModule } from '../components/domain-module'
import { LogoModule } from '../components/logo-module'
import { ImageDesignModule } from '../components/image-design-module'
import { ImagePostprocessingModule } from '../components/image-postprocessing-module'
import { LaunchSiteModule } from '../components/launch-site-module'
import { ProductPageBuilderModule } from '../components/product-page-builder-module'

export default function DashboardPage() {
  return (
    <DndProvider>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="grid grid-cols-2 gap-6">
          <DomainModule />
          <LogoModule />
          <ImageDesignModule />
          <ImagePostprocessingModule />
          <LaunchSiteModule />
          <ProductPageBuilderModule />
        </div>
      </div>
    </DndProvider>
  )
}

