import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock } from "lucide-react";
import { FormPassword } from "@/Components/ui/CustomUi/ReuseForm/Form";
import { Button } from "@/Components/ui/button";
import { changePasswordSchema, ChangePasswordFormValues } from "@/schemas/changePassword";
// import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
// import tryCatchWrapper from "@/utils/tryCatchWrapper";

const lockIcon = <Lock className="size-4 text-muted-foreground" />;

const ChangePasswordForm = () => {
  const { control, handleSubmit, reset } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  // const [changePassword] = useChangePasswordMutation();
  const onSubmit = async (_values: ChangePasswordFormValues) => {
    // const res = await tryCatchWrapper(
    //   changePassword,
    //   { body: { currentPassword: _values.currentPassword, password: _values.newPassword } },
    //   { toastLoadingMessage: "Updating password..." }
    // );
    // if (res?.success) reset();
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-4">
      <FormPassword control={control} name="currentPassword" label="Password" placeholder="Enter your password" prefix={lockIcon} />
      <FormPassword control={control} name="newPassword" label="New Password" placeholder="Enter new password" prefix={lockIcon} />
      <FormPassword control={control} name="confirmPassword" label="Confirm New Password" placeholder="Confirm new password" prefix={lockIcon} />

      <Button type="submit" variant="secondary">
        Change Password
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
