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
import IncomeSelect from "./IncomeSelector";

export function IncomeForm() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
        <form>
          <DialogHeader>
            <DialogTitle>Add Income</DialogTitle>
          </DialogHeader>
          <DialogDescription className="sr-only"></DialogDescription>
          <FieldGroup className="my-8">
            <Field>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                name="amount"
                type="text"
                min={1}
                inlist={"decimal"}
              />
            </Field>
            <Field>
              <Label htmlFor="source">Source</Label>
              <IncomeSelect />
              {/* <Input
                id="source"
                name="source"
                placeholder="e.g. Salary, Family Support, etc."
              /> */}
            </Field>
            <Field>
              <Label htmlFor="date">Date</Label>
              <DatePicker />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
