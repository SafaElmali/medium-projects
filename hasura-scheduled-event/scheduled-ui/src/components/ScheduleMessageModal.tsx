import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
} from "@material-tailwind/react";
import { Controller, useForm } from "react-hook-form";
import { Message } from "./ScheduleMessageTable";
import { gql, useMutation } from "@apollo/client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

const ADD_MESSAGE = gql`
  mutation AddMessage($object: message_insert_input!) {
    insert_message_one(object: $object) {
      text
      scheduled_at
      status
    }
  }
`;

type ScheduleMessageModalProps = {
  onClose: () => void;
};

export const ScheduleMessageModal: React.FC<ScheduleMessageModalProps> = ({
  onClose,
}) => {
  const [open, setOpen] = React.useState(false);
  const [addMessage, { loading }] = useMutation(ADD_MESSAGE);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Message>();

  const handleModalToggle = () => {
    setOpen(!open);
    reset();
  };

  const onSubmit = async (data: Message) => {
    addMessage({
      variables: {
        object: {
          text: data.text,
          scheduled_at: data.scheduled_at,
          status: "scheduled",
        },
      },
    })
      .then(() => {
        onClose();
        handleModalToggle();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="mb-4 flex justify-end">
        <Button onClick={handleModalToggle} variant="gradient" color="blue">
          Schedule Message
        </Button>
      </div>
      <Dialog open={open} handler={handleModalToggle}>
        <DialogHeader>Schedule Message</DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogBody>
            <div className="mb-4">
              <Input
                label="Message"
                crossOrigin=""
                {...register("text", { required: true })}
              />
              {errors.text && (
                <Typography
                  className="mt-2 text-sm text-red-600"
                  id="message-error"
                >
                  Message is required
                </Typography>
              )}
              <Controller
                control={control}
                render={({ field }) => (
                  <div className="mt-4 w-200">
                    <DatePicker
                      selected={dayjs(field.value).toDate()}
                      onChange={(date) => field.onChange(date)}
                      showTimeSelect
                      dateFormat="MMMM d, yyyy h:mm aa"
                      className="w-full mt-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}
                name="scheduled_at"
              />
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleModalToggle}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant="gradient"
              color="green"
              type="submit"
              loading={loading}
            >
              <span>Schedule</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
};
