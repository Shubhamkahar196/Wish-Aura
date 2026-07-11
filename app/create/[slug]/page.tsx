import Link from 'next/link';
import { Button } from '@/components/ui/button';

type Props = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    created?: string;
  }>;
};

export default async function CreatedPage({params}:Props){
    const { slug } = await params;
const { created } = await searchParams;

    const wishUrl = `${process.env.NEXT_PUBLIC_APP_URL}/w/${slug}`

    return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 via-white to-purple-100 p-4">
      <div className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-2xl border">
        <div className="text-center space-y-4">
          <div className="text-6xl">🎉</div>

          <h1 className="text-3xl font-bold">
            Wish Created Successfully
          </h1>

          <p className="text-muted-foreground">
            Your birthday wish is ready to share.
          </p>
        </div>

        <div className="mt-8 rounded-xl border bg-muted p-4 break-all text-sm">
          {wishUrl}
        </div>

        <div className="mt-8 grid gap-4">
          <Button
            onClick={async () => {
              await navigator.clipboard.writeText(wishUrl);
              alert("Link Copied 🎉");
            }}
          >
            📋 Copy Link
          </Button>

          <Button asChild variant="secondary">
            <Link href={`/w/${slug}`}>
              👀 Preview Wish
            </Link>
          </Button>

          <Button asChild variant="outline">
            <Link href="/create">
              ➕ Create Another Wish
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}