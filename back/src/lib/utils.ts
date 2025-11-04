import { createId } from "@paralleldrive/cuid2";

export default function namespacedId(namespace: string) {
  return `${namespace}` + "_" + createId();
}

