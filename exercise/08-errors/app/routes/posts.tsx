import { Outlet, useCatch } from "@remix-run/react";
import { ErrorFallback } from "~/components";

export function CatchBoundary() {
    const caught = useCatch();
    if (caught?.status === 404) {
        return <h1>404 Not Found ....</h1>;
    }
    throw caught;
}

export function ErrorBoundary({ error }: { error: Error }) {
    return <ErrorFallback>Something goes wrong: {error.message}</ErrorFallback>
}

export default function Posts() {
    return <Outlet />
}