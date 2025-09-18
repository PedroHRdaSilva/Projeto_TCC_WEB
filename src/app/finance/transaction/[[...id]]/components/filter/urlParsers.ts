import { lightFormat, parseISO } from "date-fns";
import { createParser } from "nuqs";

export const parseAsDate = createParser({
  parse: (value) => {
    try {
      const date = parseISO(value);
      if (Number.isNaN(date.valueOf())) {
        return null;
      }
      return date;
    } catch {
      return null;
    }
  },
  serialize: (value: Date) => lightFormat(value, "yyyy-MM-dd"),
});
