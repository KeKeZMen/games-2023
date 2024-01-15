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
  onSubmitAction: (data: any, video: FileList | null | undefined) => Promise<any>;
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

  const [video, setVideo] = useState<FileList | null>();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      await onSubmitAction(data, video);
      
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

        <FormItem className="w-full">
          <FormLabel>Видео</FormLabel>
          <FormControl>
            <Input
              type="file"
              accept=".mp4"
              disabled={isLoading}
              required
              onChange={(e) => setVideo(e.target.files)}
            />
          </FormControl>
        </FormItem>

        <Button type="submit" disabled={isLoading}>{submitTitle}</Button>
      </form>
    </Form>
  );
};
