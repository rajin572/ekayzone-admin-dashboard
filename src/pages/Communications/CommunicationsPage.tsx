import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PageWraper from "@/Components/ui/CustomUi/PageWraper";
import { FormTextarea, FormSelect, FormDatePicker } from "@/Components/ui/CustomUi/ReuseForm/Form";
import { SelectItem } from "@/Components/ui/select";
import { Button } from "@/Components/ui/button";
import ReusableTable, { Column } from "@/Components/ui/CustomUi/ReuseableTable";
import { composeNotificationSchema, ComposeNotificationFormValues } from "@/schemas/composeNotification";
import { ISentNotification } from "@/types";
// import { useGetSentNotificationsQuery, useSendNotificationMutation } from "@/redux/features/communication/communicationApi";
// import tryCatchWrapper from "@/utils/tryCatchWrapper";

// TODO: replace with real sent-notifications API data once the endpoint exists.
const DUMMY_HISTORY: ISentNotification[] = Array.from({ length: 10 }, (_, i) => ({
  _id: `${i + 1}`,
  message: "New feature: Live streaming is here!",
  audience: "All Users",
  dateSent: "12/04/26",
}));

const AUDIENCE_OPTIONS = [
  { label: "All Users", value: "All Users" },
  { label: "Free Users", value: "Free Users" },
  { label: "Premium Users", value: "Premium Users" },
  { label: "Pro Users", value: "Pro Users" },
];

const headerCls = "text-sm font-semibold text-base-color";
const cellCls = "text-sm text-base-color";

const CommunicationsPage = () => {
  const { control, handleSubmit, reset } = useForm<ComposeNotificationFormValues>({
    resolver: zodResolver(composeNotificationSchema),
    defaultValues: { message: "", targetAudience: "", dateTime: undefined },
  });

  // const { data } = useGetSentNotificationsQuery({ page: 1, limit: 10 }, { refetchOnMountOrArgChange: true });
  // const history = data?.data?.data ?? [];
  const history = DUMMY_HISTORY;

  // const [sendNotification] = useSendNotificationMutation();
  const onSubmit = async (_values: ComposeNotificationFormValues) => {
    // const res = await tryCatchWrapper(
    //   sendNotification,
    //   { message: _values.message, targetAudience: _values.targetAudience, scheduledAt: _values.dateTime?.toISOString() },
    //   { toastLoadingMessage: "Sending notification..." }
    // );
    // if (res?.success) reset();
    reset();
  };

  const columns: Column<ISentNotification>[] = [
    { header: "Message", accessorKey: "message", headerClassName: headerCls, cellClassName: cellCls },
    { header: "Audience", accessorKey: "audience", headerClassName: headerCls, cellClassName: cellCls },
    { header: "Date Sent", accessorKey: "dateSent", headerClassName: headerCls, cellClassName: cellCls },
  ];

  return (
    <PageWraper title="Communications">
      <div className="bg-primary-color rounded-lg border border-base-color/10 p-5 shadow-xs">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-4">
          <FormTextarea control={control} name="message" label="Compose Notification" placeholder="Write your notification message" />
          <FormSelect control={control} name="targetAudience" label="Target audience" placeholder="Select your target audience">
            {AUDIENCE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </FormSelect>
          <FormDatePicker control={control} name="dateTime" label="Date and Time" placeholder="dd-mm-yyyy" formatString="dd-MM-yyyy" icon="chevron" />
          <Button type="submit" className="bg-secondary-color hover:bg-secondary-color/90 text-white">
            Send Now
          </Button>
        </form>
      </div>

      <div>
        <h2 className="text-base lg:text-lg font-bold text-base-color mb-4">Sent History</h2>
        <ReusableTable data={history} columns={columns} scroll={false} />
      </div>
    </PageWraper>
  );
};

export default CommunicationsPage;
