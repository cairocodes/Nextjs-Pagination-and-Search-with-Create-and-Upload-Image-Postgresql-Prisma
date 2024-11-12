"use server";

import { z } from "zod"; //https://www.npmjs.com/package/zod
import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

const UploadSchema = z.object({
  title: z.string().min(1),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "Image is required" })
    .refine((file) => file.size === 0 || file.type.startsWith("image/"), {
      message: "Only images are allowed",
    })
    .refine((file) => file.size < 4000000, {
      message: "Image must less than 4MB",
    }),
});

export const CreateData = async (prevState: unknown, formData: FormData) => {
    const validatedFields = UploadSchema.safeParse(
      Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors,
      };
    }

    const file = formData.get("image");
    const { title } = validatedFields.data;

    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename =  file.name.replaceAll(" ", "_");
      console.log(filename);

      await writeFile(
        path.join(process.cwd(), "public/assets/" + filename),
        buffer
      );

      await prisma.post.create({
          data: {
            title,
            image: filename,
          },
      });

      //return { message: "Success" };
    } catch (error) {
      console.log("Error occured ", error);
      return { message: "Failed" };
    }

  revalidatePath("/post");
  redirect("/post");
};