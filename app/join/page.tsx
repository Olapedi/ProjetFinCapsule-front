import Image from 'next/image'
import ContactForm from '@/components/site/contactform'
import SiteNavbar from '@/components/site/sitenavbar'
import SiteFooter from '@/components/site/sitefooter'

import ForSignupForm from '@/components/site/forsignupform'
import SignupForm from '@/components/site/signupform'
import ForgotPasswordForm from '@/components/site/forgotpasswordform'
import countrySelector from '@/components/common/countryselector'

export default function Join() {


  return (
    
    <main>

      <div>

        <SignupForm />

      </div>

    </main>
  )
}
