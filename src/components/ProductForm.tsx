"use client";

import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { Button } from "@/lib/ui/button";
import { Input } from "@/lib/ui/input";
import { FormField, FormItem, FormLabel, FormControl, Form } from "@/lib/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/lib/ui/select";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useSWR, { Fetcher } from "swr";
import { Textarea } from "@/lib/ui/textarea";

type PropsType = {
  formTitle: string;
  submitTitle: string;
  onSubmitAction: (
    data: any,
    files: FileList | null | undefined
  ) => Promise<any>;
  onClose?: () => void;
};

const categoriesFetcher: Fetcher<Array<Category>, string> = (url) =>
  fetch(url).then((res) => res.json());

export const ProductForm: FC<PropsType> = ({
  formTitle,
  submitTitle,
  onSubmitAction,
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<FileList | null>();
  const { data: categories, isLoading: isLoadingCategories } = useSWR(
    "/api/category",
    categoriesFetcher
  );
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: "",
      categoryId: "",
      description: "",
      cost: 0,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      await onSubmitAction(data, files);

      setIsLoading(false);

      router.refresh();
      onClose?.();
    } catch (error) {
      setIsLoading(false);
      toast.error(`${error}`);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex justify-between items-center flex-col w-full gap-3"
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

        {!isLoadingCategories && (
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Категория</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Категория" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem
                        value={String(category.id)}
                        className="cursor-pointer"
                        key={category.id}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Описание"
                  disabled={isLoading}
                  required
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormItem className="w-full">
          <FormLabel>Изображения</FormLabel>
          <FormControl>
            <Input
              type="file"
              multiple
              accept=".jpeg, .png, .jpg"
              disabled={isLoading}
              required
              onChange={(e) => setFiles(e.target.files)}
            />
          </FormControl>
        </FormItem>

        <div className="flex justify-between w-full items-end">
          <FormField
            control={form.control}
            name="cost"
            render={({ field }) => (
              <FormItem className="w-[50%]">
                <FormLabel>Цена в $</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Цена"
                    disabled={isLoading}
                    required
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            {submitTitle}
          </Button>
        </div>
      </form>
    </Form>
  );
};
