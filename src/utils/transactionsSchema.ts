import parseCurrencyToNumber from "@/utils/currency";
import { z } from "zod";

export const createTransactionSchema = z
  .object({
    categories: z.string().nonempty("Categoria é obrigatória"),
    description: z.string().min(1, "Nome do grupo é obrigatório"),
    date: z.date({ message: "Data obrigatória" }),
    value: z.string().refine((value) => {
      const amountNormalized = parseCurrencyToNumber(value);
      return amountNormalized > 0;
    }, "O valor deve ser maior que 0"),
    recurring: z.boolean(),
    credit: z.string().optional(),
    installment: z
      .number({ message: "Apenas número sem , ou ." })
      .int({ message: "Apenas número sem , ou ." })
      .optional(),
    installmentCheck: z.boolean(),
  })
  .superRefine((data, context) => {
    if (data.installmentCheck) {
      if (!data.installment || data.installment <= 0) {
        context.addIssue({
          code: "custom",
          message: "Valor é obrigatório",
          path: ["installment"],
        });
      }
    }
  });

export type CreateTransactionSchema = z.infer<typeof createTransactionSchema>;
