<script setup lang="ts">
import * as Yup from "yup";
import { Form, useForm } from "vee-validate";
const isFormSent = ref(false);
const onSubmit = async (
  values: {
    name: string;
    email: string;
    message: string;
  },
  { resetForm }
) => {
  const { data, pending } = await useAsyncData("/notion", () =>
    $fetch("/api/notion", {
      method: "post",
      body: { name: values.name, email: values.email, message: values.message },
    })
  );
  isFormSent.value = true;
  resetForm();
};
const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  message: Yup.string().min(10).required(),
});
</script>

<template>

    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      v-slot="{ isSubmitting }"
    >
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col">
          <InputVal name="name" type="text" label="Your name" />
        </div>
        <div class="flex flex-col">
          <InputVal name="email" type="email" label="Your email" />
        </div>
      </div>
      <div class="mb-4 mt-2 w-full">
        <div class="flex flex-col">
          <TextAreaVal name="message" type="text" label="Message" />
        </div>
      </div>
      <button
        v-if="!isFormSent"
        :disabled="isSubmitting"
        type="submit"
        class="button"
      >
        <div class="top-[5px] relative">Send</div>
      </button>
      <div class="mt-5" v-else>Success!</div>
    </Form>

</template>
