import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import IncomeSelect from "./Selectors/IncomeSelector";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import createNewTransaction from "@/api/users/transactions/createNewTransaction";

export type Transaction = {
  userId: string;
  categoryId: number;
  amount: number;
  currency: string;
  description: string;
  createdAt?: string;
};

export function IncomeForm() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const methods = useForm<Transaction>();
  const queryClient = useQueryClient();

  const { register, handleSubmit } = methods;

  const mutation = useMutation({
    mutationKey: ["income"],
    mutationFn: createNewTransaction,
    onError: (error) => {
      console.log(error?.message);
    },
    onSuccess: () => {
      toast.success("Add New Income Successfully");
      queryClient.invalidateQueries({
        queryKey: ["balance"],
      });
    },
  });

  const onSubmit: SubmitHandler<Transaction> = async (credentials) => {
    const session = await authClient.getSession();
    const userId = session?.data?.user.id;

    if (!userId) {
      toast.error("User session not found");
      return;
    }

    const defaultCredentials = {
      userId,
      currency: "AUD",
    };

    mutation.mutate({ ...credentials, ...defaultCredentials });

    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        asChild
        autoFocus={isOpen}
        onClick={(e) => {
          e.currentTarget.blur();
        }}
      >
        <Button className="bg-primary hover:bg-primary/90 text-white rounded-2xl text-lg h-10.5">
          + Add Income
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={() => {}}
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
        className="sm:max-w-sm bg-white pointer-events-auto"
      >
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add Income</DialogTitle>
            </DialogHeader>
            <DialogDescription className="sr-only"></DialogDescription>
            <FieldGroup className="my-8">
              <Field>
                <Label htmlFor="source">Income Source</Label>
                <IncomeSelect />
              </Field>
              <Field>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step={"0.01"}
                  {...register("amount", {
                    required: "Amount is required",
                    valueAsNumber: true,
                    min: {
                      value: 0.01,
                      message: "Amount must be greater than 0",
                    },
                  })}
                />
              </Field>
              <Field>
                <Label htmlFor="desc">Description</Label>
                <Input
                  id="desc"
                  type="text"
                  {...register("description", {
                    maxLength: {
                      value: 50,
                      message: "Max length is 50 characters",
                    },
                  })}
                />
              </Field>
              <Field>
                <Label htmlFor="date">Date</Label>
                <DatePicker />
              </Field>
            </FieldGroup>
            <DialogFooter className="flex-col gap-y-3.5">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                {mutation.isPending ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  "Save changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
