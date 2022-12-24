// 🐨 implement the action function here.
// 1. accept the request object
// 2. get the formData from the request
// 3. get the title, slug, and markdown from the formData
// 4. call the createPost function from your post.model.ts
// 5. redirect to "/posts/admin".
import type { ActionArgs} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { createPost } from "~/models/post.server";

function isInValidParams(errors: object, object: {
  title: FormDataEntryValue | null,
  slug: FormDataEntryValue | null,
  markdown: FormDataEntryValue | null,
}): object is { title: string, slug: string, markdown: string } {
  return !Object.values(errors).some(Boolean);
}

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const title = formData.get('title');
  const slug = formData.get('slug');
  const markdown = formData.get('markdown');
  const errors = {
    title: typeof title === 'string' ? null : 'title is required',
    slug: typeof slug === 'string' ? null : 'slug is required',
    markdown: typeof markdown === 'string' ? null : 'markdown is required',
  }
  invariant(typeof title === 'string', 'title must be a string');
  invariant(typeof slug === 'string', 'slug must be a string');
  invariant(typeof markdown === 'string', 'markdown must be a string');
  if (Object.values(errors).some(Boolean)) {
    return json(errors);
  }
  await createPost({ title, slug, markdown });
  return redirect(`/posts/admin`);
};

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

export default function NewPost() {
  const error = useActionData<typeof action>();
  return (
    <Form method="post">
      <p>
        <label>
          Post Title:{" "}
          <input type="text" name="title" className={inputClassName} />
          { error?.title ? <em className="text-red-600">{error.title}</em> : null}
        </label>
      </p>
      <p>
        <label>
          Post Slug:{" "}
          <input type="text" name="slug" className={inputClassName} />
          { error?.slug ? <em className="text-red-600">{error.slug}</em> : null }
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown: </label>
        <br />
        <textarea
          id="markdown"
          rows={8}
          name="markdown"
          className={`${inputClassName} font-mono`}
        />
        { error?.markdown ? <em className="text-red-600">{error.markdown}</em> : null }
      </p>
      <p className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
        >
          Create Post
        </button>
      </p>
    </Form>
  );
}
