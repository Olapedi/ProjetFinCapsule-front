import Image from "next/image";
import SiteNavbar from "@/components/site/sitenavbar";
import SiteFooter from "@/components/site/sitefooter";
import Pricing from "@/components/site/pricing";
import Validation from "@/components/site/validationform";
import Example from "@/components/members/membersnavbar";
import MembersNavBar from "@/components/members/membersnavbar";
import UserProfilDisplay from "@/components/members/userprofildisplay";
import UserProfilDisplayMock from "@/components/members/userprofildisplayMockTest";
import FileInputComponent from "@/components/common/image_test";
import ProfilesAll from "@/components/site/profilesall";
import ProfileCard from "@/components/site/profilecard";

export default function Test() {
    return (
        <main>
            <div>
                <ul
                    role="list"
                    className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
                >
                    <ProfileCard />
                </ul>
            </div>
        </main>
    );
}
