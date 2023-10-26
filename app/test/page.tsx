'use client'
import Image from "next/image";
import SiteNavbar from "@/components/site/sitenavbar";
import SiteFooter from "@/components/site/sitefooter";
import Pricing from "@/components/site/pricing";
import Validation from "@/components/site/validationform";
import Example from "@/components/members/membersnavbar";
import MembersNavBar from "@/components/members/membersnavbar";
import UserProfilDisplay from "@/components/members/userprofildisplay";
// import UserProfilDisplayMock from "@/components/members/userprofildisplayMockTest";
import FileInputComponent from "@/components/common/image_test";
import ProfilesAll from "@/components/site/profilesall";
// import Example from "@/components/members/membersnavbar";
import Dashboard from "@/components/members/dashboard";

export default function Test() {

  const user = {usrUid:'usr2023102623866', proUid:'pro2023102527605'}
  
  const [profilData,setProfilData] = useState([])
  const [neo,setNeo] =useState('')
  const [boosts,setBoosts] = useState([])
  const [alerts,setAlerts] = useState([])

  
  // const getProfilBoosts = async () => {
    //     const result = await fetch(`/boosts/${user.proUid}`)
    //     data = await result.json()
    //     setBoosts(data)
    // }
    // const getProfilAlerts = async () => {
      //     const result = await fetch(`/alerts/${user.proUid}`)
      //     data = await result.json()
      //     setAlerts(data)
      // }
      
      useEffect(()=>{
    const getProfilData = async () => {
        const result = await fetch (`${process.env.backendserver}/profiles/${user.proUid}`)
        const data = await result.json()
        data.splice(0,1)
        setProfilData(data)
    }
  
    const getUserNeo = async () => {
        const result = await fetch(`${process.env.backendserver}/users/${user.usrUid}`)
        const userData = await result.json()
        setNeo(userData[1].neocode)
    } 
      getProfilData()
      // getProfilAlerts()
      // getProfilBoosts()
      getUserNeo()
  },[])
  
  console.log('profilData : ',profilData[0])
  console.log('neoCode : ',neo)

let userCard = <></>

if(profilData.length){
  console.log("profilD in if", profilData);
  
  userCard =  <UserProfilDisplay
            profilData={profilData[0]}
            neo={neo}
         />
}
  return (
    
    <main>
      
      <div>
         <FileInputComponent />
      </div>

      <div>
        
      </div>
      
    </main>
  )
}
