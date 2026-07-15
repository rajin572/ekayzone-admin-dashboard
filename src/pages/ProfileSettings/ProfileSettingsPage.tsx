import { useState } from "react";
import PageWraper from "@/Components/ui/CustomUi/PageWraper";
import ReuseTabs from "@/Components/ui/CustomUi/ReuseTabs";
import EditProfileForm from "@/Components/Dashboard/ProfileSettings/EditProfileForm";
import ChangePasswordForm from "@/Components/Dashboard/ProfileSettings/ChangePasswordForm";
import { IAdminProfile } from "@/types";
// import { useGetProfileQuery } from "@/redux/features/profile/profileApi";

// TODO: replace with real profile API data once the endpoint exists.
const DUMMY_PROFILE: IAdminProfile = {
  fullName: "Anthony Muoka",
  email: "anthonymuoka@example.com",
};

const TAB_OPTIONS = [
  { label: "Edit Profile", value: "profile" },
  { label: "Change Password", value: "password" },
];

const ProfileSettingsPage = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");

  // const { data } = useGetProfileQuery();
  // const profile = data?.data ?? DUMMY_PROFILE;
  const profile = DUMMY_PROFILE;

  return (
    <PageWraper title="Profile Settings">
      <ReuseTabs
        options={TAB_OPTIONS}
        value={activeTab}
        onChange={(value) => setActiveTab(value as "profile" | "password")}
        variant="solid"
      />

      {activeTab === "profile" ? <EditProfileForm profile={profile} /> : <ChangePasswordForm />}
    </PageWraper>
  );
};

export default ProfileSettingsPage;
