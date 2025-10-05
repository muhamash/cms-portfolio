import { getPersonalInfo } from '@/lib/utils/profile.utils'
import ContactPageSection from '@/modules/pages/conatct/Contact'

export default async function ContactPage ()
{
  const personalData = await getPersonalInfo();

  return (
    <ContactPageSection data={ personalData } />
  )
}
