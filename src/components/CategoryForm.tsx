"use client";

import { Button } from "@/lib/ui/button";
import { Input } from "@/lib/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Form,
} from "@/lib/ui/form";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type PropsType = {
  formTitle: string;
  submitTitle: string;
  onSubmitAction: (data: any) => Promise<any>;
  onClose?: () => void;
};

export const CategoryForm: FC<PropsType> = ({
  formTitle,
  submitTitle,
  onSubmitAction,
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(false);

    try {
      await onSubmitAction(data);

      setIsLoading(false);
      onClose?.();
      router.refresh();
    } catch (error) {
      setIsLoading(false);
      toast.error(`${error}`);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-between items-center w-full gap-3 md:justify-start"
      >
        <h2>{formTitle}</h2>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Название"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">{submitTitle}</Button>
      </form>
    </Form>
  );
};
