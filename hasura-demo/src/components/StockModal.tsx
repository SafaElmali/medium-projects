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
import { useForm } from "react-hook-form";
import { Stock } from "./StockTable";
import { gql, useMutation } from "@apollo/client";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

const ADD_STOCK = gql`
  mutation AddStock(
    $name: String!
    $category: String!
    $supplier: String!
    $quantity: Int!
  ) {
    insert_stock_one(
      object: {
        name: $name
        category: $category
        supplier: $supplier
        quantity: $quantity
      }
    ) {
      id
      name
      category
      supplier
      quantity
    }
  }
`;

type StockModalProps = {
  onClose: () => void;
};

export const StockModal: React.FC<StockModalProps> = ({ onClose }) => {
  const [open, setOpen] = React.useState(false);
  const [addStock, { loading }] = useMutation(ADD_STOCK);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Stock>();

  const handleModalToggle = () => {
    setOpen(!open);
    reset();
  };

  const onSubmit = async (data: Stock) => {
    try {
      await addStock({
        variables: {
          name: data.name,
          category: data.category,
          supplier: data.supplier,
          quantity: data.quantity,
        },
      });
      reset();
      setOpen(false);
      onClose();
      toast.success("Stock added successfully", {
        duration: 3000,
      });
    } catch (error) {
      toast.error("Error adding stock", {
        duration: 3000,
      });
    }
  };

  return (
    <>
      <div className="mb-4 flex justify-end">
        <Button onClick={handleModalToggle} variant="gradient" color="blue">
          Add Stock
        </Button>
      </div>
      <Dialog open={open} handler={handleModalToggle}>
        <DialogHeader>Add New Stock</DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogBody className="flex flex-col gap-4">
            <div>
              <Input
                label="Name"
                autoComplete="off"
                crossOrigin=""
                {...register("name", { required: true })}
              />
              {errors.name && (
                <Typography className="ml-1 mt-1 text-sm text-red-600">
                  Name is required
                </Typography>
              )}
            </div>
            <div>
              <Input
                label="Category"
                crossOrigin=""
                autoComplete="off"
                {...register("category", { required: true })}
              />
              {errors.category && (
                <Typography className="ml-1 mt-1 text-sm text-red-600">
                  Category is required
                </Typography>
              )}
            </div>
            <div>
              <Input
                label="Supplier"
                autoComplete="off"
                crossOrigin=""
                {...register("supplier", { required: true })}
              />
              {errors.supplier && (
                <Typography className="ml-1 mt-1 text-sm text-red-600">
                  Supplier is required
                </Typography>
              )}
            </div>
            <div>
              <Input
                label="Quantity"
                type="number"
                crossOrigin=""
                {...register("quantity", { required: true })}
              />
              {errors.quantity && (
                <Typography className="ml-1 mt-1 text-sm text-red-600">
                  Quantity is required
                </Typography>
              )}
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
              <span>Save</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
};
