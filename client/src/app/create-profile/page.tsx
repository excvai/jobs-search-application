"use client";

import { PageContainer } from "@/components/layout";
import { setCookie } from "@/helpers";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import { InferType, object, string } from "yup";

const signUpSchema = object({
  email: string().email().max(50).required(),
  password: string().min(3).max(30).required(),
  name: string().min(2).max(50).required(),
  jobTitle: string().min(2).max(50).required(),
  aboutMe: string().max(300),
});

type SignInValues = InferType<typeof signUpSchema>;

export default function Login() {
  const router = useRouter();

  async function handleSubmit(
    values: SignInValues,
    actions: FormikHelpers<SignInValues>,
  ) {
    try {
      const response = await axios
        .post(process.env.NEXT_PUBLIC_API_URL + "/create-profile", values)
        .then((res) => res.data);
      const jwtToken = response.token;
      if (jwtToken) {
        setCookie("token", jwtToken);
      }
      actions.resetForm();
      router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        actions.setStatus(error.response?.data.message || error.message);
      } else if (error instanceof Error) {
        actions.setStatus(error.message);
      } else {
        actions.setStatus("Unknown error");
      }
    }
  }

  return (
    <PageContainer>
      <Formik<SignInValues>
        initialValues={{
          email: "",
          password: "",
          name: "",
          jobTitle: "",
          aboutMe: "",
        }}
        validationSchema={signUpSchema}
        onSubmit={handleSubmit}
      >
        {({ status }) => (
          <Form
            className="mx-auto flex flex-col justify-center max-w-[600px] w-full items-left gap-4"
            method="post"
          >
            <Field
              className="border-2 p-2 w-full"
              type="email"
              placeholder="Email"
              name="email"
            />
            <ErrorMessage className="text-red-500" component="p" name="email" />
            <Field
              className="border-2 p-2 w-full"
              type="password"
              placeholder="Password"
              name="password"
            />
            <ErrorMessage
              className="text-red-500"
              component="p"
              name="password"
            />
            <Field
              className="border-2 p-2 w-full"
              placeholder="Name"
              name="name"
            />
            <ErrorMessage className="text-red-500" component="p" name="name" />
            <Field
              className="border-2 p-2 w-full"
              placeholder="Desired Job Title"
              name="jobTitle"
            />
            <ErrorMessage
              className="text-red-500"
              component="p"
              name="jobTitle"
            />
            <Field
              className="border-2 p-2 w-full"
              as="textarea"
              placeholder="About Me"
              name="aboutMe"
            />
            <ErrorMessage
              className="text-red-500"
              component="p"
              name="aboutMe"
            />
            <button
              className="border-2 py-2 px-6 bg-gray-200 hover:bg-gray-300"
              type="submit"
            >
              Submit
            </button>
            {status && <div className="text-red-500">{status}</div>}
          </Form>
        )}
      </Formik>
    </PageContainer>
  );
}
