import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, X } from "lucide-react";
import { FormInput } from "@/Components/ui/CustomUi/ReuseForm/Form";
import { Button } from "@/Components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/Components/ui/avatar";
import { getAvatar } from "@/utils/getAvatar";
import { profileSchema, ProfileFormValues } from "@/schemas/profile";
import { IAdminProfile } from "@/types";
// import { useUpdateProfileMutation } from "@/redux/features/profile/profileApi";
// import tryCatchWrapper from "@/utils/tryCatchWrapper";

interface EditProfileFormProps {
  profile: IAdminProfile;
}

const EditProfileForm = ({ profile }: EditProfileFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(profile.avatar);
  const [avatarRemoved, setAvatarRemoved] = useState(false);

  const { control, handleSubmit } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { fullName: profile.fullName, email: profile.email },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
      setAvatarRemoved(false);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(undefined);
    setAvatarRemoved(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // const [updateProfile] = useUpdateProfileMutation();
  const onSubmit = async (_values: ProfileFormValues) => {
    // const formData = new FormData();
    // formData.append("data", JSON.stringify({ fullName: _values.fullName, removeAvatar: avatarRemoved }));
    // if (avatarFile) formData.append("avatar", avatarFile);
    // await tryCatchWrapper(updateProfile, formData, { toastLoadingMessage: "Saving profile..." });
    void avatarFile;
    void avatarRemoved;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-4">
      <div className="relative w-fit">
        <Avatar className="size-40">
          <AvatarImage src={avatarPreview} alt={profile.fullName} />
          <AvatarFallback className="bg-secondbase-color text-base-color font-semibold">
            {getAvatar(profile.fullName)}
          </AvatarFallback>
        </Avatar>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="absolute -bottom-0.5 right-1 size-10 rounded-full bg-secondary-color border-2 border-primary-color flex items-center justify-center cursor-pointer"
          aria-label="Change profile photo"
        >
          <Camera className="size-6 text-white" />
        </button>
        {avatarPreview && (
          <button
            type="button"
            onClick={handleRemoveAvatar}
            className="absolute -top-0.5 -right-0.5 size-10 rounded-full bg-error border-2 border-primary-color flex items-center justify-center cursor-pointer"
            aria-label="Remove profile photo"
          >
            <X className="size-6 text-white" />
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAvatarChange}
        />
      </div>

      <FormInput control={control} name="fullName" label="Full Name" placeholder="Enter your full name" />
      <FormInput control={control} name="email" label="Email" placeholder="Enter your email" disabled />

      <Button type="submit" variant="secondary">
        Save Changes
      </Button>
    </form>
  );
};

export default EditProfileForm;
