import { useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { findOnePostBySlug } from "~/models/post.server";
import { marked } from "marked";

export const loader = async ({ params }: LoaderArgs) => findOnePostBySlug(params.slug ?? '');

export default function Slug() {
    const post = useLoaderData<typeof loader>();
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{post?.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: marked(post?.markdown ?? '')}} />
    </main>
  );
}
