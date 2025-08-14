
import DefaultLayout from '../../../layout/DefaultLayout'
import WidgetsDropdown from '../../../views/widgets/WidgetsDropdown'
import { usePage } from '@inertiajs/react'
const Index = () => {
  const { dashboardData } = usePage().props

  return (
    <>
      <WidgetsDropdown className="mb-4" dashboardData={dashboardData} />
    </>
  )
}
Index.layout = (page) => <DefaultLayout>{page}</DefaultLayout>
export default Index
